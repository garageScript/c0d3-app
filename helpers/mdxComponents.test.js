import mdxComponents from './mdxComponents'
import { render } from '@testing-library/react'
import React from 'react'

describe('mdxComponents', () => {
  test('Should add mdx classnames', () => {
    expect(mdxComponents.h1()).toEqual(<h1 className="MDX_h1" />)
    expect(mdxComponents.h2()).toEqual(<h2 className="MDX_h2" />)
    expect(mdxComponents.h3()).toEqual(<h3 className="MDX_h3" />)
    expect(mdxComponents.inlineCode()).toEqual(<code className="inline-code" />)
    expect(mdxComponents.a()).toEqual(<a className="MDX_a" />)
    expect(mdxComponents.td()).toEqual(<td className="MDX_td" />)
    expect(mdxComponents.ol()).toEqual(<ol className="MDX_ol" />)
    expect(mdxComponents.ul()).toEqual(<ul className="MDX_ul" />)
    expect(mdxComponents.th()).toEqual(<th className="MDX_th" />)
    expect(mdxComponents.twoColumns(<div></div>)).toEqual(
      <div className="MDX_twoColumns" />
    )
  })
})
