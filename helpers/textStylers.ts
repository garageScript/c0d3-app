import compose from 'lodash/fp/compose'
/**
 * @module textStylers
 * Collection of helper functions to manipulate textArea input state. Instead of
 * tracking cursor index locations we first convert the input state into the
 * readable TextStyle interface {left, selection, right }. Three strings that are
 * simply, the selected text, text to the left and text to the right.
 *
 * All the styler functions share this 3 string object signature making them composable.
 * */

export interface TextAreaState {
  value: string
  selectionStart: number
  selectionEnd: number
}

interface TextStyle {
  left: string
  selection: string
  right: string
}

interface TextStyler {
  (i: TextStyle): TextStyle
}

/**
 * Main function to compose and apply TextStyler functions
 * 1) Retrieves state from TextArea ref
 * 2) Converts to TextStyle interface
 * 3) Runs state through composed TextStyler functions (..stylers)
 * 4) converts state back to TextAreaState interface
 */
const applyStyles =
  (...stylers: TextStyler[]) =>
  (textArea: HTMLTextAreaElement): TextAreaState =>
    compose(
      toTextAreaState,
      ...stylers,
      toTextStyle,
      getTextAreaState
    )(textArea)

const getTextAreaState = (textArea: HTMLTextAreaElement): TextAreaState => ({
  value: textArea.value,
  selectionStart: textArea.selectionStart,
  selectionEnd: textArea.selectionEnd
})

export const toTextAreaState = ({
  left,
  selection,
  right
}: TextStyle): TextAreaState => ({
  value: left + selection + right,
  selectionStart: left.length,
  selectionEnd: left.length + selection.length
})

export const toTextStyle = ({
  value,
  selectionStart,
  selectionEnd
}: TextAreaState): TextStyle => ({
  left: value.slice(0, selectionStart),
  selection: value.slice(selectionStart, selectionEnd),
  right: value.slice(selectionEnd)
})

// Predicate Helpers
interface TextStylerPredicate {
  (i: TextStyle): boolean
}

const selectionIncludes =
  (prefix: string, suffix: string): TextStylerPredicate =>
  ({ selection }) =>
    selection.startsWith(prefix) && selection.endsWith(suffix)

const isSurroundedBy =
  (prefix: string, suffix: string): TextStylerPredicate =>
  ({ left, right }) =>
    left.endsWith(prefix) && right.startsWith(suffix)

const isMultiLine: TextStylerPredicate = ({ selection }) =>
  selection.includes('\n')

// General Purpose Helpers

/** Removes whitespace from ends of selected text but does not delete them*/
const trimSelection: TextStyler = ({ left, selection, right }) => {
  if (!selection.length) return { left, selection, right }

  // find index of first and last non whitespaces in selection
  const first = selection.search(/\S/)
  const last = selection.search(/\s*$/)

  return {
    left: left + selection.slice(0, first),
    selection: selection.slice(first, last),
    right: selection.slice(last) + right
  }
}

/** Expand cursor to word boundaries (will not expand if selection already exists)  */
const expandCursor: TextStyler = ({ left, selection, right }) => {
  // Do not expand if selection already exists
  if (selection.length) return { left, selection, right }

  // find last whitespace to left of cursor
  const last = left.search(/\S+$/)
  // find first whitespace to right of cursor
  const first = right.search(/\s/)

  const newLeft = last === -1 ? left : left.slice(0, last)
  const newRight = first === -1 ? '' : right.slice(first)

  return {
    left: newLeft,
    selection:
      left.slice(newLeft.length) +
      right.slice(0, right.length - newRight.length),
    right: newRight
  }
}

/** Makes sure selection is surrounded by empty lines on both sides (will only add the missing new lines) */
const newLineSurround: TextStyler = ({ left, selection, right }) => ({
  left: left + '\n'.repeat(!left ? 0 : 2 - left.match(/\n*$/)![0].length),
  selection,
  right: '\n'.repeat(!right ? 0 : 2 - right.match(/^\n*/)![0].length) + right
})

/** Add surrounding text outside of selection */
const surroundWith =
  (prefix: string, suffix: string): TextStyler =>
  ({ left, selection, right }) => ({
    left: left + prefix,
    selection,
    right: suffix + right
  })

/** Add surrounding text just outside of selection */
const removeSurrounding =
  (leftCount: number, rightCount: number): TextStyler =>
  ({ left, selection, right }) => ({
    left: left.slice(0, -1 * leftCount),
    selection,
    right: right.slice(rightCount)
  })

const selectionSlice =
  (start: number, end?: number): TextStyler =>
  ({ left, selection, right }) => ({
    left,
    selection: selection.slice(start, end),
    right
  })

// Markdown Stylers
const header: TextStyler = input => {
  let output = expandCursor(trimSelection(input))

  if (
    (output.left === '' || output.left.endsWith('\n')) &&
    output.selection.startsWith('### ')
  )
    return selectionSlice(4)(output)

  if (output.left === '### ' || output.left.endsWith('\n### '))
    return removeSurrounding(4, 0)(output)

  output = newLineSurround(output)

  return surroundWith('### ', '')(output)
}

const bold: TextStyler = input => {
  let output = trimSelection(input)

  if (selectionIncludes('**', '**')(output))
    return selectionSlice(2, -2)(output)

  if (isSurroundedBy('**', '**')(output)) return removeSurrounding(2, 2)(output)

  output = expandCursor(output)

  if (selectionIncludes('**', '**')(output))
    return selectionSlice(2, -2)(output)

  return surroundWith('**', '**')(output)
}

const italic: TextStyler = input => {
  let output = trimSelection(input)

  if (selectionIncludes('_', '_')(output)) return selectionSlice(1, -1)(output)
  if (isSurroundedBy('_', '_')(output)) return removeSurrounding(1, 1)(output)

  output = expandCursor(output)

  if (selectionIncludes('_', '_')(output)) return selectionSlice(1, -1)(output)
  return surroundWith('_', '_')(output)
}

const quote: TextStyler = input => {
  let output = expandCursor(trimSelection(input))

  const multiline = isMultiLine(output)

  if (!multiline && output.selection.startsWith('> '))
    return selectionSlice(2)(output)

  if (isSurroundedBy('> ', '')(output)) return removeSurrounding(2, 0)(output)

  if (
    multiline &&
    output.selection.split('\n').every(line => line.startsWith('> '))
  )
    return {
      left: output.left,
      selection: output.selection.replace(/^> /gm, ''),
      right: output.right
    }

  output = newLineSurround(output)
  if (multiline)
    return {
      left: output.left,
      selection: '> ' + output.selection.replace(/\n/g, '\n> '),
      right: output.right
    }

  return surroundWith('> ', '')(output)
}

const code: TextStyler = input => {
  let output = expandCursor(trimSelection(input))
  const multiline = isMultiLine(output)

  if (!multiline && selectionIncludes('`', '`')(output))
    return selectionSlice(1, -1)(output)

  if (!multiline && isSurroundedBy('`', '`')(output))
    return removeSurrounding(1, 1)(output)

  if (multiline && isSurroundedBy('```\n', '\n```')(output))
    return removeSurrounding(4, 4)(output)

  if (multiline && selectionIncludes('```\n', '\n```')(output))
    return selectionSlice(4, -4)(output)

  if (!multiline) return surroundWith('`', '`')(output)

  output = newLineSurround(output)
  return surroundWith('```\n', '\n```')(output)
}

const link: TextStyler = input => {
  const output = expandCursor(trimSelection(input))

  return {
    left: output.left + '[' + output.selection + '](',
    selection: 'URL',
    right: ')' + output.right
  }
}

const bulletList: TextStyler = input => {
  let output = expandCursor(trimSelection(input))
  const multiline = isMultiLine(output)

  if (!multiline && selectionIncludes('- ', '')(output))
    return selectionSlice(2)(output)

  if (!multiline && isSurroundedBy('- ', '')(output))
    return removeSurrounding(2, 0)(output)

  if (
    multiline &&
    output.selection.split('\n').every(line => line.startsWith('- '))
  )
    return {
      left: output.left,
      selection: output.selection.replace(/^- /gm, ''),
      right: output.right
    }

  output = newLineSurround(output)

  if (multiline)
    return {
      left: output.left,
      selection: output.selection.replace(/^/gm, '- '),
      right: output.right
    }

  return surroundWith('- ', '')(output)
}

const orderedList: TextStyler = input => {
  let output = expandCursor(trimSelection(input))
  const multiline = isMultiLine(output)

  if (
    !multiline &&
    (output.left === '' || output.left.endsWith('\n')) &&
    /^\d+\. /.test(output.selection)
  )
    return {
      left: output.left,
      selection: output.selection.replace(/^\d+\. /, ''),
      right: output.right
    }

  if (!multiline && /(^|\n)\d+\. $/.test(output.left)) {
    return {
      left: output.left.replace(/\d+\. $/, ''),
      selection: output.selection,
      right: output.right
    }
  }
  if (
    multiline &&
    output.selection.split('\n').every(line => /^\d+\. /.test(line))
  )
    return {
      left: output.left,
      selection: output.selection.replace(/^\d+\. /gm, ''),
      right: output.right
    }

  output = newLineSurround(output)

  if (multiline)
    return {
      left: output.left,
      selection: output.selection
        .split('\n')
        .map((line, i) => `${i + 1}. ${line}`)
        .join('\n'),
      right: output.right
    }

  return surroundWith('1. ', '')(output)
}

export const markdown = {
  header: applyStyles(header),
  bold: applyStyles(bold),
  italic: applyStyles(italic),
  quote: applyStyles(quote),
  code: applyStyles(code),
  link: applyStyles(link),
  bulletList: applyStyles(bulletList),
  orderedList: applyStyles(orderedList)
}

// For unit testing internal helper functions
export const testing = {
  getTextAreaState,
  toTextAreaState,
  toTextStyle,
  //Predicates
  selectionIncludes,
  isSurroundedBy,
  isMultiLine,
  // Stylers
  trimSelection,
  expandCursor,
  newLineSurround,
  surroundWith,
  removeSurrounding,
  selectionSlice,
  // Styler compose and type conversion
  applyStyles
}
