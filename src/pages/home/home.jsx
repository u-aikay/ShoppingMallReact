import React, { Component } from 'react';
import { Paper, Card, CardHeader, CardActions, CardContent, Avatar, IconButton } from '@material-ui/core';
import Skeleton from 'react-loading-skeleton';
import {ProductApi} from '../../apis/apiProductsOrders';
import {UserApi} from '../../apis/apiUser';
import '../../css/index.css';
import '../../css/App.css';
import Nav from '../nav.jsx';

class Home extends Component {

    constructor(props){
        super(props);
        this.state = {loading: false}
        this.state = {message: '', submitStatus: false, cart: 0}
        this.sendmail = new UserApi("/sendmail");
        this.allOrders = new ProductApi(`/orders/total/${sessionStorage.getItem('id')}`);
    }

    componentDidMount(){
        this.allOrders.getMethod().then(res=>{
            this.setState({ cart: parseInt(res) });
        });
        this.setState({loading: true});
        const timing = setTimeout(() => {
            this.setState({loading: false});
        }, 1000);
        return () => clearTimeout(timing);
    }

    render() {
        const show = (this.state.submitStatus) ? 'Submiting...' : 'Submit';
        return (
            <div>
                <Nav data={this.props} cart={this.state.cart}/>
                {this.state.loading && <div>
                    <div className='page-section container'>
                        <div className="text-center" style={{ paddingTop: "20px" }}>
                            <h1 className=""><Skeleton duration={1} height={40} width={100}/></h1><br/>
                            <div className='row' style={{padding: '15px'}}>
                                <div className="col-lg-4 col-sm-6 mb-4" style={{width: '100%'}}>
                                    <Skeleton duration={1} height={300}/>
                                </div>    
                                <div className="col-lg-4 col-sm-6 mb-4">
                                    <Skeleton duration={1} height={300}/>
                                </div>
                                <div className="col-lg-4 col-sm-6 mb-4">
                                    <Skeleton duration={1} height={300}/>
                                </div>
                                <div style={{ margin: 'auto', marginTop: '70px'}}>
                                    <Skeleton circle={true} duration={1} height={150} width={150}/><br/>
                                    <Skeleton duration={1} height={10} width={200}/><br/>
                                    <Skeleton duration={1} height={10} width={300}/><br/>
                                    <Skeleton duration={1} height={10} width={250}/><br/><br/>
                                    <Skeleton duration={1} height={10} width={50}/>
                                </div>
                            </div>
                            <div className="row text-center">
                                <div className="col-md-6">
                                    <Skeleton duration={1} height={350}/>
                                    <Skeleton duration={1} height={10} width={100}/><br/>
                                    <Skeleton duration={1} height={10} width={70}/>
                                </div>
                                <div className="col-md-6">
                                    <Skeleton duration={1} height={350}/>
                                    <Skeleton duration={1} height={10} width={100}/><br/>
                                    <Skeleton duration={1} height={10} width={70}/>
                                </div>
                            </div>
                        </div>
                        <div style={{width: '100%'}}>
                            <Skeleton duration={1} height={350}/>
                        </div>
                    </div>
                </div>}
                {!this.state.loading && <div>
                    <div id='container' style={{marginTop:'5px',margin: 'auto', width:'99%'}}>
                        <section className="page-section" id="services" >    
                            <div className="container" style={{ color: "#fff" }}>
                                <div className="text-center" style={{ paddingTop: "20px" }}>
                                    <h1 className="">Services</h1>
                                </div>
                                <div className="row text-center">
                                    <div className="col-md-4"><br/>
                                        <Paper style={{ padding: '15px', height: '92%' }}>
                                            <div style={{ padding: '15px', height: '50%' }}>
                                                <span className="fa-stack fa-4x">
                                                    <i className="fas fa-circle fa-stack-2x text-primary"></i>
                                                    <i className="fas fa-shopping-cart fa-stack-1x fa-inverse"></i>
                                                </span>
                                                <h4 className="my-3">Improving Every day life</h4>
                                                <p className="text-muted">We hearness the power of technology to deliver innovative ,
                                                convenient way of selling and buying of online goods and services at an affordable rate</p>
                                            </div>
                                        </Paper>
                                    </div>
                                    <div className="col-md-4"><br/>
                                        <Paper style={{ padding: '15px', height: '275px' }}>
                                            <div style={{ padding: '15px', height: '50%' }}>
                                                <span className="fa-stack fa-4x">
                                                    <i className="fas fa-circle fa-stack-2x text-primary"></i>
                                                    <i className="fas fa-laptop fa-stack-1x fa-inverse"></i>
                                                </span>
                                                <h4 className="my-3">Supporting the growth of Nigeria businesses</h4>
                                                <p className="text-muted"> We are taking nigeria economy online
                                                and enabling our sellers to reach and better serve more consumers</p>
                                            </div>
                                        </Paper>
                                    </div>
                                    <div className="col-md-4"><br/>
                                        <Paper style={{ padding: '15px', height: '275px' }}>
                                            <div style={{ padding: '15px', height: '50%' }}>
                                                <span className="fa-stack fa-4x">
                                                    <i className="fas fa-circle fa-stack-2x text-primary"></i>
                                                    <i className="fas fa-lock fa-stack-1x fa-inverse"></i>
                                                </span>
                                                <h4 className="my-3">Creating substainable impart in Nigeria</h4>
                                                <p className="text-muted"> We are creating new jobs and
                                                developing new skills on the continent</p>
                                            </div>
                                        </Paper>
                                    </div>
                                </div>
                                <br/>
                            </div>
                        </section>
                    </div>
                    <section className="page-section container" style={{ marginTop: '70px' }}>
                        <div style={{ margin: 'auto', width: '150px' }}>
                            <IconButton>
                                <Avatar
                                    src={require('../../images/ceo.jpeg')}
                                    style={{
                                        width: '150px',
                                        height: '150px'
                                    }}
                                />
                            </IconButton>
                        </div>
                        <div className="portfolio-caption">
                            <div className="portfolio-caption-heading" style={{ textAlign: 'center' }}>CEO MyShoppin-Mall Ltd</div>
                            <div className="portfolio-caption-subheading text-muted" style={{ textAlign: 'center' }}>
                                <p>A brand new Car and a well-furnished house <br />goes to our best customer of the year</p>
                                <p>#2020</p>
                            </div>
                        </div>
                    </section>
                    <section className="page-section container" style={{ marginTop: '50px', marginBottom: '60px' }}>
                        <div className="row text-center">
                            <div className="col-md-6">
                                <Card>
                                    <CardHeader title='Stand a chance to win'/>
                                    <img src={require('../../images/car.jpeg')} alt="" width='100%' height='250px' />
                                    <CardContent>
                                        <div className="portfolio-caption">
                                            <div className="portfolio-caption-heading">Mahindra Scorpio </div>
                                            <div className="portfolio-caption-subheading text-muted">Prize #1</div>
                                        </div>
                                    </CardContent>
                                    <CardActions>
                                        <button className='btn btn-default' style={{backgroundColor:'#ff6666'}}>Check Rating Board</button>
                                    </CardActions>
                                </Card>
                            </div>
                            <div className="col-md-6">
                                <Card>
                                    <CardHeader title='Stand a chance to win'/>
                                    <img src={require('../../images/house.jpg')} alt="" width='100%' height='250px' />
                                    <CardContent>
                                        <div className="portfolio-caption">
                                            <div className="portfolio-caption-heading">Full Duplex</div>
                                            <div className="portfolio-caption-subheading text-muted">Prize #2</div>
                                        </div>
                                    </CardContent>
                                    <CardActions>
                                        <button className='btn btn-default' style={{backgroundColor:'#ff6666'}}>Check Rating Board</button>
                                    </CardActions>
                                </Card>
                            </div>
                        </div>
                    </section>
                    <section className="page-section" id="contact"><br/>
                        <div className="container">
                            <div className="text-center">
                                <h2 className="section-heading text-uppercase">Contact Us</h2>
                                <p style={{color: '#fff'}}>{this.state.message}</p>
                            </div>
                            <form id="contactForm" name="sentMessage" onSubmit={this.submitForm}>
                                <div className="row align-items-stretch mb-5">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <input className="form-control" name="sender" type="email" placeholder="Your Email *" required="required"/>
                                            <p className="help-block text-danger"></p>
                                        </div>
                                        <div className="form-group mb-md-0">
                                            <input className="form-control" name="subject" type="text" placeholder="Subject" required="required"/>
                                            <p className="help-block text-danger"></p>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group form-group-textarea mb-md-0">
                                            <textarea className="form-control" name="message" placeholder="Your Message *" required="required"></textarea>
                                            <p className="help-block text-danger"></p>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-center">
                                    <div id="success"></div>
                                    <button className="btn btn-default btn-xl text-uppercase" style={{backgroundColor:'#ff6666'}}  id="sendMessageButton" type="submit">{show}</button>
                                </div>
                            </form>
                        </div><br/>
                    </section>
                </div>}
            </div >
        );
    }

    submitForm = async (e) => {
        e.preventDefault();
        this.setState({ submitStatus: !this.state.submitStatus });
        const data = {
            sender: e.target[0].value,
            subject: e.target[1].value,
            message: e.target[2].value,
        }
        this.sendmail.postMethod(data).then(res=>{
            this.setState({ submitStatus: !this.state.submitStatus });
            document.getElementById('contactForm').reset();
            if(res.Messagesent) this.setState({ message: 'message sent successfully'});
            else this.setState({ message: 'error sending message, check your network connection'});
        });
    }
}

export default Home;