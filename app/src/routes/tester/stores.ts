    import { writable } from "svelte/store";
    interface DnsRecord {
        recordType: string; 
        records: string[] | string | undefined
    }
    interface HostData {
        domain_name: string;
        dns_lookup: DnsRecord[];

    }
    export const hostData = writable<HostData|undefined>(undefined);
    export const errorStore = writable<string|undefined>(undefined)