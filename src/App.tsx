import { Outlet, useParams } from "react-router-dom"
import { useContext, useEffect } from "react"
import { LocalizationContext } from "./contexts/localizationContext/LocalizationContext"
import { APP_LOCALES } from "./locales/locales"

interface Params {
  locale: string | undefined
}

function App() {
  const { currentLanguage, setCurrentLanguage } = useContext(LocalizationContext)
  const { locale } = useParams<Params>() // Используем типизацию для useParams

  useEffect(() => {
    if (locale) {
      const validLocale = APP_LOCALES.find((lang) => lang.serviceName === locale)
      if (validLocale && validLocale.serviceName !== currentLanguage) {
        setCurrentLanguage(locale)
      }
    }
  }, [locale, currentLanguage, setCurrentLanguage])

  return (
    <>
      {/* Рендер дочерних компонентов */}
      <Outlet />
    </>
  )
}

export default App
