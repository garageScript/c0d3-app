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
  const tabs = ['introduction', 'modules', 'challenges'].map(text => ({
    text,
    url: `/admin/lessons/1/${text}`
  }))
  const tabSelected = tabs.findIndex(tab => tab.text === pageName)

  return <NavCard tabSelected={tabSelected} tabs={tabs} />
}

const parameters = {
  nextRouter: {
    asPath: 'c0d3.com/admin/lessons/1/introduction'
  }
}

Basic.parameters = parameters
