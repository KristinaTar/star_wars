import { useEffect, useState } from "react";

/**
 * Debounce function for delayed filter change
 * @param callback Function which changes filter
 */
export function useDebounce(callback: (value: string) => void) {
  const [value, setValue] = useState("");

  useEffect(() => {
    const delay = 500;
    const timer = setTimeout(() => {
      callback(value);
    }, delay);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return [value, setValue] as const;
}
