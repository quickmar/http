import { RequestBuilder } from "../request-builder/request-builder";
import { BodyData, Init } from "../utils/request-int";
import { AbstractHttpClient } from "./http-client.abstract";
import { HttpClientBaseRegistry } from "./registry/http-client-base-registry";

export class HttpClient extends AbstractHttpClient<RequestBuilder> {
  constructor(baseRegistry: HttpClientBaseRegistry<RequestBuilder>) {
    super(baseRegistry);
  }

  public get(path: string, init?: Init): Promise<Response> {
    return this.perform(path, "GET", init);
  }

  public post(path: string, body?: BodyData, init?: Init): Promise<Response> {
    return this.perform(path, "POST", { body, ...init });
  }

  public put(path: string, body?: BodyData, init?: Init): Promise<Response> {
    return this.perform(path, "PUT", { body, ...init });
  }

  public patch(): Promise<Response> {
    throw new Error("Method not implemented.");
  }

  public delete(): Promise<Response> {
    throw new Error("Method not implemented.");
  }

  public head(): Promise<Response> {
    throw new Error("Method not implemented.");
  }
}
