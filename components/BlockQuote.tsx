import * as React from 'react'

const BlockQuote: React.FC<{}> = ({ children }) => {
  return (
    <div className="blockQuote d-flex">
      <img
        src="/assets/curriculum/lessons/lightBulb.svg"
        className="blockQuote__bulb mr-3"
      />
      {children}
    </div>
  )
}

export default BlockQuote
