import React, { Component } from 'react'
import InfoContact from './InfoContact';
import InfoPassenger from './InfoPassenger';
import ModalStore from '../Modal/ModalStore';
import Modal from '../Modal/Modal';
import InfoStore from './InfoStore';
import { observer } from 'mobx-react';
import MyNotification from '../MyNotification'
import { path } from '../path';

@observer
export default class ConfirmInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      maKM: ''
    };
  }
  renderMountPassenger = () => {
    let listInfo = [];
    for (let i = 0; i < parseInt(sessionStorage.getItem("mountTicket")); i++) {
      listInfo.push(<InfoPassenger id={i}/>)
    }
    return listInfo;
  }
  handleChangeKhuyenMai = (e) => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  validateEmail=(email)=> {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
  handleClickContinue = () => {
    if(!this.validateEmail(InfoStore.infoContact['email'])){
      MyNotification.alertError("Vui lòng điền đúng định dạng email!");
    }
    else{
      let ticket = JSON.parse(sessionStorage.getItem("listTicket"));
      for (let i = 0; i < ticket.length; i++) {
        let info = {};
        info['ho'] = InfoStore.infoContact['ho'];
        info['ten'] = InfoStore.infoContact['ten'];
        info['so_dien_thoai'] = InfoStore.infoContact['so_dien_thoai'];
        info['email'] = InfoStore.infoContact['email'];
        info['ma_chuyen_bay'] = ticket[i].maChuyenBay;
        info['loai_ghe'] = ticket[i].loai_ghe;
        info['ngay_di'] = ticket[i].ngayDi;
        info['ngay_den'] =ticket[i].ngayDen;
        info['noi_di'] = ticket[i].noiDi;
        info['noi_den'] = ticket[i].noiDen;
        if(ticket[i].loai_ghe == '0'){
          info['giaTien'] = ticket[i].giaTien;
        }
        else{
          info['giaTien'] = ticket[i].giaTienVip;
        }
        info['slgm'] = ticket[i].slgm;
        info['maKM'] = this.state.maKM;
        InfoStore.infoFlight.push(info);
      }
      let ConfirmVe = {};
      ConfirmVe["datCho"] = InfoStore.infoFlight.slice();
      ConfirmVe["thongTinVe"] = InfoStore.infoPassenger.slice();
      console.log(ConfirmVe);
      this.fetchAddVeMayBay(ConfirmVe);
    }
    
  }
  renderContact = () =>{
    if(!!sessionStorage.getItem("user")){
       let user = JSON.parse(sessionStorage.getItem("user"));
       InfoStore.infoContact.ho = '';
       InfoStore.infoContact.ten = user.userName;
       InfoStore.infoContact.so_dien_thoai = user.phone == null ? "": user.phone;
       InfoStore.infoContact.email = user.email;
    }
    else{
      return <InfoContact />
    }
  }
  fetchAddVeMayBay = (data) => {
    var url_confirm = path.CONFIRM_TICKET;
    fetch(url_confirm, {
      method: "POST",
      body: JSON.stringify(data),
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      credentials: 'include'
    })
      .then(
        response =>
        response.text()
      )
      .then(res => {
        if(res != "") {
          sessionStorage.setItem("maDatCho",res);
          this.props.history.push("/success");
        }
        else {
          MyNotification.alertError("Có lỗi trong quá trình đặt vé. Vui lòng xem lại thông tin vé !")
        }
      })
      .catch(error => {
        MyNotification.alertError("Có lỗi trong quá trình đặt vé. Vui lòng xem lại thông tin vé !")
      });
  }
  render() {
    return (
      <div>
        {this.renderContact()}
        {this.renderMountPassenger()}
        <div className="row" style={{ marginTop: '20px' }}>
          <div className="offset-md-6 col-md-3">
            <div className="mb-2">Mã khuyến mãi:</div>
            <div className="form-group">
              <input name="maKM" type="text" className="form-control" onChange={(e) => this.handleChangeKhuyenMai(e)} />
            </div>
          </div>
          <div className="col-md-3" style={{ marginTop: '10px' }}>
            <button className="btn btn-1 btn-warning" type="button" onClick={(e) => this.handleClickContinue(e)}> <h4>Tiếp tục</h4></button>
          </div>
        </div>
      </div>
    )
  }
}
