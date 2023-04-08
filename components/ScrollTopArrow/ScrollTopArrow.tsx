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
      className={`${styles['arrow']} border-0 p-0 bg-transparent`}
      onClick={() => window.scrollTo(0, 0)}
    >
      <Image src="/assets/mdx/topArrow.svg" layout="fill" aria-hidden="true" />
    </button>
  )
}

export default ScrollTopArrow
