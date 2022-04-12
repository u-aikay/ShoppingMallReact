import React, { Component } from 'react'
import StarIcon from '@material-ui/icons/Stars'
import EditIcon from '@material-ui/icons/Edit'
import Nav from './nav'
import '../css/index.css'
import { ProductApi } from '../apis/apiProductsOrders'

class UpdateProduct extends Component {
  constructor() {
    super()
    const id = window.sessionStorage.getItem('id')

    this.state = {
      id: window.sessionStorage.getItem('id'),
      loading: false,
      submitStatus: false,
      products: [],
      price: 0,
      number: 0,
      productname: '',
      message: '',
      file: null,
      cart: 0,
      options: [
        'Select product type',
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

    this.getUserProduct = new ProductApi(`/products/${id}`)
    this.allOrders = new ProductApi(`/orders/total/${id}`)
    this.updateProduct = new ProductApi('/products/update')
    this.productid = window.sessionStorage.getItem('update')
  }

  componentDidMount() {
    if (this.productid) {
      this.getUserProduct.getMethod().then((res) => {
        const result = res.data.filter((data) => data.id === Number(this.productid))
        this.setState({ products: result })
      })

      this.allOrders.getMethod().then((res) => {
        this.setState({ cart: parseInt(res.data) })
      })
    } else {
      this.props.history.push('/profile')
    }
  }

  render() {
    const show = this.state.submitStatus ? '  Updating...  ' : '  Update  '
    return (
      <div>
        <Nav cart={this.state.cart} />
        <div className="text-center container">
          <br />
          <br />
          <div className="row">
            {this.state.products.map((p) => (
              <div className="col-lg-4 col-sm-6 mb-4" key={p.id}>
                <div className="portfolio-item">
                  <a
                    className="portfolio-link"
                    data-toggle="modal"
                    href="/products"
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
                      alt=""
                    />
                  </a>
                  <hr style={{ border: '5px solid #ff6666' }} />
                  <div className="portfolio-caption">
                    <div className="portfolio-caption-heading">
                      <EditIcon />
                      {p.type}
                    </div>
                    <div className="portfolio-caption-subheading text-muted">
                      <div className="portfolio-caption-subheading text-muted">
                        <EditIcon />
                        {p.productname}
                      </div>
                      <div className="portfolio-caption-subheading text-muted">
                        <EditIcon />
                        <strong>Price: </strong>#{p.price}
                      </div>
                      <div className="portfolio-caption-subheading text-muted">
                        <EditIcon />
                        <strong>Quantity: </strong>
                        {p.quantity}
                      </div>
                    </div>
                    <br />
                  </div>
                </div>
              </div>
            ))}
            <div className="col-lg-8 col-sm-12 mb-8">
              <div>
                <span className="staricon">
                  <StarIcon />
                  <StarIcon />
                  <StarIcon />
                  <StarIcon />
                  <StarIcon />
                </span>
              </div>
              <br />
              <br />
              <form
                action="#"
                id="myform"
                style={{
                  marginLeft: '30px',
                  marginRight: '30px',
                  padding: '3px',
                }}
              >
                <div className="form-group">
                  <select
                    type="text"
                    name="type"
                    onChange={(e) => {
                      this.setState({ type: e.target.value })
                    }}
                    className="form-control"
                  >
                    {this.state.options.map((option) => (
                      <option key={option}>{option}</option>
                    ))}
                  </select>
                </div>
                <p
                  style={{
                    color: '#696969',
                    float: 'left',
                  }}
                >
                  Product Name
                </p>
                <div className="form-group">
                  <input
                    type="text"
                    name="productname"
                    onChange={(e) => {
                      this.setState({ productname: e.target.value })
                    }}
                    className="form-control"
                    placeholder="Enter product's name"
                  />
                </div>
                <p style={{ color: '#696969', float: 'left' }}>In Naira (#)</p>
                <div className="form-group">
                  <input
                    type="number"
                    name="price"
                    onChange={(e) => {
                      this.setState({ price: e.target.value })
                    }}
                    className="form-control"
                    placeholder="Enter Price"
                  />
                </div>
                <p style={{ color: '#696969', float: 'left' }}>
                  Quantity of this product on sale
                </p>
                <div className="form-group">
                  <input
                    type="number"
                    id="quantity"
                    onChange={(e) => {
                      this.setState({ number: e.target.value })
                    }}
                    name="quantity"
                    className="form-control"
                    placeholder="Qty"
                  />
                </div>
                <p style={{ color: '#696969', float: 'left' }}>
                  Upload Picture of this Product
                </p>
                <div className="form-group">
                  <input
                    type="file"
                    id="file"
                    onChange={(e) => {
                      this.setState({ file: e.target.files[0] })
                    }}
                    name="file"
                    accept="*"
                    className="form-control"
                  />
                </div>
                <br />
                <input
                  type="button"
                  className="btn btn-secondary"
                  style={{ backgroundColor: '#80afbc' }}
                  onClick={this.send}
                  value={show}
                />
              </form>
              <br />
              <p
                style={{
                  fontFamily: 'cursive',
                  color: '#ff0066',
                  marginRight: '22%',
                }}
              >
                {this.state.message}
              </p>
              <br />
              <br />
              <br />
            </div>
          </div>
        </div>
      </div>
    )
  }
  send = async (e) => {
    e.preventDefault()

    this.setState({ submitStatus: !this.state.submitStatus })

    const data = new FormData()
    data.append('type', this.state.type)
    data.append('productname', this.state.productname)
    data.append('productid', window.sessionStorage.getItem('update'))
    data.append('price', this.state.price)
    data.append('quantity', this.state.number)
    data.append('file', this.state.file)

    this.updateProduct.postMethod(data).then((res) => {
      this.getUserProduct.getMethod().then((res) => {
        const result = res.data.filter((data) => data.id === Number(this.productid))
        this.setState({ products: result })
      })

      if (res.success){
        document.getElementById('myform').reset()
        this.setState({ message: "successfully updated" })
        this.setState({ submitStatus: false })

        return;
      }
      
      this.setState({ message: "error updating product"})
      this.setState({ submitStatus: false })
    })
  }
}

export default UpdateProduct
