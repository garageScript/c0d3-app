import colorsVars from '../../scss/__variables.module.scss'

export type ColorTypes =
  | 'white'
  | 'black'
  | 'darkgrey'
  | 'lightgrey'
  | keyof typeof colorsVars

export const colors = {
  white: '#fff',
  black: '#292929',
  darkgrey: '#5d656e',
  lightgrey: '#8e8e8e',
  ...colorsVars
}
