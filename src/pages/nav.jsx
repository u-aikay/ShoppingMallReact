import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart'
import '../css/App.css'

class Nav extends Component {
  constructor() {
    super()
    this.state = {
      menu: false,
      authStatus: '',
    }
    this.id = sessionStorage.getItem('id')
  }

  componentDidMount() {
    console.log(this.id)
    if (this.id != null) this.setState({ authStatus: 'Logout' })
    else this.setState({ authStatus: 'Login' })
  }

  toggleMenu = () => {
    this.setState({ menu: !this.state.menu })
  }

  render() {
    const show = this.state.menu ? 'show' : ''
    return (
      <div>
        <nav
          className="navbar navbar-expand-lg navbar-light"
          style={{ backgroundColor: '#9edef1' }}
        >
          <a className="navbar-brand" href={'/'}>
            <h4 style={{ fontFamily: 'helvica', color: '#fff' }}>
              Shopping Mall
            </h4>
          </a>
          <button
            className="navbar-toggler"
            onClick={this.toggleMenu}
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className={'collapse navbar-collapse ' + show} id="navbarNav">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  <b>Home</b>
                  <span className="sr-only">(current)</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/profile">
                  <b>Profile</b>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/products">
                  <b>Products</b>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  <b>{this.state.authStatus}</b>
                </Link>
              </li>
              <li className="nav-item" style={{ marginTop: '6px' }}>
                {this.cartNavShow()}
              </li>
            </ul>
          </div>
        </nav>
      </div>
    )
  }
  cartNavShow = () => {
    if (this.id && this.props.cart) {
      return (
        <div>
          <AddShoppingCartIcon />
          <span>
            <small>
              <sup className="circle">{this.props.cart}</sup>
            </small>
          </span>
        </div>
      )
    }
  }
}

export default Nav
