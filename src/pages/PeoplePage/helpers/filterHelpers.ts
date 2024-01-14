import { useEffect, useState } from "react";

export function useDebounce(
  callback: (value: string) => void
) {
  const [value, setValue] = useState('');

  useEffect(() => {
    const delay = 500;
    const timer = setTimeout(() => {
      callback(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value]);

  return [value, setValue] as const;
}