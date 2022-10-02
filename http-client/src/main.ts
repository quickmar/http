import { HttpClientImpl } from "./client/http-client";

export class Http {
    static createClient(baseUrl: string) {
        return new HttpClientImpl(baseUrl);
    }
}

console.dir(Http.createClient('http://localhost:5173/').URLBuilder().toString());