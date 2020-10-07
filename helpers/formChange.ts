import { errorCheckSingleField } from './admin/adminHelpers'

export const formChange = async (
  value: string,
  propertyIndex: number,
  state: any[],
  setState: React.Dispatch<React.SetStateAction<any[]>>,
  validationSchema?: any
) => {
  const newOptions: any = [...state]

  if (!(newOptions[propertyIndex].value instanceof Array)) {
    newOptions[propertyIndex].value = value
    validationSchema &&
      (await errorCheckSingleField(newOptions, propertyIndex, validationSchema))
    return setState(newOptions)
  }
  // if code is run here, it means field is a dropdown menu
  let save
  // remove dropdown item from array
  const newDropdownItems: any = newOptions[propertyIndex].value.filter(
    (item: any) => {
      if (item.title === value) {
        save = item
        return false
      }
      return true
    }
  )

  // put as first item in array to make it appear first
  newDropdownItems.unshift(save)
  newOptions[propertyIndex].value = newDropdownItems
  setState(newOptions)
}
