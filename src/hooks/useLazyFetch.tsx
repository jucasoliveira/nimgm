import { useState } from "react";

interface FetchState<T> {
  data: T | null;
  error: string | null;
  loading: boolean;
  execute: (url: string, options?: RequestInit) => Promise<void>;
}

const useLazyFetch = <T,>(): FetchState<T> => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const execute = async (url: string, options?: RequestInit) => {
    setLoading(true);
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const data: T = await response.json();
      setData(data);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { data, error, loading, execute };
};

export default useLazyFetch;
