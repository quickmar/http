import { RequestBuilder } from "../request-builder/request-builder";
import { Init } from "../utils/types";
import { intRequestBuilder } from "../utils/util";
import { DefaultTransformer } from "./path-variable/default-transformer";
import { HttpClientBaseRegistry } from "./registry/http-client-base-registry";

export abstract class AbstractHttpClient<T extends RequestBuilder> {
  #registry: HttpClientBaseRegistry<T>;
  #pathsTransformer: DefaultTransformer;

  public get url(): string {
    return this.#registry.url;
  }

  constructor(registry: HttpClientBaseRegistry<T>) {
    this.#registry = registry;
    this.#pathsTransformer = new DefaultTransformer();
  }

  public abstract delete(
    path: string,
    body?: BodyInit,
    init?: Init
  ): Promise<Response>;

  public abstract get(path: string, init?: Init): Promise<Response>;

  public abstract head(
    path: string,
    body?: BodyInit,
    init?: Init
  ): Promise<Response>;

  public abstract patch(
    path: string,
    body?: BodyInit,
    init?: Init
  ): Promise<Response>;

  public abstract post(
    path: string,
    body: BodyInit,
    init?: Init
  ): Promise<Response>;

  public abstract put(
    path: string,
    body?: BodyInit,
    init?: Init
  ): Promise<Response>;

  protected async perform(
    path: string,
    method: string,
    init?: RequestInit
  ): Promise<Response> {
    const pathAndEntries = this.#pathsTransformer.transform(path);
    const builder = this.#registry.getBuilder(pathAndEntries.path);

    builder.updateURLVariables(...pathAndEntries.entries);
    builder.addMethod(method);
    
    if (init) {
      intRequestBuilder(builder, init);
    }
    return builder.fetch();
  }
}
