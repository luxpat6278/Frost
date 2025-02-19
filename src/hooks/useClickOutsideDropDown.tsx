import { useEffect } from "react";

export function useClickOutsideDropDown(ref, callback) {
  useEffect(() => {
    function clickOutsideHandler(event) {
      // Проверка, был ли клик вне элемента, включая потомков
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    }

    document.addEventListener("click", clickOutsideHandler);

    // Очистка эффекта
    return () => {
      document.removeEventListener("click", clickOutsideHandler);
    };
  }, [ref, callback]);
}
