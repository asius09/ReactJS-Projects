import { useState, useEffect } from "react";

export default function useGithubFetch(username) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!username) return;

    const controller = new AbortController();

    const fetchGithubUser = async () => {
      setLoading(true);
      setError(null);
      setUser(null);

      const url = `https://api.github.com/users/${username}`;
      try {
        const response = await fetch(url, { signal: controller.signal });
        if (!response.ok) {
          throw new Error("User not found");
        }
        const userData = await response.json();
        setUser(userData);
      } catch (error) {
        if (error.name !== "AbortError") {
          setError(error.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchGithubUser();

    return () => {
      controller.abort();
    };
  }, [username]);

  return { user, loading, error };
}
