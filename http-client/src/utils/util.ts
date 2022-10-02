import { RequestBuilder } from "../request-builder/request-builder";

export function initHeaders(requestInit: RequestInit): Headers {
  if (!requestInit.headers) {
    requestInit.headers = new Headers();
  }
  return requestInit.headers as Headers;
}

export function intRequestBuilder(
  builder: RequestBuilder,
  init: RequestInit
): void {
  if (!init) return;
  if (init.window === null) builder.addWindow();
  if (init.headers instanceof Headers) {
    init.headers.forEach((key, value) => builder.addHeader(key, value));
  }
  if (init.headers instanceof Array) {
    init.headers.forEach(([key, value]) => builder.addHeader(key, value));
  }
  if (init.body) {
    builder.addBody(init.body);
  }
  if (init.cache) {
    builder.addCache(init.cache);
  }
  if (init.credentials) {
    builder.addCredentials(init.credentials);
  }
  if (init.integrity) {
    builder.addIntegrity(init.integrity);
  }
  if (init.keepalive) {
    builder.addKeepalive(init.keepalive);
  }
  if (init.method) {
    builder.addMethod(init.method);
  }
  if (init.mode) {
    builder.addMode(init.mode);
  }
  if (init.redirect) {
    builder.addRedirect(init.redirect);
  }
  if (init.referrer) {
    builder.addReferrer(init.referrer);
  }
  if (init.referrerPolicy) {
    builder.addReferrerPolicy(init.referrerPolicy);
  }
  if (init.signal) {
    builder.addSignal(init.signal);
  }
}
