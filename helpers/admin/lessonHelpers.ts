// creates usuable array from graphql data to use as a prop when using FormCard component
export const inputValues = (options: any, deleteProp?: string) => {
  deleteProp && options.hasOwnProperty(deleteProp) && delete options[deleteProp]
  options.hasOwnProperty('__typename') && delete options['__typename']
  const keys = Object.keys(options)
  const res = keys.reduce((acc: any, type: any) => {
    const value = options[type] === 0 ? '0' : `${options[type] || ''}`
    acc.push({
      title: type,
      value,
      type: type === 'description' ? 'MD_INPUT' : 'TEXT_AREA'
    })
    return acc
  }, [])
  return res
}

// turns the array used in FormCard component into an object, to be used when making mutation requests
export const outputValues = (options: any) => {
  const res = options.reduce((acc: any, option: any) => {
    acc[option.title] = option.value
    return acc
  }, {})
  return res
}

//checks for error for one element in the `inputvalues` array
export const checkForErrors = (newChallengeInfo: {
  title: string
  value: string
  error: string
  hasOwnProperty: (arg0: string) => any
}) => {
  let errorSeen = false
  const { title, value } = newChallengeInfo
  if (title === 'order') {
    if (!value) {
      newChallengeInfo.error = 'Required'
      errorSeen = true
    } else if (!value.match(/^[0-9]+$/)) {
      newChallengeInfo.error = 'Numbers only'
      errorSeen = true
    } else {
      newChallengeInfo.hasOwnProperty('error') && delete newChallengeInfo.error
    }
  } else if (title === 'title' || title === 'description') {
    if (!value) {
      newChallengeInfo.error = 'Required'
      errorSeen = true
    } else {
      newChallengeInfo.hasOwnProperty('error') && delete newChallengeInfo.error
    }
  }
  return errorSeen
}

//checks for error for each element in the `inputvalues` array
export const checkForAllErrors = (options: any) => {
  let error = false
  options.forEach((option: any) => {
    if (checkForErrors(option)) error = true
  })
  return error
}
