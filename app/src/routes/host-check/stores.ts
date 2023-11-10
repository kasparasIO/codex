    import { writable } from "svelte/store";
    import type { HostData } from "$lib";
    export const hostData = writable<HostData|undefined>(undefined);
    export const errorStore = writable<string|undefined>(undefined)