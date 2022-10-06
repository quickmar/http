import { HttpClient } from "./client/http-client";
import { HttpClientBaseRegistry } from "./client/registry/http-client-base-registry";
import { HttpClientRegistry } from "./client/registry/http-client-registry";
import { RequestBuilder } from "./request-builder/request-builder";

export class Http {
  static createClient<T extends RequestBuilder>(
    baseRegisty: HttpClientBaseRegistry<T>
  ): HttpClient {
    return new HttpClient(baseRegisty);
  }

  static createHttpRegistry(
    baseUrl: string | RequestBuilder
  ): HttpClientRegistry {
    return new HttpClientRegistry(baseUrl);
  }
}
const registry = Http.createHttpRegistry("http://localhost:5173/");

console.dir(registry.url);
registry.registerPath("test");
console.dir(registry.getBuilder("test").toString());
registry.registerPath("test2", (b) =>
  b.addDistinctSearchParam("test2", "param")
);
console.dir(registry.getBuilder("test2").toString());

Http.createClient(registry).get("test").then(console.log).catch(console.log);
