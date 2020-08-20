import React, { Component } from 'react';
import { Redirect } from 'react-router';
import {ToastContainer, ToastStore} from 'react-toasts';
import {  Link  } from 'react-router-dom';
import './login.css';

class Login extends Component {
    constructor(props) {
		super(props);
		this.redirect_signup = this.redirect_signup.bind(this);
        this.userLogin = this.userLogin.bind(this);
        this.state = {
           signup_nav : false
       }
	}
   redirect_signup(event) {
       event.preventDefault();
      this.setState({signup_nav:true});
   }
   userLogin(e) {
       e.preventDefault()
       if (!this.refs.uname.value) {
          ToastStore.warning('Username is required.');
        } else if(!this.refs.pwd.value) {
           ToastStore.warning('Password is required.');
        } else {
            const data = {
                'username':this.refs.uname.value,
                'password':this.refs.pwd.value
            };
            fetch('http://localhost:1234/users/login', {
			method: 'post',
            headers: {'Content-Type': 'application/json'},
			body: JSON.stringify(data)
		 }).then(function(response) {
				return response.json();             
		  }).then(function (result) {
            if (result.status) {
                localStorage.setItem('user_details',JSON.stringify(result.data));
                 localStorage.setItem('token',result.token);
				document.getElementById("clear-form").reset();
				ToastStore.success('Hey, You have login successfully. !');
                window.location.href = '/home';				
			} else {
                ToastStore.warning('Please check your username and password.');
            }
          }).catch(error =>
		    ToastStore.error('Sorry, There was an error. !')
	    	)
        }
   }
   render() {
       const { signup_nav } = this.state;
       if (signup_nav) {
           return <Redirect to="/signup" push={true} />
       }
       return (
           <div className="login-form">
                <form id="clear-form">
                    <h2 className="text-center">Log in</h2>       
                    <div className="form-group">
                        <input type="text" className="form-control" placeholder="Username"  ref="uname"/>
                    </div>
                    <div className="form-group">
                        <input type="password" className="form-control" placeholder="Password" ref="pwd"/>
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary btn-block" onClick={this.userLogin}>Log in</button>
                    </div>
                    <div className="clearfix">
                        <label className="pull-left checkbox-inline"><input type="checkbox" /> Remember me</label>
                        <Link to="#" className="pull-right">Forgot Password?</Link>
                    </div>        
                </form>
                <ToastContainer store={ToastStore}/>                               
                <p className="text-center"><Link to="" onClick={this.redirect_signup}>Create an Account</Link></p>
            </div>
       );
   }
}

export default Login;