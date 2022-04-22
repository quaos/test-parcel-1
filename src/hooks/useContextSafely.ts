import { Context, useContext } from "react";

export function useContextSafely<T>(context: Context<T | undefined>): T {
  const values = useContext(context);
  if (typeof values === "undefined" || values === null) {
    throw new Error("Provider not found for Context:" + context.displayName);
  }

  return values;
}
