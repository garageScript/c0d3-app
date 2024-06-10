import { ISchema, reach, ValidationError } from 'yup'
import _ from 'lodash'
import { DROP_DOWN, TEXT_AREA, MD_INPUT } from '../../components/FormCard'

// creates useable array from graphql data to use as a prop when using FormCard component
export const getPropertyArr = (
  options: any,
  deleteProps?: string[],
  dropdownChange?: Function
) => {
  const cloneOptions = _.cloneDeep(options)
  ;(deleteProps || []).forEach(prop => delete cloneOptions[prop])
  const keys = Object.keys(cloneOptions)

  const res = keys.map((type: any, index: number) => {
    const optionValue = options[type]
    let inputType = type === 'description' ? MD_INPUT : TEXT_AREA
    let value: any = options[type] === 0 ? '0' : `${options[type] || ''}`

    if (optionValue instanceof Array && dropdownChange) {
      value = optionValue.map((dropdownItem: any) => {
        dropdownItem.onClick = () => dropdownChange(dropdownItem.title, index)
        return dropdownItem
      })
      inputType = DROP_DOWN
    }

    return {
      title: type,
      value,
      type: inputType
    }
  })

  return res
}

// turns the array used in FormCard component into an object, to be used when making mutation requests
export const makeGraphqlVariable = (options: any, addProp?: any) => {
  const res = options.reduce((acc: any, option: any) => {
    const { title, value } = option
    acc[title] = option.value

    // if field was a dropdown menu
    if (value instanceof Array) {
      acc[title] = value[0].title
    }
    return acc
  }, {})

  if (res.hasOwnProperty('order')) {
    // undefined marks order as empty. Or else it will be NaN, and
    // Yup will give out a typeError instead of a Required error
    res.order = res.order === '' ? undefined : parseInt(res.order)
  }

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

export const errorCheckSingleField = async (
  properties: any,
  propertyIndex: number,
  schema: any
) => {
  // use makeGraphqlVariable to convert properties into an
  // object key-value format for error checking with Yup
  const data = makeGraphqlVariable(properties).variables
  let valid = true

  // title is the name of field being checked
  const { title } = properties[propertyIndex]
  try {
    await (reach(schema, title, null, null) as ISchema<{}>).validate(
      data[title]
    )
  } catch (err) {
    valid = false
    properties[propertyIndex].error = (err as Error).message
  }

  // remove error message(if present) if field is valid
  if (valid) {
    properties[propertyIndex].hasOwnProperty('error') &&
      delete properties[propertyIndex].error
  }

  return valid
}

export const errorCheckAllFields = async (properties: any, schema: any) => {
  // use makeGraphqlVariable to convert properties into an
  // object key-value format for error checking with Yup
  const data = makeGraphqlVariable(properties).variables
  let allValid = true

  try {
    await schema.validate(data, { abortEarly: false })
  } catch (err) {
    // errors is an array of error messages
    // inner is an array of objects containing more error information
    const { errors, inner } = err as ValidationError

    inner.forEach((innerObj, errorIndex) => {
      // get index of property with title equal to value of innerObj.path
      const titleIndex = properties.findIndex(
        (property: any) => property.title === innerObj.path
      )
      //add error message to field
      properties[titleIndex].error = errors[errorIndex]
    })

    allValid = false
  }

  return allValid
}
