export abstract class AbstractUrlBuilder<T> {
  #url: URL;

  constructor(baseUrl: string, path: string = '') {
    this.#url = new URL(path, baseUrl);
  }

  protected abstract create(baseUrl: string, path: string): this;

  public abstract build(): T;

  addPath(path: string): this {
    return this.create(this.toString(), path);
  }

  addSearchParam(name: string, value: string): this {
    this.#url.searchParams.append(name, value);
    return this;
  }

  addDistinctSearchParam(name: string, value: string): this {
    this.#url.searchParams.set(name, value);
    return this;
  }

  toString(): string {
    return this.#url.toString();
  }
}
