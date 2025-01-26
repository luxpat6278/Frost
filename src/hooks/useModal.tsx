import { useState } from "react"

function useModal(): [boolean, () => void, () => void] {
  // Хук для запоминания состояния открытости
  const [isOpen, setIsOpen] = useState<boolean>(false)

  // Функция для открытия окна
  function open(): void {
    setIsOpen(true)
  }

  // Функция для закрытия окна
  function close(): void {
    setIsOpen(false)
  }

  // Возвращает массив с тремя элементами
  return [isOpen, open, close]
}

export default useModal