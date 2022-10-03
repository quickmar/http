import { HttpClient } from "./client/http-client";
import { RequestBuilder } from "./request-builder/request-builder";

export class Http {
  static createClient(baseUrl: string | RequestBuilder): HttpClient {
    return new HttpClient(baseUrl);
  }
}
const client = Http.createClient(
  new RequestBuilder("http://localhost:5173/").addDistinctSearchParam(
    "base",
    "param"
  )
);
console.dir(client.url);
client.registerPath("test");
console.dir(client.getBuilder("test").toString());
client.registerPath("test2", (b) => b.addDistinctSearchParam("test2", "param"));
console.dir(client.getBuilder("test2").toString());
