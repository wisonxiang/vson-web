'use client'; 
import { useState, useEffect } from 'react'


export default function useMobile() {
  const [isMobile, setIsMobile] = useState<boolean>(false)

  useEffect(() => {
    const handler = () => {
      setIsMobile(window.innerWidth < 1024 )
    }
    handler()
    window.addEventListener('resize', handler)
    return () => {
      window.removeEventListener('resize', handler)
    }
  }, [])
  return isMobile
}
