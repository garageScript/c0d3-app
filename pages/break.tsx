import React from 'react'

function Break() {
  const someFunction = () => {
    throw new Error('my error')
  }
  return <button onClick={someFunction}>Break Me</button>
}

export default Break
