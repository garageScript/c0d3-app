import * as React from 'react'
import ContributorCard from '../../components/ContributorCard'

export default {
  component: ContributorCard,
  title: 'Components/ContributorCard'
}

export const Basic: React.FC = () => (
  <ContributorCard
    user={{
      firstName: 'Alexis',
      lastName: 'Ortiz Ojeda',
      username: 'aortizoj',
      linkedinUrl: 'https://www.linkedin.com/in/alexis-ortiz-ojeda/',
      githubPRsUrl:
        'https://github.com/garageScript/c0d3-app/pulls?q=is%3Apr+author%3Aaortizoj15',
      codeSample: 'https://github.com/garageScript/c0d3-app/pull/67',
      resume:
        'https://drive.google.com/file/d/1HoMg9QHGH2qicG8bZ8hRWv7FT7GXjFB5/view'
    }}
  />
)
