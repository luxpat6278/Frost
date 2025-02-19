import { useContext } from "react";
import { LocalizationContext } from "../contexts/localizationContext/LocalizationContext";
import { translate } from "../locales/locales";

interface TranslationHook {
  t: (key: string) => string;
}

export function useTranslation(): TranslationHook {
  const { currentLanguage } = useContext(LocalizationContext);

  if (!currentLanguage) {
    throw new Error("useTranslation must be used within a LocalizationProvider");
  }

  return {
    t: (key: string) => translate(currentLanguage, key),
  };
}
