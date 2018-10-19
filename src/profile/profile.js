import React, { Component } from 'react';
import {ToastContainer, ToastStore} from 'react-toasts';



class Profile extends Component {
    localdata;
    constructor() {
        super()
        this.localdata = JSON.parse(localStorage.getItem('user_details'));
        this.commonsave = this.commonsave.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            userdata : this.localdata 
        }
    }
    handleChange(event) {
        const name = event.target.name;
        this.localdata[name] =  event.target.value;
        this.setState({userdata : this.localdata });
    }
    commonsave(e) {
        e.preventDefault();
       const EMAIL_REGEXP = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!this.state.userdata.fname) {
           ToastStore.warning( "First name is required.");
        } else if (!this.state.userdata.lname) {
          ToastStore.warning("Lname name is required.");
        } else if (!this.state.userdata.phone) {
          ToastStore.warning( "Phone number is required.");
        } else if (!this.state.userdata.email) {
          ToastStore.warning("Email id is required.");
        } else if (this.state.userdata.email && !EMAIL_REGEXP.test(this.state.userdata.email)) {
           ToastStore.warning("Invalid email id.");
        } else if (!this.state.userdata.address) {
          ToastStore.warning( "Address is required.");
        }  else {
            const data = new FormData(e.target);
            data.set('userdata', JSON.stringify(this.state.userdata));
            fetch('http://localhost:8080/api/profile/update', {
                method: 'post',
                body: data
            }).then(function(response) {
                    return response.json();             
            }).then(function (result) {
                console.log(result)
                if (result.status) {
                    localStorage.setItem('user_details',
                        JSON.stringify( {
                            'username' : result.data.User_Name,
                            'full_name' : result.data.FirstName + ' ' + result.data.LastName,
                            'fname':result.data.FirstName,
                            'lname':result.data.LastName,
                            'email':result.data.Email,
                            'id':result.data.Id,
                            'phone':result.data.Phone,
                            'address':result.data.Address
                        }))
                ToastStore.success('Hey, Profile update successfully. !');
                }
            }).catch(error =>
                ToastStore.error('Sorry, There was an error. !')
            )    
        }
    }
    render(){
        return (
            <div className="profile" >
                <div className="bootstrap snippet">
            <div className="row">
                <div className="col-sm-6"><h1>Hello, {this.localdata.fname} {this.localdata.lname}</h1></div>
            </div>
            <div className="row">
                <div className="col-sm-3">
            <div className="text-center">
                <img src="http://ssl.gstatic.com/accounts/ui/avatar_2x.png" className="avatar img-circle img-thumbnail" alt="avatar" />
                <h6>Upload a different photo...</h6>
                <input type="file" className="text-center center-block file-upload" />
            </div>
            <hr /><br />

                
                <ul className="list-group">
                    <li className="list-group-item text-muted">Activity <i className="fa fa-dashboard fa-1x"></i></li>
                    <li className="list-group-item text-right"><span className="pull-left"><strong>Shares</strong></span> 125</li>
                    <li className="list-group-item text-right"><span className="pull-left"><strong>Likes</strong></span> 13</li>
                    <li className="list-group-item text-right"><span className="pull-left"><strong>Posts</strong></span> 37</li>
                    <li className="list-group-item text-right"><span className="pull-left"><strong>Followers</strong></span> 78</li>
                </ul> 
                    
                </div>
                <div className="col-sm-9">
                    {/*<ul className="nav nav-tabs">
                        <li className="active"><a data-toggle="tab" href="#home">Home</a></li>
                        <li><a data-toggle="tab" href="#messages">Menu 1</a></li>
                        <li><a data-toggle="tab" href="#settings">Menu 2</a></li>
                    </ul>*/}

                    
                <div className="tab-content">
                    <div className="tab-pane active" id="home">
                        <hr />
                        <form className="form" id="registrationForm">
                            <div className="form-group">
                                
                                <div className="col-xs-6">
                                    <label htmlFor="first_name"><h4>First name</h4></label>
                                    <input type="text" className="form-control" name="fname" id="first_name" onChange={ this.handleChange} value={this.state.userdata.fname} placeholder="first name" title="enter your first name if any." />
                                </div>
                            </div>
                            <div className="form-group">
                                
                                <div className="col-xs-6">
                                    <label htmlFor="last_name"><h4>Last name</h4></label>
                                    <input type="text" className="form-control" name="lname" id="last_name" placeholder="last name" title="enter your last name if any." onChange={ this.handleChange} value={this.state.userdata.lname}/>
                                </div>
                            </div>
                
                            <div className="form-group">
                                
                                <div className="col-xs-6">
                                    <label htmlFor="phone"><h4>Phone</h4></label>
                                    <input type="text" className="form-control" name="phone" id="phone" placeholder="enter phone" title="enter your phone number if any." onChange={ this.handleChange} value={this.state.userdata.phone} />
                                </div>
                            </div>
                            <div className="form-group">
                                
                                <div className="col-xs-6">
                                    <label htmlFor="email"><h4>Email</h4></label>
                                    <input type="email" className="form-control" name="email" id="email" placeholder="you@email.com" title="enter your email."  onChange={ this.handleChange} value={this.state.userdata.email}/>
                                </div>
                            </div>
                            <div className="form-group">
                                
                               <div className="col-xs-6">
                                    <label htmlFor="username"><h4>User name</h4></label>
                                    <input type="text" className="form-control" disabled name="username" id="username" placeholder="user name" title="enter your user name."  onChange={ this.handleChange} value={this.state.userdata.username}/>
                                </div>
                            </div>
                            <div className="form-group">
                                
                                <div className="col-xs-6">
                                    <label htmlFor="password"><h4>Password</h4></label>
                                    <input type="password" className="form-control" name="password" id="password" placeholder="password" title="enter your password." />
                                </div>
                            </div>
                            <div className="form-group">
                                
                                <div className="col-xs-6">
                                    <label htmlFor="address"><h4>Address</h4></label>
                                    <textarea  className="form-control"  name="address" id="address"  placeholder="enter your address." onChange={ this.handleChange} value={this.state.userdata.address}></textarea>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-xs-12">
                                        <br />
                                        <button className="btn btn-lg btn-success" type="submit" onClick={this.commonsave} ><i className="glyphicon glyphicon-ok-sign"></i> Save</button>
                                        {/*&nbsp;&nbsp;
                                        <button className="btn btn-lg" type="reset"><i className="glyphicon glyphicon-repeat"></i> Reset</button>*/}
                                    </div>
                            </div>
                        </form>
                    
                    <hr />
                    
                    </div>
                    </div>
                </div>

                </div>
            </div>
            </div>      
           
        )
    }

}

export default Profile;