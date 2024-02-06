import { useEffect } from 'react'
import {router} from "next/client";
import {useRouter} from "next/router";

export const useOutsideDetect = (ref, setIsListOpen): void => {
  // const router = useRouter()
  useEffect(() => {
    function isClickOutside (e): void {
      if (ref.current && !ref.current.contains(e.target)) {
        setIsListOpen(false)
      }
    }
    document.addEventListener('mousedown', isClickOutside)
    return () => {
      document.removeEventListener('mousedown', isClickOutside)
    }
  }, [ref, setIsListOpen])
}
