import { HttpClient, HttpClientImpl } from './src/client/http-client';

export class Http {
  static newClient(baseUrl: string): HttpClient {
    return new HttpClientImpl(baseUrl);
  }
}
