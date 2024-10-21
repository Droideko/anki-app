import { DependencyList, useEffect } from "react";
import {
  useAsyncFn,
  FunctionReturningPromise,
  StateFromFunctionReturningPromise,
} from "./useAsyncFn";

export function useAsync<T extends FunctionReturningPromise>(
  fn: T,
  deps: DependencyList = []
): StateFromFunctionReturningPromise<T> {
  const [state, callback] = useAsyncFn(fn, deps, {
    loading: true,
  });

  useEffect(() => {
    callback();
  }, [callback]);

  return state;
}
