import * as React from 'react'
import NavLink from './NavLink'
import Image from 'next/image'

const LandingPage: React.FC = () => {
  return (
    <div className="bg-white">
      <div className="container text-center pb-5">
        <div className="row justify-center pt-5">
          <div className="col-md-6 offset-md-3">
            <Image
              height="360"
              width="313"
              alt="Hero image"
              src="/assets/landing/header-01.svg"
            />
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
            <p style={{ lineHeight: 1.5 }} className="fw-light h4">
              Learn the right foundations you need to become a full stack
              software engineer. Our curriculum takes no shortcuts and
              effectively trains students with no technical background to become
              great software engineers.
            </p>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-md-6 offset-md-3 mb-5">
            <NavLink path="/curriculum" className="btn btn-primary py-3 px-5">
              Get Started
            </NavLink>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-md-6 offset-md-3">
            <h1 className="display-4 fw-bold" id="learning">
              Learning Process
            </h1>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-md-10 offset-md-1">
            <p className="fw-light h4" style={{ lineHeight: 1.5 }}>
              Our learning process is interactive and follows the same practice
              as a well functioning engineering team. From the first line of
              code you write, you will be code reviewed by engineers to ensure
              you are always following industry best practices.
            </p>
          </div>
        </div>
        <div className="row mt-5 align-items-start mb-5">
          <div className="col-md-4">
            <Image
              src="/assets/landing/choose-01.svg"
              height="170"
              layout="fixed"
              alt="Modern curriculum"
              width="163"
            />
            <p className="mt-3 fw-bold h3">Modern Curriculum</p>
            <p className="mt-4 fw-light">
              First the curriculum will help you achieve mastery in JavaScript.
              Using JavaScript, you will learn about different branches of
              software engineering: websites, mobile applications, servers, and
              machine learning.
            </p>
          </div>
          <div className="col-md-4">
            <Image
              src="/assets/landing/choose-02.svg"
              height="170"
              layout="fixed"
              alt="Support"
              width="259"
            />
            <p className="mt-3 fw-bold h3">Support</p>
            <p className="mt-4 fw-light">
              One of the most important skills in a challenging workplace is
              knowing how to ask for help. Our curriculum is intentionally
              difficult and we have dedicated mentors to answer your questions
              and guide you how to communicate effectively.
            </p>
          </div>
          <div className="col-md-4">
            <Image
              src="/assets/landing/choose-03.svg"
              height="170"
              width="93"
              alt="Work Experience"
              layout="fixed"
            />
            <p className="mt-3 fw-bold h3">Work Experience</p>
            <p className="mt-4 fw-light">
              Once you have completed our curriculum and learned to communicate
              effectively, you will be invited to contribute to this open-source
              project to improve the learning experience for future students.
            </p>
          </div>
        </div>
      </div>
      <div
        className="container-fluid py-5"
        style={{ background: 'rgb(84,64,216)', color: 'white' }}
      >
        <div className="container mt-5">
          <h1 id="journey" className="mt-5 display-4 fw-bold text-center">
            Your Learning Journey
          </h1>
          <p
            className="mt-5 fw-light col-md-8 offset-md-2 pb-5 text-center h4"
            style={{ lineHeight: 1.5 }}
          >
            Our learning process is interactive and follows the same practice as
            a well functioning engineering team. From the first line of code you
            write, you will be code reviewed by engineers to ensure you are
            always following industry best practice
          </p>
          <div className="row mt-5 pb-5">
            <div className="col-md-5 order-md-2 text-center">
              <Image
                src="/assets/landing/journey-01.svg"
                alt="Creating an account"
                layout="intrinsic"
                width="403"
                height="293"
              />
            </div>
            <div className="col-md-5 offset-md-1 order-md-1 align-self-center">
              <h2 className="fw-bold">Creating an account</h2>
              <p className="mt-3 fw-light" style={{ lineHeight: 1.5 }}>
                After creating an account, you will gain access to our code
                reviewed curriculum and our community chat. You will be able to
                setup c0d3.com CLI which will allow you to submit code for
                review. The CLI allows you to code in Javascript from any code
                editor of your choice.
              </p>
            </div>
          </div>
          <div className="row mt-5 pb-5">
            <div className="col-md-5 offset-md-1 text-center">
              <Image
                height="449"
                width="419"
                alt="Curriculum"
                src="/assets/landing/journey-02.svg"
                layout="intrinsic"
              />
            </div>
            <div className="col-md-5 align-self-center">
              <h2 className="fw-bold">Curriculum</h2>
              <p className="mt-3 fw-light" style={{ lineHeight: 1.5 }}>
                Each lesson in our curriculum is designed to be hands on and you
                will learn by working through the exercises in the curriculum.
                All hosting will be provided for you so you can proudly share
                your accomplishments with the world without spending a penny.
                The exercises and challenges are designed to be difficult to
                force you to ask questions. Students who have passed the lessons
                are available in the chatrooms to help you with your questions.{' '}
                <span className="fw-bold">
                  (Meetups are currently unavailable due to COVID-19)
                </span>
              </p>
            </div>
          </div>
          <div className="row mt-5 pb-5">
            <div className="col-md-5 order-md-2 text-center">
              <Image
                src="/assets/landing/journey-03.svg"
                alt="Pay it forward"
                layout="intrinsic"
                height="437"
                width="419"
              />
            </div>
            <div className="col-md-5 order-md-1 offset-md-1 align-self-center">
              <h2 className="fw-bold">Pay It Forward</h2>
              <p className="mt-3 fw-light" style={{ lineHeight: 1.5 }}>
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
            <div className="col-md-5 offset-md-1 text-center">
              <Image
                src="/assets/landing/journey-04.svg"
                layout="intrinsic"
                width="316"
                height="418"
                alt="Work Experience"
              />
            </div>
            <div className="col-md-5 align-self-center">
              <h2 className="fw-bold">Work Experience</h2>
              <p className="mt-3 fw-light" style={{ lineHeight: 1.5 }}>
                After completing our curriculum, you will gain access to our
                internal code repository that powers c0d3.com and have the
                opportunity to work with our engineers and experience the entire
                workflow of a full stack software engineer. There will be bugs
                and feature list on our issue board for you to contribute to and
                you will be held to the same expectations as any respected
                engineer: high quality code and proper testing. Every feature
                contribution will be documented and recognized on our
                contribution list and you would be able to list your
                contributions as work experience on your resume.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="container mt-5 py-5 text-center">
        <h1 className="display-4 fw-bold">Start Your Journey</h1>
        <p
          className="mt-3 fw-light"
          style={{ lineHeight: 1.5, fontSize: '1.5rem' }}
        >
          Become a full stack software engineer - 100% Free!
        </p>
        <NavLink path="/curriculum" className="btn btn-primary py-3 px-5 mt-4">
          Get Started
        </NavLink>
      </div>
    </div>
  )
}

export default LandingPage
