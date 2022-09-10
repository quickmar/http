import { AbstractUrlBuilder } from '../http-url-builder/url-builder.abstract';

export class RequestBuilder extends AbstractUrlBuilder<Request> {
  static create(
    baseUrl: string,
    path?: string,
    init?: RequestInit
  ): RequestBuilder {
    const builder = new RequestBuilder(baseUrl, path);
    if (!init) return builder;
    if (init.window === null) builder.addWindow();
    if (init.headers instanceof Headers) {
      init.headers.forEach((key, value) => builder.addHeader(key, value));
    }
    if (init.headers instanceof Array) {
      init.headers.forEach(([key, value]) => builder.addHeader(key, value));
    }

    return builder
      .addBody(init.body)
      .addCache(init.cache)
      .addCredentials(init.credentials)
      .addIntegrity(init.integrity)
      .addKeepalive(init.keepalive)
      .addMethod(init.method)
      .addMode(init.mode)
      .addRedirect(init.redirect)
      .addReferrer(init.referrer)
      .addReferrerPolicy(init.referrerPolicy)
      .addSignal(init.signal);
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
    if (!this.#requestInit.headers) {
      this.#requestInit.headers = new Headers();
    }
    (this.#requestInit.headers as Headers).append(name, value);
    return this;
  }

  addDistinctHeader(name: string, value: string): this {
    if (!this.#requestInit.headers) {
      this.#requestInit.headers = new Headers();
    }
    (this.#requestInit.headers as Headers).set(name, value);
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
    return RequestBuilder.create(baseUrl, path) as this;
  }

  protected build(): Request {
    return new Request(super.toString(), this.#requestInit);
  }
}
