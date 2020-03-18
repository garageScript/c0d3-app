import * as React from 'react'
import Layout from '../../components/Layout'
import LessonTitleCard from '../../components/LessonTitleCard'
import Alert from '../../components/Alert'
import ChallengeMaterial from '../../components/ChallengeMaterial'

const Challenges: React.FC = () => {
  return (
    <div>
      <Layout>
        <div className="row mt-4">
          <LessonTitleCard
            lessonCoverUrl="js-0-cover.svg"
            lessonUrl="https://www.notion.so/JS-0-Foundations-a43ca620e54945b2b620bcda5f3cf672"
            lessonTitle="Foundations"
          />
          <Alert
            icon="/curriculumAssets/icons/icon-tip.svg"
            text="Set up your computer to submit challenges."
            instructionsUrl="https://www.notion.so/JS-0-Foundations-a43ca620e54945b2b620bcda5f3cf672#b45ed85a95e24c9d9fb784afb7a46bcc"
          />
          <ChallengeMaterial />
        </div>
      </Layout>
    </div>
  )
}

export default Challenges
