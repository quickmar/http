import { PathAndEntries } from "../../utils/types";

export class DefaultTransformer {
  private equals = "=";
  private open = "{{";
  private close = "}}";
  private openTag = "%7B%7B";
  private closeTag = "%7D%7D";

  transform(pathname: string): PathAndEntries {
    const pathAndEntries: PathAndEntries = {
      path: pathname,
      entries: [],
    };

    const paths = pathname.split("/");
    for (const path of paths) {
      if (
        path.includes(this.open) &&
        path.includes(this.equals) &&
        path.includes(this.close)
      ) {
        const [left, right] = path.split(this.equals);
        const variable = left.replace(this.open, "");
        const value = right.replace(this.close, "");

        pathAndEntries.path = pathAndEntries.path.replace(
          path,
          `{{${variable}}}`
        );

        pathAndEntries.entries.push([
          `${this.openTag}${variable}${this.closeTag}`,
          value,
        ]);
      }
    }
    return pathAndEntries;
  }
}
