import React, { Component } from 'react'
import { path } from '../path';
class TicketItem extends Component {
  renderBtnTT = (trangThai) => {
    if (trangThai == 0) {
      return <button className="btn btn-1 btn-outline-info" type="button"> <h5>Chờ thanh toán</h5></button>
    }
    else if (trangThai == 1) {
      return <button className="btn btn-1 btn-outline-success" type="button"> <h5>Đã thanh toán</h5></button>
    }
    else {
      return <button className="btn btn-1 btn-outline-light" type="button"> <h5>Vé hết hạn</h5></button>
    }
  }
  render() {
    return (
      <div className="card bg-gradient-success border-0 col-md-10 " style={{ margin: '10px 50px' }}>
        <div>
          <span className="lead text-white mt-3">{this.props.chieuDi}</span>
          <i className="ni ni-button-play" style={{ margin: '0px 20px' }}></i>
          <span className="lead text-white mt-3">{this.props.chieuDen}</span>
          <hr />
        </div>
        <div className="row" >
          <div className="col-md-5">
            <span className="text-uppercase font-weight-bold" style={{ marginLeft: '20px' }} >Họ và tên Hành khách: {this.props.hanhKhach}</span>
          </div>
          <div className="offset-md-4 col-md-3">
            {this.renderBtnTT(this.props.trangThai)}
          </div>
        </div>
        <div style={{ marginLeft: '20px' }}>Ngày Khởi Hành: {this.props.ngayDi} </div>
        <h3 className="text-white" style={{ marginLeft: '20px' }}>Mã chuyến bay: Fly Airlines {this.props.maChuyenBay}</h3>
        <div className="row" style={{ marginLeft: '20px' }}>
          <div className="col-md-6 row">
            <span className="text-white" >Giờ khởi hành: {this.props.gioDi}</span>
            <i className="ni ni-spaceship" style={{ marginLeft: '10px' }}></i>
            <span className="text-white" style={{ marginLeft: '10px' }} >Giờ dến:  {this.props.gioDen}</span>
          </div>
        </div>

      </div>
    )
  }
}
export default class History extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listTicket: []
    };
  }
  componentDidMount() {
    let user = !!JSON.parse(sessionStorage.getItem("user")) ? JSON.parse(sessionStorage.getItem("user")) : '';
    console.log(user)
    if(!!user.email){
      this.fetchHistoryBook(user.email);
    }
  }
  fetchHistoryBook = (email) => {
    var data = {};
    data.email = email;
    var url_history = path.HISTORY_BOOKED;
    fetch(url_history, {
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
        this.setState({
          listTicket: res
        })
      })
      .catch(error => {
        MyNotification.alertError("Có lỗi xảy ra khi lấy danh sách vé đã đặt!")
      });
  }
  onClickDatVe =() =>{
    this.props.history.push("/");
  }
  renderListTicket = () => {
    if(this.state.listTicket == ''){
      return(  <div className="row row-grid justify-content-center">
      <div className="col-lg-8 text-center">
          <span className="display-3">Đây là lần đầu tiên bạn đặt vé tại FlyAirlines.com. Hãy đặt vé với chúng tôi nào!
          </span>
         
      </div>
      <button type="button" className="btn btn-primary col-md-6" onClick={this.onClickDatVe}>Đặt vé ngay</button>
      </div>)
    }
    let listElementTicket = [];
    listElementTicket.push(this.state.listTicket.map((item, index) => {
      return <TicketItem key={index} maChuyenBay={item.ma_chuyen_bay} gioDi={item.ngay_di.substring(11, 19)} chieuDi={item.noi_di} gioDen={item.ngay_den.substring(11, 19)}
        chieuDen={item.noi_den} hanhKhach={item.ho + " " + item.ten} trangThai={item.trang_thai} giaTien={this.props.gia_tien} ngayDi ={item.ngay_di.substring(0, 10)}/>
    }));
    return listElementTicket;
  }


  render() {
    return (
      <div>
       <h1 className="display-3" style={{textAlign: 'center'}}>Lịch sử đặt vé</h1>
        {!!this.state.listTicket ? this.renderListTicket(): ''}
      </div>
    )
  }
}
