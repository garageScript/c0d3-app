import colorsVars from '../../scss/__variables.module.scss'

export type ColorTypes = keyof typeof colorsVars

export const colors = {
  ...colorsVars
}
