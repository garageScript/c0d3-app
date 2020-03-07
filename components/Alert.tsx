import React from 'react'

type Props = {
  alertText: string
}

const Alert: React.FC<Props> = props => {
  return (
    <div className="alert bg-primary text-white col-12 mt-4" role="alert">
      <img className="mr-3" src="/curriculumAssets/icons/icon-tip.svg" />
      {`${props.alertText} `}
      <a className="text-white" href="#">
        View Instructions
      </a>
    </div>
  )
}

export default Alert
