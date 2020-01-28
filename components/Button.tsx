import * as React from 'react'

type Props = {
  children: string
  style?: string
}

const Button = ({ children, style }: Props) => {
  const btnClasses = style === 'dark' ? 'dark text-white' : 'light'
  return (
    <button className={`py-2 px-8 mx-4 rounded ${btnClasses}`}>
      {children}
      <style jsx>{`
        .light {
          background: #fff;
        }
        .dark {
          background: rgb(84, 64, 216);
        }
      `}</style>
    </button>
  )
}

export default Button
