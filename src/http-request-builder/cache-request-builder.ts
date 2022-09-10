import { CallbleRequestBuilder } from './callable-request-builder';

export class CacheRequestBuilder extends CallbleRequestBuilder {
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
