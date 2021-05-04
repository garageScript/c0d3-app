import React, { useEffect, useState } from 'react'
import Layout from '../Layout'
import LessonTitleCard, { LessonTitleProps } from '../LessonTitleCard'
import styles from '../../scss/mdx.module.scss'
import { useRouter } from 'next/router'
import _ from 'lodash'

type LayoutProps = Partial<
  LessonTitleProps & { subLessons?: string[]; title?: string }
>

const ScrollTop: React.FC<{ scroll: boolean }> = ({ scroll }) => {
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
const LessonLayout: React.FC<LayoutProps> = props => {
  const router = useRouter()
  const location = router.pathname.split('/')
  const current = location[location.length - 1]
  const [scroll, setScroll] = useState(false)
  useEffect(() => {
    const throttled = _.throttle(() => {
      setScroll(
        window.scrollY > 2 * window.document.documentElement.clientHeight
      )
    }, 100)
    window.addEventListener('scroll', throttled)
  }, [])
  const lessonParts =
    props.subLessons &&
    props.subLessons.map((l, i) => {
      const url = l.replace(',', '').toLowerCase().split(' ').join('_')
      return (
        <a
          className={`${styles['subtitle']} ${
            url !== current ? 'text-muted' : `text-dark dark`
          } d-block`}
          href={url}
          key={url}
        >
          {`Part ${i + 1}: ${l}`}
        </a>
      )
    })
  return (
    <Layout title={props.title || 'C0D3'}>
      <div className="mt-4">
        {props.lessonCoverUrl && (
          <LessonTitleCard
            {...(props as LessonTitleProps)}
            lessonTitle={props.title!}
          />
        )}
      </div>
      <div
        className={`${styles['lesson-wrapper']} card shadow-sm mt-3 d-block border-0 p-3 p-md-4 bg-white`}
      >
        {!props.lessonCoverUrl && (
          <button
            className="btn btn-link text-primary p-0"
            onClick={() => router.back()}
          >
            Go Back
          </button>
        )}
        <ScrollTop scroll={scroll} />
        <div className={styles.title}>{props.title}</div>
        {lessonParts}
        {props.children}
      </div>
    </Layout>
  )
}
export default LessonLayout
