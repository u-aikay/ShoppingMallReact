import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Session from 'react-session-api'
import { UserApi } from '../../apis/apiUser'
import '../../css/App.css'
import Nav from '../nav.jsx'

class Login extends Component {
  state = {
    submitStatus: false,
    error: '',
  }

  componentDidMount() {
    if (window.sessionStorage.getItem('id')) {
      console.log(window.sessionStorage.getItem('id'), 'hhh')
      window.sessionStorage.removeItem('id')

      this.setState(prev=>({
        ...prev
      }))

      Session.remove('data')
    }

    this.userlogin = new UserApi('/auth/login')
  }

  render() {
    const show = this.state.submitStatus ? 'Submiting...' : 'Submit',
      error = this.state.error !== '' ? this.state.error : ''

    return (
      <div>
        <Nav data={this.props} />
        <div className="container" id="div">
          <form onSubmit={this.submitForm}>
            <fieldset
              style={{
                borderRight: '1px solid #80afbc',
                borderLeft: '1px solid #80afbc',
                borderBottom: '1px solid #80afbc',
                padding: '15px',
                borderRadius: '12px',
              }}
            >
              <legend>
                <h2>Login::</h2>
              </legend>
              <span style={{ color: 'red' }}>{error}</span>
              <div className="form-group">
                <label
                  htmlFor="exampleInputEmail1"
                  style={{ color: '#80affc', fontSize: '20px' }}
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter Email"
                  required
                ></input>
              </div>
              <div className="form-group">
                <label
                  htmlFor="exampleInputPassword1"
                  style={{ color: '#80affc', fontSize: '20px' }}
                >
                  Password:
                </label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  id="exampleInputPassword1"
                  placeholder="Enter Password"
                  required
                ></input>
              </div>
              <button type="submit" name="submit" className="btn btn-primary">
                {show}
              </button>
            </fieldset>
          </form>
          <em>
            <Link
              style={{
                float: 'right',
                textDecoration: 'none',
                marginLeft: '5px',
              }}
              to="/register"
            >
              Register?
            </Link>
            <Link
              style={{ float: 'right', textDecoration: 'none' }}
              to="/reset"
            >
              Forgot password?
            </Link>
          </em>
        </div>
      </div>
    )
  }

  submitForm = async (e) => {
    e.preventDefault()

    this.setState({ submitStatus: !this.state.submitStatus })

    this.userlogin
      .postMethod({
        email: e.target[1].value,
        password: e.target[2].value,
      })
      .then((res) => {
        if (res.statusCode === 204) {
          window.sessionStorage.setItem('id', res.id)
          this.props.history.push('/profile')
        } else {
          this.setState({ error: res.message })
          this.setState({ submitStatus: !this.state.submitStatus })
        }
      })
  }
}

export default Login
