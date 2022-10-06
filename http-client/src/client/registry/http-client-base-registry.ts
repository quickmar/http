import { RequestBuilder } from "../../request-builder/request-builder";
import { AbstractHttpClientRegistry } from "./http-client-registry.abstract";

export abstract class HttpClientBaseRegistry<
  T extends RequestBuilder
> extends AbstractHttpClientRegistry<T> {
  #baseSearchParam: URLSearchParams;
  #paths: Map<string, () => T> = new Map();
  #baseBuilder: T;

  public get url(): string {
    return this.#baseBuilder.toString();
  }

  constructor(baseUrl: T | string) {
    super();
    this.#baseBuilder =
      typeof baseUrl === "string" ? this.createBuilder(baseUrl) : baseUrl;
    this.#baseSearchParam = new URL("", this.url).searchParams;
  }

  protected abstract createBuilder(baseUrl: string): T;

  public hasPath(path: string): boolean {
    return this.#paths.has(path);
  }

  public registerPath(path: string, builderFn?: (baseBuilder: T) => T): void {
    const httpClientBuilder = this.#baseBuilder.clone(path);

    this.#baseSearchParam.forEach((value, key) =>
      httpClientBuilder.addSearchParam(key, value)
    );

    if (builderFn) {
      const userBuilder = builderFn(httpClientBuilder);
      if (httpClientBuilder !== userBuilder) {
        throw new ReferenceError(
          "Can not register path. Your builder is not the same as given baseBuilder."
        );
      }
      const copy = userBuilder.clone();
      this.#paths.set(path, () => copy.clone());
      return;
    }

    this.#paths.set(path, () => httpClientBuilder.clone());
  }

  public getBuilder(path: string): T {
    const supplierFn = this.#paths.get(path);
    if (supplierFn) return supplierFn();
    throw new Error(`Path "${path}" could not be found!`);
  }

  public getRequest(path: string): Request {
    return this.getBuilder(path).build();
  }
}
