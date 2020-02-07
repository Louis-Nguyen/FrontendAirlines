import React, { Component } from 'react'
import ModalStore from '../Modal/ModalStore';
import InfoStore from './InfoStore';
import InfoPassenger from './InfoPassenger';

class TicketItem extends Component {
  render() {
    return (
      <div className="card bg-gradient-success border-0 col-md-12" style={{ margin: '20px 20px' }}>
        <div>
          <span className="lead text-white mt-3">{this.props.chieuDi}</span>
          <i className="ni ni-button-play" style={{ margin: '0px 20px' }}></i>
          <span className="lead text-white mt-3">{this.props.chieuDen}</span>
          <hr />
        </div>
        <div> {this.props.ngayDi} </div>
        <h3 className="text-white">Fly Airlines {this.props.maChuyenBay}</h3>
        <div className="row">
          <div className="col-md-5">
            <span className="text-white">{this.props.gioDi}</span>
            <p className="lead text-white mt-2">{this.props.chieuDi}</p>
          </div>
          <div className="offset-col-5 col-md-2">
            <i className="ni ni-spaceship" style={{ marginLeft: '10px' }}></i>
          </div>
          <div className="col-md-5">
            <span className="text-white">{this.props.gioDen}</span>
            <p className="lead text-white mt-2">{this.props.chieuDen}</p>
          </div>
        </div>
      </div>
    )
  }
}

export default class Ticket extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  componentDidMount = () => {
    console.log(ModalStore.ListTicket.slice())
  }
  renderTicket = () => {
    let listTicket = [];
    listTicket.push(ModalStore.ListTicket.slice().map((item, index) => {
      var date = new Date(item.ngayDi);
      var show = date.toDateString();
      return <TicketItem key={index} maChuyenBay={item.maChuyenBay} gioDi={item.gioBay} chieuDi={item.noiDi} gioDen={item.gioDen}
        chieuDen={item.noiDen} ngayDi={show} />
    }))
    return listTicket;
  }
  handleClickContinue = (e) => {
    e.preventDefault();
    InfoStore.infoContact= [];
    InfoStore.infoFlight = [];
    InfoStore.infoPassenger = [{
      id:'',
      ho:'',
      ten:'',
      cmnd:'',
      gioiTinh:'',
  }];
    this.props.history.push("/info");
  }
  render() {
    if (ModalStore.ListTicket.slice() == '') {
      return '';
    }
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6">{this.renderTicket()} </div>
          <div className="col-md-6">
            <div className="row">
              <div className="offset-md-6 md-6" style={{ marginTop: '20px' }}>
                <button className="btn btn-1 btn-warning" type="button" onClick={(e) => this.handleClickContinue(e)}> <h4>Tiếp tục</h4></button>
              </div>
            </div>
          </div>
        </div>
      </div>

    )
  }
}
