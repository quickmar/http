import { AbstractUrlBuilder } from './url-builder.abstract';

export class UrlBuilder extends AbstractUrlBuilder<URL> {
  static create(baseUrl: string, path?: string): UrlBuilder {
    return new this(baseUrl, path);
  }

  constructor(baseUrl: string, path: string = '') {
    super(baseUrl, path);
  }

  protected create(baseUrl: string, path: string): this {
    return UrlBuilder.create(baseUrl, path) as this;
  }

  public build(): URL {
    return new URL('', super.toString());
  }
}
