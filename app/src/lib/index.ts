export interface Status {
    server: string;
    answers: string[];
}
export interface MxRecord { 
    exchange: string; 
    priority: number; 

}
export interface DnsRecord {
    recordType: string; 
    records?: string[] | MxRecord[]
}
export interface WhoisResponse {
    [key: string]: string | string[] | undefined;
}
export interface HostData {
    domain_name: string;
    dns_lookup: DnsRecord[];
    whois: WhoisResponse;
}
interface DnsAnswer {
    name: string;
    type: string;
    ttl: number;
    data: string;
    exchange?: string;
    address?: string;
}
export interface PropagationResult {
    server: string;
    answer: Array<DnsAnswer>;
}
export interface PropagationResponse {
    type: string
    results: Array<PropagationResult>;
}
export interface filteredNsResponse { 
  server: string; 
  answers: string[];
}
export interface NsPropagationCheck {
  isPropagated: boolean;
  records?: filteredNsResponse[];
}
export const copyToClipboard = (node: HTMLElement) => {
  const handleClick = () => {
    const text = node.textContent || '';
    navigator.clipboard.writeText(text);
    node.dispatchEvent(new CustomEvent('copied', {
      detail: { text: `Text copied! ${text}` },
      bubbles: true
    }));
  };

  node.addEventListener('click', handleClick);

  return {
    destroy() {
      node.removeEventListener('click', handleClick);
    }
  };
};
export const checkNS = async (domain: string) => {
    try {
        const req = await fetch(`/api/propagation?host=${domain}&type=NS`);
        const res: PropagationResponse = await req.json();
        const nsRecords: filteredNsResponse[] = [];
        res.results.forEach((result) => {
            const filteredObject = {
                server: result.server,
                answers: result.answer.map((answer) => answer.data)
            }
            nsRecords.push(filteredObject)
        })
        return nsRecords;
      } catch (e) {
        console.log((e as Error).message)
    }
}
export const isAllTheSame = (arr: filteredNsResponse[]) => {
    const firstSorted = [...arr[0].answers].sort();
    return arr.every(item => 
        item.answers.length === firstSorted.length && 
        [...item.answers].sort().every((answer, index) => answer === firstSorted[index])
    );
}
export const isNsPropagated = (nsRecords: filteredNsResponse[]) => {
  const allTheSame = isAllTheSame(nsRecords);

  if (allTheSame) {
    return { isPropagated: true }
  ;
  } else {
    const firstSortedAnswers = [...nsRecords[0].answers].sort().join();
    const records = nsRecords.filter(nsRecord => 
      [...nsRecord.answers].sort().join() !== firstSortedAnswers
    );

    return {
      isPropagated: false,
      records: records
    };
  }
}
