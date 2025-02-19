import CartItems from "../../../ui/cartItems/CartItems.js";
import "./CartComponent.css";

interface CartComponentProps {
  setCurrentComponent: (component: string) => void;
}

const CartComponent: React.FC<CartComponentProps> = ({ setCurrentComponent }) => {
  return (
    <div className="cart-menu-container dark:border-[#252525] dark:bg-[#252525]">
      <CartItems setCurrentComponent={setCurrentComponent} />
    </div>
  );
};

export default CartComponent;
