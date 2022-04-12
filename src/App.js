import React, { Component } from 'react';
import Home from './pages/home/home.jsx';
import Register from './pages/register/register.jsx';
import Profile from './pages/profile/profile.jsx';
import Login from './pages/login/login.jsx';
import Reset from './pages/login/reset.jsx';
import Redirect from './pages/redirect.jsx';
import Logout from './pages/logout.jsx';
import Products from './pages/product/products.jsx';
import UpdateProduct from './pages/update.jsx';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import './css/App.css';

class App extends Component {
  style = {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    padding: 15,
    backgroundColor: '#fff'
  }
  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route path='/profile' component={Profile} />
            <Route path='/products' component={Products} />
            <Route path='/login' component={Login} />
            <Route path='/logout' component={Logout} />
            <Route path='/redirect' component={Redirect} />
            <Route path='/update/product' component={UpdateProduct} />
            <Route path='/reset' component={Reset} />
            <Route path='/register' component={Register} />
            <Route path='/' exact component={Home} />
          </Switch>
          <footer style={this.style}>
            <hr style={{backgroundColor: '#9edef1', width: '90%'}}/>
            <h5 className='col-xs-12 col-sm-12 text-center'>Copyright © react app 2020</h5>
          </footer>
        </div>
      </Router>
    );
  }
}

export default App;
