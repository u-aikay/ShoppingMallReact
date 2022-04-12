import React, { Component } from 'react'
import Profilehead from './profileHead'
import Profileform from './profileForm'
import ProfileUserproduct from './profileUserProducts'
import Session from 'react-session-api'
import { ProductApi } from '../../apis/apiProductsOrders'
import { UserApi } from '../../apis/apiUser'
import '../../css/App.css'
import Nav from '../nav.jsx'

class Profile extends Component {
  constructor(props) {
    super(props)
    const id = sessionStorage.getItem('id')
    this.state = {
      user: {},
      message: '',
      products: [],
      cart: 0,
      id: window.sessionStorage.getItem('id'),
    }

    this.getUserProduct = new ProductApi(`/products/${id}`)
    this.allOrders = new ProductApi(`/orders/total/${id}`)
    this.user = new UserApi(`/users/${id}`)
  }

  componentDidMount() {
    if (window.sessionStorage.getItem('id') !== null) {
      this.getUserProduct.getMethod().then((res) => {
        if (res.statusCode === 200) this.setState({ products: res.data })
      })

      this.allOrders.getMethod().then((res) => {
        if (res.statusCode === 200) {
          Session.set('cart', Number(res.data))
          this.setState({ cart: Number(res.data) })
        }
      })

      this.user.getMethod().then((res) => {
        if (res.statusCode === 200) {
          this.setState((state) => ({ user: res.data }))
          Session.set('data', res.data)
        }
      })
    } else {
      this.props.history.push('/login?logincredentials')
    }
  }

  render() {
    const id = window.sessionStorage.getItem('id')
    if (id) {
      return (
        <div>
          <Nav cart={this.state.cart} />
          <div style={{ marginBottom: 60 }}>
            <Profilehead user={this.state.user} image={this.imageChange} />
            <section className="page-section">
              <Profileform
                user={this.state.user}
                onProductsChange={this.onProductChange}
              />
              <ProfileUserproduct
                user={this.state.user}
                products={this.state.products}
                onProductsChange={this.onProductChange}
                cart={this.state.cart}
                onCartChange={this.onCartchange}
                p={this.props}
              />
            </section>
          </div>
        </div>
      )
    } else {
      return <div></div>
    }
  }

  onCartchange = (newcart) => {
    this.setState({ cart: newcart })
  }

  onProductChange = () => {
    this.getUserProduct.getMethod().then((res) => {
      if (res.statusCode === 200) this.setState({ products: res.data })
    })
  }

  imageChange = () => {
    this.user.getMethod().then((res) => {
      if (res.statusCode === 200) {
        this.setState((state) => ({ user: res.data }))
        Session.set('data', res.data)
      }
    })
  }

  logout = () => {
    this.props.history.push('/logout')
  }
}

export default Profile
