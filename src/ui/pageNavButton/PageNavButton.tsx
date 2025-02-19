import "./PageNavButton.css";

interface PageNavButtonProps {
  index: number;
  clickHandler: () => void;
  isActive: boolean;
}

const PageNavButton: React.FC<PageNavButtonProps> = ({ index, clickHandler, isActive }) => {
  return (
    <button className={`page-nav-button ${isActive ? "active" : ""}`} type="button" key={index} onClick={clickHandler}>
      {index}
    </button>
  );
};

export default PageNavButton;