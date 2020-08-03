// creates usuable array from graphql data to use as a prop when using FormCard component
export const getPropertyArr = (options: any, deleteProps?: string[]) => {
  options.hasOwnProperty('__typename') && delete options.__typename
  ;(deleteProps || []).forEach(prop => delete options[prop])

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
export const makeGraphqlVariable = (options: any, addProp?: any) => {
  const res = options.reduce((acc: any, option: any) => {
    acc[option.title] = option.value
    return acc
  }, {})

  res.order = parseInt(res.order)

  if (res.hasOwnProperty('id')) {
    res.id = parseInt(res.id ? res.id + '' : '')
  }

  if (addProp) {
    const keys = Object.keys(addProp)
    keys.forEach((propertyName: string) => {
      res[propertyName] = addProp[propertyName]
    })
  }

  return { variables: res }
}

//checks for error for one element in the `inputvalues` array
export const checkForErrors = (option: any) => {
  const { title, value } = option
  const required = ['title', 'description', 'order']

  if (required.includes(title) && !value) {
    option.error = 'Required'
    return true
  }

  if (title === 'order' && isNaN(parseInt(value))) {
    option.error = 'Numbers only'
    return true
  }

  option.hasOwnProperty('error') && delete option.error

  return false
}

//checks for error for each element in the `inputvalues` array
export const checkForAllErrors = (options: any) => {
  let error = false
  options.forEach((option: any) => {
    if (checkForErrors(option)) error = true
  })
  return error
}
