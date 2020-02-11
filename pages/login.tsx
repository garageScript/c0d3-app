import * as React from 'react'
import Layout from '../components/Layout'
import Card from '../components/Card'

const Login: React.FC = () => {
  return (
    <Layout>
      <Card title="Login">
        <form>
          <div className="form-group">
            <input
              placeholder="Email address or username"
              type="text"
              className="form-control form-control-lg font-weight-light mb-3"
            />
          </div>
          <input
            placeholder="Password"
            type="text"
            className="form-control form-control-lg font-weight-light mb-3"
          />
          <button
            type="button"
            className="btn btn-primary btn-lg btn-block mb-3"
          >
            Login to Your Account
          </button>
          <a href="">Forgot your password?</a>
        </form>
      </Card>
    </Layout>
  )
}

export default Login
