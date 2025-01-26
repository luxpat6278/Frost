import CartItems from "../../../ui/cartItems/CartItems";
import "./CartComponent.css";

interface CartComponentProps {
  setCurrentComponent: (component: string) => void;
}

const CartComponent: React.FC<CartComponentProps> = ({ setCurrentComponent }) => {
  return (
    <div className="cartContainer dark:border-[#252525] dark:bg-[#252525]">
      <CartItems setCurrentComponent={setCurrentComponent} />
    </div>
  );
};

export default CartComponent;