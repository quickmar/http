import { GetRequestInit } from "../utils/request-int";
import { intRequestBuilder } from "../utils/util";
import { HttpClient } from "./http-client";

export class HttpJSONClient {
  #baseClient:  HttpClient;

  public get url(): string {
    return this.#baseClient.url;
  }

  constructor(baseClient: HttpClient ) {
    this.#baseClient = baseClient;
  }

  public delete() {}

  public get<T>(path: string, init?: GetRequestInit): Promise<T> {
    return this.perform(path, 'GET', init).then((response) => response.json())
  }

  public head() {}

  public patch() {}

  public post() {}

  public put() {}

  private perform(path: string, method: string, init?: RequestInit): Promise<Response> {
    const builder = this.#baseClient.getBuilder(path).addMethod(method);
    if (init) {
      const {method, ...rest } = init
      intRequestBuilder(builder, rest);
    }
    return builder.fetch();
  }
}
