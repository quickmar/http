export interface RequestInitParams extends RequestInit {
  searchParams?: {[name: string]: string}
}

export interface Init extends Omit<RequestInitParams, "body" | "method"> {
}

export interface JSONInit extends Omit<RequestInitParams, "body"> {
  body?: string;
}

export type PathAndEntries = { path: string; entries: [string, string][] };
