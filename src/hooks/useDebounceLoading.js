import { useState, useEffect } from "react";

export default function useDebouncedLoading(value, delay = 300) {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const timeout = setTimeout(() => setIsLoading(false), delay);
    return () => {
      clearTimeout(timeout);
    };
  }, [value, delay]);

  return isLoading;
}
