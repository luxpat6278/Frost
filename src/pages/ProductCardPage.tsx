import Header from "../components/header/Header"
import Footer from "../components/footer/Footer"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"
import ProductDetails from "../components/productDetails/ProductDetails"
import { useDispatch, useSelector } from "react-redux"
import { setLoading } from "../slices/loadingSlice"

function ProductCardPage() {
  const params = useParams()
  const [productCardData, setProductCardData] = useState([])
  const [reviews, setReviews] = useState([])
  const dispatch = useDispatch()
  const isLoading = useSelector((state) => state.loading.isLoading)

  // Запрос на получение данных о товаре
  useEffect(() => {
    const fetchProductData = async () => {
      try {
        dispatch(setLoading(true))
        const response = await axios.get(`https://frost.runtime.kz/api/products/${params.productId}`)

        const productData = {
          id: response.data.id,
          name: response.data.name,
          code: response.data.code,
          manufacturer: response.data.manufacturer,
          description: response.data.description,
          price: response.data.price,
          available: response.data.available,
          brand: response.data.brand.name,
          model: response.data.model.name,
          generation: response.data.generation.name,
        }

        setProductCardData(productData)
        dispatch(setLoading(false))
      } catch (error) {
        console.error(error)
        dispatch(setLoading(false))
      }
    }

    fetchProductData()
  }, [params.productId, dispatch])

  // Запрос на получение отзывов
  const updateReviews = function () {
    axios
      .get(`https://frost.runtime.kz/api/reviews?productId=${params.productId}`)
      .then(function (response) {
        setReviews(response.data)
      })
      .catch((error) => console.error(error))
  }

  useEffect(() => {
    updateReviews()
  }, [params.productId]) // Обновление отзывов при изменении productId

  return (
    <div className="main-page-container">
      <Header />

      <div className="product-card-component dark:bg-[#393939]">
        <ProductDetails
          productCardData={productCardData}
          reviewData={reviews}
          updateReviews={updateReviews}
          isLoading={isLoading}
        />
      </div>

      <Footer />
    </div>
  )
}

export default ProductCardPage
