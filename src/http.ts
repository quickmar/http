import { HttpClient, HttpClientImpl } from './http-client/http-client';

export class Http {
  static newClient(): HttpClient {
    return new HttpClientImpl();
  }
}
