import { RequestBuilder } from './request-builder';

export class CallbleRequestBuilder extends RequestBuilder {
  fetch(): Promise<Response> {
    return fetch(this.build());
  }
}
