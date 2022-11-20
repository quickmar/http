import { describe, expect, it, beforeEach, vi, Mock, afterEach } from "vitest";

import { RequestBuilder } from "../../src/request-builder/request-builder";

describe("Request builder", () => {
  let requestBuilder: RequestBuilder;
  let fetchMock: Mock<Parameters<Window["fetch"]>, ReturnType<Window["fetch"]>>;

  beforeEach(() => {
    fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
  });

  beforeEach(() => {
    requestBuilder = RequestBuilder.create("https://test.ts");
  });

  afterEach(() => {
    vi.clearAllMocks();
  })

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

    // then
    expect(request).to.deep.equal(new Request("https://test.ts"));
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
      referrer: "https://test.ts/referrer",
      referrerPolicy: "unsafe-url",
      signal: new AbortController().signal,
      window: null,
    };

    const builder = RequestBuilder.create(
      "https://test.ts",
      "",
      requestInit
    );

    // then
    expect(builder.build()).to.deep.equal(
      new Request("https://test.ts", requestInit)
    );
  });

  it("should fetch", () => {
    //when
    requestBuilder.fetch();

    //then
    expect(fetchMock.mock.lastCall?.[0]).to.deep.equal(new Request("https://test.ts"));
    expect(fetchMock.mock.lastCall?.[1]).toBeUndefined();
  });
});
