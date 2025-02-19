import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../../ui/productCard/ProductCard";
import "./ProductsGrid.css";
import Spinner from "../../ui/spinner/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../slices/loadingSlice";
import { setTotalPages } from "../../slices/filterSlice";
import { useTranslation } from "../../hooks/useTranslation";

// Типы состояния
interface Product {
  id: number;
  name: string;
  price: number;
}

interface RootState {
  loading: {
    isLoading: boolean;
  };
  filter: {
    selectedBrand: number | null;
    selectedModel: number | null;
    selectedGeneration: number | null;
    available: boolean;
    currentPage: number;
  };
}

function ProductsGrid() {
  const dispatch = useDispatch();
  const isLoading = useSelector((state: RootState) => state.loading.isLoading);
  const selectedBrandId = useSelector((state: RootState) => state.filter.selectedBrand);
  const selectedModelId = useSelector((state: RootState) => state.filter.selectedModel);
  const selectedGenerationId = useSelector((state: RootState) => state.filter.selectedGeneration);
  const available = useSelector((state: RootState) => state.filter.available);
  const currentPage = useSelector((state: RootState) => state.filter.currentPage);
  const [products, setProducts] = useState<Product[]>([]);
  const [isInitialLoad, setIsInitialLoad] = useState<boolean>(true); // Для отслеживания первой загрузки

  const { t } = useTranslation();

  useEffect(() => {
    const fetchProducts = async () => {
      dispatch(setLoading(true));
      setIsInitialLoad(true); // Начинаем загрузку
      try {
        const response = await axios.get("https://frost.runtime.kz/api/products", {
          params: {
            page: currentPage,
            size: 9,
            brandId: selectedBrandId,
            modelId: selectedModelId,
            generationId: selectedGenerationId,
            available: available,
          },
        });

        setProducts(response.data.items);
        dispatch(setTotalPages(response.data.totalPages));
      } catch (error) {
        console.error(error);
      } finally {
        dispatch(setLoading(false));
        setIsInitialLoad(false); // Завершаем загрузку
      }
    };

    fetchProducts();
  }, [currentPage, selectedBrandId, selectedModelId, selectedGenerationId, available, dispatch]);

  return (
    <>
      {isLoading || isInitialLoad ? (
        <div className="products-component-container border-[#cccccc] bg-[#ffffff] dark:border-[#252525] dark:bg-[#252525]">
          <div className="spinner-container">
            <div className="spinner-wrapper">
              <Spinner />
            </div>
          </div>
        </div>
      ) : products.length > 0 ? (
        <div className="products-component-container border-[#cccccc] bg-[#ffffff] dark:border-[#252525] dark:bg-[#252525]">
          <div className="products-component-wrapper">
            {products.map((product) => (
              <ProductCard key={product.id} id={product.id} name={product.name} price={product.price} />
            ))}
          </div>
        </div>
      ) : (
        <div className="empty-products">
          <p>{t("productsGridNotAvailable")}</p>
        </div>
      )}
    </>
  );
}

export default ProductsGrid;
