import React, { createContext, useEffect, useState, startTransition, ReactNode } from "react";

interface LocalizationContextType {
  currentLanguage: string;
  setCurrentLanguage: (language: string) => void;
}

export const LocalizationContext = createContext<LocalizationContextType | undefined>(undefined);

interface LocalizationProviderProps {
  children: ReactNode;
}

export const LocalizationProvider: React.FC<LocalizationProviderProps> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState<string>(() => {
    return localStorage.getItem("selectedLanguage") || "ru";
  });

  useEffect(() => {
    startTransition(() => {
      localStorage.setItem("selectedLanguage", currentLanguage);
    });
  }, [currentLanguage]);

  return (
    <LocalizationContext.Provider value={{ currentLanguage, setCurrentLanguage }}>
      {children}
    </LocalizationContext.Provider>
  );
};

