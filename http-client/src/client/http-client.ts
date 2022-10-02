import { CacheRequestBuilder } from '../request-builder/cache-request-builder';
import { RequestBuilder } from '../request-builder/request-builder';
import { UrlBuilder } from '../url-builder/url-builder';

export abstract class HttpClient {
  #baseUrl: URL;

  constructor(baseUrl: string) {
    this.#baseUrl = new URL('', baseUrl);
  }

  public abstract URLBuilder(): UrlBuilder;

  public abstract requestBuilder(): RequestBuilder;

  public abstract cacheRequestBuilder(): CacheRequestBuilder;

  get url(): string {
    return this.#baseUrl.toString();
  }
}

export class HttpClientImpl extends HttpClient {
  constructor(baseUrl: string) {
    super(baseUrl);
  }

  public URLBuilder(): UrlBuilder {
    return UrlBuilder.create(this.url);
  }

  public requestBuilder(): RequestBuilder {
    return RequestBuilder.create(this.url);
  }

  public cacheRequestBuilder(): CacheRequestBuilder {
    return CacheRequestBuilder.create(this.url);
  }
}
