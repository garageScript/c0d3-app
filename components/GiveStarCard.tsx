import React, { useState } from 'react'
import { User, useSetStarMutation } from '../graphql/index'
import withQueryLoader, { QueryDataProps } from '../containers/withQueryLoader'
import { Button } from '../components/theme/Button'
import GET_LESSON_MENTORS from '../graphql/queries/getLessonMentors'
import '../scss/giveStarCard.scss'
import { ModalCard, ModalCardProps } from './ModalCard'
import { Thanks } from './Thanks'

interface Mentor {
  username: string
  mentorId: number
}

type MentorCardProps = {
  setMentor: React.Dispatch<React.SetStateAction<Partial<Mentor>>>
  name: string
} & Mentor

const MentorCard: React.FC<MentorCardProps> = ({
  username,
  name,
  mentorId,
  setMentor
}) => (
  <div
    className="mb-3 rounded-lg d-flex justify-content-center align-items-center flex-column mentor position-relative"
    onClick={() => setMentor({ username, mentorId })}
  >
    <div className="text-white position-absolute mentor sendStar align-items-center justify-content-center">
      <h5 className="mt-0 mb-0">Send Star</h5>
    </div>
    <h6 className="mb-0 mt-0 font-weight-light pr-3 pl-3 long">{name}</h6>
    <span className="text-muted font-weight-light mt-0 mb-0 pr-3 pl-3 long">
      @{username}
    </span>
  </div>
)

type SearchMentorProps = {
  setMentor: React.Dispatch<React.SetStateAction<Partial<Mentor>>>
  mentors: User[]
}

const SearchMentor: React.FC<SearchMentorProps> = ({ setMentor, mentors }) => {
  const [search, setSearch] = useState<string>('')

  const searchTerm = search.toLowerCase()
  const includes = (str: string) => str.toLowerCase().includes(searchTerm)
  const filteredList = mentors.filter(({ username, name }) => {
    return includes(username as string) || includes(name as string)
  })

  const mentorsList = filteredList.map(({ username, name, id }, key) => (
    <MentorCard
      key={key}
      username={username as string}
      name={name as string}
      mentorId={parseInt(id as string)}
      setMentor={setMentor}
    />
  ))

  return (
    <div className="search d-flex flex-column">
      <div className="pt-2 pt-4 pl-5 pr-5 pb-4">
        <h4 className="font-weight-bold mt-2 mb-4 pt-2 pb-1">
          Who helped you the most?
        </h4>
        <input
          data-testid="giveStarInput"
          onChange={e => setSearch(e.target.value)}
          className="pb-4 form-control-lg form-control font-weight-light"
        />
      </div>
      <div className="pt-4 pb-3 mentorsList">
        <div className="row mr-5 ml-5 mt-1 mb-2 d-flex flex-wrap justify-content-between">
          {mentorsList}
        </div>
      </div>
    </div>
  )
}

type GiveStarProps = {
  lessonId: number
  goBack: () => void
  setDone: React.Dispatch<React.SetStateAction<boolean>>
} & Mentor

const GiveStar: React.FC<GiveStarProps> = ({
  username,
  mentorId,
  lessonId,
  goBack,
  setDone
}) => {
  const [comment, setComment] = useState('')
  const [setStar, { error }] = useSetStarMutation()

  const giveStar = async () => {
    try {
      await setStar({ variables: { mentorId, lessonId, comment } })
      setDone(true)
    } catch {}
  }

  if (error) {
    return (
      <div className="mb-0 mt-0 p-4 text-center">
        <h4 className="mt-0 mb-0">Error sending star, please try again</h4>
      </div>
    )
  }

  return (
    <>
      <div className="position-absolute left-0">
        <img
          data-testid="backButton"
          className=".img-fluid btn"
          src="/curriculumAssets/icons/left-arrow.svg"
          onClick={goBack}
        />
      </div>
      <div className="d-flex justify-content-center align-items-center flex-column modal-height-med">
        <h3 className="mt-3 pt-1 text-break text-center pl-5 pr-5">
          You are giving a Star to
        </h3>
        <h3 className="font-italic long mb-4 pl-5 pr-5">{username}!</h3>
        <textarea
          placeholder="Give a comment along with your Star!"
          className="mb-4 border-bottom form-control w-75 d-inline-block commentBox"
          onChange={e => setComment(e.target.value)}
        />
        <Button type="primary" color="white" onClick={giveStar}>
          Give Star!
        </Button>
      </div>
    </>
  )
}

type LessonMentorsData = { getLessonMentors: User[] }
type StarCardProps = {
  lessonId: number
  setStarGiven: Function
} & QueryDataProps<LessonMentorsData> &
  ModalCardProps

const StarCard: React.FC<StarCardProps> = ({
  close,
  setStarGiven,
  show,
  lessonId,
  queryData: { getLessonMentors: mentors }
}) => {
  const [{ mentorId, username }, setMentor] = useState<Partial<Mentor>>({})
  const [done, setDone] = useState<boolean>(false)

  const handleClose = () => {
    close()
    done && setStarGiven(username)
  }

  let display = <SearchMentor setMentor={setMentor} mentors={mentors} />
  if (done) {
    display = <Thanks close={handleClose} />
  } else if (mentorId && username) {
    display = (
      <GiveStar
        lessonId={lessonId}
        mentorId={mentorId}
        username={username}
        goBack={() => setMentor({})}
        setDone={setDone}
      />
    )
  }

  return (
    <ModalCard close={handleClose} show={show}>
      {display}
    </ModalCard>
  )
}

type GiveStarCardProps = {
  lessonId: string
  starGiven: string
  setStarGiven: Function
} & ModalCardProps

export const GiveStarCard: React.FC<GiveStarCardProps> = ({
  lessonId,
  show,
  close,
  starGiven,
  setStarGiven
}) => {
  if (starGiven) {
    return (
      <ModalCard show={show} close={close}>
        <div className="mb-0 mt-0 p-4 text-center">
          <h4 className="mt-0 mb-0">You have already given a star to</h4>
          <h4 className="mt-0 mb-0 font-italic long">{starGiven}!</h4>
        </div>
      </ModalCard>
    )
  }

  return withQueryLoader<LessonMentorsData>(
    {
      query: GET_LESSON_MENTORS,
      getParams: () => ({ variables: { lessonId } })
    },
    props => <StarCard {...(props as StarCardProps)} />
  )({ lessonId: parseInt(lessonId), close, setStarGiven, show })
}
