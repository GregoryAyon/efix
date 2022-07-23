import React, { createContext, useState } from "react";

const LoadingContext = createContext();

export const LoadingProvidor = ({ children }) => {
  const [loading, setLoading] = useState(false);
  return (
    <LoadingContext.Provider
      value={{
        loading,
        setLoading,
      }}
    >
      {children}
    </LoadingContext.Provider>
  );
};

export default LoadingContext;
