import { useEffect } from "react";
import { useSelector } from "react-redux";

interface RootState {
  theme: {
    theme: "light" | "dark"; // Указываем возможные значения темы
  };
}

function ThemeHandler() {
  const theme = useSelector((state: RootState) => state.theme.theme);

  useEffect(() => {
    if (theme === "dark") {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [theme]);

  return null;
}

export default ThemeHandler;
