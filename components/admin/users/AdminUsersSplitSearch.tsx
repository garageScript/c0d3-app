import React from 'react'

/*
	convert string to array with searchTerm removed (split removes it)
	Ex:
		Inputs: searchTerm='bon', str = 'bonjourbon'
    Output: [jour]
*/
const split = (str: string, lowerCaseSearchTerm: string) => {
  const splitArr = str.toLowerCase().split(lowerCaseSearchTerm)

  const res = splitArr.reduce(
    (acc: string[], word: string, splitArrIndex: number) => {
      acc.push(word)

      // used to prevent over-adding of searchTerm back into array
      if (splitArrIndex === splitArr.length - 1) return acc
      acc.push(lowerCaseSearchTerm)
      return acc
    },
    []
  )

  return res
}

// converts words back into their original capitalization
const originalCapitalization = (str: string, value: string[]) => {
  // tracker is used for `str.substr` to extract characters from the original string at the right places
  let tracker = 0
  const correctedArr = value.reduce((acc: string[], word: string) => {
    const originalWord = str.substr(tracker, word.length)
    tracker += word.length
    acc.push(originalWord)
    return acc
  }, [])

  return correctedArr
}

export const AdminUsersSplitSearch = (str: string, searchTerm: string) => {
  // make all lowercase now to ensure both lower and uppercase characters can be searched for
  const lowerCaseSearchTerm = searchTerm.toLowerCase()

  // convert string to array with searchTerm removed (split removes it)
  const splitArr = split(str, lowerCaseSearchTerm)

  // make sure all capilization is correct
  const correctedArr = originalCapitalization(str, splitArr)

  // highlight search Term
  const res = correctedArr.map((word: string, key: number) => {
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
