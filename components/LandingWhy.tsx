import * as React from 'react'

const LandingWhy = () => {
  return (
    <React.Fragment>
      <div className="row mt-5">
        <div className="col-md-6 offset-md-3">
          <h1 className="display-4 font-weight-bold">Why choose us?</h1>
        </div>
      </div>
      <div className="row mt-5">
        <div className="col-md-10 offset-md-1">
          <h4 className="font-weight-light" style={{ lineHeight: 1.5 }}>
            Our learning process is interactive and follows the same practice as
            a well functioning engineering team. From the first line of code you
            write, you will be code reviewed by engineers to ensure you are
            always following industry best practices.
          </h4>
        </div>
      </div>
      <div className="row mt-5 align-items-end">
        <div className="col-md-4">
          <div>
            <img src="choose-01.svg" alt="Curriculum"></img>
          </div>
          <h4 className="mt-3 font-weight-bold">
            Updated and modern curriculum
          </h4>
          <p className="mt-4 font-weight-light">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatum
            illum consectetur earum temporibus obcaecati repudiandae esse, sed
            necessitatibus, voluptas dolorum adipisci molestiae magni
            praesentium doloribus odio laudantium, consequuntur aliquam? Ad?
          </p>
        </div>
        <div className="col-md-4">
          <div>
            <img src="choose-02.svg" alt="Mentors and Peers"></img>
          </div>
          <h4 className="mt-3 font-weight-bold">
            Real-time help from your mentors and peer
          </h4>
          <p className="mt-4 font-weight-light">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tempore
            quos magni cum voluptates autem molestiae vel, eligendi ipsam
            eveniet omnis laudantium ipsa similique distinctio numquam aliquid
            quis odio? Nostrum, aspernatur!
          </p>
        </div>
        <div className="col-md-4">
          <div>
            <img src="choose-03.svg" alt="Curriculum Image" />
          </div>
          <h4 className="mt-3 font-weight-bold">
            Practical experience by working with other engineers
          </h4>
          <p className="mt-4 font-weight-light">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur
            recusandae dolorum fuga tempore officiis exercitationem eum debitis
            necessitatibus facere praesentium molestiae, iure iusto accusantium
            a ullam cumque atque sapiente accusamus.
          </p>
        </div>
      </div>
    </React.Fragment>
  )
}

export default LandingWhy
