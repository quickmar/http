import { AbstractUrlBuilder } from '../http-url-builder/url-builder.abstract';

export class RequestBuilder {
  #requestInit: RequestInit;

  constructor() {
    this.#requestInit = {};
  }

  /** A BodyInit object or null to set request's body. */
  addBody(body: BodyInit): this {
    Object.assign(this.#requestInit, { body });
    return this;
  }
  /** A string indicating how the request will interact with the browser's cache to set request's cache. */
  addCache(cache: RequestCache): this {
    Object.assign(this.#requestInit, { cache });
    return this;
  }
  /** A string indicating whether credentials will be sent with the request always, never, or only when sent to a same-origin URL. Sets request's credentials. */
  addCredentials(credentials: RequestCredentials): this {
    Object.assign(this.#requestInit, { credentials });
    return this;
  }
  /** A Headers object, an object literal, or an array of two-item arrays to set request's headers. */
  addHeaders(headers: HeadersInit): this {
    Object.assign(this.#requestInit, { headers });
    return this;
  }
  /** A cryptographic hash of the resource to be fetched by request. Sets request's integrity. */
  addIntegrity(integrity: string): this {
    Object.assign(this.#requestInit, { integrity });
    return this;
  }
  /** A boolean to set request's keepalive. */
  addKeepalive(keepalive: boolean): this {
    Object.assign(this.#requestInit, { keepalive });
    return this;
  }
  /** A string to set request's method. */
  addMethod(method: string): this {
    Object.assign(this.#requestInit, { method });
    return this;
  }
  /** A string to indicate whether the request will use CORS, or will be restricted to same-origin URLs. Sets request's mode. */
  addMode(mode: RequestMode): this {
    Object.assign(this.#requestInit, { mode });
    return this;
  }
  /** A string indicating whether request follows redirects, results in an error upon encountering a redirect, or returns the redirect (in an opaque fashion). Sets request's redirect. */
  addRedirect(redirect: RequestRedirect): this {
    Object.assign(this.#requestInit, { redirect });
    return this;
  }
  /** A string whose value is a same-origin URL, "about:client", or the empty string, to set request's referrer. */
  addReferrer(referrer: string): this {
    Object.assign(this.#requestInit, { referrer });
    return this;
  }
  /** A referrer policy to set request's referrerPolicy. */
  addReferrerPolicy(referrerPolicy: ReferrerPolicy): this {
    Object.assign(this.#requestInit, { referrerPolicy });
    return this;
  }
  /** An AbortSignal to set request's signal. */
  addSignal(signal: AbortSignal): this {
    Object.assign(this.#requestInit, { signal });
    return this;
  }
  /** Can only be null. Used to disassociate request from any Window. */
  addWindow(window: null): this {
    Object.assign(this.#requestInit, { window });
    return this;
  }

  build(): Request {
    return new Request('', this.#requestInit);
  }
}
