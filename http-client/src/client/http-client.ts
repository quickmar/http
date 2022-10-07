import { RequestBuilder } from "../request-builder/request-builder";
import { Init } from "../utils/types";
import { AbstractHttpClient } from "./http-client.abstract";
import { HttpClientBaseRegistry } from "./registry/http-client-base-registry";

export class HttpClient extends AbstractHttpClient<RequestBuilder> {
  constructor(baseRegistry: HttpClientBaseRegistry<RequestBuilder>) {
    super(baseRegistry);
  }

  public get(path: string, init?: Init): Promise<Response> {
    return this.perform(path, "GET", init);
  }

  public post(path: string, body?: BodyInit, init?: Init): Promise<Response> {
    return this.perform(path, "POST", { body, ...init });
  }

  public put(path: string, body?: BodyInit, init?: Init): Promise<Response> {
    return this.perform(path, "PUT", { body, ...init });
  }

  public patch(path: string, body?: BodyInit, init?: Init): Promise<Response> {
    return this.perform(path, "PATCH", { body, ...init });
  }

  public delete(path: string, body?: BodyInit, init?: Init): Promise<Response> {
    return this.perform(path, "DELETE", { body, ...init });
  }

  public head(path: string, body?: BodyInit, init?: Init): Promise<Response> {
    return this.perform(path, "HEAD", { body, ...init });
  }
}
