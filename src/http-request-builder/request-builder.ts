import { AbstractUrlBuilder } from '../http-url-builder/url-builder.abstract';
import { initHeaders, intRequestBuilder } from '../utils/util';

export class RequestBuilder extends AbstractUrlBuilder<Request> {
  static create(
    baseUrl: string,
    path?: string,
    init?: RequestInit
  ): RequestBuilder {
    const builder = new RequestBuilder(baseUrl, path);
    intRequestBuilder(builder, init);
    return builder;
  }

  #requestInit: RequestInit;

  constructor(baseUrl: string, path?: string) {
    super(baseUrl, path);
    this.#requestInit = {};
  }

  addBody(body: BodyInit): this {
    Object.assign(this.#requestInit, { body });
    return this;
  }

  addCache(cache: RequestCache): this {
    Object.assign(this.#requestInit, { cache });
    return this;
  }

  addCredentials(credentials: RequestCredentials): this {
    Object.assign(this.#requestInit, { credentials });
    return this;
  }

  addHeader(name: string, value: string): this {
    initHeaders(this.#requestInit).append(name, value);
    return this;
  }

  addDistinctHeader(name: string, value: string): this {
    initHeaders(this.#requestInit).set(name, value);
    return this;
  }

  addIntegrity(integrity: string): this {
    Object.assign(this.#requestInit, { integrity });
    return this;
  }

  addKeepalive(keepalive: boolean): this {
    Object.assign(this.#requestInit, { keepalive });
    return this;
  }

  addMethod(method: string): this {
    Object.assign(this.#requestInit, { method });
    return this;
  }

  addMode(mode: RequestMode): this {
    Object.assign(this.#requestInit, { mode });
    return this;
  }

  addRedirect(redirect: RequestRedirect): this {
    Object.assign(this.#requestInit, { redirect });
    return this;
  }

  addReferrer(referrer: string): this {
    Object.assign(this.#requestInit, { referrer });
    return this;
  }

  addReferrerPolicy(referrerPolicy: ReferrerPolicy): this {
    Object.assign(this.#requestInit, { referrerPolicy });
    return this;
  }

  addSignal(signal: AbortSignal): this {
    Object.assign(this.#requestInit, { signal });
    return this;
  }

  addWindow(): this {
    Object.assign(this.#requestInit, { window: null });
    return this;
  }

  protected create(baseUrl: string, path: string): this {
    return RequestBuilder.create(baseUrl, path, this.#requestInit) as this;
  }

  protected build(): Request {
    return new Request(super.toString(), this.#requestInit);
  }
}
