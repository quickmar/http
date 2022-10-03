import { RequestBuilder } from "../request-builder/request-builder";
import { AbstractHttpClient } from "./http-client.abstract";

export class HttpClient extends AbstractHttpClient<RequestBuilder> {
  constructor(baseUrl: RequestBuilder | string) {
    if (baseUrl instanceof RequestBuilder) {
      super(baseUrl);
    } else {
      super(RequestBuilder.create(baseUrl));
    }
  }
}
