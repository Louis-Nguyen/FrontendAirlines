import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import './MenuStyle.css'
import ReactTimeout from 'react-timeout'
import { observer } from 'mobx-react';
import UserStore from '../User/UserStore';

@observer
export default class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    onHandleClick = () => {
        sessionStorage.removeItem("user");

        window.location.reload();
    }
    renderUserOrLoginRegister = () => {
        let user = JSON.parse(sessionStorage.getItem("user"));
        if (!user) {
            return (<ul className="navbar-nav align-items-lg-center ml-lg-auto">
                <li className="nav-item">
                    <NavLink to="/notification" className="nav-link nav-link-icon" data-toggle="tooltip" title="Thông báo">
                        <i className="ni ni-bell-55" />
                        <span className="nav-link-inner--text d-lg-none">Thông báo</span>
                    </NavLink>
                </li>
                <li className="nav-item d-none d-lg-block ml-lg-4">
                    <NavLink to="/login" className="btn btn-neutral btn-icon">
                        <span className="btn-inner--icon">
                            <i className="ni ni-circle-08"></i>
                        </span>
                        <span className="nav-link-inner--text">   Đăng nhập</span>
                    </NavLink>
                </li>
                <li className="nav-item d-none d-lg-block ml-lg-4">
                    <NavLink to="/register" className="btn btn-success">
                        <span className="btn-inner--icon">
                            <i className="ni ni-active-40   "></i>
                        </span>
                        <span className="nav-link-inner--text">   Đăng kí</span>
                    </NavLink>
                </li>
            </ul>)
        }
        else {
            return (<ul className="navbar-nav align-items-lg-center ml-lg-auto">
                <li className="nav-item">
                    <NavLink to="/notification" className="nav-link nav-link-icon" data-toggle="tooltip" title="Thông báo">
                        <i className="ni ni-bell-55" />
                        <span className="nav-link-inner--text d-lg-none">Thông báo</span>
                    </NavLink>
                </li>
                <li><div className="btn-group">
                    <button type="button" className="btn btn-info">Hi {" "+user.userName+"   "}</button>
                    <button type="button" className="btn btn-info dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <span className="sr-only">Toggle Dropdown</span>
                    </button>
                    <div className="dropdown-menu">
                        <NavLink to="/history" className="dropdown-item" >Lịch sử đặt vé</NavLink>
                        <NavLink to="/" className="dropdown-item" onClick={this.onHandleClick}>Đăng xuất</NavLink>
                    </div>
                </div></li>
            </ul>)
        }
    }
    render() {
        return (
            <div>
                <header className="header-global">
                    <nav id="navbar-main" className="navbar navbar-main navbar-expand-lg navbar-transparent navbar-light headroom">
                        <div className="container">
                            <NavLink to="/" className="navbar-brand mr-lg-5" >
                                <img className="logo" src="http://localhost:8080/FlyAirlines/img/Logo.png" alt="Smiley face" height="100px" width="100px !important" />
                            </NavLink>
                            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar_global" aria-controls="navbar_global" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon" />
                            </button>
                            <div className="navbar-collapse collapse" id="navbar_global">
                                <div className="navbar-collapse-header">
                                    <div className="row">
                                        <div className="col-6 collapse-brand">
                                            <NavLink to="/" className="navbar-brand mr-lg-5" >
                                                <img className="logo" src="http://localhost:8080/FlyAirlines/img/Logo.png" alt="Smiley face" height="100px" width="100px !important" />
                                            </NavLink>
                                        </div>
                                        <div className="col-6 collapse-close">
                                            <button type="button" className="navbar-toggler" data-toggle="collapse" data-target="#navbar_global" aria-controls="navbar_global" aria-expanded="false" aria-label="Toggle navigation">
                                                <span />
                                                <span />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <ul className="navbar-nav navbar-nav-hover align-items-lg-center">
                                    <li className="nav-item ">
                                        <NavLink to="/" className="nav-link" role="button">
                                            <i className="ni ni-collection d-lg-none" />
                                            <span className="nav-link-inner--text">Vé máy bay</span>
                                        </NavLink>
                                    </li>
                                    <li className="nav-item ">
                                        <NavLink to="/discount" className="nav-link" role="button">
                                            <i className="ni ni-collection d-lg-none" />
                                            <span className="nav-link-inner--text">Khuyến mãi</span>
                                        </NavLink>
                                    </li>
                                </ul>
                                {this.renderUserOrLoginRegister()}
                            </div>
                        </div>
                    </nav>
                </header>
                <main className="main">
                    <div className="position-relative">
                        {/* shape Hero */}
                        <section className="section section-lg section-shaped pb-250">
                            <div className="shape shape-style-1 shape-default">
                                <span />
                                <span />
                                <span />
                                <span />
                                <span />
                                <span />
                                <span />
                                <span />
                                <span />
                            </div>
                            <div className="container py-lg-md d-flex">
                                <div className="col px-0">
                                    <div className="row">
                                        <div className="col-lg-6">
                                            <h1 className="display-3  text-white">Chúc bạn một ngày tốt lành!
                                            </h1>
                                            <p className="lead  text-white">Bạn có muốn vừa du lịch vừa tận hưởng ưu đãi?
                                            Hãy Đăng nhập hoặc đăng ký ngay để trải nghiệm</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* SVG separator */}
                            <div className="separator separator-bottom separator-skew">
                                <svg x={0} y={0} viewBox="0 0 2560 100" preserveAspectRatio="none" version="1.1" xmlns="http://www.w3.org/2000/svg">
                                    <polygon className="fill-white" points="2560 0 2560 100 0 100" />
                                </svg>
                            </div>
                        </section>
                        {/* 1st Hero Variation */}
                    </div>


                </main>

            </div>
        )
    }
}
