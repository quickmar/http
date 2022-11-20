import { describe, expect, it, beforeEach, afterEach, vi, Mock } from "vitest";

import { HttpClientRegistry } from "../../src/client/registry/http-client-registry";
import { HttpClient } from "../../src/client/http-client";


describe("Htpp client", () => {
    let client: HttpClient;
    let registry: HttpClientRegistry;
    let fetchMock: Mock<Parameters<Window["fetch"]>, ReturnType<Window["fetch"]>>;
    let requestPath: string;
    let mockResponse: Response;
    let mockError: TypeError;

    beforeEach(() => {
        registry = new HttpClientRegistry("https://test.ts");
        client = new HttpClient(registry);
    });

    beforeEach(() => {
        fetchMock = vi.fn();
        vi.stubGlobal("fetch", fetchMock);
    });

    afterEach(() => {
        vi.clearAllMocks();
    })

    it("should create", () => {
        expect(client).toBeTruthy();
    })

    it("should call GET", () => {
        // given
        requestPath = "newGETPath";
        mockResponse = new Response();
        prepareToCall()

        // when
        const response = client.get(requestPath)

        // then
        testResolve(response);
    })

    it("should call POST", () => {
        // given
        requestPath = "newPOSTPath";
        mockResponse = new Response();
        prepareToCall()

        // when
        const response = client.post(requestPath);

        // then
        testResolve(response);
    })

    it("should call POST with body", () => {
        // given
        requestPath = "newPOSTPath";
        mockResponse = new Response("TEST Response");
        prepareToCall()

        // when
        const response = client.post(requestPath);

        // then
        testResolve(response);
    })

    it("should throw", () => {
        // given
        requestPath = "newPOSTPath";
        mockError = new TypeError('Test error');
        prepareToThrow();

        // when
        const response = client.get(requestPath)

        // then
        testReject(response);
        testIfFetch();
    })

    function prepareToCall(): void {
        // given
        registry.registerPath(requestPath);
        fetchMock.mockResolvedValue(mockResponse);
    }

    function prepareToThrow(): void {
        // given
        registry.registerPath(requestPath);
        fetchMock.mockRejectedValue(mockError);
    }

    function testIfFetch(): void {
        expect(fetchMock.mock.lastCall?.[0]).to.deep.equal(new Request(`https://test.ts/${requestPath}`));
    }

    function testResolve(res: Promise<Response>): void {
        expect(res).resolves.toBe(mockResponse);
    }

    function testReject(err: Promise<Response>): void {
        expect(err).rejects.toBe(mockError);
    }
});
