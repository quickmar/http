import { RequestBuilder } from './request-builder';

export class CacheRequestBuilder extends RequestBuilder {
  static create(baseUrl: string, path?: string): CacheRequestBuilder {
    return new this(baseUrl, path);
  }

  #doBeforeChached: any;
  #doAfterChacheFeched: any;

  addBeferCacheFn(doBeforeChached: any): this {
    this.#doBeforeChached = doBeforeChached;
    return this;
  }

  addAfterCacheFached(doAfterChacheFeched: any): this {
    this.#doAfterChacheFeched = doAfterChacheFeched;
    return this;
  }

  build(): Request {
    const request = super.build();
    return Object.assign(request, {
      doBeforeChached: this.#doBeforeChached,
      doAfterChacheFeched: this.#doAfterChacheFeched,
    });
  }
}
