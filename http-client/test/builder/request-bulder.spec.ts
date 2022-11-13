import { describe, expect, it, beforeEach, vi, Mock } from "vitest";

import { RequestBuilder } from "../../src/request-builder/request-builder";

describe("URL builder", () => {
  let requestBuilder: RequestBuilder;
  let fetchMock: Mock<Parameters<Window["fetch"]>, ReturnType<Window["fetch"]>>;

  beforeEach(() => {
    fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
  });

  beforeEach(() => {
    requestBuilder = RequestBuilder.create("https://test.ts");
    fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
  });

  it("should create", () => {
    expect(requestBuilder).toBeTruthy();
  });

  it("should return url string", () => {
    expect(requestBuilder.toString()).toBe("https://test.ts/");
  });

  it("should create clone", () => {
    // given
    const clone = requestBuilder.clone();

    // then
    expect(clone).not.toBe(requestBuilder);
    expect(clone).toEqual(requestBuilder);
  });

  it("should add distinc header", () => {
    // given
    requestBuilder.addDistinctHeader("distinct", "header");
    requestBuilder.addDistinctHeader("distinct", "header");
    const request = requestBuilder.build();

    // then
    expect(request.headers).to.deep.equal(new Headers([["distinct", "header"]]));
  });

  it("should not add Request Init", () => {
    // given
    const request = requestBuilder.build();

    const {
      body,
      bodyUsed,
      cache,
      credentials,
      destination,
      headers,
      integrity,
      keepalive,
      method,
      mode,
      redirect,
      referrer,
      referrerPolicy,
      signal,
      url,
    } = request;

    expect(body).toBeNull();
    expect(bodyUsed).toBe(false);
    expect(cache).toBeUndefined();
    expect(credentials).toBeUndefined();
    expect(destination).toBeUndefined();
    expect(headers).to.deep.equal(new Headers());
    expect(integrity).toBeUndefined();
    expect(keepalive).toBeUndefined();
    expect(method).toBe("GET");
    expect(mode).toBeUndefined();
    expect(redirect).toBe("follow");
    expect(referrer).toBeUndefined();
    expect(referrerPolicy).toBeUndefined();
    expect(signal).toBeNull();
    expect(url).toBe("https://test.ts/");
  });

  it("should add Request Init", () => {
    // given
    const requestInit: RequestInit = {
      body: "TEST BODY",
      cache: "force-cache",
      credentials: "omit",
      headers: new Headers([["test", "header"]]),
      integrity: "test integrity",
      keepalive: true,
      method: "POST",
      mode: "no-cors",
      redirect: "manual",
      referrer: "test referrer",
      referrerPolicy: "unsafe-url",
      signal: new AbortController().signal,
      window: null,
    };

    const builder = RequestBuilder.create(
      "https://test.ts",
      "",
      requestInit
    );

    expect(builder.build()).to.deep.equal(
      new Request("https://test.ts", requestInit)
    );
  });

  it("should fetch", () => {
    // given
    const mockFetch: Mock<Parameters<Window["fetch"]>, ReturnType<Window["fetch"]>> = vi.fn();
    vi.stubGlobal("fetch", mockFetch);

    //when
    requestBuilder.fetch();

    //then
    expect(mockFetch).toBeCalled();
    vi.clearAllMocks();
  });
});
