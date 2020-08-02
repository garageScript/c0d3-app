// creates usuable array from graphql data to use as a prop when using FormCard component
export const inputValues = (options: any, deleteProp?: string) => {
  deleteProp && options.hasOwnProperty(deleteProp) && delete options[deleteProp]
  options.hasOwnProperty('__typename') && delete options['__typename']
  const keys = Object.keys(options)
  const res = keys.map((type: any) => {
    const value = options[type] === 0 ? '0' : `${options[type] || ''}`
    return {
      title: type,
      value,
      type: type === 'description' ? 'MD_INPUT' : 'TEXT_AREA'
    }
  })
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
export const checkForErrors = (option: any) => {
  let errorSeen = false
  const { title, value } = option
  if (title === 'order') {
    if (!value) {
      option.error = 'Required'
      errorSeen = true
    } else if (!value.match(/^[0-9]+$/)) {
      option.error = 'Numbers only'
      errorSeen = true
    } else {
      option.hasOwnProperty('error') && delete option.error
    }
  } else if (title === 'title' || title === 'description') {
    if (!value) {
      option.error = 'Required'
      errorSeen = true
    } else {
      option.hasOwnProperty('error') && delete option.error
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
