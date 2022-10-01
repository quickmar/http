import { RequestBuilder } from '../request-builder/request-builder';

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
  builder
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
