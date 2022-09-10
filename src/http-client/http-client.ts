import { CacheRequestBuilder } from '../http-request-builder/cache-request-builder';
import { RequestBuilder } from '../http-request-builder/request-builder';
import { UrlBuilder } from '../http-url-builder/url-builder';

export abstract class HttpClient {
  public abstract URLBuilder(): UrlBuilder;

  public abstract requestBuilder(): RequestBuilder;

  public abstract cacheRequestBuilder(): CacheRequestBuilder;
}

export class HttpClientImpl implements HttpClient {
  constructor(private baseUrl: string) {}

  public URLBuilder(): UrlBuilder {
    return UrlBuilder.create(this.baseUrl);
  }

  public requestBuilder(): RequestBuilder {
    return RequestBuilder.create(this.baseUrl);
  }

  public cacheRequestBuilder(): CacheRequestBuilder {
    return CacheRequestBuilder.create(this.baseUrl);
  }
}
