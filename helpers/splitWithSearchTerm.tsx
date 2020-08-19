/*
	convert string to array, separated by and including searchTerm
	Ex:
		Inputs: searchTerm='bon', str = 'bonJourbon'
		Output: [bon, Jour, bon]
*/
export const splitWithSearchTerm = (str: string, searchTerm: string) => {
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

      // convert searchTerm to match original capitalization of string
      const correctSearchCapitalization = str.substr(tracker, searchTerm.length)
      acc.push(correctSearchCapitalization)
      tracker += searchTerm.length
      return acc
    },
    []
  )

  return res
}
