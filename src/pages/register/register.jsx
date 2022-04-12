import React from 'react'
import { Link } from 'react-router-dom'
import { UserApi } from '../../apis/apiUser'
import Nav from '../nav.jsx'

class Register extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      submitStatus: false,
      error: '',
      success: '',
    }

    this.register = new UserApi('/auth/register')
  }

  check = { color: 'red' }

  render() {
    const show = this.state.submitStatus ? 'Submiting...' : 'Submit',
      error = this.state.error !== '' ? this.state.error : '',
      success = this.state.success !== '' ? this.state.success : ''
    return (
      <div>
        <Nav data={this.props} />
        <div style={{ marginBottom: 25 }}>
          <div className="container" id="div">
            <form id="form" onSubmit={this.submitForm}>
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
                  <h2>Register::</h2>
                </legend>
                <span style={this.check}>{error}</span>
                <span style={{ color: 'green' }}>{success}</span>
                <div className="form-group">
                  <label
                    htmlFor="exampleInputName"
                    style={{ color: '#80affc', fontSize: '20px' }}
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    placeholder="Enter Name"
                    required
                  />
                </div>
                <div className="form-group">
                  <label
                    htmlFor="exampleInputEmail1"
                    style={{ color: '#80affc', fontSize: '20px' }}
                  >
                    Email address
                  </label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="Enter Email"
                    required
                  />
                </div>
                <div className="form-group">
                  <label
                    htmlFor="exampleInputEmail1"
                    style={{ color: '#80affc', fontSize: '20px' }}
                  >
                    Phone Number
                  </label>
                  <input
                    type="text"
                    name="phone"
                    className="form-control"
                    placeholder="Enter Phone No"
                    required
                  />
                </div>
                <div className="form-group">
                  <label
                    htmlFor="exampleInputPassword1"
                    style={{ color: '#80affc', fontSize: '20px' }}
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    className="form-control fa fa-eye"
                    placeholder="Enter Password"
                    required
                  />
                </div>
                <button type="submit" name="submit" className="btn btn-primary">
                  {show}
                </button>
              </fieldset>
            </form>
            <em>
              <Link
                style={{ float: 'right', textDecoration: 'none' }}
                to="/login"
              >
                Login?
              </Link>
            </em>
          </div>
        </div>
      </div>
    )
  }

  submitForm = async (e) => {
    e.preventDefault()
    this.setState({ submitStatus: !this.state.submitStatus })
    const data = {
      name: e.target[1].value,
      email: e.target[2].value,
      phone: e.target[3].value,
      password: e.target[4].value,
    }

    this.register.postMethod(data).then((res) => {
      this.setState({ submitStatus: false })
      if (res.success) {
        this.setState({ success: 'successfully registered' })
        document.getElementById('form').reset()
      } else {
        this.setState({ error: 'registration error' })
        this.setState({ success: '' })
      }
    })
  }
}

export default Register
