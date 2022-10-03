import { RequestBuilder } from "../request-builder/request-builder";

export abstract class AbstractHttpClient<T extends RequestBuilder> {
  #baseUrl: T;
  #baseSearchParam: URLSearchParams;
  #paths: Map<string, () => T> = new Map();

  constructor(baseUrl: T) {
    this.#baseUrl = baseUrl;
    this.#baseSearchParam = new URL("", this.#baseUrl.toString()).searchParams;
  }

  public hasPath(path: string): boolean {
    return this.#paths.has(path)
  }

  public registerPath(path: string, builderFn?: (baseBuilder: T) => T): void {
    const httpClientBuilder = this.#baseUrl.clone(path);
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

  get url(): string {
    return this.#baseUrl.toString();
  }
}