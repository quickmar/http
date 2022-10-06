export type BodyData = RequestInit["body"] | object;
export interface Init extends Omit<RequestInit, "body" | "method"> {
    body: BodyData
}