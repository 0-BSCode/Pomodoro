import { useEffect, useState } from "react";

const useLocalStorage = () => {
  const [storage, setStorage] = useState<Storage | undefined>(undefined);
  const setItem = <T,>(key: string, data: T): void => {
    if (typeof data === "string") {
      storage?.setItem(key, data);
    } else {
      storage?.setItem(key, JSON.stringify(data));
    }
  };

  const getItem = (key: string): string | null | undefined => {
    return storage?.getItem(key);
  };

  useEffect(() => {
    if (localStorage) setStorage(localStorage);
  }, [localStorage]);

  return { getItem, setItem };
};

export default useLocalStorage;
