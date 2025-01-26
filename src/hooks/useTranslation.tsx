import { useContext } from "react"
import { LocalizationContext } from "../context/localizationContext/LocalizationContext"
import { translate } from "../locales/Locales"

interface UseTranslation {
  t: (key: string) => string
}

export function useTranslation(): UseTranslation {
  const { currentLanguage } = useContext(LocalizationContext)

  const t = (key: string): string => {
    return translate(currentLanguage, key)
  }

  return { t }
}