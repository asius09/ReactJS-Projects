import React, { useContext, useState, createContext, useEffect } from "react";
import fetchFeatureFlags from "./data";

export const FeatureFlagsContext = createContext();

const FeatureFlagsProvider = ({ children }) => {
  const [flags, setFlags] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadFeatureFlags = async () => {
      try {
        const response = await fetchFeatureFlags();
        setFlags(response);
      } catch (error) {
        setError("Failed to fetch feature flags");
        console.error("Failed to fetch feature flags:", error);
      } finally {
        setLoading(false);
      }
    };
    loadFeatureFlags();
  }, []);

  return (
    <FeatureFlagsContext.Provider value={{ flags, loading, error }}>
      {children}
    </FeatureFlagsContext.Provider>
  );
};

const useFeatureFlags = () => {
  const context = useContext(FeatureFlagsContext);
  if (!context) {
    throw new Error("useFeatureFlags must be used within a FeatureFlagsProvider");
  }
  return context;
};

export { useFeatureFlags, FeatureFlagsProvider };
