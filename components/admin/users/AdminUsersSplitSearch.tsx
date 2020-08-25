import React from 'react'
import { splitWithSearchTerm } from '../../../helpers/splitWithSearchTerm'

export const AdminUsersSplitSearch = (str: string, searchTerm: string) => {
  // make all lowercase now to ensure both lower and uppercase characters can be searched for
  const lowerCaseSearchTerm = searchTerm.toLowerCase()

  // convert string to array with searchTerm included
  const splitArr = splitWithSearchTerm(str, searchTerm)

  // highlight search Term
  const res = splitArr.map((word: string, key: number) => {
    const bgColor =
      word.toLowerCase() === lowerCaseSearchTerm ? 'rgb(84, 64, 216, .25)' : ''
    return (
      <span key={word + searchTerm + key} style={{ backgroundColor: bgColor }}>
        {word}
      </span>
    )
  })

  return res
}
