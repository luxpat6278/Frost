import "./Modal.css";

interface ModalProps {
  open: boolean;
  close: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = (props) => {
  const handleContentClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  return (
    <div className={`modal-wrap ${props.open ? "visible" : ""}`}>
      <div className="modal-shade" onClick={props.close}>
        <div className="modal-content dark:border-[#252525] dark:bg-[#252525]" onClick={handleContentClick}>
          {props.children}
          <span className="close" onClick={props.close}>
            ×
          </span>
        </div>
      </div>
    </div>
  );
};

export default Modal;