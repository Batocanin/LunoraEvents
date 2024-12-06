import { useEffect, useState } from "react";

function useDebounce<T>(value: T, delay: number = 250) {
  const [debounceValue, setDebounceValue] = useState<T>(value);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebounceValue(value);
    }, delay);

    return () => clearTimeout(timeout);
  }, [value, delay]);

  return debounceValue;
}

export default useDebounce;
