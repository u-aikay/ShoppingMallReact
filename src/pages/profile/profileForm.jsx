import React, { Component } from 'react'
import { ProductApi } from '../../apis/apiProductsOrders'
import Skeleton from 'react-loading-skeleton'
import '../../css/index.css'

class Profileform extends Component {
  constructor(props) {
    super(props)

    this.state = {
      submitStatus: false,
      type: '',
      price: 0,
      number: 0,
      productname: '',
      loading: false,
      file: null,
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

    this.uploadProduct = new ProductApi('/users/upload')
  }

  componentDidMount() {
    this.setState({ loading: true })

    const timing = setTimeout(() => {
      this.setState({ loading: false })
    }, 1000)

    return () => clearTimeout(timing)
  }

  render() {
    const show = this.state.submitStatus ? '  Posting...  ' : '  Post  '
    return (
      <div className="container">
        {this.state.loading && (
          <div>
            <h5 className="section-heading text-uppercase">
              <Skeleton duration={1} height={30} width={145} />
            </h5>
            <div className="apply">
              <Skeleton duration={1} height={35} />
              <br />
              <br />
            </div>
            <Skeleton duration={1} height={10} width={100} />
            <br />
            <div className="apply">
              <Skeleton duration={1} height={35} />
              <br />
              <br />
            </div>
            <Skeleton duration={1} height={10} width={70} />
            <br />
            <div className="apply">
              <Skeleton duration={1} height={35} />
              <br />
              <br />
            </div>
            <Skeleton duration={1} height={10} width={200} />
            <br />
            <div className="apply">
              <Skeleton duration={1} height={35} />
              <br />
              <br />
            </div>
            <Skeleton duration={1} height={10} width={180} />
            <br />
            <div className="apply">
              <Skeleton duration={1} height={35} />
              <br />
              <br />
            </div>
            <Skeleton duration={1} height={45} width={70} />
          </div>
        )}
        {!this.state.loading && (
          <div>
            <h4 className="section-subheading text-muted">
              {' '}
              Upload new Product
            </h4>
            <form action="#" id="myform">
              <div className="form-group">
                <select
                  type="text"
                  name="type"
                  onChange={(e) => {
                    this.setState({ type: e.target.value })
                  }}
                  className="form-control"
                  required
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
                  required
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
                  required
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
                  required
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
                  required
                />
              </div>
              <input
                type="button"
                className="btn btn-secondary"
                style={{ backgroundColor: '#80afbc' }}
                onClick={this.send}
                value={show}
                required
              />
            </form>
            <p style={{ fontFamily: 'cursive', color: '#ff0066' }}>
              {this.state.message}
            </p>
          </div>
        )}
      </div>
    )
  }

  send = (e) => {
    e.preventDefault()
    this.setState({ submitStatus: !this.state.submitStatus })

    let formData = new FormData()

    formData.append('type', this.state.type)
    formData.append('productname', this.state.productname)
    formData.append('price', this.state.price)
    formData.append('user_id', this.props.user.id)
    formData.append('quantity', this.state.number)
    formData.append('file', this.state.file)

    this.uploadProduct.postMethod(formData).then((res) => {
      this.setState({ submitStatus: !this.state.submitStatus })
      if (res.success) {
        document.getElementById('myform').reset()
        this.setState({ message: 'successfully uploaded' })
        this.props.onProductsChange()
      } else {
        this.setState({ message: 'error while uploading' })
      }
    })
  }
}

export default Profileform
