import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward'
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart'
import Session from 'react-session-api'
import Skeleton from 'react-loading-skeleton'
import { ProductApi } from '../../apis/apiProductsOrders'
import DialogBox from '../dialog.jsx'

class ProfileUserproduct extends Component {
  constructor() {
    super()
    const id = sessionStorage.getItem('id')
    this.state = {
      id: window.sessionStorage.getItem('id'),
      loading: false,
      status: false,
      orders: [],
      total: 0,
      cart: 0,
    }

    this.deleteMyProduct = new ProductApi('/products/delete')
    this.allOrders = new ProductApi(`/orders/total/${id}`)
    this.getOrders = new ProductApi(`/orders/details/${id}`)
    this.deleteOrders = new ProductApi('/orders/delete')
  }

  componentDidMount() {
    this.getOrders.getMethod().then((res) => {
      if (res.statusCode === 200) this.setState({ orders: res.data })
      const total = this.getOrders.getTotalOrders(res.data)
      if (total) this.setState({ total: total })
    })

    this.setState({ loading: true })

    const timing = setTimeout(() => {
      this.setState({ loading: false })
    }, 1000)

    return () => clearTimeout(timing)
  }

  render() {
    return (
      <div className="container">
        <div className="text-center">
          <div className="container" style={{ marginTop: 50 }}>
            {this.state.loading && (
              <div>
                <h4 className="section-subheading text-muted">
                  <Skeleton duration={1} height={25} width={280} />
                </h4>
                <hr></hr>
                <div className="row">
                  <div
                    className="col-lg-4 col-sm-6 mb-4"
                    style={{ width: '100%' }}
                  >
                    <Skeleton duration={2} height={500} />
                  </div>
                  <div
                    className="col-lg-4 col-sm-6 mb-4"
                    style={{ width: '100%' }}
                  >
                    <Skeleton duration={2} height={500} />
                  </div>
                  <div
                    className="col-lg-4 col-sm-6 mb-4"
                    style={{ width: '100%' }}
                  >
                    <Skeleton duration={2} height={500} />
                  </div>
                </div>
              </div>
            )}
            {!this.state.loading && (
              <div>
                <div style={{ float: 'right' }} role="button">
                  <div onClick={this.open}>
                    {this.arrowOnClick()}
                    <AddShoppingCartIcon />
                    <span>
                      <small>
                        <sup className="circle">{this.props.cart}</sup>
                      </small>
                    </span>
                  </div>
                  <DialogBox
                    switch={this.state.status}
                    close={this.close}
                    delete={this.deleteCartRecord}
                    orders={this.state.orders}
                    total={this.state.total}
                    email={this.props.user.email}
                  />
                </div>
                <h4 className="section-subheading text-muted">
                  All my Products on sale
                </h4>
                <hr></hr>
                <div className="row">
                  {this.props.products.map((p) => (
                    <div
                      className="col-lg-4 col-sm-6 mb-4"
                      key={p.id}
                      style={{ border: '1px solid #b2beb5' }}
                    >
                      <div className="portfolio-item">
                        <Link
                          className="portfolio-link"
                          data-toggle="modal"
                          to="/profile"
                        >
                          <div className="portfolio-hover">
                            <div className="portfolio-hover-content">
                              <i className="fas fa-plus fa-3x"></i>
                            </div>
                          </div>
                          <img
                            className="img-fluid"
                            src={p.image}
                            loading="lazy"
                            alt="your product on sale"
                          />
                        </Link>
                        <hr style={{ border: '5px solid #ff6666' }} />
                        <div className="portfolio-caption">
                          <div
                            className="portfolio-caption-heading"
                            style={{ color: '#000' }}
                          >
                            {p.productname}
                          </div>
                          <div className="portfolio-caption-subheading text-muted">
                            #{p.price}
                          </div>
                          <br />
                          <button
                            className="btn btn-default"
                            style={{ backgroundColor: '#ff6666' }}
                            onClick={() => {
                              this.deleteProduct(p.id)
                            }}
                          >
                            Delete
                          </button>
                          <button
                            className="btn btn-primary"
                            style={{
                              backgroundColor: '#80afbc',
                              marginLeft: '5px',
                            }}
                            onClick={() => {
                              this.updateProduct(p.id)
                            }}
                          >
                            Update
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <span>{this.result()}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  updateProduct = (id) => {
    sessionStorage.setItem('update', id)
    this.props.p.history.push('/update/product')
  }

  result() {
    if (this.props.products.length === 0) return 'No product(s)'
    else return ''
  }

  open = () => {
    if (this.props.cart) this.setState({ status: true })
  }

  close = () => {
    this.setState({ status: false })
  }

  arrowOnClick() {
    if (this.props.cart) return <ArrowForwardIcon color="secondary" />
  }

  deleteProduct = (id) => {
    this.deleteMyProduct.postMethod({ id: id }).then((res) => {
      if (res.statusCode === 200) {
        this.props.onProductsChange()
      }
    })

    this.setState({ loading: true })
    const timing = setTimeout(() => {
      this.setState({ loading: false })
    }, 1500)
    return () => clearTimeout(timing)
  }

  deleteCartRecord = async (user_id, product_id, element) => {
    element.style.display = ''
    //clear from localstaorge
    if (localStorage.getItem(`${user_id}-product-${product_id}`))
      localStorage.removeItem(`${user_id}-product-${product_id}`)
    //clear from database
    const data = {
      user_id: user_id,
      product_id: product_id,
    }

    this.deleteOrders.postMethod(data).then((res) => {
      console.log('deldeldel', res)
      if (res === 'successful deleted') {
        this.getOrders.getMethod().then((res) => {
          if (res.statusCode === 200) this.setState({ orders: res.data })
          const total = this.getOrders.getTotalOrders(res.data)
          if (total) this.setState({ total: total })
        })

        this.allOrders.getMethod().then((res) => {
          if (res.statusCode === 200) {
            Session.set('cart', parseInt(res.data))
            this.props.onCartChange(res.data)
          }
        })

        if (this.props.cart === 1) this.setState({ status: false })
      }
    })

    element.style.display = 'none'
  }
}

export default ProfileUserproduct
