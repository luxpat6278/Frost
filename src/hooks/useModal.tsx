import { useState } from "react";

function useModal(initialState = false) {
  // Хук для запоминания состояния открытости
  const [isOpen, setIsOpen] = useState(initialState);

  // Функция для открытия окна
  function open() {
    setIsOpen(true);
  }

  // Функция для закрытия окна
  function close() {
    setIsOpen(false);
  }

  // Возвращает массив с тремя элементами
  return [isOpen, open, close];
}

export default useModal;
