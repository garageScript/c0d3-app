import React from 'react'

/*
	convert string to array, separated by and including searchTerm
	Ex:
		Inputs: searchTerm='bon', str = 'bonJourbon'
		Output: [bon, Jour, bon]
*/
const splitWithSearchTerm = (str: string, searchTerm: string) => {
  const lowerCaseSearchTerm = searchTerm.toLowerCase()
  const splitArr = str.toLowerCase().split(lowerCaseSearchTerm)
  // tracker is used for `str.substr` to extract characters from the original string at the correct places
  let tracker = 0

  const res = splitArr.reduce(
    (acc: string[], word: string, splitArrIndex: number) => {
      // converts words back into their original capitalization
      const originalWord = str.substr(tracker, word.length)
      acc.push(originalWord)
      tracker += word.length

      // used to prevent over-adding of searchTerm back into array
      if (splitArrIndex === splitArr.length - 1) return acc
      acc.push(searchTerm)
      tracker += searchTerm.length
      return acc
    },
    []
  )

  return res
}

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
