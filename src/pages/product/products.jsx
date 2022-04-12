import React, { Component } from 'react'
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward'
import AddIcCallTwoToneIcon from '@material-ui/icons/AddIcCallTwoTone'
import TextsmsIcon from '@material-ui/icons/Textsms'
import { Link } from 'react-router-dom'
import Session from 'react-session-api'
import Skeleton from 'react-loading-skeleton'
import { ProductApi } from '../../apis/apiProductsOrders'
import Nav from '../nav.jsx'
import DialogBox from '../dialog.jsx'

class Products extends Component {
  constructor() {
    super()

    if (Session.get('data')) {
      this.state = {
        products: [],
        id: Session.get('data').id,
        cart: Session.get('cart'),
        status: false,
        loading: false,
        currentPage: 1,
        productsPerPage: 5,
        orders: [],
        total: 0,
        email: Session.get('data').email,
        type: '',
        options: [
          'Select product type',
          'All',
          'Computer Accessories',
          'Clothings',
          'Kitchen',
          'Men Wear',
          'Ladies Wear',
          'Home Acccessories',
          'office accessories',
          'Books',
          'Automobile',
        ],
      }

      this.usersOrders = new ProductApi('/orders')
      this.getProduct = new ProductApi(`/products?id=${Session.get('data').id}`)
      this.allOrders = new ProductApi(`/orders/total/${Session.get('data').id}`)
      this.getOrders = new ProductApi(
        `/orders/details/${Session.get('data').id}`,
      )
      this.deleteOrders = new ProductApi(`/orders/delete`)
      this.handleClick = this.handleClick.bind(this)
    }
  }

  handleClick(event) {
    this.setState({
      currentPage: Number(event.target.id),
    })

    const all = document.getElementsByClassName('all-butts')

    for (let i = 0; i < all.length; i++) {
      if (all[i].id === event.target.id) {
        all[i].style.backgroundColor = '#ff6666'
      } else all[i].style.backgroundColor = '#80afbc'
    }
  }

  componentDidMount() {
    if (Session.get('data')) {
      this.getProduct.getMethod().then((res) => {
        this.setState({ products: res.data })
      })

      this.getOrders.getMethod().then((res) => {
       
        if (res.data.length) this.setState({ orders: res.data })

        const total = this.getOrders.getTotalOrders(res.data)
      
        if (total) {
          this.setState({ total: total })
        }
      })

      this.setState({ loading: true })

      const timing = setTimeout(() => {
        this.setState({ loading: false })
      }, 2000)

      return () => clearTimeout(timing)
    } else {
      this.props.history.push('/profile')
    }
  }

  renderProducts() {
    const indexOfLastProduct =
      this.state.currentPage * this.state.productsPerPage
    const indexOfFirstProduct = indexOfLastProduct - this.state.productsPerPage
    const currentProducts = this.state.products.slice(
      indexOfFirstProduct,
      indexOfLastProduct,
    )

    const renderProducts = currentProducts.map((p) => {
      return (
        <div
          className="col-lg-4 col-sm-6 mb-4"
          key={p.id}
          style={{ border: '1px solid #b2beb5' }}
        >
          <div className="portfolio-item">
            <Link className="portfolio-link" data-toggle="modal" to="/products">
              <div className="portfolio-hover">
                <div className="portfolio-hover-content">
                  <i className="fas fa-plus fa-3x"></i>
                </div>
              </div>
              <img className="img-fluid" src={p.image} loading="lazy" alt="" />
            </Link>
            <hr style={{ border: '5px solid #ff6666' }} />
            <div className="portfolio-caption">
              <div className="portfolio-caption-heading">{p.productname}</div>
              <div className="portfolio-caption-subheading text-muted">
                <strong>Seller: </strong>
                {p.name}
              </div>
              <div className="portfolio-caption-subheading text-muted">
                <strong>Phone: </strong>
                {p.phone}
                <br />
                <button
                  onClick={() => {
                    this.makeCall(p.phone)
                  }}
                >
                  <strong>
                    <AddIcCallTwoToneIcon />
                  </strong>
                </button>
                <button
                  onClick={() => {
                    this.openText(p.phone)
                  }}
                >
                  <strong>
                    <TextsmsIcon />
                  </strong>
                </button>
              </div>
              <div className="portfolio-caption-subheading text-muted">
                <strong>Price: </strong>#{p.price}
              </div>
              <div>
                <div
                  className="spinner-border text-primary"
                  id={p.id}
                  role="status"
                  style={this.sty}
                >
                  <span className="sr-only">loading...</span>
                </div>
                &nbsp;&nbsp;
                <br />
                <button
                  className="btn btn-default"
                  style={{ backgroundColor: '#ff6666' }}
                  onClick={() => {
                    this.cartOrdersNumber(p.id, p.quantity)
                  }}
                >
                  <AddShoppingCartIcon /> Add to Cart{' '}
                </button>
                <p style={{ color: 'blue' }} id={`mess${p.id}`}></p>
              </div>
            </div>
          </div>
        </div>
      )
    })

    return renderProducts
  }

  makeCall(data) {
    const send = window.confirm('Continue this call?')
    if (send) window.open(`tel: ${data}`)
  }

  openText(data) {
    const send = window.confirm('Open SMS?')
    if (send) window.open(`sms: ${data}`)
  }

  pageNumber() {
    // Logic for displaying page numbers
    const pageNumbers = []
    for (
      let i = 1;
      i <= Math.ceil(this.state.products.length / this.state.productsPerPage);
      i++
    ) {
      pageNumbers.push(i)
    }

    const renderPageNumbers = pageNumbers.map((number) => {
      return (
        <button
          className="all-butts btn btn-default"
          style={{ marginRight: '3px', backgroundColor: '#80afbc' }}
          key={number}
          id={number}
          onClick={this.handleClick}
        >
          {number}
        </button>
      )
    })
    if (this.state.products.length > this.state.productsPerPage)
      return renderPageNumbers
    else return ''
  }

  render() {
    if (Session.get('data')) {
      return (
        <div>
          <Nav data={this.props} cart={this.state.cart} />
          {this.state.loading && (
            <div>
              <div className="container">
                <br />
                <p>
                  <Skeleton duration={1} height={15} width={200} />
                </p>
                <p style={{ width: '100%' }}>
                  <Skeleton duration={1} height={30} />
                </p>
                <div className="text-center">
                  <Skeleton duration={1} height={30} width={150} />
                </div>
                <hr />
                <div className="row">
                  <div
                    className="col-lg-4 col-sm-6 mb-4"
                    style={{ width: '100%' }}
                  >
                    <Skeleton duration={1} height={400} />
                  </div>
                  <div className="col-lg-4 col-sm-6 mb-4">
                    <Skeleton duration={1} height={400} />
                  </div>
                  <div className="col-lg-4 col-sm-6 mb-4">
                    <Skeleton duration={1} height={400} />
                  </div>
                </div>
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  position: 'fixed',
                  bottom: '60px',
                  width: '100%',
                }}
              >
                <Skeleton duration={1} height={40} width={40} />
                <div style={{ marginLeft: '3px' }}>
                  <Skeleton duration={1} height={40} width={40} />
                </div>
              </div>
            </div>
          )}
          {!this.state.loading && (
            <div>
              <div className="container">
                <br />
                <div>
                  <p>Search By Categories</p>
                  <select
                    type="text"
                    name="type"
                    onChange={(e) => {
                      const category = e.target.value
                      if (category === 'All') {
                        this.getProduct.getMethod().then((res) => {
                          this.setState({ products: res.data })
                        })
                      } else {
                        this.getProduct.getMethod().then((res) => {
                          const data = res.data.filter(
                            (p) =>
                              p.type.toLowerCase() === category.toLowerCase(),
                          )
                          this.setState({ products: data })
                        })
                      }
                      this.setState({ loading: true })
                      const timing = setTimeout(() => {
                        this.setState({ loading: false })
                      }, 800)
                      return () => clearTimeout(timing)
                    }}
                    className="form-control"
                  >
                    {this.state.options.map((option) => (
                      <option key={option}>{option}</option>
                    ))}
                  </select>
                </div>
                <div className="text-center">
                  <div
                    className="container"
                    style={{ marginTop: 30, marginBottom: 80 }}
                  >
                    <div style={{ float: 'right' }} role="button">
                      <div onClick={this.open}>
                        {this.arrowOnClick()}
                        <AddShoppingCartIcon />
                        <span>
                          <small>
                            <sup className="circle">{this.state.cart}</sup>
                          </small>
                        </span>
                      </div>
                      <DialogBox
                        switch={this.state.status}
                        close={this.close}
                        delete={this.deleteCartRecord}
                        orders={this.state.orders}
                        total={this.state.total}
                        email={this.state.email}
                      />
                    </div>
                    <h4 className="section-subheading text-muted">
                      Products on sale
                    </h4>
                    <hr></hr>
                    <div className="row">
                      {this.renderProducts()}
                      <p>{this.result()}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div
                id="page-numbers"
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  position: 'fixed',
                  bottom: '60px',
                  width: '100%',
                }}
              >
                {this.pageNumber()}
              </div>
            </div>
          )}
        </div>
      )
    } else return <div></div>
  }

  sty = {
    display: 'none',
  }

  result() {
    if (this.state.products.length === 0) return 'No product(s)'
    else return ''
  }

  close = () => {
    this.setState({ status: false })
  }

  open = () => {
    if (this.state.cart) this.setState({ status: true })
  }

  arrowOnClick() {
    if (this.state.cart) return <ArrowForwardIcon color="secondary" />
  }

  cartOrdersNumber = async (product_id, product_quantity) => {
    document.getElementById(product_id).style.display = ''

    var data = this.state.cart
    data++

    var order = parseInt(
      localStorage.getItem(`${Session.get('data').id}-product-${product_id}`),
    )

    if (order === parseInt(product_quantity)) {
      //this.setState({ cart_message: "above product's request limit" });
      document.getElementById(`mess${product_id}`).innerText =
        "above product's request limit"
      document.getElementById(product_id).style.display = 'none'
    } else {
      this.setState((state) => ({
        cart: data,
      }))

      order++

      if (order)
        localStorage.setItem(
          `${Session.get('data').id}-product-${product_id}`,
          order,
        )
      else
        localStorage.setItem(
          `${Session.get('data').id}-product-${product_id}`,
          1,
        )

      const prodata = {
        total_orders: data,
        product_id: product_id,
        user_id: Session.get('data').id,
        order: parseInt(
          localStorage.getItem(
            `${Session.get('data').id}-product-${product_id}`,
          ),
        ),
        name: Session.get('data').name,
      }

      this.usersOrders.postMethod(prodata).then((response) => {
        this.getOrders.getMethod().then((res) => {
          if (res.data.length) {
            this.setState({ orders: res.data })
          }

          const total = this.getOrders.getTotalOrders(res.data)

          if (total) {
            this.setState({ total: total })
          }
        })

        document.getElementById(`mess${product_id}`).innerText =
          'successfully added product'
        document.getElementById(product_id).style.display = 'none'
      })
    }
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
     
      if (res === 'successful deleted') {
        this.getOrders.getMethod().then((res) => {
          if (res.data.length) {
            this.setState({ orders: res.data })
          }

          const total = this.getOrders.getTotalOrders(res.data)

          if (total) {
            this.setState({ total: total })
          }
        })

        this.allOrders.getMethod().then((res) => {
          this.setState({ cart: res.data })
        })

        if (this.state.cart === 1) this.setState({ status: false })
      }

      element.style.display = 'none'
    })
  }
}

export default Products
