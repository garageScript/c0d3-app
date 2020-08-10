import React from 'react'
import _ from 'lodash'

export const split: any = (
  str: string,
  searchTerm: string,
  strIndex: number = 0,
  res: string[] = [],
  current: string = ''
) => {
  if (strIndex === str.length) {
    current && res.push(current)
    return res
  }

  if (str[strIndex] === searchTerm[current.length]) {
    /*
		single character in searchTerm has been found
    Ex:
      searchTerm = 'bonjour'
      current = 'bon' <--- previous characters
      str[i] = 'j' <--- current character
    */
    current += str[strIndex]

    //searchTerm has been fully found, push to array and reset current
    if (current.length === searchTerm.length) {
      res.push(current)
      current = ''
    }
  } else if (current.length) {
    /*
		Character in searchTerm was previously found, but current character does not match
		Ex:
      searchTerm = 'bonjour'
      current = 'bon' <--- previous characters
      str[i] = 'z' <--- current character
		*/
    res.push(current)

    //check if current character is first character of searchTerm
    current = str[strIndex] === searchTerm[0] ? str[strIndex] : ''

    !current && res.push(str[strIndex])
  } else {
    res.push(str[strIndex])
  }

  return split(str, searchTerm, strIndex + 1, res, current)
}

export const AdminUsersSplitSearch: any = (str: string, searchTerm: string) => {
  const splitArr = split(str, searchTerm)
  const value = splitArr.map((word: any) => {
    const bgColor = word !== searchTerm ? 'none' : 'rgb(84, 64, 216, .25)'
    return (
      <span style={{ backgroundColor: bgColor }} key={_.uniqueId()}>
        {word}
      </span>
    )
  })
  return value
}
