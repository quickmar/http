import { RequestBuilder } from "../request-builder/request-builder";
import { Init, JSONInit } from "../utils/types";
import { AbstractHttpClient } from "./http-client.abstract";
import { HttpClientBaseRegistry } from "./registry/http-client-base-registry";

export class HttpJSONClient extends AbstractHttpClient<RequestBuilder> {
  constructor(baseRegistry: HttpClientBaseRegistry<RequestBuilder>) {
    super(baseRegistry);
  }
  
  public async delete<T, R>(path: string, body?: T, init?: Init) {
    const serializedObj = await this.serialize(body);
    return this.perform<R>(path, "DELETE", { body: serializedObj, ...init });
  }

  public async get<T>(path: string, init?: Init) {
    return this.perform<T>(path, "GET", init)
  }

  public async head<T, R>(path: string, body?: T, init?: Init) {
    const serializedObj = await this.serialize(body);
    return this.perform<R>(path, "HEAD", { body: serializedObj, ...init });
  }

  public async patch<T, R>(path: string, body?: T, init?: Init) {
    const serializedObj = await this.serialize(body);
    return this.perform<R>(path, "PATCH", { body: serializedObj, ...init });
  }

  public async post<T, R>(path: string, body?: T, init?: Init) {
    const serializedObj = await this.serialize(body);
    return this.perform<R>(path, "POST", { body: serializedObj, ...init });
  }

  public async put<T, R>(path: string, body?: T, init?: Init) {
    const serializedObj = await this.serialize(body);
    return this.perform<R>(path, "PUT", { body: serializedObj, ...init });
  }

  protected override perform<R>(path: string, method: string, init?: JSONInit) {
      return super.perform(path, method, init).then((res) => res.json()) as Promise<R>
  }

  protected serialize<T>(obj: T): Promise<string> {
    return Promise.resolve(obj).then(JSON.stringify);
  }
}
