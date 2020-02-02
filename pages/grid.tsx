import * as React from 'react'
import Layout from '../components/UI/Layout'

const IndexPage: React.FC = () => {
  return (
    <div>
      {/* Grid CSS 12 Columns Layout */}
      <Layout>
        <div className="col-12">12 Columns</div>
        <div className="col-1">1 Column</div>
        <div className="col-11">11 Columns</div>
        <div className="col-2">2 Columns</div>
        <div className="col-10">10 Columns</div>
        <div className="col-3">3 Columns</div>
        <div className="col-9">9 Columns</div>
        <div className="col-4">4 Columns</div>
        <div className="col-8">8 Columns</div>
        <div className="col-5">5 Columns</div>
        <div className="col-7">7 Columns</div>
        <div className="col-6">6 Columns</div>
        <div className="col-6">6 Columns</div>
        <div className="col-1">1 Column</div>
        <div className="col-2">2 Columns</div>
        <div className="col-2">2 Columns</div>
        <div className="col-3">3 Columns</div>
        <div className="col-4">4 Columns</div>
      </Layout>

      <Layout>
        <Component1 />
        <Component2 />
        <Component3 />
      </Layout>

      {/* TailwindCSS 12 Columns Layout */}
      <div className="m-auto mt-4 mb-4" style={{ maxWidth: '1440px' }}>
        <div className="flex mb-4">
          <div className="w-full bg-gray-500 text-center">Full Column</div>
        </div>

        <div className="flex mb-4">
          <div className="w-1/12 bg-gray-500 text-center mr-4">1 Column</div>
          <div className="w-11/12 bg-gray-500 text-center">11 Columns</div>
        </div>

        <div className="flex mb-4">
          <div className="w-2/12 bg-gray-500 text-center mr-4">2 Columns</div>
          <div className="w-11/12 bg-gray-500 text-center">10 Columns</div>
        </div>

        <div className="flex mb-4">
          <div className="w-3/12 bg-gray-500 text-center mr-4">3 Columns</div>
          <div className="w-9/12 bg-gray-500 text-center">9 Columns</div>
        </div>

        <div className="flex mb-4">
          <div className="w-4/12 bg-gray-500 text-center mr-4">4 Columns</div>
          <div className="w-8/12 bg-gray-500 text-center">8 Columns</div>
        </div>

        <div className="flex mb-4">
          <div className="w-5/12 bg-gray-500 text-center mr-4">5 Columns</div>
          <div className="w-7/12 bg-gray-500 text-center">7 Columns</div>
        </div>

        <div className="flex mb-4">
          <div className="w-6/12 bg-gray-500 text-center mr-4">6 Columns</div>
          <div className="w-6/12 bg-gray-500 text-center">6 Columns</div>
        </div>

        <div className="flex mb-4">
          <div className="w-1/12 bg-gray-500 text-center mr-4">1 Column</div>
          <div className="w-2/12 bg-gray-500 text-center mr-4">2 Columns</div>
          <div className="w-2/12 bg-gray-500 text-center mr-4">2 Columns</div>
          <div className="w-3/12 bg-gray-500 text-center mr-4">3 Columns</div>
          <div className="w-4/12 bg-gray-500 text-center">4 Columns</div>
        </div>
      </div>

      <div className="m-auto flex mt-4" style={{ maxWidth: '1440px' }}>
        <ComponentA />
        <div className="w-7/12">
          <ComponentB />
          <ComponentC />
        </div>
      </div>
    </div>
  )
}

const Component1: React.FC = () => (
  <div className="myComponent1">
    <p>Component 1</p>
    <button className="myButton">Join Waitlist</button>
    <style jsx>{`
      .myComponent1 {
        grid-column: span 3;
        grid-row: span 2;
        background-color: #e2e8f0;
      }

      .myButton {
        width: 152px;
        height: 50px;
        border-radius: 3px;
        border: solid 1px #5438dc;
        background-color: #5438dc;
        color: #ffffff;
      }
    `}</style>
  </div>
)

const Component2: React.FC = () => (
  <div className="myComponent2">
    <p>Component 2</p>
    <style jsx>{`
      .myComponent2 {
        grid-column: 6/11;
        height: 100px;
        background-color: #e2e8f0;
      }
    `}</style>
  </div>
)

const Component3: React.FC = () => (
  <div className="myComponent3">
    <p>Component 3</p>
    <style jsx>{`
      .myComponent3 {
        grid-column: 4/11;
        height: 100px;
        background-color: #e2e8f0;
      }
    `}</style>
  </div>
)

const ComponentA: React.FC = () => (
  <div className="w-3/12 bg-gray-500 text-center mr-4 h-48">
    <p>Component 1</p>
    <button className="bg-indigo-700 text-white p-3 px-8 rounded-sm">
      Join Waitlist
    </button>
  </div>
)

const ComponentB: React.FC = () => (
  <div className="flex">
    <div className="w-9/12 bg-gray-500 text-center h-24 ml-40 mb-4">
      <p>Component 2</p>
    </div>
  </div>
)

const ComponentC: React.FC = () => (
  <div className="flex">
    <div className="w-full bg-gray-500 text-center h-24">
      <p>Component 3</p>
    </div>
  </div>
)

export default IndexPage
