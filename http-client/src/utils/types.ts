export interface Init extends Omit<RequestInit, "body" | "method"> {}

export interface JSONInit extends Omit<RequestInit, "body"> {
  body?: string;
}

export type PathAndEntries = { path: string; entries: [string, string][] };
