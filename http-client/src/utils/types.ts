export type BodyData = RequestInit["body"];
export interface Init extends Omit<RequestInit, "body" | "method"> {
  body: BodyData;
}
export type PathAndEntries = { path: string; entries: [string, string][] };
