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

  updateURLVariable(variable: string, value: string): this {
    if (!this.#url.pathname && !this.#url.pathname.includes(variable)) return this;
    this.#url = new URL(this.#url.pathname.replace(variable, value), this.#url.origin);
    return this;
  }

  toString(): string {
    return this.#url.toString();
  }
}
