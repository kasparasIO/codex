export interface MxRecord { 
    exchange: string;
    priority: number;
}

export interface DnsRecord {
    recordType: string; 
    records: string[] | string | MxRecord[] | undefined
}
export interface HostData {
    domain_name: string;
    dns_lookup: DnsRecord[];
}

export const copyToClipboard = (node: HTMLElement) => {
    const handleClick = () => {
      const text = node.textContent || '';
      navigator.clipboard.writeText(text);
    };
    node.addEventListener('click', handleClick);
  }