import React from 'react'
import CSS from 'csstype'

type Props = {
  id: string
  style?: CSS.Properties
  height?: number
  defaultTab?: 'js' | 'css' | 'html' | 'result'
  showResult?: boolean
  theme?: 'light' | 'dark'
}

const CodePen: React.FC<Props> = ({
  id,
  height = 300,
  style = { width: '100%' },
  defaultTab = 'result',
  showResult = true,
  theme = 'light'
}) => {
  // User can select one of 3 tabs for left hand side: js / css / html
  // or pick 'result' to display full width result. selecting 'result' will
  // override 'showResults = false' as you must display some tab.
  // showResults true will display results on right hand side.
  const tabString =
    defaultTab === 'result'
      ? 'result'
      : `${defaultTab}${showResult ? '%2Cresult' : ''}` // %2C is URL encoded comma character

  return (
    <iframe
      height={height}
      style={style}
      scrolling="no"
      src={`https://codepen.io/c0d3codepen/embed/${id}?theme-id=${theme}&default-tab=${tabString}`}
      frameBorder="no"
      loading="lazy"
      allow="fullscreen"
    />
  )
}

export default CodePen
