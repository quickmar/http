export type BodyData = RequestInit["body"];
export interface Init extends Omit<RequestInit, "body" | "method"> {
    body: BodyData
}