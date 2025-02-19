import React, { useState } from "react"
import { useSelector } from "react-redux"
import Header from "../components/header/Header"
import Footer from "../components/footer/Footer"
import CartRoute from "../ui/cartRoute/CartRoute"
import CartComponent from "../components/cartRouteComponents/cartComponent/CartComponent"
import ContactDetails from "../components/cartRouteComponents/contactDetails/ContactDetails"
import DeliveryDetails from "../components/cartRouteComponents/deliveryDetails/DeliveryDetails"
import OrderComplete from "../components/cartRouteComponents/orderComplete/OrderComplete"
import UserProfile from "./UserProfile"
import { useTranslation } from "../hooks/useTranslation"

// Типы для данных заказа
interface OrdersData {
  phone: string
  area: string
  city: string
  street: string
  house: string
  apartment: string
}

// Типы для сообщений об ошибках
interface ErrorMessages {
  apartment: string
  area: string
  city: string
  house: string
  phone: string
  street: string
}

function CartPage() {
  const user = useSelector((state: any) => state.auth.user)
  const totalCount = useSelector((state: any) => state.counter.counter)

  const [currentComponent, setCurrentComponent] = useState<string>("cart")
  const [orderNumber, setOrderNumber] = useState<string | null>(null)

  const [ordersData, setOrdersData] = useState<OrdersData>({
    phone: "",
    area: "",
    city: "",
    street: "",
    house: "",
    apartment: "",
  })

  const [errorMessages, setErrorMessages] = useState<ErrorMessages>({
    apartment: "",
    area: "",
    city: "",
    house: "",
    phone: "",
    street: "",
  })

  const renderContent = function () {
    if (isProfilePage) {
      return <UserProfile />
    }

    if (currentComponent === "cart") {
      return <CartComponent setCurrentComponent={setCurrentComponent} />
    } else if (currentComponent === "contacts") {
      return (
        <ContactDetails
          setCurrentComponent={setCurrentComponent}
          ordersData={ordersData}
          setOrdersData={setOrdersData}
          errorMessages={errorMessages}
        />
      )
    } else if (currentComponent === "delivery") {
      return (
        <DeliveryDetails
          setCurrentComponent={setCurrentComponent}
          ordersData={ordersData}
          setOrdersData={setOrdersData}
          setOrderNumber={setOrderNumber}
          errorMessages={errorMessages}
          setErrorMessages={setErrorMessages}
        />
      )
    } else if (currentComponent === "final") {
      return (
        <OrderComplete
          setCurrentComponent={setCurrentComponent}
          ordersData={ordersData}
          setOrdersData={setOrdersData}
          orderNumber={orderNumber}
          setIsProfilePage={setIsProfilePage}
        />
      )
    }
  }

  const [isProfilePage, setIsProfilePage] = useState<boolean>(false)

  const { t } = useTranslation()

  return (
    <div className="main-page-container dark:bg-[#393939]">
      {isProfilePage && user ? (
        <UserProfile />
      ) : (
        <>
          <Header totalCount={totalCount} />

          <div className="cart-route dark:bg-[#393939]">
            <p className="cart-route-text">{t("cartPageHeader")}</p>

            <CartRoute currentComponent={currentComponent} setCurrentComponent={setCurrentComponent} />
          </div>

          {renderContent()}

          <Footer />
        </>
      )}
    </div>
  )
}

export default CartPage
