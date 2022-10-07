export abstract class AbstractUrlBuilder<T> {
  #url: URL;

  constructor(baseUrl: string, path = "") {
    this.#url = new URL(path, baseUrl);
  }

  public abstract clone(path?: string): this;

  public abstract build(): T;

  addPath(path: string): this {
    return this.clone(path);
  }

  addSearchParam(name: string, value: string): this {
    this.#url.searchParams.append(name, value);
    return this;
  }

  addDistinctSearchParam(name: string, value: string): this {
    this.#url.searchParams.set(name, value);
    return this;
  }

  updateURLVariables(...entries: [string, string][]): this {
    let pathname = this.#url.pathname;
    for (const entry of entries) {
      const [variable, value] = entry;
      if (pathname && pathname.includes(variable)) {
        pathname = pathname.replace(variable, value);
      }
    }
    this.#url = new URL(pathname, this.#url.origin);
    return this;
  }

  toString(): string {
    return this.#url.toString();
  }
}
