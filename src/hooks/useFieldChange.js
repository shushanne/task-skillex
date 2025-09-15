import { useCallback } from "react";

export default function useFieldChange(setState) {
  return useCallback(
    (field) => (event) => {
      const { value } = event.target;
      setState((prev) => ({
        ...prev,
        [field]: value,
      }));
    },
    [setState]
  );
}
