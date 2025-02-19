import { useState, MouseEventHandler } from "react";
import "./ButtonStandard.css";


interface ButtonStandardProps {
  name: string;
  clickHandler: MouseEventHandler<HTMLButtonElement>;
  isDisabled?: boolean; 
  className?: string; 
}

const ButtonStandard: React.FC<ButtonStandardProps> = ({
  name,
  clickHandler,
  isDisabled = false,
  className = "",
}) => {
  const [isActive, setIsActive] = useState(false);

  const handleMouseDown = () => {
    setIsActive(true);
  };

  const handleMouseUp = () => {
    setIsActive(false);
  };

  const handleMouseLeave = () => {
    setIsActive(false); 
  };

  return (
    <button
      type="button"
      className={`button-standard ${isActive ? "active" : ""} ${className}`}
      onClick={clickHandler}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      disabled={isDisabled}
    >
      {name}
    </button>
  );
};

export default ButtonStandard;
