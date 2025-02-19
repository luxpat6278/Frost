import React from "react"
import ReactDOM from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import MainPage from "../src/pages/MainPage"
import CartPage from "./pages/CartPage"
import ProductCardPage from "./pages/ProductCardPage"
import "./index.css"
import { Provider as ReduxProvider } from "react-redux"
import { store } from "./store"
import ThemeHandler from "./components/themeHandler/ThemeHandler"
import { LocalizationProvider } from "./contexts/localizationContext/LocalizationContext"
import App from "./App"
import UserProfile from "./pages/UserProfile"

// Типизация для маршрутов
interface Route {
  path: string
  element: JSX.Element
  children?: Route[]
}

const router = createBrowserRouter<Route[]>([
  {
    path: ":locale?",
    element: <App />,
    children: [
      { path: "", element: <MainPage /> },
      { path: "products/:productId", element: <ProductCardPage /> },
      { path: "cart", element: <CartPage /> },
      { path: "account", element: <UserProfile /> },
    ],
  },
])

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <ReduxProvider store={store}>
    <LocalizationProvider>
      <ThemeHandler />
      <RouterProvider router={router} />
    </LocalizationProvider>
  </ReduxProvider>
)
