import Modal from "../../../ui/modal/Modal";
import ButtonStandard from "../../../ui/buttonStandard/ButtonStandard";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import "./AddProductModal.css";
import { useTranslation } from "../../../hooks/useTranslation";

// Типы пропсов
interface AddProductModalProps {
  isOpen: boolean;
  close: () => void;
  newProductName: string;
  newProductPrice: number;
  newProductId: number;
}

function AddProductModal({
  isOpen,
  close,
  newProductName,
  newProductPrice,
  newProductId,
}: AddProductModalProps) {
  const user = useSelector((state: any) => state.auth.user); // Можно улучшить типизацию, если есть интерфейс состояния auth
  const [counter, setCounter] = useState<number>(1);

  // useTranslation
  const { t } = useTranslation();

  useEffect(() => {
    if (isOpen) {
      setCounter(1);
    }
  }, [isOpen]);

  function clickHandler() {
    axios
      .get(`https://frost.runtime.kz/api/cart/add?productId=${newProductId}&count=${counter}`)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => console.error(error));
    close();
  }

  function increase() {
    setCounter(counter + 1);
  }

  function decrease() {
    if (counter > 1) {
      setCounter(counter - 1);
    }
  }

  return (
    <div className="modal-containe">
      <Modal open={isOpen} close={close}>
        <div className="modal-content-top dark:bg-[#252525]">
          <span>{t("addProductAddingToCart")}</span>
        </div>

        <div className="modal-content-center dark:bg-[#252525]">
          <div className="modal-content-name">{newProductName}</div>

          <div className="modal-content-quantity">
            <button className="modal-content-button dark:bg-[#252525]" onClick={decrease}>
              -
            </button>
            {counter}
            <button className="modal-content-button dark:bg-[#252525]" onClick={increase}>
              +
            </button>
          </div>

          <div className="modal-content-price">{`${(newProductPrice * counter).toLocaleString(
            "ru-RU"
          )} ₸`}</div>
        </div>

        <div className="modal-content-bottom dark:bg-[#252525]">
          <ButtonStandard
            name={t("addToCartButton")}
            className="productInCartModal"
            clickHandler={clickHandler}
            isDisabled={!user}
          />

          <span className="continue-shopping dark:text-white" onClick={close}>
            {t("addProductContinueShopping")}
          </span>
        </div>
      </Modal>
    </div>
  );
}

export default AddProductModal;
