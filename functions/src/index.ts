import {onRequest} from "firebase-functions/v2/https";
import {setGlobalOptions} from "firebase-functions/v2";
setGlobalOptions({maxInstances: 10});
import * as dns from "dns";
interface DNSRecord {
  recordType: string;
  records: string[] | dns.MxRecord[] | dns.NaptrRecord[] |
  dns.SoaRecord | dns.SrvRecord[] | string[][] | dns.AnyRecord[]; 
}
export const dnsCheck = onRequest((request, response) => {
  const domain = request.query.domain as string;
  const recordTypes = ["A", "AAAA", "NS", "TXT", "CNAME", "MX"];
  const domainRecords: DNSRecord[] = [];
  let lookupCount = 0;
  if (!domain) {
    response.status(400).send("Domain query parameter is required.");
    return;
  }
  recordTypes.forEach((recordType) => {
    dns.resolve(domain, recordType as string, (err, records) => {
      lookupCount++;
      domainRecords.push({
        recordType,
        records,
      });
      if (lookupCount === recordTypes.length) {
        response.send(domainRecords);
      }
    });
  });
});
