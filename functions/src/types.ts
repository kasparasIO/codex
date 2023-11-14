import * as dns from "dns";
export interface DNSRecord {
  recordType: string;
  records: string[] | dns.MxRecord[] | dns.NaptrRecord[] |
  dns.SoaRecord | dns.SrvRecord[] | string[][] | dns.AnyRecord[];
}
export interface WhoisRes {
  [key: string]: string | Array<string> | WhoisRes
}

interface DNSQuestion {
  name: string;
  type: number;
  class: number;
}
interface DNSAnswer extends DNSQuestion {
  ttl: number;
  address?: string;
  data?: any;
}

export interface DNSResponse {
  question: Array<DNSQuestion>;
  answer: Array<DNSAnswer>;
  authority: any[];
  additional: any[];
}
