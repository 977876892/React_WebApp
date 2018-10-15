import React, { Component } from 'react';
import { Redirect } from 'react-router';
import {ToastContainer, ToastStore} from 'react-toasts';
import './signup.css';
class Signup extends Component {
	 isLoggedIn = false;	   		
	constructor(props) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.state = {
           errors: {},
		   loader: false
       }
	}
  handleSubmit(event) {
	let errors = {};
    event.preventDefault();
    const formData = {};
      for (const data in this.refs) {
        formData[data] = this.refs[data].value;
      }
	const EMAIL_REGEXP = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	if (!formData.fname) {
       errors["fname"] = "First name is required.";
	   window.scrollTo(0, 300);
	} else if (!formData.lname) {
       errors["lname"] = "Lname name is required.";
	   window.scrollTo(0, 300);
	} else if (!formData.email) {
       errors["email"] = "Email id is required.";
	   window.scrollTo(0, 300);
	} else if (formData.email && !EMAIL_REGEXP.test(formData.email)) {
       errors["email"] = "Invalid email id.";
	   window.scrollTo(0, 300);
	} else if (!formData.phone) {
       errors["phone"] = "Phone number is required.";
	   window.scrollTo(0, 300);
	} else if (formData.gender === 'Select gender') {
       errors["gender"] = "Gender is required.";
	   window.scrollTo(0, 500);
	} else if (!formData.address) {
       errors["address"] = "Address is required.";
	} else if (!formData.username) {
       errors["username"] = "Username is required.";
	} else if (!formData.password) {
       errors["password"] = "Password is required.";
	} else if (!formData.oldpassword) {
       errors["oldpassword"] = "Old password is required.";
	} else if (formData.password !== formData.oldpassword) {
       errors["pwdnotmatch"] = "Passwords does not match.";
	} else {
		window.scroll(0,0);	
		this.setState({ loader: true });
		const data = new FormData(event.target);
		data.set('userdata', JSON.stringify(formData));
		fetch('http://localhost:8080/api/signup', {
			method: 'post',
			body: data
		}).then(response => {
			if (response.status >= 200 && response.status < 300) {
			    this.setState({ loader: false });				
				document.getElementById("clear-form").reset();
				ToastStore.success('Hey, You have registered successfully. !');				
				return response.json();
			}
		}).catch(error =>
		    ToastStore.success('Sorry, There was an error. !'),
		     this.setState({ loader: false })			
		)
	}
	this.setState({errors: errors});
  }
  
	removeError = (name) => {
		let errors = {};
		errors[name] = '';
		this.setState({errors: errors});
	}

    state = {
        navigate: false
    }
   render() {
	   const { loader } = this.state;
	   let buttLoad;
	   let overlay;
	   if (loader) {
	      buttLoad = <div className="loader"></div>;
		  overlay= <div className="overlay"></div>;			
		  
        } else {
		   buttLoad = <div className=""></div>;
		   overlay= <div className=""></div>;
		}

        const { navigate } = this.state

    // here is the important part
        if (navigate) {
        return <Redirect to="/about" push={true} />
        }
       return (
           <div className="signup">
			   {buttLoad}
			<div className="row main">
				<div className="panel-heading">
	               <div className="panel-title text-center">
	               		<h1 className="title">Signup</h1>
	               		<hr />
	               	</div>
	            </div>
				<div className="main-login main-center">
					<form className="form-horizontal" id="clear-form" >

						<div className="form-group">
							<label htmlFor="fname" className="cols-sm-2 control-label">First Name</label>
							<div className="cols-sm-10">
								<div className="input-group">
									<span className="input-group-addon"><i className="fa fa-user fa" aria-hidden="true"></i></span>
									<input type="text" className="form-control" name="fname" id="fname" ref="fname"  placeholder="Enter first Name" onKeyPress={() =>this.removeError('fname')} />
								</div>
								     <span style={{color: "red"}}>{this.state.errors['fname']}</span>								
							</div>
						</div>

						<div className="form-group">
							<label htmlFor="lname" className="cols-sm-2 control-label">Last Name</label>
							<div className="cols-sm-10">
								<div className="input-group">
									<span className="input-group-addon"><i className="fa fa-user fa" aria-hidden="true"></i></span>
									<input type="text" className="form-control" name="lname" id="lname" ref="lname"  placeholder="Enter last Name" onKeyPress={() =>this.removeError('lname')}/>
								</div>
								<span style={{color: "red"}}>{this.state.errors['lname']}</span>
							</div>
						</div>

						<div className="form-group">
							<label htmlFor="email" className="cols-sm-2 control-label">Your Email</label>
							<div className="cols-sm-10">
								<div className="input-group">
									<span className="input-group-addon"><i className="fa fa-envelope fa" aria-hidden="true"></i></span>
									<input type="email" className="form-control" name="email" id="email" ref="email"  placeholder="Enter your Email" onKeyPress={() =>this.removeError('email')}/>
								</div>
								<span style={{color: "red"}}>{this.state.errors['email']}</span>
							</div>
						</div>

                        <div className="form-group">
							<label htmlFor="phone" className="cols-sm-2 control-label">Your Phone</label>
							<div className="cols-sm-10">
								<div className="input-group">
									<span className="input-group-addon"><i className="fa fa-phone fa" aria-hidden="true"></i></span>
									<input type="number" className="form-control" name="phone" id="phone" ref="phone" placeholder="Enter your phone number" onKeyPress={() =>this.removeError('phone')}/>
								</div>
								<span style={{color: "red"}}>{this.state.errors['phone']}</span>
							</div>
						</div>

						 <div className="form-group">
							<label htmlFor="bday" className="cols-sm-2 control-label">Your Birthdate</label>
							<div className="cols-sm-10">
								<div className="input-group">
									<span className="input-group-addon"><i className="fa fa-birthday-cake" aria-hidden="true"></i></span>
									<input type="date" className="form-control" name="bday" id="bday" ref="bday" placeholder="Enter your Birthdate"/>
								</div>
							</div>
						</div>

                        <div className="form-group">
							<label htmlFor="phone" className="cols-sm-2 control-label">Choose your gender:</label>
                            <div className="cols-sm-10">
								<div className="input-group">
									<span className="input-group-addon"><i className="fa fa-genderless fa" aria-hidden="true"></i></span>
									<select className="genderSele" ref="gender" onClick={() =>this.removeError('gender')}>
                                        <option>Select gender</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                        <option value="unspecified">Unspecified</option>
                                    </select>
								</div>
								<span style={{color: "red"}}>{this.state.errors['gender']}</span>
							</div>
						</div>

						<div className="form-group">
							<label htmlFor="address" className="cols-sm-2 control-label">Your Address</label>
							<div className="cols-sm-10">
								<div className="input-group">
									<span className="input-group-addon"><i className="fa fa-address-card" aria-hidden="true"></i></span>
								    <textarea name="address" id="address" ref="address" placeholder="Enter your Address" className="form-control" onKeyPress={() =>this.removeError('address')}/>
								</div>
								<span style={{color: "red"}}>{this.state.errors['address']}</span>
							</div>
						</div>

						<div className="form-group">
							<label htmlFor="pin" className="cols-sm-2 control-label">Your Pin</label>
							<div className="cols-sm-10">
								<div className="input-group">
									<span className="input-group-addon"><i className="fa fa-thumb-tack" aria-hidden="true"></i></span>
									<input type="number" className="form-control" name="pin" id="pin" ref="pin"  placeholder="Enter your pin" />
								</div>
							</div>
						</div>

						<div className="form-group">
							<label htmlFor="username" className="cols-sm-2 control-label">Username</label>
							<div className="cols-sm-10">
								<div className="input-group">
									<span className="input-group-addon"><i className="fa fa-users fa" aria-hidden="true"></i></span>
									<input type="text" className="form-control" name="username" id="username" ref="username"  placeholder="Enter your Username" onKeyPress={() =>this.removeError('username')}/>
								</div>
								<span style={{color: "red"}}>{this.state.errors['username']}</span>
							</div>
						</div>

						<div className="form-group">
							<label htmlFor="password" className="cols-sm-2 control-label">Password</label>
							<div className="cols-sm-10">
								<div className="input-group">
									<span className="input-group-addon"><i className="fa fa-lock fa-lg" aria-hidden="true"></i></span>
									<input type="password" className="form-control" ref="password" name="password" id="password"  placeholder="Enter your Password"  onKeyPress={() =>this.removeError('password')} />
								</div>
								<span style={{color: "red"}}>{this.state.errors['password']}</span>
							</div>
						</div>

						<div className="form-group">
							<label htmlFor="confirm" className="cols-sm-2 control-label">Confirm Password</label>
							<div className="cols-sm-10">
								<div className="input-group">
									<span className="input-group-addon"><i className="fa fa-lock fa-lg" aria-hidden="true"></i></span>
									<input type="password" className="form-control" name="confirm" id="confirm" ref="oldpassword" placeholder="Confirm your Password" onKeyPress={() =>this.removeError('oldpassword')} />
								</div>
								<span style={{color: "red"}}>{this.state.errors['oldpassword']}</span>
							</div>
						</div>
                        <span style={{color: "red"}}>{this.state.errors['pwdnotmatch']}</span>
						<div className="form-group ">
							<button type="button" onClick={this.handleSubmit} className="btn btn-primary btn-lg btn-block login-button">Register</button>
						</div>
						<div className="login-register">
				            <a onClick={() => this.setState({ navigate: true })}>Login</a>
				         </div>
					</form>
				</div>
			</div>
            <ToastContainer store={ToastStore}/>
			{overlay}
		</div>
       );
   }
}

export default Signup;