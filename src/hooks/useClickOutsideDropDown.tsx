import { useEffect } from "react"

export function useClickOutsideDropDown(
  ref: React.RefObject<HTMLElement>,
  callback: () => void
) {
  useEffect(() => {
    function clickOutsideHandler(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback()
      }
    }
    document.addEventListener("click", clickOutsideHandler)
    return () => {
      document.removeEventListener("click", clickOutsideHandler)
    }
  }, [ref, callback])
}