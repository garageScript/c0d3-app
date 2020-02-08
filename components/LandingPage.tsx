import * as React from 'react'

const LandingPage: React.FC = () => {
  return (
    <React.Fragment>
      <div className="container text-center pb-5">
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
              Learn the right foundations you need to become a full stack
              software engineer. Our curriculum takes no shortcuts and
              effectively trains students with no technical background to become
              effective software engineers.
            </h4>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-md-6 offset-md-3 mb-5">
            <a
              href="https://c0d3.com/book"
              className="btn btn-primary py-3 px-5"
            >
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
              Our learning process is interactive and follows the same practice
              as a well functioning engineering team. From the first line of
              code you write, you will be code reviewed by engineers to ensure
              you are always following industry best practices.
            </h4>
          </div>
        </div>
        <div className="row mt-5 align-items-start mb-5">
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
              difficult and we have dedicated mentors to answer your questions
              and guide you how to communicate effectively.
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
      <div
        className="container-fluid text-center py-5"
        style={{ background: 'rgb(84,64,216)', color: 'white' }}
      >
        <div className="container mt-5">
          <h1 id="journey" className="mt-5 display-4 font-weight-bold">
            Your Learning Journey
          </h1>
          <h4
            className="mt-5 font-weight-light col-md-10 offset-md-1 pb-5"
            style={{ lineHeight: 1.5 }}
          >
            Our learning process is interactive and follows the same practice as
            a well functioning engineering team. From the first line of code you
            write, you will be code reviewed by engineers to ensure you are
            always following industry best practice
          </h4>
          <div className="row mt-5 pb-5">
            <div className="col-md-6 order-md-2">
              <img src="journey-01.svg" className="mb-3"></img>
            </div>
            <div className="col-md-6 order-md-1">
              <h2 className="font-weight-bold">Creating an account</h2>
              <p className="mt-3 font-weight-light">
                After creating an account, you will gain access to our code
                reviewed curriculum and our community chat. You will be able to
                setup c0d3.com CLI which will allow you to submit code for
                reivew. The CLI allows you to code in Javascript from any code
                editor of your choice.
              </p>
            </div>
          </div>
          <div className="row mt-5 pb-5">
            <div className="col-md-6">
              <img src="journey-02.svg" className="mb-3" />
            </div>
            <div className="col-md-6">
              <h2 className="font-weight-bold">Curriculum</h2>
              <p className="mt-3 font-weight-light">
                Each lesson in our curriculum is designed to be hands on and you
                will learn by working through plenty of exercises. There will be
                video lectures to guide you along as well as lecture notes. In
                the interactive lessons where you write server code and build
                web applications, you will be able to create your own subdomains
                and your code is immediately available on c0d3.com around the
                world. If you get stuck, you can ask for help in our chat
                channel, where students who passed the lessons would be helping
                you along.
              </p>
            </div>
          </div>
          <div className="row mt-5 pb-5">
            <div className="col-md-6 order-md-2">
              <img src="journey-03.svg" className="mb-3" />
            </div>
            <div className="col-md-6 order-md-1">
              <h2 className="font-weight-bold">Conducting Code Reviews</h2>
              <p className="mt-3 font-weight-light">
                When you finish your lesson, you will have the opportunity to
                help new students who are starting the lesson. By code reviewing
                students to the same standard that you were code reviewed, you
                help ensure that new students are writing good code and becoming
                better engineers. At the same time, conducting regular code
                reviews helps you improve your ability to read/debug code as
                well as understand the lesson concepts at a deeper level.
              </p>
            </div>
          </div>
          <div className="row mt-5 pb-5">
            <div className="col-md-6">
              <img src="journey-04.svg" className="mb-3" />
            </div>
            <div className="col-md-6">
              <h2 className="font-weight-bold">Work Experience</h2>
              <p className="mt-3 font-weight-light">
                After completing our curriculum, you will gain access to our
                internal code repository that powers c0d3.com and have the
                opportunity to work with our engineers and experience the entire
                workflow of a full stack software engineer. There will be bugs
                and feature list on our issue board for you to contribute to and
                you will be held to the same expectations as any respected
                engineer: high quality code and proper testing. Every feature
                contribution will be documented and recogized on our
                contribution list and you would be able to list your
                contributions as work experience on your resume.
              </p>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default LandingPage
