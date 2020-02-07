import React, { Component } from 'react'
import MyNotification from '../MyNotification'
import UserStore from './UserStore';
import { observer } from 'mobx-react';
import { NavLink } from 'react-router-dom'
import { path } from '../path';

@observer
export default class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email:'',
            password:'',
        };
      }

    onChangeLogin = (e)=>{
        e.preventDefault();
        this.setState({
           [e.target.name] : e.target.value
        })
     }

     onClickLogin = (e)=>{
        e.preventDefault();
        if(this.state.email == '' || this.state.password == ''){
            MyNotification.alertError("Vui lòng điền đầy đủ thông tin đăng nhập!")
        }
        else{
            this.fetchLoginAccount();
        }
      }

      fetchLoginAccount = () => {
        var data = {};
        data.email = this.state.email;
        data.password = this.state.password;
        var url_login = path.LOGIN;
        fetch(url_login, {
          method: "POST",
          body: JSON.stringify(data),
          headers: new Headers({
            'Content-Type': 'application/json'
          }),
          credentials: 'include'
        })
          .then(
            response =>
              response.json()
          )
          .then(res => {
            if (res != '') {
              UserStore.userAuthencation = res;
              MyNotification.alertSuccess("Hi "+res.userName+" ! Welcome to FlyAirlines");
              this.props.history.push("/");
             sessionStorage.setItem("user",JSON.stringify(UserStore.userAuthencation));
             window.location.reload();
            }
            else {
              MyNotification.alertError("Đăng nhập thất bại! Sai email hoặc password.")
            }
          })
          .catch(error => {
            MyNotification.alertError("Đăng nhập thất bại!")
          });
      }
    render() {
        return (
            <div>
                <section className="section section-lg">
                    <div className="shape shape-style-1 bg-gradient-default">
                        <span />
                        <span />
                        <span />
                        <span />
                        <span />
                        <span />
                        <span />
                        <span />
                    </div>
                    <div className="container pt-lg-md">
                        <div className="row justify-content-center">
                            <div className="col-lg-5">
                                <div className="card bg-secondary shadow border-0">
                                    <div className="card-header bg-white pb-5">
                                        <div className="text-muted text-center mb-3">
                                            <small>SIGN IN FLY AIRLINES</small>
                                        </div>
                                    </div>
                                    <div className="card-body px-lg-5 py-lg-5">
                                        <div className="text-center text-muted mb-4">
                                            <small>Or sign in with credentials</small>
                                        </div>
                                        <form role="form">
                                            <div className="form-group mb-3">
                                                <div className="input-group input-group-alternative">
                                                    <div className="input-group-prepend">
                                                        <span className="input-group-text"><i className="ni ni-email-83" /></span>
                                                    </div>
                                                    <input name="email" className="form-control" placeholder="Email" type="email" onChange={(e)=>this.onChangeLogin(e)}/>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <div className="input-group input-group-alternative">
                                                    <div className="input-group-prepend">
                                                        <span className="input-group-text"><i className="ni ni-lock-circle-open" /></span>
                                                    </div>
                                                    <input name="password" className="form-control" placeholder="Password" type="password" onChange={(e)=>this.onChangeLogin(e)}/>
                                                </div>
                                            </div>
                                            <div className="custom-control custom-control-alternative custom-checkbox">
                                                <input className="custom-control-input" id=" customCheckLogin" type="checkbox" />
                                                <label className="custom-control-label" htmlFor=" customCheckLogin">
                                                    <span>Remember me</span>
                                                </label>
                                            </div>
                                            <div className="text-center">
                                                <button type="button" className="btn btn-primary my-4" onClick={this.onClickLogin}>Sign in</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                <div className="row mt-3">
                                <div className="col-6 text-left">
                                    </div>
                                    <div className="col-6 text-right">
                                        <NavLink to="/register" className="text-light">
                                            <small>Create new account</small>
                                        </NavLink>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

            </div>
        )
    }
}
