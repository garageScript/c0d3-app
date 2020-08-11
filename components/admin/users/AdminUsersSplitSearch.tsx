import React from 'react'
import _ from 'lodash'

const split = (str: string, lowerCaseSearchTerm: string) => {
  const splitArr = str.toLowerCase().split(lowerCaseSearchTerm)
  let tracker = 0

  const res = splitArr.reduce((acc: string[], word: string) => {
    acc.push(word)
    tracker += word.length

    // used to prevent over-adding of searchTerm back into array
    if (tracker === str.length) return acc

    acc.push(lowerCaseSearchTerm)
    tracker += lowerCaseSearchTerm.length
    return acc
  }, [])

  return res
}

const originalWord: any = (
  str: string,
  strIndex: number[],
  word: string,
  res: string = '',
  wordIndex: number = 0
) => {
  if (wordIndex === word.length) return res
  res += str[strIndex[0]]
  strIndex[0] += 1
  return originalWord(str, strIndex, word, res, wordIndex + 1)
}

const originalCapitalization = (str: string, value: string[]) => {
  /*
    strIndex is an array, so that originalWord function can be put
    outside of the originalCapitalization function
  */
  const strIndex = [0]

  // converts words back into their original capitalization
  value = value.reduce((acc: string[], word: string) => {
    acc.push(originalWord(str, strIndex, word))
    return acc
  }, [])

  return value
}

export const AdminUsersSplitSearch = (str: string, searchTerm: string) => {
  // make all lowercase now to ensure both lower and uppercase characters can be searched for
  const lowerCaseSearchTerm = searchTerm.toLowerCase()

  // convert string to array with searchTerm removed (split removes it)
  const splitArr = split(str, lowerCaseSearchTerm)

  // make sure all capilization is correct
  const correctedArr = originalCapitalization(str, splitArr)

  // highlight search Term
  const res = correctedArr.map((word: string) => {
    const bgColor =
      word.toLowerCase() === lowerCaseSearchTerm ? 'rgb(84, 64, 216, .25)' : ''
    return (
      <span key={_.uniqueId()} style={{ backgroundColor: bgColor }}>
        {word}
      </span>
    )
  })

  return res
}
