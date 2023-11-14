import { writable } from "svelte/store";
import type { HostData } from "./types";
import { domainValidation } from "$lib/utils";
import type { filteredNsResponse, PropagationResponse } from "./types";
export const hostData = writable<HostData|undefined>(undefined);

export const fetchHostData = async (domain: string) => {
    if(!domain && domainValidation.test(domain) === false) return;
    try {
        const req = await fetch(`/api/host?host=${domain}`, {method: "POST"});
        const res = await req.json();
        hostData.set(res);
        const params = new URLSearchParams(window.location.search);
        params.set('host', domain);
        window.history.pushState({}, '', `?${params}`);
    } catch (e) {
        console.log((e as Error).message);
    }
}

export const checkNS = async (domain: string) => {
    try {
        const req = await fetch(`/api/host/propagation?host=${domain}&type=NS`);
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
    return { isPropagated: true };

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
