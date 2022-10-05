import { RequestBuilder } from "../request-builder/request-builder";

export abstract class AbstractHttpClient<T extends RequestBuilder> {

  public abstract get url(): string;
  
  public abstract hasPath(path: string): boolean;

  public abstract registerPath(path: string, builderFn?: (baseBuilder: T) => T): void;

}