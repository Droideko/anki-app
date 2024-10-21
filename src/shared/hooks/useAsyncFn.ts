import { DependencyList, useCallback, useRef, useState } from "react";
import { useMountedState } from "./useMountedState";

export type FunctionReturningPromise<T = any> = (...args: any[]) => Promise<T>;
export type PromiseType<T> = T extends Promise<infer U> ? U : never;

export type AsyncState<T> =
  | { loading: boolean; error?: undefined; value?: undefined }
  | { loading: true; error?: Error | undefined; value?: T }
  | { loading: false; error: Error; value?: undefined }
  | { loading: false; error?: undefined; value: T };

export type StateFromFunctionReturningPromise<
  T extends FunctionReturningPromise
> = AsyncState<PromiseType<ReturnType<T>>>;

export type AsyncFnReturn<T extends FunctionReturningPromise> = [
  StateFromFunctionReturningPromise<T>,
  T
];

export function useAsyncFn<T extends FunctionReturningPromise>(
  fn: T,
  deps: DependencyList = [],
  initialState: StateFromFunctionReturningPromise<T> = { loading: false }
): AsyncFnReturn<T> {
  const lastCallId = useRef<number>(0);
  const isMounted = useMountedState();
  const [state, setState] =
    useState<StateFromFunctionReturningPromise<T>>(initialState);

  const callback = useCallback((...args: Parameters<T>): ReturnType<T> => {
    const callId = ++lastCallId.current;

    if (!state.loading) {
      setState((prevState) => ({ ...prevState, loading: true }));
    }

    const promise = fn(...args);

    promise.then(
      (value) => {
        if (isMounted() && callId === lastCallId.current) {
          setState({ value, loading: false });
        }
        return value;
      },
      (error) => {
        if (isMounted() && callId === lastCallId.current) {
          setState({ error, loading: false });
        }
        return error;
      }
    );

    return promise as ReturnType<T>;
  }, deps);

  return [state, callback as unknown as T];
}
