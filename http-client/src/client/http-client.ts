import { RequestBuilder } from "../request-builder/request-builder";
import { AbstractHttpClient } from "./http-client.abstract";

export class HttpClient extends AbstractHttpClient<RequestBuilder> {
  #baseSearchParam: URLSearchParams;
  #paths: Map<string, () => RequestBuilder> = new Map();
  #baseBuilder: RequestBuilder;

  public get url(): string {
    return this.#baseBuilder.toString();
  }

  constructor(baseUrl: RequestBuilder | string) {
    super();
    this.#baseBuilder = typeof baseUrl === "string" ?  RequestBuilder.create(baseUrl) : baseUrl;
    this.#baseSearchParam = new URL("", this.url).searchParams;
  }

  public hasPath(path: string): boolean {
    return this.#paths.has(path)
  }

  public registerPath(path: string, builderFn?: (baseBuilder: RequestBuilder) => RequestBuilder): void {
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

  public getBuilder(path: string): RequestBuilder {
    const supplierFn = this.#paths.get(path);
    if (supplierFn) return supplierFn();
    throw new Error(`Path "${path}" could not be found!`);
  }

  public getRequest(path: string): Request {
    return this.getBuilder(path).build();
  }
}
