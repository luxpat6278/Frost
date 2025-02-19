import React from "react";
import ButtonStandard from "../buttonStandard/ButtonStandard.tsx";
import useModal from "../../hooks/useModal.tsx";
import AddProductModal from "../../components/modals/addProductModal/AddProductModal.tsx";
import "./ProductCard.css";
import { useNavigate } from "react-router-dom";
import engine from "../../images/engine.png";
import engine1 from "../../images/engine1.png";
import engine2 from "../../images/engine2.png";
import engine3 from "../../images/engine3.png";
import engine4 from "../../images/engine4.png";
import { useTranslation } from "../../hooks/useTranslation.tsx";

interface ProductCardProps {
  id: number; // Assuming id is a number
  name: string;
  price: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ id, name, price }) => {
  const navigate = useNavigate();

  // useTranslation hook
  const { t } = useTranslation();

  // useModal hook
  const [isOpenProductInCartModal, openProductInCartModal, closeProductInCartModal] = useModal();

  const handleClick = () => {
    openProductInCartModal();
  };

  // Transition to <ProductCardPage/>
  function productCard() {
    const path = `/products/${id}`;
    navigate(path);
  }

  const imagesArr: Record<number, string> = {
    0: engine,
    1: engine1,
    2: engine2,
    3: engine3,
    4: engine4,
  };

  const productImage = imagesArr[id] || engine;

  return (
    <div className="product-container dark:border-[#393939]">
      <div className="product-wrapper bg-white dark:bg-[#393939]">
        <div className="product-image bg-white dark:bg-[#393939]">
          <img className="engine-image" src={productImage} alt={name} />
        </div>

        <div
          className="ml-2 cursor-pointer text-[#505050] hover:text-[#1c1c1c] hover:underline dark:text-white"
          onClick={productCard}
        >
          {name}
        </div>

        <div className="product-price-container">
          <div className="product-price dark:text-white">
            <b>{price.toLocaleString("ru-RU")} ₸</b>
          </div>

          <ButtonStandard name={t("buyButton")} clickHandler={handleClick} />
        </div>
      </div>

      <AddProductModal
        isOpen={isOpenProductInCartModal}
        close={closeProductInCartModal}
        newProductName={name}
        newProductPrice={price}
        newProductId={id}
      />
    </div>
  );
};

export default ProductCard;