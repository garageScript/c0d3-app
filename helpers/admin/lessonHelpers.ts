//add error to here. for title, order and description
export const inputValues = (options: any, blank?: string) => {
  //if lessons are passed in, then challenges property must be deleted
  options.hasOwnProperty('lessonId') && delete options.lessonId
  options.hasOwnProperty('challenges') && delete options['challenges']
  delete options['__typename']
  const keys = Object.keys(options)
  const res = keys.reduce((acc: any, type: any) => {
    let value

    //checks if value is 0
    if (blank === '') {
      value = ''
    } else if (options[type] === 0) {
      value = '0'
    } else {
      value = `${options[type] || ''}`
    }
    acc.push({
      title: type,
      value,
      type: type === 'description' ? 'MD_INPUT' : 'TEXT_AREA'
    })
    return acc
  }, [])
  return res
}

//have to check for errors in here
export const outputValues = (options: any) => {
  const res = options.reduce((acc: any, option: any) => {
    acc[option.title] = option.value
    return acc
  }, {})
  return res
}

export const checkForErrors = (newChallengeInfo: {
  title: string
  value: string
  error: string
  hasOwnProperty: (arg0: string) => any
}) => {
  let errorSeen = false
  let { title, value } = newChallengeInfo
  if (title === 'order') {
    if (!value) {
      newChallengeInfo.error = 'Required'
      errorSeen = true
    } else if (!value.match(/^[0-9]+$/)) {
      newChallengeInfo.error = 'Numbers only'
      errorSeen = true
    } else {
      if (newChallengeInfo.hasOwnProperty('error')) {
        delete newChallengeInfo.error
      }
    }
  }
  if (title === 'title' || title === 'description') {
    if (!value) {
      newChallengeInfo.error = 'Required'
      errorSeen = true
    } else {
      if (newChallengeInfo.hasOwnProperty('error')) {
        delete newChallengeInfo.error
      }
    }
  }
  return errorSeen
}

export const checkForAllErrors = (options: any) => {
  let error = false
  options.forEach((option: any) => {
    if (checkForErrors(option)) error = true
  })
  return error
}
