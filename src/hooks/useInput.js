import { useState } from "react";

const useInput = (initialValue = "") => {
  const [value, setValue] = useState(initialValue);

  const handler = (e) => {
    setValue(e.target.value);
  };

  const reset = () => {
    setValue(initialValue);
  }

  return [value, handler, reset];
};

export default useInput;
