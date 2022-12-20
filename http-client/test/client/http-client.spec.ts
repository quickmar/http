import { describe, expect, it, beforeEach, afterEach, vi, Mock } from "vitest";

import { HttpClientRegistry } from "../../src/client/registry/http-client-registry";
import { HttpClient } from "../../src/client/http-client";
import { Init } from "../../src/utils/types";


describe("Htpp client", () => {
    let client: HttpClient;
    let registry: HttpClientRegistry;
    let fetchMock: Mock<Parameters<Window["fetch"]>, ReturnType<Window["fetch"]>>;
    let requestPath: string;
    let mockResponse: Response;
    let mockError: Error;

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

    it("should update path variable", () => {
        // given
        requestPath = "{{path}}";
        mockResponse = new Response();
        prepareToCall()

        // when
        const response = client.get("{{path=update}}")

        // then
        assertFetchRequest(new Request("https://test.ts/update"));
        testResolve(response);
    })

    it("should update complex path variable", () => {
        // given
        requestPath = "{{path}}/{{path2}}";
        mockResponse = new Response();
        prepareToCall()

        // when
        const response = client.get("{{path=update}}/{{path2=complex}}")

        // then
        assertFetchRequest(new Request("https://test.ts/update/complex"));
        testResolve(response);
    })

    it("should throw when update path variable", () => {
        // given
        requestPath = "{{path}}";
        mockError = new Error(`Path "{{test}}" could not be found!`);
        prepareToCall()

        // when
        const response = client.get("{{test=reject}}");

        // then
        assertFetchRequest(undefined);
        testReject(response)
    })

    it("should call GET", () => {
        requestPath = "newGETPath";
        mockResponse = new Response();

        testMethodPositive('GET');
    })

    it("should call POST", () => {
        requestPath = "newPOSTPath";
        mockResponse = new Response();

        testMethodPositive('POST', 'TEST BODY');
    })

    it("should call PUT", () => {
        requestPath = "newPUTPath";
        mockResponse = new Response();

        testMethodPositive('PUT', 'TEST BODY');
    })

    it("should call PATCH", () => {
        requestPath = "newPATCHPath";
        mockResponse = new Response();

        testMethodPositive('PATCH', 'TEST BODY');
    })

    it("should call DELETE", () => {
        requestPath = "newDELETEPath";
        mockResponse = new Response();

        testMethodPositive('DELETE', 'TEST BODY');
    })

    it("should call HEAD", () => {
        requestPath = "newHEADPath";
        mockResponse = new Response();

        testMethodPositive('HEAD');
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
        assertFetchRequest(new Request(`https://test.ts/${requestPath}`));
    })

    function testMethodPositive(method: string, body?: BodyInit, init?: Init): void {
        // given
        prepareToCall()

        // when
        const response = callMethod(method, body, init);

        // then
        assertFetchRequest(new Request(`${client.url}${requestPath}`, { method, body, ...init }));
        testResolve(response);
    }

    function prepareToCall(): void {
        registry.registerPath(requestPath);
        fetchMock.mockResolvedValue(mockResponse);
    }

    function prepareToThrow(): void {
        registry.registerPath(requestPath);
        fetchMock.mockRejectedValue(mockError);
    }

    function assertFetchRequest(expectedRequest?: Request): void {
        const [request, requestInit] = fetchMock.mock.lastCall ?? [];
        expect(request).to.deep.equal(expectedRequest);
        expect(requestInit).toBeUndefined();
    }

    function testResolve(res: Promise<Response>): void {
        expect(res).resolves.toBe(mockResponse);
    }

    function testReject(err: Promise<Response>): void {
        expect(err).rejects.toEqual(mockError);
    }

    function callMethod(method: string, body?: BodyInit, init?: Init): Promise<Response> {
        switch (method) {
            case "GET": {
                return client.get(requestPath, init);
            }
            case "POST": {
                return client.post(requestPath, body, init);
            }
            case "PUT": {
                return client.put(requestPath, body, init);
            }
            case "PATCH": {
                return client.patch(requestPath, body, init);
            }
            case "DELETE": {
                return client.delete(requestPath, body, init);
            }
            case "HEAD": {
                return client.head(requestPath, init);
            }
            default:
                throw new Error(`Method ${method} not defined!`);
        }

    }
});
