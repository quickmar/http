import { describe, expect, it, beforeEach } from "vitest";

import { UrlBuilder } from "../../src/url-builder/url-builder";

describe("URL builder", () => {
  let urlBuilder: UrlBuilder;

  beforeEach(() => {
    urlBuilder = UrlBuilder.create("https://test.ts");
  });

  it("should create", () => {
    expect(urlBuilder).toBeTruthy();
  });

  it("should create URL", () => {
    expect(urlBuilder.build()).toBeInstanceOf(URL);
  });

  it("should create clone", () => {
    expect(urlBuilder.clone()).not.toBe(urlBuilder);
    expect(urlBuilder.clone()).toEqual(urlBuilder);
  });

  it("should add path", () => {
    // when
    const newPath = urlBuilder.addPath("newPath");

    // then
    expect(newPath).not.toBe(urlBuilder);
    expect(newPath.toString()).toEqual("https://test.ts/newPath");
  });

  it("should add search param", () => {
    // when
    urlBuilder.addSearchParam("builder", "test");

    // then
    expect(urlBuilder.build().searchParams.toString()).toEqual("builder=test");
  });

  it("should distinct search params", () => {
    // when
    urlBuilder.addDistinctSearchParam("builder", "test");
    urlBuilder.addDistinctSearchParam("builder", "test");

    // then
    expect(urlBuilder.build().searchParams.toString()).toEqual("builder=test");
  });

  it("should replace path", () => {
    // given
      const newPathVariable = urlBuilder.addPath("newPath").addPath("variable");

    // when
    const changedVariable = newPathVariable.clone().updateURLVariables(["variable", "changedVariable"])
    // then
    expect(urlBuilder.build().pathname).not.toBe(changedVariable.build().pathname);
    expect(changedVariable.build().pathname).not.toBe("/newPath/changedVariable");
  });
});
