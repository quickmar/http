import { describe, expect, it, beforeEach } from "vitest";

import { HttpClientRegistry } from "../../src/client/registry/http-client-registry";
import { RequestBuilder } from "../../src/request-builder/request-builder";

describe("Http client registry", () => {
  let registry: HttpClientRegistry;

  beforeEach(() => {
    registry = new HttpClientRegistry("https://test.ts");
  });

  it("should create", () => {
    expect(registry).toBeTruthy();
  })

  it("should not have path", () => {
    expect(registry.hasPath("newPath")).toBe(false);
  })

  it("should register path", () => {
    // when
    registry.registerPath("newPath");

    // then
    expect(registry.hasPath("newPath")).toBe(true);
  })

  it("should register path with builder", () => {
    // given
    registry = new HttpClientRegistry(RequestBuilder.create("https://test.ts/"));

    // when
    registry.registerPath("newPath", (rb) => rb.addSearchParam("test", "searchParam"));

    // then
    expect(registry.hasPath("newPath")).toBe(true);
    expect(registry.getBuilder("newPath").URL.toString()).toBe("https://test.ts/newPath?test=searchParam")
  })

  it("should throw error when return other builder then supplied", () => {
    // given
    registry = new HttpClientRegistry("https://test.ts/");
    const throwAction1 = () => registry.registerPath("newPath", (rb) => rb.addPath("otherPath"));
    const throwAction2 = () => registry.registerPath("newPath", () => RequestBuilder.create("https://test.ts/"));
    const errorSup = () => new ReferenceError("Can not register path. Your builder is not the same as given baseBuilder.");

    // then
    expect(throwAction1).toThrow(errorSup());
    expect(throwAction2).toThrow(errorSup());
  })

  it("should not get the path", () => {
    expect(() => registry.getBuilder("newPath")).toThrowError(new Error('Path "newPath" could not be found!'));
  })

  it("should get path", () => {
    // given
    registry.registerPath("newPath");

    // then
    expect(registry.getBuilder("newPath")).to.deep.equal(registry.createBuilder("https://test.ts/newPath/"));
  })

  it("should get request", () => {
    // given
    registry.registerPath("newPath");

    // then
    expect(registry.getRequest("newPath")).to.deep.equal(new Request("https://test.ts/newPath"));
  })
});
