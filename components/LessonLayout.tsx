import React, { useEffect, useState } from 'react'
import Layout from './Layout'
import LessonTitleCard from './LessonTitleCard'
import styles from '../scss/mdx.module.scss'
import _ from 'lodash'
import { LayoutGetter } from '../@types/page'
import { LessonMetaData } from '../helpers/static/getLessonMetaData'

const ScrollTopArrow: React.FC<{ scroll: boolean }> = ({ scroll }) => {
  return (
    <img
      src="/assets/mdx/topArrow.svg"
      className={`${scroll ? 'd-block' : 'd-none'} position-fixed ${
        styles['arrow']
      }`}
      onClick={() =>
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth'
        })
      }
      data-testid="arrow"
    />
  )
}

type LayoutProps = {
  metaData: LessonMetaData
}
const LessonLayout: React.FC<LayoutProps> = ({ children, metaData }) => {
  const [scroll, setScroll] = useState(false)
  useEffect(() => {
    const throttled = _.throttle(() => {
      setScroll(
        window.scrollY > 2 * window.document.documentElement.clientHeight
      )
    }, 100)
    window.addEventListener('scroll', throttled)
  }, [])

  return (
    <>
      <input type="text"></input>
      <LessonTitleCard metaData={metaData} isPassed={true} />

      <ScrollTopArrow scroll={scroll} />

      {children}
    </>
  )
}

export const getLayout: LayoutGetter<{
  metaData: LessonMetaData
}> = (page, { metaData }) => {
  return (
    <Layout>
      {/* TODO: Add fallback page title */}
      <LessonLayout metaData={metaData}>{page}</LessonLayout>
    </Layout>
  )
}

export default LessonLayout
