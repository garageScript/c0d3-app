/*
	convert string to array, separated by and including searchTerm
	Ex:
		Inputs: searchTerm='bon', str = 'bonJourbon'
		Output: [bon, Jour, bon]
*/

export const splitWithSearchTerm = (str: string, searchTerm: string) => {
  /*
	Using regex containing capturing parentheses `()` with split will return an array
	with the separator included. The `i` flag is the case insensitive flag, used to
	ensure that the returned array will include the searchTerm, regardless of the
	original capialization of str or searchTerm.
  */
  const regex = new RegExp(`(${searchTerm})`, 'i')
  return str.split(regex).filter(s => s !== '')
  // filter to remove the empty strings that appear if searchTerm is at the start or end
}
