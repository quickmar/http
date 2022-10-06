import { RequestBuilder } from "../request-builder/request-builder";
import { BodyData, Init } from "../utils/request-int";
import { intRequestBuilder } from "../utils/util";
import { HttpClientBaseRegistry } from "./registry/http-client-base-registry";

export abstract class AbstractHttpClient<T extends RequestBuilder> {
  #registry: HttpClientBaseRegistry<T>;

  public get url(): string {
    return this.#registry.url;
  }

  constructor(registry: HttpClientBaseRegistry<T>) {
    this.#registry = registry;
  }

  public abstract delete(
    path: string,
    body?: BodyData,
    init?: Init
  ): Promise<Response>;

  public abstract get(path: string, init?: Init): Promise<Response>;

  public abstract head(
    path: string,
    body?: BodyData,
    init?: Init
  ): Promise<Response>;

  public abstract patch(
    path: string,
    body?: BodyData,
    init?: Init
  ): Promise<Response>;

  public abstract post(
    path: string,
    body: BodyData,
    init?: Init
  ): Promise<Response>;

  public abstract put(
    path: string,
    body?: BodyData,
    init?: Init
  ): Promise<Response>;

  protected async perform(
    path: string,
    method: string,
    init?: Init
  ): Promise<Response> {
    const builder = this.#registry.getBuilder(path);
    builder.addMethod(method);
    if (init) {
      intRequestBuilder(builder, init);
    }
    return builder.fetch();
  }
}
