import { HttpClient } from "./client/http-client";
import { HttpJSONClient } from "./client/http-json-client";
import { HttpClientBaseRegistry } from "./client/registry/http-client-base-registry";
import { HttpClientRegistry } from "./client/registry/http-client-registry";
import { RequestBuilder } from "./request-builder/request-builder";

export class Http {
  static createClient<T extends RequestBuilder>(
    baseRegisty: HttpClientBaseRegistry<T>
  ): HttpClient {
    return new HttpClient(baseRegisty);
  }

  static createJSONClient<T extends RequestBuilder>(
    baseRegisty: HttpClientBaseRegistry<T>
  ): HttpJSONClient {
    return new HttpJSONClient(baseRegisty);
  }

  static createHttpRegistry(
    baseUrl: string | RequestBuilder
  ): HttpClientRegistry {
    return new HttpClientRegistry(baseUrl);
  }
}

const registry = Http.createHttpRegistry("http://localhost:5173/");

registry.registerPath("test");
console.dir(registry.getBuilder("test").toString());

registry.registerPath("test2", (b) =>
  b.addDistinctSearchParam("test2", "param")
);
console.dir(registry.getBuilder("test2").toString());

registry.registerPath("test3/{{param}}/{{param}}");
console.dir(registry.getBuilder("test3/{{param}}/{{param}}").toString());

registry.registerPath("{{folder}}/test.json");

Http.createJSONClient(registry)
  .get<object>("{{folder=src}}/test.json", {
    headers: [["test", "header"]],
  })
  .then(console.log)
  .catch(console.log);
