import React, { useState, useEffect } from 'react'
import styles from './scrollTopArrow.module.scss'
import throttle from 'lodash/throttle'
import Image from 'next/image'

const ScrollTopArrow: React.FC = () => {
  const [showButton, setShowButton] = useState(false)
  useEffect(() => {
    const throttled = throttle(() => {
      setShowButton(window.scrollY > 2 * window.innerHeight)
    }, 100)
    window.addEventListener('scroll', throttled)
    return () => window.removeEventListener('scroll', throttled)
  }, [])

  if (!showButton) return null

  return (
    <button
      aria-label="Scroll to top"
      title="Scroll to top"
      className={`${styles.arrow} d-grid justify-content-center align-content-center rounded-pill border-0 p-4`}
      onClick={() => window.scrollTo(0, 0)}
    >
      <Image
        src="/assets/mdx/topArrow.svg"
        layout="fixed"
        height={28}
        width={28}
        aria-hidden="true"
        className="opacity-75"
      />
    </button>
  )
}

export default ScrollTopArrow
