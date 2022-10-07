export interface Init extends Omit<RequestInit, "body" | "method"> {}
export type PathAndEntries = { path: string; entries: [string, string][] };
