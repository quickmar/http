import { CacheRequestBuilder } from '../http-request-builder/cache-request-builder';
import { CallbleRequestBuilder } from '../http-request-builder/callable-request-builder';
import { RequestBuilder } from '../http-request-builder/request-builder';
import { UrlBuilder } from '../http-url-builder/url-builder';

export interface HttpClient {
  prepareURL(): UrlBuilder;

  createRequest(): RequestBuilder;

  prepareAndFetch(): CallbleRequestBuilder;

  prepareCacheRequest(): CacheRequestBuilder;
}

export class HttpClientImpl implements HttpClient {
  constructor(private baseUrl: string) {}

  prepareURL(): UrlBuilder {
    return UrlBuilder.create(this.baseUrl);
  }

  createRequest(): RequestBuilder {
    return new RequestBuilder();
  }

  prepareAndFetch(): CallbleRequestBuilder {
    return new CallbleRequestBuilder();
  }

  prepareCacheRequest(): CacheRequestBuilder {
    return new CacheRequestBuilder();
  }
}
