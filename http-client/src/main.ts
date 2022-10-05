import { HttpClient } from "./client/http-client";
import { HttpJSONClient } from "./client/http-json-client";
import { RequestBuilder } from "./request-builder/request-builder";

export class Http {
  static createClient(baseUrl: string | RequestBuilder): HttpClient {
    return new HttpClient(baseUrl);
  }

  static createJSONClient(baseClient: HttpClient): HttpJSONClient {
    return new HttpJSONClient(baseClient);
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

Http.createJSONClient(client)
  .get<string>("test")
  .then(console.log)
  .catch(console.log);
