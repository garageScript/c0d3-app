import React, { useEffect, useState } from 'react'
import Layout from '../Layout'
import LessonTitleCard, { LessonTitleProps } from '../LessonTitleCard'
import styles from '../../scss/mdx.module.scss'
import { useRouter } from 'next/router'
import _ from 'lodash'

type LayoutProps = Partial<
  LessonTitleProps & { subLessons?: string[]; title?: string }
>

const NextPreviousLessons: React.FC<{ subLessons: string[] }> = ({
  subLessons
}) => {
  const router = useRouter()
  const location = router.pathname.split('/')
  const current = location[location.length - 1]
  const urlLessons = subLessons.map(l =>
    l.replace(',', '').toLowerCase().split(' ').join('_')
  )
  const index = urlLessons.indexOf(current)
  let next
  let previous
  if (index && index > 0 && index < urlLessons.length - 1) {
    next = subLessons[index + 1]
    previous = subLessons[index - 1]
  }
  if (index === 0) next = subLessons[index + 1]
  if (index === urlLessons.length - 1) previous = subLessons[index - 1]
  return (
    <div className="d-flex">
      {previous && (
        <a
          href={urlLessons[index - 1]}
          className={`${styles['lessonLink']} ${styles['previous']}`}
        >
          Previous part: <span>{previous}</span>
        </a>
      )}
      {next && (
        <a
          href={urlLessons[index + 1]}
          className={`${styles['lessonLink']} ${styles['next']}`}
        >
          Next part: <span>{next}</span>
        </a>
      )}
    </div>
  )
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

const SubLessonLinks: React.FC<{ subLessons: string[] }> = ({ subLessons }) => {
  const router = useRouter()
  const location = router.pathname.split('/')
  const current = location[location.length - 1]
  return (
    <>
      {subLessons.map((l, i) => {
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
      })}
    </>
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
const LessonLayout: React.FC<LayoutProps> = props => {
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
        <ScrollTopArrow scroll={scroll} />
        <div className={styles.title}>{props.title}</div>
        {props.subLessons && <SubLessonLinks subLessons={props.subLessons} />}
        {props.children}
        <EditPage />
        {props.subLessons && (
          <NextPreviousLessons subLessons={props.subLessons} />
        )}
      </div>
    </Layout>
  )
}
export default LessonLayout
