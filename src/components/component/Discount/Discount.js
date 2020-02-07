import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { path } from '../path';
export default class Discount extends Component {
    constructor(props) {
        super(props);
        this.state = {
          listEvent :[]
        };
      }
    componentDidMount = () => {
        this.funcGetListEvents();
    }
   
    funcGetListEvents = () => {
        var url = path.GET_EVENTS;
        fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            }
        })
            .then(
                response => response.json()
            )
            .then(data => {
                this.setState({
                    listEvent : data
                })
            })
            .catch(error => {
                MyNotification.alertError("Error get list events.")
            });
    }
     renderListEvent = ()=>{
        let listElementDiscount = []
        listElementDiscount.push(this.state.listEvent.map((item,index)=>{
            return (
        <div className="col-md-4 mb-5 mb-lg-0">
            <div className="card shadow shadow-lg--hover mt-5">
                <div className="card-body">
                    <div className="d-flex px-3">
                        <div>
                            <div className="icon icon-shape bg-gradient-success rounded-circle text-white">
                                <i className="ni ni-satisfied" />
                            </div>
                        </div>
                        <div className="pl-4">
                            <h5 className="title text-success">{item.title}</h5>
                            <p key={index}>{item.content}</p>
                            <NavLink to="/" className="text-success">Đặt vé</NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>)
        }));
        return listElementDiscount;
    }
    render() {
        return (
            <div>  
                <section className="section section-lg">
                    <div className="container">
                        <div className="row justify-content-center text-center mb-lg">
                            <div className="col-lg-8">
                                <h2 className="display-3">Khuyến mãi được yêu thích</h2>
                            </div>
                        </div>
                        <div className="row">
                        {this.renderListEvent()}
                        </div> 
                    </div>
                </section>
            </div>
        )
    }
}
