import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import CodePen from './CodePen'
describe('CodePen component', () => {
  test('should render a single iframe element', () => {
    const { container } = render(
      <CodePen id="SOME_TEST" height="500" defaultTab="js" showResult={true} />
    )
    expect(container.children.length).toBe(1)
    expect(container.children[0].tagName).toBe('IFRAME')
  })

  test('should render correct src value containing prop values', () => {
    const { container } = render(
      <CodePen
        id="SOME_TEST"
        height="1000"
        defaultTab="html"
        showResult={false}
        theme="dark"
      />
    )
    expect(container.children[0]).toHaveAttribute(
      'src',
      'https://codepen.io/c0d3codepen/embed/SOME_TEST?theme-id=dark&default-tab=html'
    )
  })

  test("should render default height and style of 300 and {width: '100%'}", () => {
    const { container } = render(<CodePen id="SOME_TEST" defaultTab="html" />)
    const iframe = container.children[0]
    expect(iframe).toHaveAttribute('style', 'width: 100%;')
    expect(iframe).toHaveAttribute('height', '300')
  })

  test('should render light theme and result tab only by default', () => {
    const { container } = render(<CodePen id="SOME_TEST" />)
    expect(container.children[0]).toHaveAttribute(
      'src',
      'https://codepen.io/c0d3codepen/embed/SOME_TEST?theme-id=light&default-tab=result'
    )
  })

  test('should render selected tab, "html", and include result tab by default', () => {
    const { container } = render(<CodePen id="SOME_TEST" defaultTab="html" />)
    expect(container.children[0]).toHaveAttribute(
      'src',
      'https://codepen.io/c0d3codepen/embed/SOME_TEST?theme-id=light&default-tab=html%2Cresult'
    )
  })
  test('should match screenshot', () => {
    const { container } = render(
      <CodePen
        id="SOME_OTHER_TEST"
        height={3001}
        style={{ maxWidth: '700px' }}
        defaultTab="css"
      />
    )
    expect(container).toMatchSnapshot()
  })
})
