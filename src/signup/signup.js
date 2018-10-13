import React, { Component } from 'react';
import { Redirect } from 'react-router';
import './signup.css';
class Signup extends Component {
    state = {
        navigate: false
    }
   render() {
        const { navigate } = this.state

    // here is the important part
        if (navigate) {
        return <Redirect to="/about" push={true} />
        }
       return (
           <div className="signup">
			<div className="row main">
				<div className="main-login main-center">
					<form className="form-horizontal" method="post" action="#">

						<div className="form-group">
							<label htmlFor="name" className="cols-sm-2 control-label">Your Name</label>
							<div className="cols-sm-10">
								<div className="input-group">
									<span className="input-group-addon"><i className="fa fa-user fa" aria-hidden="true"></i></span>
									<input type="text" className="form-control" name="name" id="name"  placeholder="Enter your Name"/>
								</div>
							</div>
						</div>

						<div className="form-group">
							<label htmlFor="email" className="cols-sm-2 control-label">Your Email</label>
							<div className="cols-sm-10">
								<div className="input-group">
									<span className="input-group-addon"><i className="fa fa-envelope fa" aria-hidden="true"></i></span>
									<input type="text" className="form-control" name="email" id="email"  placeholder="Enter your Email"/>
								</div>
							</div>
						</div>

                        <div className="form-group">
							<label htmlFor="phone" className="cols-sm-2 control-label">Your Phone</label>
							<div className="cols-sm-10">
								<div className="input-group">
									<span className="input-group-addon"><i className="fa fa-phone fa" aria-hidden="true"></i></span>
									<input type="number" className="form-control" name="phone" id="phone"  placeholder="Enter your phone number"/>
								</div>
							</div>
						</div>

                        <div className="form-group">
							<label htmlFor="phone" className="cols-sm-2 control-label">Choose your gender:</label>
                            <div className="cols-sm-10">
								<div className="input-group">
									<span className="input-group-addon"><i className="fa fa-genderless fa" aria-hidden="true"></i></span>
									<select className="genderSele">
                                        <option>Select gender</option>
                                    </select>
								</div>
							</div>
						</div>

						<div className="form-group">
							<label htmlFor="username" className="cols-sm-2 control-label">Username</label>
							<div className="cols-sm-10">
								<div className="input-group">
									<span className="input-group-addon"><i className="fa fa-users fa" aria-hidden="true"></i></span>
									<input type="text" className="form-control" name="username" id="username"  placeholder="Enter your Username"/>
								</div>
							</div>
						</div>

						<div className="form-group">
							<label htmlFor="password" className="cols-sm-2 control-label">Password</label>
							<div className="cols-sm-10">
								<div className="input-group">
									<span className="input-group-addon"><i className="fa fa-lock fa-lg" aria-hidden="true"></i></span>
									<input type="password" className="form-control" name="password" id="password"  placeholder="Enter your Password"/>
								</div>
							</div>
						</div>

						<div className="form-group">
							<label htmlFor="confirm" className="cols-sm-2 control-label">Confirm Password</label>
							<div className="cols-sm-10">
								<div className="input-group">
									<span className="input-group-addon"><i className="fa fa-lock fa-lg" aria-hidden="true"></i></span>
									<input type="password" className="form-control" name="confirm" id="confirm"  placeholder="Confirm your Password"/>
								</div>
							</div>
						</div>

						<div className="form-group ">
							<button type="button" className="btn btn-primary btn-lg btn-block login-button">Register</button>
						</div>
						<div className="login-register">
				            <a onClick={() => this.setState({ navigate: true })}>Login</a>
				         </div>
					</form>
				</div>
			</div>
		</div>
       );
   }
}

export default Signup;