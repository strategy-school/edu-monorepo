import { useCallback, useRef } from 'react';

const useDebounce = (
  callback: (...args: Record<string, unknown>[]) => void,
  delay: number,
) => {
  const timer = useRef<NodeJS.Timeout>();

  const debouncedCallback = useCallback(
    (...args: Record<string, unknown>[]) => {
      if (timer.current) {
        clearTimeout(timer.current);
      }

      timer.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay],
  );

  return debouncedCallback;
};

export default useDebounce;
