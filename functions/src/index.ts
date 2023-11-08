import {onRequest} from "firebase-functions/v2/https";
import {setGlobalOptions} from "firebase-functions/v2";
import * as dns from "dns";
// eslint-disable-next-line
//@ts-ignore
import * as nativeDns from "native-dns";


setGlobalOptions({maxInstances: 10});

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
const getWhoisResKey = (whoisRes: any, queryString: string) => {
  for (const key in whoisRes) {
    if (whoisRes[key] && whoisRes[key][queryString]) {
      return whoisRes[key][queryString];
    }
  }
};
interface WhoisRes {
  [key: string]: string | Array<string> | WhoisRes
}
export const whois = onRequest(async (request, response) => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const whoiser = require("whoiser");
  const queryStrings = ["Updated Date", "Created Date", "Expiry Date",
    "Domain Status", "Registrar"];
  const domain = request.query.domain as string;
  if (!domain) {
    response.status(400).send("Domain query parameter is required.");
    return;
  }
  try {
    const data = await whoiser(domain);
    const res:WhoisRes = {};
    queryStrings.forEach((queryString) => {
      const attr = getWhoisResKey(data, queryString);
      if (attr) {
        res[queryString] = attr;
      }
    });
    response.send(res);
  } catch (e) {
    response.status(500).send((e as Error).message);
  }
});
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

interface DNSResponse {
  question: Array<DNSQuestion>;
  answer: Array<DNSAnswer>;
  authority: any[];
  additional: any[];
}
const queryDns = (domain: string, recordType: string) => {
  const dnsServers = [
    "8.8.8.8", // Google Public DNS
    "8.8.4.4", // Google Public DNS
    "1.1.1.1", // Cloudflare
    "1.0.0.1", // Cloudflare
    "208.67.222.222", // OpenDNS
    "208.67.220.220", // OpenDNS
    "9.9.9.9", // Quad9
    "149.112.112.112", // Quad9
  ];

  return Promise.all(dnsServers.map((server) => {
    return new Promise((resolve, reject) => {
    // eslint-disable-next-line
      const question = nativeDns.Question({
        name: domain,
        type: recordType,
      });
      // eslint-disable-next-line
      const req = nativeDns.Request({
        question,
        server,
        timeout: 1000,
      });
      req.on("timeout", () => {
        reject(new Error("Timeout in making request"));
      });
      req.on("message", (err: Error|null, answer: DNSResponse) => {
        if (err) reject(err);
        resolve({server, response: answer});
      });

      req.send();
    });
  }));
};
export const propagation = onRequest(async (request, response) => {
  const domain = request.query.domain as string;
  const type = request.query.type as string;
  if (!domain || !type) {
    response.status(400).send("Domain and type query parameters are required.");
    return;
  }
  const dnsRes = await queryDns(domain, type);
  // eslint-disable-next-line
 // @ts-ignore
  const res = dnsRes.map(({server, response}) => {
    const answer = response.answer;
    return {
      server,
      answer,
    };
  });
  response.send(res);
});
