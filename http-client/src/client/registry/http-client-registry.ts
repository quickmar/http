import { RequestBuilder } from "../../request-builder/request-builder";
import { HttpClientBaseRegistry } from "./http-client-base-registry";

export class HttpClientRegistry extends HttpClientBaseRegistry<RequestBuilder> {
    public createBuilder(baseUrl: string): RequestBuilder {
        return RequestBuilder.create(baseUrl);
    }
}