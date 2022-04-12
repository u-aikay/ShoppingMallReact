import React, { Component } from 'react'
import { UserApi } from '../../apis/apiUser'
import Skeleton from 'react-loading-skeleton'

class Profilehead extends Component {
  constructor(props) {
    super(props)

    this.state = { file: null, mess: '', loading: false }

    this.myProfile = new UserApi('/users/profile')
  }

  componentDidMount() {
    this.setState({ loading: true })

    const timing = setTimeout(() => {
      this.setState({ loading: false })
    }, 1000)

    return () => clearTimeout(timing)
  }

  render() {
    return (
      <section className="page-section" style={{ marginBottom: 40 }}>
        {this.state.loading && (
          <div
            style={{
              lineHeight: 2,
              margin: 'auto',
              width: '95%',
              borderRadius: '20px',
            }}
          >
            <Skeleton duration={1} height={35} />
            <div style={{ paddingLeft: '80' }}>
              <Skeleton circle={true} duration={1} height={150} width={150} />
            </div>
            <div style={{ width: '75%' }}>
              <Skeleton duration={1} height={35} />
            </div>
            <Skeleton duration={1} height={30} />
            <div
              className="container"
              style={{ borderRadius: '20px', width: '97%' }}
            >
              <Skeleton duration={1} height={5} width={200} />
              <br />
              <Skeleton duration={1} height={5} width={250} />
              <br />
              <Skeleton duration={1} height={5} width={220} />
              <br />
              <Skeleton duration={1} height={5} width={230} />
            </div>
            <Skeleton duration={1} height={35} />
          </div>
        )}
        {!this.state.loading && (
          <div
            style={{
              margin: 'auto',
              padding: '20',
              width: '97%',
              marginTop: 7,
              backgroundColor: '#80afbc',
              borderRadius: '20px',
            }}
          >
            <div
              className="container"
              style={{ paddingLeft: '80', display: 'inline' }}
            >
              <br></br>
              <div className="container">
                <i
                  onClick={() => {
                    this.openImage(this.props.user.image)
                  }}
                >
                  <img
                    src={this.props.user.image}
                    className="rounded-circle"
                    loading="auto"
                    alt=""
                    width="200px"
                    style={{
                      marginBottom: 5,
                      width: '150px',
                      height: '150px',
                      borderRaduis: '50%',
                      backgroundPosition: 'center',
                    }}
                  ></img>
                </i>
                <div
                  id="spinner"
                  className="spinner-grow text-danger"
                  role="status"
                  style={this.sty}
                >
                  <span className="sr-only">loading...</span>
                </div>
                &nbsp;&nbsp;
                <br />
              </div>
              <form action="#" id="form">
                <input
                  type="file"
                  name="file"
                  className="form-control btn btn-danger"
                  onChange={(e) => {
                    this.setState({ file: e.target.files[0] })
                  }}
                  style={{ width: '70%' }}
                />
                <input
                  type="submit"
                  name="submit"
                  onClick={this.uploadProfilePics}
                  value="upload"
                  className="btn btn-secondary"
                />
              </form>
            </div>
            <div
              className="container"
              style={{
                backgroundColor: '#fff',
                borderRadius: '20px',
                width: '97%',
              }}
            >
              <br></br>
              <div>
                <p>
                  <strong>NAME:</strong>
                  {` ${this.props.user.name}`}
                </p>
                <p>
                  <strong>LICENCE:</strong> Free to sell product online
                </p>
                <p>
                  <strong>PHONE NUMBER:</strong>
                  {` ${this.props.user.phone}`}
                </p>
                <p>
                  <strong>Email:</strong>
                  {` ${this.props.user.email}`}
                </p>
                <hr />
              </div>
            </div>
          </div>
        )}
      </section>
    )
  }

  sty = {
    display: 'none',
    position: 'relative',
    top: 8,
    left: -89,
  }

  openImage(image) {
    window.open().document.write(
      `<iframe src=${image} 
                style='border:0; top:0px; left:0px; bottom:0px; right: 0px; width:100%; height: 100%;' 
                allowfullscreen
            </iframe>`,
    )
  }

  uploadProfilePics = async (e) => {
    e.preventDefault()

    document.getElementById('spinner').style.display = ''

    const data = new FormData()
    data.append('user_id', this.props.user.id)
    data.append('file', this.state.file)

    this.myProfile.postMethod(data).then((res) => {
      if (res.statusCode === 204) {
        this.setState({ mess: res.data })
        //call back to the parent class
        this.props.image()

        document.getElementById('form').reset()
        document.getElementById('spinner').style.display = 'none'
      }
    })
  }
}

export default Profilehead
