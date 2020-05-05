import * as React from 'react'
import ProfileBravos from '../../components/ProfileBravos'

export default {
  component: ProfileBravos,
  title: 'Components/ProfileBravos'
}

const stars = [
 {
  firstName: 'Sam',
  lastName: 'Winston',
 },
 {
  firstName: 'Raj',
  lastName: 'Malhotra'
 }, 
]

export const _ProfileBravos: React.FC = () => (
<ProfileBravos/ >
)
