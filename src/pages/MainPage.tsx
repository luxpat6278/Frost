import React, { useState } from "react"
import { useDispatch } from "react-redux"
import Header from "../components/header/Header"
import Footer from "../components/footer/Footer"
import FilterSection from "../components/filterSection/FilterSection"
import ProductsGrid from "../components/productsGrid/ProductsGrid"
import PageNavigation from "../components/pageNavigation/PageNavigation"
import { setCurrentPage } from "../slices/filterSlice"
import UserProfile from "./UserProfile"
import Banner from "../ui/banner/Banner"

// Типизация пропсов для PageNavigation
interface PageNavigationProps {
  onPageChange: (pageNumber: number) => void
}

function MainPage() {
  const dispatch = useDispatch()

  // Обработчик смены страницы
  const onPageChange = (pageNumber: number) => {
    dispatch(setCurrentPage(pageNumber))
  }

  // Состояние для профиля
  const [isProfilePage, setIsProfilePage] = useState<boolean | undefined>(undefined)

  return (
    <div className={`main-page-container dark:bg-[#393939]`}>
      {isProfilePage ? (
        <UserProfile />
      ) : (
        <>
          <Header />

          {/*<Banner />*/}

          <div className={`products-container`}>
            <FilterSection />
            <ProductsGrid />
            <PageNavigation onPageChange={onPageChange} />
          </div>
          <Footer />
        </>
      )}
    </div>
  )
}

export default MainPage
