import { useState, useEffect } from 'react'
export const useMeasureWindow = () => {
  const [width, setWidth] = useState(window.innerWidth)

  useEffect(() => {
    const resizeHandler = () => {
      setWidth(window.innerWidth)
    }
    resizeHandler()
    window.addEventListener('resize', resizeHandler)
    return () => window.removeEventListener('resize', resizeHandler)
  }, [])

  return { width }
}
