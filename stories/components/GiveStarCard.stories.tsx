import { MockedProvider } from '@apollo/client/testing'
import React, { useState } from 'react'
import { GiveStarCard } from '../../components/GiveStarCard'
import { Button } from '../../components/theme/Button'
import GET_LESSON_MENTORS from '../../graphql/queries/getLessonMentors'
import SET_STAR from '../../graphql/queries/setStar'
import noop from '../../helpers/noop'
import lessonMentorsData from '../../__dummy__/getLessonMentorsData'
export default {
  component: GiveStarCard,
  title: 'Components/GiveStarCard'
}
const mocks = Array(30).fill({
  request: {
    query: SET_STAR,
    variables: { mentorId: 4, lessonId: 4, comment: '1' }
  },
  result: {
    data: { setStar: { success: true } }
  }
})
mocks.push({
  request: { query: GET_LESSON_MENTORS, variables: { lessonId: 4 } },
  result: {
    data: { getLessonMentors: lessonMentorsData }
  }
})

const MockBasic: React.FC = () => {
  const [show, setShow] = useState(true)
  const [starGiven, setStarGiven] = useState<string>('')
  const close = () => setShow(false)
  /*
    Mock mutations in the storybook require all parameters(even optional)
    of the mutation operation to be filled out. This is why a comment is neccessary
    in order to see the `Thanks` display after someone gives a star
  */
  return (
    <>
      <Button onClick={() => setShow(!show)}>Launch demo modal</Button>
      <Button onClick={() => setStarGiven('')} btnType="primary" color="white">
        Reset star
      </Button>
      <h1 className="mt-5">
        Type in<span className="font-italic"> 1 </span>as a
      </h1>
      <h1>comment for the</h1>
      <h1>Give Star button to work</h1>
      <MockedProvider mocks={mocks} addTypename={false}>
        <GiveStarCard
          starGiven={starGiven}
          lessonId={4}
          show={show}
          close={close}
          setStarGiven={setStarGiven}
        />
      </MockedProvider>
    </>
  )
}

const MockAlreadyGaveStar: React.FC = () => {
  const [show, setShow] = useState(true)
  const close = () => setShow(false)
  return (
    <>
      <Button onClick={() => setShow(!show)}>Launch demo modal</Button>
      <GiveStarCard
        starGiven="omega shenron"
        lessonId={4}
        show={show}
        setStarGiven={noop}
        close={close}
      />
    </>
  )
}

export const Basic: React.FC = () => <MockBasic />

export const AlreadyGaveStar: React.FC = () => <MockAlreadyGaveStar />
