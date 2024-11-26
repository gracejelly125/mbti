import { useState } from "react";

const useInput = (initialValue = "") => {
  const [value, setValue] = useState(initialValue);

  const reset = () => {
    setValue(initialValue);
  };

  const handler = (e) => {
    setValue(e.target.value);
  };

  return { value, handler, reset };
};

export default useInput;
