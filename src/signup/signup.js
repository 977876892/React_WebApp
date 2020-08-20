import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { ToastContainer, ToastStore } from 'react-toasts';
import { Link } from 'react-router-dom';
import './signup.css';
class Signup extends Component {
	constructor(props) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.state = {
			errors: {},
			loader: false,
			navigate: false,
			itemsArr: [],
			registerUserForm: {
				username: '',
				password: '',
				gender: 'male',
				firstname: '',
				lastname: '',
				email: '',
				bday: '',
				address: '',
				phone: '',
				pin: '',
				itemType: 'Doctors'
			}
		}
	}
	componentDidMount() {
		const apiUrl = 'http://localhost:1234/items/get';
		fetch(apiUrl)
			.then((response) => response.json())
			.then((data) => {
				this.setState({ itemsArr: data['data'] })
			}
			);
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
		} else if (!formData.email) {
			errors["email"] = "Email id is required.";
			window.scrollTo(0, 300);
		} else if (formData.email && !EMAIL_REGEXP.test(formData.email)) {
			errors["email"] = "Invalid email id.";
			window.scrollTo(0, 300);
		} else if (!formData.itemType) {
			errors["itemType"] = "Select business.";
		} else if (!formData.username) {
			errors["username"] = "Username is required.";
		} else if (!formData.password) {
			errors["password"] = "Password is required.";
		} else if (!formData.oldpassword) {
			errors["oldpassword"] = "Old password is required.";
		} else if (formData.password !== formData.oldpassword) {
			errors["pwdnotmatch"] = "Passwords does not match.";
		} else {
			// window.scroll(0,0);	
			this.setState({ loader: true });
			fetch('http://localhost:1234/users/registration', {
				method: 'post',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(this.state.registerUserForm)
			}).then(response => {
				if (!response.ok) {
					throw Error(response.status);
				}
				return response.json();
			}).then(function (result) {
				console.log(result)
				if (result.error === 'existing_user') {
					ToastStore.warning('Sorry,Username alredy exist, please change the user name.');
				} else {
					document.getElementById("clear-form").reset();
					ToastStore.success('Hey, You have registered successfully. !');
					window.location.href = '/login';
				}

			}).catch(error =>
				ToastStore.error('Sorry, There was an error. !'),
				this.setState({ loader: false }),
			)
		}
		this.setState({ errors: errors });
	}

	removeError = (name) => {
		let errors = {};
		errors[name] = '';
		this.setState({ errors: errors });
	}

	handleChange(el) {
		let inputName = el.target.name;
		let inputValue = el.target.value;

		let statusCopy = Object.assign({}, this.state);
		statusCopy.registerUserForm[inputName] = inputValue;

		this.setState(statusCopy);
		console.log(this.state.registerUserForm)
	}

	render() {
		const { loader } = this.state;
		let buttLoad;
		let overlay;
		if (loader) {
			buttLoad = <div className="loader"></div>;
			overlay = <div className="overlay"></div>;

		} else {
			buttLoad = <div className=""></div>;
			overlay = <div className=""></div>;
		}

		const { navigate } = this.state

		// here is the important part
		if (navigate) {
			return <Redirect to="/login" push={true} />
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
										<input type="text" className="form-control" ref="fname"
											value={this.state.registerUserForm.firstname} onChange={this.handleChange} placeholder="Enter first Name"
											onKeyPress={() => this.removeError('fname')} name="firstname" />
									</div>
									<span style={{ color: "red" }}>{this.state.errors['fname']}</span>
								</div>
							</div>

							<div className="form-group">
								<label htmlFor="lname" className="cols-sm-2 control-label">Last Name</label>
								<div className="cols-sm-10">
									<div className="input-group">
										<span className="input-group-addon"><i className="fa fa-user fa" aria-hidden="true"></i></span>
										<input type="text" className="form-control" name="lastname" id="lname" ref="lname"
											value={this.state.registerUserForm.lastname} onChange={this.handleChange}
											placeholder="Enter last Name" onKeyPress={() => this.removeError('lname')} />
									</div>
									<span style={{ color: "red" }}>{this.state.errors['lname']}</span>
								</div>
							</div>

							<div className="form-group">
								<label htmlFor="email" className="cols-sm-2 control-label">Your Email</label>
								<div className="cols-sm-10">
									<div className="input-group">
										<span className="input-group-addon"><i className="fa fa-envelope fa" aria-hidden="true"></i></span>
										<input type="email" className="form-control"
											value={this.state.registerUserForm.email} onChange={this.handleChange} name="email" id="email" ref="email" placeholder="Enter your Email" onKeyPress={() => this.removeError('email')} />
									</div>
									<span style={{ color: "red" }}>{this.state.errors['email']}</span>
								</div>
							</div>

							<div className="form-group">
								<label htmlFor="phone" className="cols-sm-2 control-label">Your Phone</label>
								<div className="cols-sm-10">
									<div className="input-group">
										<span className="input-group-addon"><i className="fa fa-phone fa" aria-hidden="true"></i></span>
										<input type="number" className="form-control"
											value={this.state.registerUserForm.phone} onChange={this.handleChange} name="phone" id="phone" ref="phone" placeholder="Enter your phone number" onKeyPress={() => this.removeError('phone')} />
									</div>
									<span style={{ color: "red" }}>{this.state.errors['phone']}</span>
								</div>
							</div>

							<div className="form-group">
								<label htmlFor="bday" className="cols-sm-2 control-label">Your Birthdate</label>
								<div className="cols-sm-10">
									<div className="input-group">
										<span className="input-group-addon"><i className="fa fa-birthday-cake" aria-hidden="true"></i></span>
										<input type="date" className="form-control"
											value={this.state.registerUserForm.bday} onChange={this.handleChange} name="bday" id="bday" ref="bday" placeholder="Enter your Birthdate" />
									</div>
								</div>
							</div>

							<div className="form-group">
								<label htmlFor="phone" className="cols-sm-2 control-label">Choose your gender:</label>
								<div className="cols-sm-10">
									<div className="input-group">
										<span className="input-group-addon"><i className="fa fa-genderless fa" aria-hidden="true"></i></span>
										<select className="genderSele" ref="gender" name="gender" value={this.state.registerUserForm.gender} onChange={this.handleChange} onClick={() => this.removeError('gender')}>
											<option>Select gender</option>
											<option value="male">Male</option>
											<option value="female">Female</option>
											<option value="other">Unspecified</option>
										</select>
									</div>
									<span style={{ color: "red" }}>{this.state.errors['gender']}</span>
								</div>
							</div>

							<div className="form-group">
								<label htmlFor="address" className="cols-sm-2 control-label">Your Address</label>
								<div className="cols-sm-10">
									<div className="input-group">
										<span className="input-group-addon"><i className="fa fa-address-card" aria-hidden="true"></i></span>
										<textarea name="address" id="address" ref="address" value={this.state.registerUserForm.address} onChange={this.handleChange} placeholder="Enter your Address" className="form-control" onKeyPress={() => this.removeError('address')} />
									</div>
									<span style={{ color: "red" }}>{this.state.errors['address']}</span>
								</div>
							</div>

							<div className="form-group">
								<label htmlFor="pin" className="cols-sm-2 control-label">Your Pin</label>
								<div className="cols-sm-10">
									<div className="input-group">
										<span className="input-group-addon"><i className="fa fa-thumb-tack" aria-hidden="true"></i></span>
										<input type="number" className="form-control" name="pin" id="pin" ref="pin" value={this.state.registerUserForm.pin} onChange={this.handleChange} placeholder="Enter your pin" />
									</div>
								</div>
							</div>
							<div className="form-group">
								<label htmlFor="phone" className="cols-sm-2 control-label">Choose your Business:</label>
								<div className="cols-sm-10">
									<div className="input-group">
										<span className="input-group-addon"><i className="fa fa-building fa" aria-hidden="true"></i></span>
										<select className="genderSele" ref="itemType" name="itemType" value={this.state.registerUserForm.itemType} onChange={this.handleChange} onClick={() => this.removeError('gender')}>
											{this.state.itemsArr.map(name => (<option>{name.type}</option>))}
										</select>
									</div>
									<span style={{ color: "red" }}>{this.state.errors['itemType']}</span>
								</div>
							</div>
							<div className="form-group">
								<label htmlFor="username" className="cols-sm-2 control-label">Username</label>
								<div className="cols-sm-10">
									<div className="input-group">
										<span className="input-group-addon"><i className="fa fa-users fa" aria-hidden="true"></i></span>
										<input type="text" className="form-control" name="username" id="username" ref="username" value={this.state.registerUserForm.username} onChange={this.handleChange} placeholder="Enter your Username" onKeyPress={() => this.removeError('username')} />
									</div>
									<span style={{ color: "red" }}>{this.state.errors['username']}</span>
								</div>
							</div>

							<div className="form-group">
								<label htmlFor="password" className="cols-sm-2 control-label">Password</label>
								<div className="cols-sm-10">
									<div className="input-group">
										<span className="input-group-addon"><i className="fa fa-lock fa-lg" aria-hidden="true"></i></span>
										<input type="password" className="form-control" ref="password" name="password" id="password" value={this.state.registerUserForm.password} onChange={this.handleChange} placeholder="Enter your Password" onKeyPress={() => this.removeError('password')} />
									</div>
									<span style={{ color: "red" }}>{this.state.errors['password']}</span>
								</div>
							</div>

							<div className="form-group">
								<label htmlFor="confirm" className="cols-sm-2 control-label">Confirm Password</label>
								<div className="cols-sm-10">
									<div className="input-group">
										<span className="input-group-addon"><i className="fa fa-lock fa-lg" aria-hidden="true"></i></span>
										<input type="password" className="form-control" name="confirm" id="confirm" ref="oldpassword" placeholder="Confirm your Password" onKeyPress={() => this.removeError('oldpassword')} />
									</div>
									<span style={{ color: "red" }}>{this.state.errors['oldpassword']}</span>
								</div>
							</div>
							<span style={{ color: "red" }}>{this.state.errors['pwdnotmatch']}</span>
							<div className="form-group ">
								<button type="button" onClick={this.handleSubmit} className="btn btn-primary btn-lg btn-block login-button">Register</button>
							</div>
							<div className="login-register">
								<a style={{ cursor: "pointer" }} onClick={() => this.setState({ navigate: true })}>Login</a>
							</div>
						</form>
					</div>
				</div>
				<ToastContainer store={ToastStore} />
				{overlay}
			</div>
		);
	}
}

export default Signup;