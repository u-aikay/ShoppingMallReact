import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Session from 'react-session-api';
import {UserApi} from '../../apis/apiUser';
import '../../css/App.css';
import Nav from '../nav.jsx';

class Reset extends Component {

    state = {
        submitStatus: false,
        error: '',
        success: ''
    }

    constructor(props){
        super(props);
        this.updatePassword = new UserApi(process.env.REACT_APP_UPDATE_PASS);
    }

    componentDidMount() {
        if (window.sessionStorage.getItem('id')) {
            window.sessionStorage.removeItem('id');
            Session.remove('data');
        }
    }

    render() {
        const show = (this.state.submitStatus) ? 'Submiting...' : 'Submit',
        error = (this.state.error !== '') ? this.state.error : '',
        success = (this.state.success !== '') ? this.state.success : '';

        return (
            <div>
                <Nav data={this.props}/>
                <div className='container' id='div'>
                    <form onSubmit={this.submitForm} id='form'>
                       <fieldset style=
                            {{
                              borderRight: '1px solid #80afbc', 
                              borderLeft: '1px solid #80afbc',
                              borderBottom: '1px solid #80afbc',
                              padding: '15px', borderRadius: '12px'
                            }}
                        >
                            <legend><h2>Reset::</h2></legend>
                            <span style={{ color: 'green' }}>{success}</span>
                            <span style={{ color: 'red' }}>{error}</span>
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1" style={{ color: '#80affc', fontSize: '20px' }}>Email address</label>
                                <input type="email" name='email' className="form-control" placeholder='Enter Email'></input>
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputPassword1" style={{ color: '#80affc', fontSize: '20px' }}>New Password</label>
                                <input type="password" name='password' className="form-control" placeholder='Enter New Password'></input>
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputPassword1" style={{ color: '#80affc', fontSize: '20px' }}>Confirm Password</label>
                                <input type="password" name='confirmpassword' className="form-control" placeholder='Confirm Password'></input>
                            </div>
                            <button type="submit" name='submit' className="btn btn-primary">{show}</button>
                        </fieldset>
                    </form>
                    <em>
                        <Link style={{ float: 'right', textDecoration: 'none', marginLeft: '5px' }} to='/login'>Login?</Link>
                        <Link style={{ float: 'right', textDecoration: 'none' }} to='/reset'>Forgot password?</Link> 
                    </em>
                </div>
            </div>
        );
    }

    submitForm = async (e) => {

        e.preventDefault();

        this.setState({ submitStatus: !this.state.submitStatus });

        const data = { email: e.target[1].value, password: e.target[2].value, confirmpassword: e.target[3].value }

        this.updatePassword.postMethod(data).then(res=>{
            if (res === 'password successfully updated') {
                this.setState({ submitStatus: !this.state.submitStatus });
                this.setState({ success: res});
                document.getElementById('form').reset();
            }
            else {
                this.setState({ error: res });
                this.setState({ success: '' });
                this.setState({ submitStatus: !this.state.submitStatus });
            }
        });
    }

}

export default Reset;