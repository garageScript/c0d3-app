import * as React from 'react'
import Layout from '../components/Layout'
import ProfileImageInfo from '../components/ProfileImageInfo'
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

    return (
   <Layout>
       <ProfileImageInfo user={userInfo}/>
   </Layout>
    )
}

export default withQueryLoader(
    {
        query: GET_APP
    },
    UserProfile
)