import React from 'react'
import ReactDOM from 'react-dom'
import IndexPage from '../../pages'

test('should render without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<IndexPage />, div)
})
