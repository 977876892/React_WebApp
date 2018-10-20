import React, { Component } from 'react';
import Home from '../home/home';
import About from '../about/about';
import Signup from '../signup/signup';
import Login from '../login/login';
import Profile from '../profile/profile';
import {ToastContainer, ToastStore} from 'react-toasts';
import { BrowserRouter as Router, Switch, Route, Link,NavLink  } from 'react-router-dom';
class Header extends Component {
    constructor() {
        super()
        this.logout = this.logout.bind(this);
        this.state = {
            localstoragedata: JSON.parse(localStorage.getItem('user_details')) ? JSON.parse(localStorage.getItem('user_details'))['username'] : null
        }
    }
    logout(event) {
        event.preventDefault();
        localStorage.removeItem('user_details');
        this.setState({localstoragedata:null})
        window.location.href = '/';
        ToastStore.success('Hey, You have logout successfully. !');
    }
    render(){
        return(
            <div className="Head">
            <Router>                
              <div className="clswrapper">
                    <div id="header" className="clearfix">
                        <div id="selLogo" className="clsFloatLeft">
                        <h1><Link to="">Business Co</Link></h1>
                        </div>
                        <div className="clsMenu clsFloatRight">
                        <ul>
                            { this.state.localstoragedata !== null ?
                                <span>
                                    <li><NavLink to={'/home'} activeClassName="active">Home</NavLink></li>
                                    <li><NavLink to={'/about'} activeClassName="active">About us</NavLink></li>
                                    <li><Link to="" >Services</Link></li>
                                    <li><Link to="">Solutions</Link></li>
                                    <li className="clsNoBorder"><NavLink to={'/profile'} activeClassName="active">Profile</NavLink></li>
                                </span>
                            : null }
                            <li  className="clsNoBorder">
                                { !this.state.localstoragedata ? <NavLink to={'/login'} ><button type="button" className="btn  btn-primary login">Login</button></NavLink> : null }
                                { this.state.localstoragedata !== null ? <button type="button" className="btn  btn-default login" onClick={this.logout} >Logout</button> : null }
                                &nbsp;&nbsp;
                              { !this.state.localstoragedata ?  <NavLink to={'/signup'} ><button type="button" className="btn btn-info login">Signup</button></NavLink> : null }
                                </li>
                        </ul>
                       {/*<Switch>
                            <Route  path='/home' component={Home} />
                            <Route  path='/about' component={Home} />
                        </Switch>*/}
                        </div>
                    </div>
                    <div id="banner">
                        <p className="clsBannerText">There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage.</p>
                        <p className="clsReadmore"><Link to="">Readmore</Link></p>
                    </div>
                    { this.state.localstoragedata !== null ?
                        <span>
                                <Route exact path="/" component={Home} />
                                <Route exact path="/home" component={Home} />
                                <Route path="/about" component={About} />
                                <Route path="/profile" component={Profile} />
                        </span>
                        : 
                        <span>
                            <Route path="/signup" component={Signup} />
                            <Route path="/login" component={Login} />
                            <Route path="*" exact component={Home} />
                            
                        </span>
                         }
                 </div>
            </Router>      
            <ToastContainer store={ToastStore}/>                                 
            </div>
        );
    }
}

export default Header;