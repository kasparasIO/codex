interface DnsRecord {
    recordType: string;
    records?: string[];
}
export interface MXRecordEntry {
    exchange: string;
    priority: number;
}
export interface MXRecord {
    recordType: string;
    records?: MXRecordEntry[];
}
interface WhoisResponse {
    [key: string]: string | string[] | undefined;

}
export interface HostLoadData {
    paramData: HostData;
}

interface DnsAnswer {
    name: string;
    type: string;
    ttl: number;
    data: string;
    exchange?: string;
    address?: string;
}
interface PropagationResult {
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
export interface Ping {
    status: string;
    duration: number;
}
export interface HostData { 
    domain_name: string; 
    dns_lookup: DnsRecord[]| MXRecord[];
    whois?: WhoisResponse;
    ping?: Ping;
}