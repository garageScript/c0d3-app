import React from 'react'
import Card from '../components/Card'
import Layout from '../components/Layout'

const Signup: React.FC = () => {
  return (
    <Layout>
      <Card title="Create Account">
        <form>
          <div className="form-group ">
            <input
              placeholder="Email address"
              type="text"
              className="form-control form-control-lg font-weight-light mb-3"
            />
            <input
              placeholder="Username"
              type="text"
              className="form-control form-control-lg font-weight-light mb-3"
            />
            <input
              placeholder="Password"
              type="password"
              className="form-control form-control-lg font-weight-light mb-3"
            />
            <input
              placeholder="First name"
              type="text"
              className="form-control form-control-lg font-weight-light mb-3"
            />
            <input
              placeholder="Last name"
              type="text"
              className="form-control form-control-lg font-weight-light mb-3"
            />
            <button
              type="button"
              className="btn btn-primary btn-lg btn-block mb-3"
            >
              Create Account
            </button>
            <p className="text-black-50">
              Already have an account?{' '}
              <a href="/login" className="text-primary">
                Login
              </a>
            </p>
          </div>
        </form>
      </Card>
    </Layout>
  )
}

export default Signup
