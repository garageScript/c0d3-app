import React, { useEffect, useState } from 'react'
import Layout from './Layout'
import LessonTitleCard, { LessonTitleProps } from './LessonTitleCard'
import styles from '../scss/mdx.module.scss'
import { useRouter } from 'next/router'
import _ from 'lodash'
import { LayoutGetter } from '../@types/page'
import { LessonMetaData } from '../helpers/static/getLessonMetaData'
type LayoutProps = {
  metaData: LessonMetaData
}

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

const EditPage: React.FC = () => {
  const router = useRouter()
  return (
    <a
      href={`https://github.com/garageScript/c0d3-app/edit/master/pages/${router.pathname}.mdx`}
      className={`${styles['MDX_a']} ${styles['edit']}`}
    >
      Edit this page
    </a>
  )
}
const LessonLayout: React.FC<LayoutProps> = ({ children, metaData }) => {
  const router = useRouter()
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
export const getLayout: LayoutGetter = (page, { metaData }) => {
  return (
    <Layout>
      {/* TODO: Add fallback page title */}
      <LessonLayout metaData={metaData}>{page}</LessonLayout>
    </Layout>
  )
}

export default LessonLayout
