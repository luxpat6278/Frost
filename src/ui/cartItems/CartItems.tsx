import React, { useEffect, FC } from "react";
import "./CartItems.css";
import Spinner from "../spinner/Spinner";
import ButtonStandard from "../buttonStandard/ButtonStandard";
import { useDispatch, useSelector } from "react-redux";
import { setTotalCount } from "../../slices/counterSlice";
import { setLoading } from "../../slices/loadingSlice";
import { 
  decreaseCartItems, 
  deleteCartItems, 
  fetchCartItems, 
  increaseCartItems 
} from "../../slices/cartSlice";
import { useTranslation } from "../../hooks/useTranslation";

interface CartItem {
  product: {
    id: string;
    name: string;
    code: string;
    price: number;
  };
  count: number;
}

interface CartItemsProps {
  setCurrentComponent: (component: string) => void;
}

const CartItems: FC<CartItemsProps> = ({ setCurrentComponent }) => {
  const dispatch = useDispatch();

  const isLoading = useSelector((state: any) => state.loading.isLoading);
  const cartItems = useSelector((state: any) => state.cart.cartItems) as CartItem[];

  useEffect(() => {
    dispatch(fetchCartItems())
      .then(() => dispatch(setLoading(false)))
      .catch((error) => {
        console.error(error);
        dispatch(setLoading(false));
      });
  }, [dispatch]);

  useEffect(() => {
    const totalItems = cartItems.reduce((total, item) => total + item.count, 0);
    dispatch(setTotalCount(totalItems));
  }, [cartItems, dispatch]);


  const deleteItem = (productId: string) => {
    dispatch(deleteCartItems(productId));
  };


  const totalAmount = cartItems.reduce((total, item) => total + item.product.price * item.count, 0);


  const increaseQuantity = (productId: string) => {
    dispatch(increaseCartItems(productId));
  };

  const decreaseQuantity = (productId: string) => {
    dispatch(decreaseCartItems(productId));
  };


  const { t } = useTranslation();

  return (
    <>
      {isLoading ? (
        <div className="spinner-container">
          <div className="spinner-wrapper">
            <Spinner />
          </div>
        </div>
      ) : (
        <>
          <span className="cart-text">{t("cartItemsCart")}</span>
          {cartItems.length > 0 ? (
            <>
              <div className="cart-header dark:bg-[#393939]">
                <div className="cart-header-item title">{t("cartItemsItem")}</div>
                <div className="cart-header-item">{t("cartItemsQuantity")}</div>
                <div className="cart-header-item">{t("cartItemsPrice")}</div>
              </div>

              <div className="cart-body">
                {cartItems.map((item) => (
                  <div className="cart-item" key={item.product.id}>
                    <div className="cart-item-column">
                      <div className="cart-item-detail">{item.product.name}</div>

                      <div className="cart-item-bottom">
                        <div className="cart-item-number">
                          {t("cartItemsItemNo")} {item.product.code}
                        </div>

                        <div 
                          className="cart-item-delete"
                          onClick={() => deleteItem(item.product.id)}
                        >
                          {t("cartItemsRemoveItem")}
                        </div>
                      </div>
                    </div>

                    <div className="cart-item-column">
                      <button className="cart-item-btn" onClick={() => decreaseQuantity(item.product.id)}>
                        -
                      </button>
                      {item.count}
                      <button className="cart-item-btn" onClick={() => increaseQuantity(item.product.id)}>
                        +
                      </button>
                    </div>
                    <div className="cart-item-column">
                      {(item.product.price * item.count).toLocaleString("ru-RU")} ₸
                    </div>
                  </div>
                ))}
              </div>

              <div className="cart-footer dark:bg-[#393939]">
                <div className="cart-footer-item">{t("cartItemsTotalPrice")}</div>
                <div className="cart-footer-item"></div>
                <div className="cart-footer-item">{totalAmount.toLocaleString("ru-RU")} ₸</div>
              </div>

              <div className="cart-button-container">
                <ButtonStandard
                  name={t("cartItemsConfirmButton")}
                  className="cartProductList"
                  clickHandler={() => setCurrentComponent("contacts")}
                />
              </div>
            </>
          ) : (
            <div className="empty-cart">
              <span>
                {t("cartItemsEmpty")}
                <a href="/" className="empty-cart-add-products">
                  {t("cartItemsAddItems")}
                </a>
              </span>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default CartItems;