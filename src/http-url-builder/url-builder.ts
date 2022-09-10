import { AbstractUrlBuilder } from './url-builder.abstract';

export class UrlBuilder extends AbstractUrlBuilder {
  static create(baseUrl: string): UrlBuilder {
    return new UrlBuilder(baseUrl);
  }

  constructor(baseUrl: string, path: string = '') {
    super(baseUrl, path);
  }

  protected create(baseUrl: string, path: string): this {
    return UrlBuilder.create(`${baseUrl}${path}`) as this;
  }
}
