import { useRouter } from 'next/router'
import * as React from 'react'
import NavCard from '../../components/NavCard'

export default {
  component: NavCard,
  title: 'Components/NavCard'
}

export const Basic = () => {
  const router = useRouter()
  const pageName = router.asPath.split('/').slice(-1)[0]
  const tabTexts = ['introduction', 'modules', 'challenges']
  const tabSelected = tabTexts.findIndex(text => text === pageName)
  const textToTab = (text: string) => ({
    text,
    url: `/admin/lessons/1/${text}`
  })

  return <NavCard tabSelected={tabSelected} tabs={tabTexts.map(textToTab)} />
}

const parameters = {
  nextRouter: {
    asPath: 'c0d3.com/admin/lessons/1/introduction'
  }
}

Basic.parameters = parameters
