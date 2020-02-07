import React, { Component } from 'react'
import MyNotification from '../MyNotification'
import { path } from '../path';
export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username:'',
            email:'',
            password:'',
            phone:'',
            policy: 'false'
        };
      }
      onChangeRegister = (e)=>{
         e.preventDefault();
         this.setState({
            [e.target.name] : e.target.value
         })
      }
      onChangePolicy(e){
          e.preventDefault();
          this.setState({
            policy : e.target.checked
         },()=>{
             console.log(this.state.policy)
         })

    };
     validateEmail=(email)=> {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
      onClickRegister = (e)=>{
        e.preventDefault();
        if(this.state.username == '' || this.state.email == '' || this.state.password == '' || this.state.phone == ''){
            MyNotification.alertError("Vui lòng điền đầy đủ thông tin!")
        }
        else if(!this.validateEmail(this.state.email)){
            MyNotification.alertError("Vui lòng điền đúng định dạng email!");
        }
        else if(this.state.policy == false){
            MyNotification.alertError("Bạn có đồng ý với chính sách người dùng của chúng tôi!")
        }
        else{
            this.fetchRegisterAccount();
        }
      }
      fetchRegisterAccount = () => {
        var data = {};
        data.username = this.state.username;
        data.email = this.state.email;
        data.password = this.state.password;
        data.phone = this.state.phone;
        var url_register = path.REGISTER;
        fetch(url_register, {
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
          .then(check => {
            if (check == true) {
              MyNotification.alertSuccess("Đăng kí tài khoản thành công!")
              this.props.history.push("/login");
            }
            else {
              MyNotification.alertError("Email đã tồn tại. Vui lòng chọn một email khác!")
            }
          })
          .catch(error => {
            MyNotification.alertError("Đăng kí tài khoản thất bại!Hãy thử đăng kí lại.")
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
                                            <small>SIGN UP FLY AIRLINES</small>
                                        </div>
                                    </div>
                                    <div className="card-body px-lg-5 py-lg-5">
                                        <div className="text-center text-muted mb-4">
                                            <small>Or sign up with credentials</small>
                                        </div>
                                        <form role="form">
                                            <div className="form-group">
                                                <div className="input-group input-group-alternative mb-3">
                                                    <div className="input-group-prepend">
                                                        <span className="input-group-text"><i className="ni ni-hat-3" /></span>
                                                    </div>
                                                    <input name="username" className="form-control" placeholder="Name" type="text" onChange={(e)=>this.onChangeRegister(e)}/>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <div className="input-group input-group-alternative mb-3">
                                                    <div className="input-group-prepend">
                                                        <span className="input-group-text"><i className="ni ni-email-83" /></span>
                                                    </div>
                                                    <input name="phone" className="form-control" placeholder="Phone" type="number" onChange={(e)=>this.onChangeRegister(e)}/>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <div className="input-group input-group-alternative mb-3">
                                                    <div className="input-group-prepend">
                                                        <span className="input-group-text"><i className="ni ni-email-83" /></span>
                                                    </div>
                                                    <input name="email" className="form-control" placeholder="Email" type="email" onChange={(e)=>this.onChangeRegister(e)}/>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <div className="input-group input-group-alternative">
                                                    <div className="input-group-prepend">
                                                        <span className="input-group-text"><i className="ni ni-lock-circle-open" /></span>
                                                    </div>
                                                    <input name="password" className="form-control" placeholder="Password" type="password" onChange={(e)=>this.onChangeRegister(e)}/>
                                                </div>
                                            </div>
                                            <div className="text-muted font-italic">
                                                {/* <small>password strength:
                      <span className="text-success font-weight-700">strong</span>
                                                </small> */}
                                            </div>
                                            <div className="row my-4">
                                                <div className="col-12">
                                                    <div className="custom-control custom-control-alternative custom-checkbox">
                                                        <input className="custom-control-input" id="customCheckRegister" type="checkbox"  onChange={(e)=>this.onChangePolicy(e)} />
                                                        <label className="custom-control-label" htmlFor="customCheckRegister">
                                                            <span>Bằng việc đăng ký, tôi đồng ý với các <a href="https://www.traveloka.com/vi-vn/termsandconditions" target="_blank">Điều khoản & Điều kiện</a>  và <a href="https://www.traveloka.com/vi-vn/privacypolicy" target="_blank">Chính sách về quyền riêng tư</a> của Fly Airlines.
                                                            </span>
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="text-center">
                                                <button type="button" className="btn btn-primary mt-4" onClick={(e)=>this.onClickRegister(e)}>Create account</button>
                                            </div>
                                        </form>
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
