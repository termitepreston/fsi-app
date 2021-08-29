import { useCallback, useEffect, useState } from "react";

export type Status = "idle" | "pending" | "success" | "error";

// expample of async function i want to use:
// async function fetchTrack(id: number, format: string): Track | Error
// where Track = { src: string, id: nubmer, hq: boolean }
// and Error implement the Error interface of standard js.
// So, useAsync needs to be parameterized by two generic types.
export function useAsync<T, E, A>(
  fn: (args: A) => Promise<T>,
  args: A,
  immediate: boolean = false
) {
  const [status, setStatus] = useState<Status>("idle");
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<E | null>(null);

  const execute = useCallback(
    (args: A) => {
      setStatus("pending");
      fn(args)
        .then((data) => {
          setStatus("success");
          setData(data);
        })
        .catch((error) => {
          setStatus("error");
          setError(error);
        });
    },
    [fn]
  );

  useEffect(() => {
    if (immediate) {
      execute(args);
    }
  }, [immediate, execute]);

  return { execute, status, data, error };
}
