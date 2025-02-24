import { useState, useEffect } from "react";

export default function useLocalStorage(key, defaultValue) {
  const [value, setValue] = useState(() => {
    let currValue;
    try {
      const item = localStorage.getItem(key);
      currValue = item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.log(error);
      currValue = defaultValue;
    }
    return currValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}
