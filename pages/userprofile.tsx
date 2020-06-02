import * as React from 'react'
import Layout from '../components/Layout'
import ProfileImageInfo from '../components/ProfileImageInfo'
//import ProfileLessons from '../components/ProfileLessons'
//import { User } from '../@types/user'
import withQueryLoader, { WithQueryProps } from '../containers/withQueryLoader'
//import _ from 'lodash'
import { GET_APP } from '../graphql/queries'

const UserProfile: React.FC<WithQueryProps> = ( { queryData } ) => {
    console.log('QueryData:', queryData)
    const userInfo = {
        username: queryData.session.user.username,
        firstName : queryData.session.user.name.split(' ')[0],
        lastName : queryData.session.user.name.split(' ')[1]
    }
    console.log("userInfo:", userInfo)

    const lessonInfo = queryData.lessons.map((lesson) => {
        const lessonProgress = queryData.submissions.filter( (r) => r.status === 'approved' && r.lessonId === lesson.id ).length / lesson.challenges.length
        const progress = Math.floor(lessonProgress*100)
        const order = lesson.order
        return {
            progress, order 
        }
    })

    return (
   <Layout>
       <ProfileImageInfo user={userInfo}/>
       <ProfileLessons lessons={lessonInfo}/>
   </Layout>
    )
}

export default withQueryLoader(
    {
        query: GET_APP
    },
    UserProfile
)