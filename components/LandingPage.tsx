import * as React from 'react'

const LandingPage: React.FC = () => {
  return (
    <div className="container text-center">
      <div className="row justify-center mt-5">
        <div className="col-md-6 offset-md-3">
          <img src="header-01.svg" alt="Hero Image"></img>
        </div>
      </div>
      <div className="row justify-center mt-5">
        <div className="col-md-8 offset-md-2">
          <h1 style={{ fontWeight: 900, fontSize: '3.8rem' }}>
            Become a Software Engineer the Hard Way
          </h1>
        </div>
      </div>
      <div className="row justify-center mt-4">
        <div className="col-md-10 offset-md-1">
          <h4 style={{ lineHeight: 1.5 }} className="font-weight-light">
            Learn the right foundations you need to become a full stack software
            engineer. Our curriculum takes no shortcuts and effectively trains
            students with no technical background to become effective software
            engineers.
          </h4>
        </div>
      </div>
      <div className="row mt-5">
        <div className="col-md-6 offset-md-3 mb-5">
          <a href="https://c0d3.com/book" className="btn btn-primary py-3 px-5">
            Get Started
          </a>
        </div>
      </div>
      <div className="row mt-5">
        <div className="col-md-6 offset-md-3">
          <h1 className="display-4 font-weight-bold" id="learning">
            Learning Process
          </h1>
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
      <div className="row mt-5 align-items-start">
        <div className="col-md-4">
          <img
            src="choose-01.svg"
            alt="Curriculum"
            style={{ height: '170px' }}
          ></img>
          <h4 className="mt-3 font-weight-bold">Modern Curriculum</h4>
          <p className="mt-4 font-weight-light">
            First the curriculum will help you achieve mastery in JavaScript.
            Using JavaScript, you will learn about different branches of
            software engineering: websites, mobile applications, servers, and
            machine learning.
          </p>
        </div>
        <div className="col-md-4">
          <img
            src="choose-02.svg"
            alt="Support"
            style={{ height: '170px' }}
          ></img>
          <h4 className="mt-3 font-weight-bold">Support</h4>
          <p className="mt-4 font-weight-light">
            One of the most important skills in a challenging workplace is
            knowing how to ask for help. Our curriculum is intentionally
            difficult and we have dedicated mentors to answer your questions and
            guide you how to communicate effectively.
          </p>
        </div>
        <div className="col-md-4">
          <img
            src="choose-03.svg"
            alt="Curriculum Image"
            style={{ height: '170px' }}
          />
          <h4 className="mt-3 font-weight-bold">Work Experience</h4>
          <p className="mt-4 font-weight-light">
            Once you have completed our curriculum and learned to communicate
            effectively, you will be invited to contribute to this open-source
            project to improve the learning experience for future students.
          </p>
        </div>
      </div>
    </div>
  )
}

export default LandingPage
