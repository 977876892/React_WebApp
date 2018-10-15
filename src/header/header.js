import React, { Component } from 'react';
import Home from '../home/home';
import About from '../about/about';
import Signup from '../signup/signup';
import { BrowserRouter as Router, Switch, Route, Link,NavLink  } from 'react-router-dom';
class Header extends Component {
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
                            <li><NavLink to={'/home'} activeClassName="active">Home</NavLink></li>
                            <li><NavLink to={'/about'} activeClassName="active">About us</NavLink></li>
                            <li><a href="services.html">Services</a></li>
                            <li><a href="solutions.html">Solutions</a></li>
                            <li className="clsNoBorder"><a href="contacts.html">Contacts</a></li>
                            <li  className="clsNoBorder">
                                <button type="button" className="btn  btn-primary login">Login</button>
                                &nbsp;&nbsp;
                               <NavLink to={'/signup'} ><button type="button" className="btn btn-info login">Signup</button></NavLink>
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
                        <Route exact path="/" component={Home} />
                        <Route exact path="/home" component={Home} />
                        <Route path="/about" component={About} />
                        <Route path="/signup" component={Signup} />
                 </div>
            </Router>                                       
            </div>
        );
    }
}

export default Header;