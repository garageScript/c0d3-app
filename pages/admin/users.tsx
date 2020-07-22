// // import React, {useState} from 'react'
// import React from 'react'
// import { useQuery } from '@apollo/react-hooks'
// import LoadingSpinner from '../../components/LoadingSpinner'
// import checkAdminRights from '../../graphql/queries/checkAdminRights'
// import Layout from '../../components/Layout'
// import adminStatuses from '../../graphql/queries/adminStatuses'

// const AdminUsers: React.FC = () => {
//   const { loading, error, data } = useQuery(adminStatuses)
//   // const [users, setUsers] = useState(null)
//   console.log(data)
//   return (
//     <Layout>
//       {loading && <LoadingSpinner />}
//       {error && <h1>Error</h1>}
//       {data && (
//         <div className="row mt-4">
//           {/* <usersList users={users || data.users} setUsers={setUsers} /> */}
//         </div>
//       )}
//     </Layout>
//   )
// }

// const Users: React.FC = () => {
//   const { loading, error, data } = useQuery(checkAdminRights)

//   return (
//     <React.Fragment>
//       {loading && <LoadingSpinner />}
//       {error && <h1>Error</h1>}
//       {data && data.adminRights && <AdminUsers />}
//     </React.Fragment>
//   )
// }

// export default Users
