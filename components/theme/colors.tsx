import styles from '../../scss/_variables.module.scss'

export type ColorTypes =
  | 'white'
  | 'black'
  | 'darkgrey'
  | 'lightgrey'
  | 'danger'
  | 'primary'
  | 'info'
  | 'success'
  | 'mute'

export const colors = {
  white: '#fff',
  black: '#292929',
  darkgrey: '#5d656e',
  lightgrey: '#8e8e8e',
  danger: styles.danger,
  primary: styles.primary,
  info: styles.info,
  success: styles.success,
  mute: styles.mute
}
