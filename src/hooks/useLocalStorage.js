import { useState, useEffect } from "react";

function getStorageValue(key, defaultValue) {
  // getting stored value
  if (typeof window == "undefined") {
    return defaultValue;
  }
  const saved = localStorage.getItem(key);
  const initial = saved !== null ? JSON.parse(saved) : defaultValue;
  return initial;
}

export const useLocalStorage = (key, defaultValue) => {
  const [value, setValue] = useState(() => {
    return getStorageValue(key, defaultValue);
  });

  useEffect(() => {
    // storing input key
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}; 