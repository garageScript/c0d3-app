import { markdown, toTextAreaState, toTextStyle, testing } from './textStylers'

describe('textStylers', () => {
  describe('internal helpers', () => {
    describe('type conversion', () => {
      const textAreaState = {
        value: '01234tom89',
        selectionStart: 5,
        selectionEnd: 8
      }

      const textStyle = {
        left: '01234',
        selection: 'tom',
        right: '89'
      }
      test('getTextAreaState should remove non TextAreaState interface props', () => {
        const fakeNodeRef = {
          ...textAreaState,
          nodeName: 'skip'
        }

        expect(testing.getTextAreaState(fakeNodeRef)).toEqual(textAreaState)
      })
      test('toTextStyle: TextAreaState -> TextStyle', () => {
        expect(toTextStyle(textAreaState)).toEqual(textStyle)
      })
      test('toTextAreaState: TextStyle -> TextAreaState ', () => {
        expect(toTextAreaState(textStyle)).toEqual(textAreaState)
      })
    })
    describe('Styler Predicates', () => {
      test('selectionInclude: selection includes prefix/suffix ', () => {
        const selectionIncludesStars = testing.selectionIncludes('**', '**')

        expect(
          selectionIncludesStars({
            left: 'test',
            selection: '**tom**',
            right: 'test'
          })
        ).toBe(true)

        expect(
          selectionIncludesStars({
            left: 'test**',
            selection: 'tom',
            right: '**test'
          })
        ).toBe(false)
      })

      test('isSurroundedBy: left ends with prefix and right starts with suffix ', () => {
        const isSurroundedByStars = testing.isSurroundedBy('**', '**')

        expect(
          isSurroundedByStars({
            left: 'test**',
            selection: 'tom',
            right: '**test'
          })
        ).toBe(true)

        expect(
          isSurroundedByStars({
            left: 'test',
            selection: '**tom**',
            right: 'test'
          })
        ).toBe(false)
      })
      test('isMultiLine: selection contains lineBreak ', () => {
        const { isMultiLine } = testing

        expect(
          isMultiLine({
            left: 'test',
            selection: 'tom\ntom',
            right: 'test'
          })
        ).toBe(true)

        expect(
          isMultiLine({
            left: 'test',
            selection: '**tom**',
            right: 'test'
          })
        ).toBe(false)
      })
    })
    describe('General TextStylers', () => {
      describe('trimSelection', () => {
        const { trimSelection } = testing
        test('should return input if no selection exists', () => {
          const input = {
            left: 'tom',
            selection: '',
            right: ' is cool'
          }
          expect(trimSelection(input)).toEqual(input)
        })
        test('should move edge white space outside of selection', () => {
          expect(
            trimSelection({
              left: 'what',
              selection: '\ntom ',
              right: 'is cool'
            })
          ).toEqual({ left: 'what\n', selection: 'tom', right: ' is cool' })
        })
      })

      describe('expandCursor', () => {
        const { expandCursor } = testing
        test('should expand to full word ', () => {
          expect(
            expandCursor({
              left: '',
              selection: '',
              right: 'nospaceheretom'
            })
          ).toEqual({
            left: '',
            selection: 'nospaceheretom',
            right: ''
          })
        })

        test('should not expand if selection exists', () => {
          expect(
            expandCursor({
              left: 'what\nt',
              selection: 'o',
              right: 'm is cool'
            })
          ).toEqual({
            left: 'what\nt',
            selection: 'o',
            right: 'm is cool'
          })
        })
        test('should expand to first whitespace', () => {
          expect(
            expandCursor({
              left: 'what\nto',
              selection: '',
              right: 'm is cool'
            })
          ).toEqual({
            left: 'what\n',
            selection: 'tom',
            right: ' is cool'
          })
        })
      })

      test('newLineSurround: should add missing newlines around selection', () => {
        const { newLineSurround } = testing
        expect(
          newLineSurround({
            left: 'what\n',
            selection: 'tom',
            right: ' is cool'
          })
        ).toEqual({
          left: 'what\n\n',
          selection: 'tom',
          right: '\n\n is cool'
        })
      })
      test('newLineSurround: no new lines on first or last line ', () => {
        const { newLineSurround } = testing
        expect(
          newLineSurround({
            left: '',
            selection: 'tom',
            right: ''
          })
        ).toEqual({
          left: '',
          selection: 'tom',
          right: ''
        })
      })
      test('surroundWith: add prefix/suffix around selection ', () => {
        const surroundWithGreatness = testing.surroundWith('great', 'great')
        expect(
          surroundWithGreatness({
            left: '',
            selection: 'tom',
            right: ''
          })
        ).toEqual({
          left: 'great',
          selection: 'tom',
          right: 'great'
        })
      })
      test('removeSurrounding: remove x chars from around selection', () => {
        const removeSurroundingThree = testing.removeSurrounding(3, 3)
        expect(
          removeSurroundingThree({
            left: 'bad',
            selection: 'tom',
            right: 'bad'
          })
        ).toEqual({
          left: '',
          selection: 'tom',
          right: ''
        })
      })

      test('selectionSlice: remove x chars from selection', () => {
        const selectionSliceThree = testing.selectionSlice(3, -3)
        expect(
          selectionSliceThree({
            left: '',
            selection: 'badtombad',
            right: ''
          })
        ).toEqual({
          left: '',
          selection: 'tom',
          right: ''
        })
      })

      test('applyStyles: should compose stylers and convert state', () => {
        const { applyStyles, expandCursor, surroundWith } = testing
        const expandAndBold = applyStyles(
          surroundWith('**', '**'),
          expandCursor
        )

        expect(
          expandAndBold({
            value: 'test tom out',
            selectionStart: 7,
            selectionEnd: 7
          })
        ).toEqual({
          value: 'test **tom** out',
          selectionStart: 7,
          selectionEnd: 10
        })
      })
    })
  })

  describe('Markdown Toolbar Styles', () => {
    // All these tests will be using the type conversion functions
    // toTextAreaState <-> toTextStyle as it reduces the mental load
    // not having to manually convert index numbers into cursor location.

    let noStyleText

    beforeEach(() => {
      noStyleText = toTextAreaState({
        left: 'plain ',
        selection: 'text',
        right: ' here'
      })
    })

    describe('Bold', () => {
      test('Apply style to selection', () => {
        expect(toTextStyle(markdown.bold(noStyleText))).toEqual({
          left: 'plain **',
          selection: 'text',
          right: '** here'
        })
      })
      test('Remove style around selection', () => {
        const input = toTextAreaState({
          left: 'plain **',
          selection: 'text',
          right: '** here'
        })
        expect(markdown.bold(input)).toEqual(noStyleText)
      })
      test('Remove style in selection', () => {
        const input = toTextAreaState({
          left: 'plain ',
          selection: '**text**',
          right: ' here'
        })
        expect(markdown.bold(input)).toEqual(noStyleText)
      })
      test('Remove style after cursor expansion', () => {
        const input = toTextAreaState({
          left: 'plain **',
          selection: '',
          right: 'text** here'
        })

        expect(markdown.bold(input)).toEqual(noStyleText)
      })
    })

    describe('Italic', () => {
      test('Apply style to selection', () => {
        expect(toTextStyle(markdown.italic(noStyleText))).toEqual({
          left: 'plain _',
          selection: 'text',
          right: '_ here'
        })
      })
      test('Remove style around selection', () => {
        const input = toTextAreaState({
          left: 'plain _',
          selection: 'text',
          right: '_ here'
        })
        expect(markdown.italic(input)).toEqual(noStyleText)
      })
      test('Remove style in selection', () => {
        const input = toTextAreaState({
          left: 'plain ',
          selection: '_text_',
          right: ' here'
        })
        expect(markdown.italic(input)).toEqual(noStyleText)
      })
      test('Remove style after cursor expansion', () => {
        const input = toTextAreaState({
          left: 'plain _',
          selection: '',
          right: 'text_ here'
        })

        expect(markdown.italic(input)).toEqual(noStyleText)
      })
    })
    describe('Header', () => {
      test('Apply style with new lines', () => {
        expect(toTextStyle(markdown.header(noStyleText))).toEqual({
          left: 'plain \n\n### ',
          selection: 'text',
          right: '\n\n here'
        })
      })
      test('Apply Style without new line when selecting entire input', () => {
        const input = toTextAreaState({
          left: '',
          selection: 'tom',
          right: ''
        })
        const output = {
          left: '### ',
          selection: 'tom',
          right: ''
        }
        expect(toTextStyle(markdown.header(input))).toEqual(output)
      })

      test('Remove style leaving new lines', () => {
        const input = toTextAreaState({
          left: 'plain \n\n### ',
          selection: 'text',
          right: '\n\n here'
        })
        const output = {
          left: 'plain \n\n',
          selection: 'text',
          right: '\n\n here'
        }
        expect(toTextStyle(markdown.header(input))).toEqual(output)
      })

      test('should remove style if included in selection', () => {
        const input = toTextAreaState({
          left: '',
          selection: '### tom',
          right: ''
        })
        const output = {
          left: '',
          selection: 'tom',
          right: ''
        }
        expect(toTextStyle(markdown.header(input))).toEqual(output)
      })
    })

    describe('Quote', () => {
      test('Apply style to selection', () => {
        expect(toTextStyle(markdown.quote(noStyleText))).toEqual({
          left: 'plain \n\n> ',
          selection: 'text',
          right: '\n\n here'
        })
      })
      test('Apply style multiline', () => {
        const input = toTextAreaState({
          left: 'plain ',
          selection: 'test \ntom',
          right: '\n text'
        })
        const output = {
          left: 'plain \n\n',
          selection: '> test \n> tom',
          right: '\n\n text'
        }
        expect(toTextStyle(markdown.quote(input))).toEqual(output)
      })
      test('Remove style around selection leaving newlines', () => {
        const input = toTextAreaState({
          left: 'plain \n\n> ',
          selection: 'text',
          right: '\n\n here'
        })
        const output = {
          left: 'plain \n\n',
          selection: 'text',
          right: '\n\n here'
        }
        expect(toTextStyle(markdown.quote(input))).toEqual(output)
      })
      test('Remove style in selection', () => {
        const input = toTextAreaState({
          left: 'plain \n\n',
          selection: '> text',
          right: '\n\n here'
        })
        const output = {
          left: 'plain \n\n',
          selection: 'text',
          right: '\n\n here'
        }
        expect(toTextStyle(markdown.quote(input))).toEqual(output)
      })
      test('Remove style after cursor expansion', () => {
        const input = toTextAreaState({
          left: 'plain \n\n> ',
          selection: '',
          right: 'text\n\n here'
        })
        const output = {
          left: 'plain \n\n',
          selection: 'text',
          right: '\n\n here'
        }
        expect(toTextStyle(markdown.quote(input))).toEqual(output)
      })
      test('Remove style multiline', () => {
        const input = toTextAreaState({
          left: 'plain \n\n',
          selection: '> test \n> tom',
          right: '\n\n text'
        })
        const output = {
          left: 'plain \n\n',
          selection: 'test \ntom',
          right: '\n\n text'
        }
        expect(toTextStyle(markdown.quote(input))).toEqual(output)
      })
    })

    describe('Code', () => {
      test('Apply style to selection', () => {
        expect(toTextStyle(markdown.code(noStyleText))).toEqual({
          left: 'plain `',
          selection: 'text',
          right: '` here'
        })
      })

      test('Apply style multiline', () => {
        const input = toTextAreaState({
          left: 'plain ',
          selection: 'test \ntom',
          right: '\n text'
        })
        const output = {
          left: 'plain \n\n```\n',
          selection: 'test \ntom',
          right: '\n```\n\n text'
        }
        expect(toTextStyle(markdown.code(input))).toEqual(output)
      })

      test('Remove style around selection', () => {
        const input = toTextAreaState({
          left: 'plain `',
          selection: 'text',
          right: '` here'
        })
        const output = {
          left: 'plain ',
          selection: 'text',
          right: ' here'
        }
        expect(toTextStyle(markdown.code(input))).toEqual(output)
      })

      test('Remove style in selection', () => {
        const input = toTextAreaState({
          left: 'plain ',
          selection: '`text`',
          right: ' here'
        })
        const output = {
          left: 'plain ',
          selection: 'text',
          right: ' here'
        }
        expect(toTextStyle(markdown.code(input))).toEqual(output)
      })

      test('Remove style after cursor expansion', () => {
        const input = toTextAreaState({
          left: 'plain ',
          selection: '',
          right: '`text` here'
        })
        const output = {
          left: 'plain ',
          selection: 'text',
          right: ' here'
        }
        expect(toTextStyle(markdown.code(input))).toEqual(output)
      })

      test('Remove multiline style around selection', () => {
        const input = toTextAreaState({
          left: 'plain \n\n```\n',
          selection: 'test \ntom',
          right: '\n```\n\n text'
        })
        const output = {
          left: 'plain \n\n',
          selection: 'test \ntom',
          right: '\n\n text'
        }
        expect(toTextStyle(markdown.code(input))).toEqual(output)
      })

      test('Remove multiline style in selection', () => {
        const input = toTextAreaState({
          left: 'plain \n\n',
          selection: '```\ntest \ntom\n```',
          right: '\n\n text'
        })
        const output = {
          left: 'plain \n\n',
          selection: 'test \ntom',
          right: '\n\n text'
        }
        expect(toTextStyle(markdown.code(input))).toEqual(output)
      })
    })

    describe('Link', () => {
      test('Apply style to selection', () => {
        expect(toTextStyle(markdown.link(noStyleText))).toEqual({
          left: 'plain [text](',
          selection: 'URL',
          right: ') here'
        })
      })
    })

    describe('Bullet List', () => {
      test('Apply style to selection', () => {
        expect(toTextStyle(markdown.bulletList(noStyleText))).toEqual({
          left: 'plain \n\n- ',
          selection: 'text',
          right: '\n\n here'
        })
      })

      test('Apply style multiline', () => {
        const input = toTextAreaState({
          left: 'plain ',
          selection: 'test \ntom',
          right: ' text'
        })
        const output = {
          left: 'plain \n\n',
          selection: '- test \n- tom',
          right: '\n\n text'
        }
        expect(toTextStyle(markdown.bulletList(input))).toEqual(output)
      })

      test('Remove style around selection', () => {
        const input = toTextAreaState({
          left: 'plain \n\n\n- ',
          selection: 'text',
          right: '\n\n\n here'
        })
        const output = {
          left: 'plain \n\n\n',
          selection: 'text',
          right: '\n\n\n here'
        }
        expect(toTextStyle(markdown.bulletList(input))).toEqual(output)
      })

      test('Remove style in selection', () => {
        const input = toTextAreaState({
          left: 'plain \n\n\n',
          selection: '- text',
          right: '\n\n\n here'
        })
        const output = {
          left: 'plain \n\n\n',
          selection: 'text',
          right: '\n\n\n here'
        }
        expect(toTextStyle(markdown.bulletList(input))).toEqual(output)
      })

      test('Remove style after cursor expansion', () => {
        const input = toTextAreaState({
          left: 'plain \n\n\n- text',
          selection: '',
          right: '\n\n\n here'
        })
        const output = {
          left: 'plain \n\n\n',
          selection: 'text',
          right: '\n\n\n here'
        }
        expect(toTextStyle(markdown.bulletList(input))).toEqual(output)
      })

      test('Remove multiline style in selection', () => {
        const input = toTextAreaState({
          left: 'plain \n\n\n',
          selection: '- test \n- tom',
          right: '\n\n\n text'
        })
        const output = {
          left: 'plain \n\n\n',
          selection: 'test \ntom',
          right: '\n\n\n text'
        }
        expect(toTextStyle(markdown.bulletList(input))).toEqual(output)
      })
    })

    describe('Ordered List', () => {
      test('Apply style to selection', () => {
        expect(toTextStyle(markdown.orderedList(noStyleText))).toEqual({
          left: 'plain \n\n1. ',
          selection: 'text',
          right: '\n\n here'
        })
      })

      test('Apply style multiline', () => {
        const input = toTextAreaState({
          left: 'plain ',
          selection: 'test \ntom',
          right: ' text'
        })
        const output = {
          left: 'plain \n\n',
          selection: '1. test \n2. tom',
          right: '\n\n text'
        }
        expect(toTextStyle(markdown.orderedList(input))).toEqual(output)
      })

      test('Remove style around selection', () => {
        const input = toTextAreaState({
          left: 'plain \n\n1. ',
          selection: 'text',
          right: '\n\n here'
        })
        const output = {
          left: 'plain \n\n',
          selection: 'text',
          right: '\n\n here'
        }
        expect(toTextStyle(markdown.orderedList(input))).toEqual(output)
      })

      test('Remove style in selection', () => {
        const input = toTextAreaState({
          left: 'plain \n\n',
          selection: '1. text',
          right: '\n\n here'
        })
        const output = {
          left: 'plain \n\n',
          selection: 'text',
          right: '\n\n here'
        }
        expect(toTextStyle(markdown.orderedList(input))).toEqual(output)
      })

      test('Remove style after cursor expansion', () => {
        const input = toTextAreaState({
          left: 'plain \n\n1. text',
          selection: '',
          right: '\n\n here'
        })
        const output = {
          left: 'plain \n\n',
          selection: 'text',
          right: '\n\n here'
        }
        expect(toTextStyle(markdown.orderedList(input))).toEqual(output)
      })

      test('Remove multiline style in selection', () => {
        const input = toTextAreaState({
          left: 'plain \n\n',
          selection: '1. test \n2. tom',
          right: '\n\n text'
        })
        const output = {
          left: 'plain \n\n',
          selection: 'test \ntom',
          right: '\n\n text'
        }
        expect(toTextStyle(markdown.orderedList(input))).toEqual(output)
      })
    })
  })
})
