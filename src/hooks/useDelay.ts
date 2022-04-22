import { useEffect, useMemo, useRef } from "react";

export type UseDelayState = [Promise<boolean>, () => void];

export default function useDelay(msecs: number): UseDelayState {
  const delayRef = useRef<ReturnType<typeof setTimeout>>();

  const abc = useMemo<AbortController>(() => new AbortController(), []);
  const prom: Promise<boolean> = useMemo(
    () =>
      new Promise(
        (resolve) =>
          (delayRef.current = setTimeout(() => {
            delayRef.current = undefined;
            resolve(!abc.signal.aborted);
          }, msecs))
      ),
    []
  );

  useEffect(() => {
    // cleanup
    return () => {
      console.log("useDelay.ts unmounted");
      abc.abort();
      delayRef.current && clearTimeout(delayRef.current);
      delayRef.current = undefined;
    };
  }, []);

  function cancel() {
    if (abc.signal.aborted) {
      return;
    }
    console.log("useDelay: canceled");
    abc.abort();
  }

  return [prom, cancel];
}
