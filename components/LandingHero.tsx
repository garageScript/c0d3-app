import * as React from 'react'

const LandingHero = () => {
  return (
    <div className="container text-center">
      <div className="row justify-center mt-5">
        <div className="col-md-6 offset-md-3">
          <img src="https://dummyimage.com/325x361/000/fff"></img>
        </div>
      </div>
      <div className="row justify-center mt-5">
        <div className="col-md-8 offset-md-2">
          <h1 style={{ fontWeight: 900, fontSize: '4rem' }}>
            Learn Javascript the old school way
          </h1>
        </div>
      </div>
      <div className="row justify-center mt-4">
        <div className="col-md-6 offset-md-3">
          <h4 style={{ lineHeight: 1.5 }} className="font-weight-normal">
            Learn all the foundations you would need to be a full stack software
            engineer
          </h4>
        </div>
      </div>
      <div className="row mt-5">
        <div className="col-md-6 offset-md-3 mb-5">
          <button className="btn btn-primary py-3 px-5">Get Started</button>
        </div>
      </div>
      <div className="row mt-5">
        <div className="col-md-6 offset-md-3">
          <h1 className="display-4 font-weight-bold">Why choose us?</h1>
        </div>
      </div>
      <div className="row mt-5">
        <div className="col-md-10 offset-md-1">
          <h4 className="font-weight-normal" style={{ lineHeight: 1.5 }}>
            Our learning process is interactive and follows the same practice as
            a well functioning engineering team. From the first line of code you
            write, you will be code reviewed by engineers to ensure you are
            always following industry best practices.
          </h4>
        </div>
      </div>
      <div className="row mt-5">
        <div className="col-md-4">
          <img src="https://dummyimage.com/212x141/000/fff"></img>
          <h4 className="mt-3 font-weight-bold">
            Updated and modern curriculum
          </h4>
          <p className="mt-4">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatum
            illum consectetur earum temporibus obcaecati repudiandae esse, sed
            necessitatibus, voluptas dolorum adipisci molestiae magni
            praesentium doloribus odio laudantium, consequuntur aliquam? Ad?
          </p>
        </div>
        <div className="col-md-4">
          <img src="https://dummyimage.com/212x141/000/fff"></img>
          <h4 className="mt-3 font-weight-bold">
            Real-time help from your mentors and peer
          </h4>
          <p className="mt-4">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tempore
            quos magni cum voluptates autem molestiae vel, eligendi ipsam
            eveniet omnis laudantium ipsa similique distinctio numquam aliquid
            quis odio? Nostrum, aspernatur!
          </p>
        </div>
        <div className="col-md-4">
          <img src="https://dummyimage.com/212x141/000/fff" />
          <h4 className="mt-3 font-weight-bold">
            Practical experience by working with other engineers
          </h4>
          <p className="mt-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur
            recusandae dolorum fuga tempore officiis exercitationem eum debitis
            necessitatibus facere praesentium molestiae, iure iusto accusantium
            a ullam cumque atque sapiente accusamus.
          </p>
        </div>
      </div>
    </div>
  )
}

export default LandingHero
