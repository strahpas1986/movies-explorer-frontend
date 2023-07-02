// Импорт пакетов
import { useEffect } from "react";

// Импорт стилей
import "./Overlay.css";

// Импорт переменных
import { ESC_KEY } from "../../utils/constants";

// Компонент Overlay
function Overlay({ isActive, onClose, ...props }) {

  useEffect(() => {
    function handleEscClose(evt) {
      if (evt.key === ESC_KEY) {
        onClose();
      }
    }
    if (isActive) {
      document.addEventListener("keydown", handleEscClose);
      return () => document.removeEventListener("keydown", handleEscClose);
    }
  }, [isActive, onClose]);

  const closeByClickOnOverlay = (evt) => {
    if (evt.target === evt.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className={`overlay ${isActive ? "overlay_active" : ""}`}
      onMouseDown={closeByClickOnOverlay}
    >
      {props.children}
    </div>
  );
}

export default Overlay;
