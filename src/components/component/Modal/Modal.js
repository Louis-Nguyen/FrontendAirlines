import React, { Component } from 'react'
import ModalStore from './ModalStore';
import { observer } from 'mobx-react';
import MyNotification from '../MyNotification'
import { NavLink } from 'react-router-dom'
import Flight from '../Flight/Flight';
import {withRouter} from 'react-router-dom';
import Loader from 'react-loader-spinner'
import ReactTimeout from 'react-timeout'
import { path } from '../path';
@observer
export default class Modal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ListSanBay : [],
            DiemDi:'',
            DiemDen:'',
            TuyenBay:'1',
            ngayDi:'',
            ngayVe:'',
            Person:'1',
            Children:'0',
            listCBChieuDi:[],
            listCBChieuVe:[],
            now:'',
            chieudive:'1',
            showButtonDate:'0',
            ticket:{
                noiDi:'',
                noiDen:'',
                email:'',
                maChuyenBay:'',
                giaTien:'',
                hoTen:'',
                cmnd:'',
                tuoi:'',
                gioiTinh:'',
                soLuongGheMua:'',
                gioBay:'',
                ngayDi:'',
                ngayDatVe:'',
                trangThai:'',
                dienThoai:'',
                loaiGhe:''
            },
            listTicket:[],
            showSpinner : false
          
        };
      }
    componentDidMount = () => {
        ModalStore.funcGetListSanBay();
        this.setState({
            DiemDi :  document.getElementById("DiemDi").value,
           DiemDen :  document.getElementById("DiemDen").value,
           listCBChieuDi:[],
           listCBChieuVe:[]
        })
        var today = new Date().toISOString().split('T')[0];
        document.getElementsByName("ngaydi")[0].setAttribute('min', today);
        document.getElementsByName("ngayve")[0].setAttribute('min', today);
    }
   
    funcGetSearchFlight = () => {
        var data = {};
        data.thanhPhoDi = this.state.DiemDi;
        data.thanhPhoDen = this.state.DiemDen;
        data.ngayDi  = this.state.ngayDi;
        data.ngayVe = this.state.ngayVe;
        data.loTrinh = this.state.TuyenBay;
        data.soLuongGheMua = parseInt(this.state.Person, 10) + parseInt(this.state.Children, 10);
        fetch(path.GET_LIST_CHUYEN_BAY, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            }
        })
            .then(
                response => response.json()
            )
            .then(datares => {
                this.setState({
                    listCBChieuDi: datares.chieuDi,
                    listCBChieuVe: datares.chieuVe,
                    showSpinner:false
                },()=>{
                    this.renderListCbChieuDi();
                })
            })
            .catch(error => {
                MyNotification.alertError("Error search flight.")
            });
    }
    renderDestination  = () => {  
        let listSBTemp =  ModalStore.ListSanBay;
        let listDestination = [];
                listDestination.push(listSBTemp.map((item, index) =>
                  <option key={index} value={item.tenSanBay}>{item.tenSanBay}</option>
                ));
                return listDestination;
    }
    onHandleChangeSelect = (e) => {
        e.preventDefault();
        this.setState({
           DiemDi :  document.getElementById("DiemDi").value,
           DiemDen :  document.getElementById("DiemDen").value
        },()=>{
            if(this.state.DiemDi == this.state.DiemDen){
                MyNotification.alertWarning("Điểm khởi hành và điểm đi phải khác nhau.")
            }
        })
      }
    onChangeTuyenBay = (e) => {
        e.preventDefault();
        this.setState({
            TuyenBay: e.target.value
        })
    } 
    onChangePerson = (e) =>{
        e.preventDefault();
        this.setState({
            Person: document.getElementById("person").value
        })
    }
    onChangeChildren = (e) =>{
        e.preventDefault();
        this.setState({
            Children: document.getElementById("child").value
        })
    }
    SubmitCBChieuDi=()=>{
        if(this.state.TuyenBay=='2'){
            this.renderListCbChieuVe();
            this.setState({
                chieudive:'2'
            })
        }
        else{
            ModalStore.mountTicket = parseInt(this.state.Children)+ parseInt(this.state.Person);
             sessionStorage.setItem("mountTicket",ModalStore.mountTicket);
             sessionStorage.setItem("listTicket",JSON.stringify(ModalStore.ListTicket.slice()));
            this.props.history.push("/confirm");
        }
    }
    changeDate =(e)=>{
        e.preventDefault();
        this.setState({
            ngayDi:  document.getElementById("ngaydi").value,
            ngayVe:  document.getElementById("ngayve").value,
        },()=>{
           var ngaydi = new Date(this.state.ngayDi).toISOString().split('T')[0];
           document.getElementsByName("ngayve")[0].setAttribute('min', ngaydi);
        })
    }
    SubmitCBChieuVe =()=>{
        ModalStore.mountTicket = parseInt(this.state.Children)+ parseInt(this.state.Person);
        sessionStorage.setItem("mountTicket",ModalStore.mountTicket);
        sessionStorage.setItem("listTicket",JSON.stringify(ModalStore.ListTicket));
        this.props.history.push("/confirm");
    }
    onSubmitGTT =(item)=>{
        item['loai_ghe'] = '0'
        ModalStore.ListTicket.push(item);
    }
    onSubmitGTV =(item)=>{
        item['loai_ghe'] = '1'
        ModalStore.ListTicket.push(item);
    }
    renderListCbChieuVe = ()=>{
        if(this.state.listCBChieuVe==null){
            return <div className="container"><h2>Không có chuyến bay từ {this.state.DiemDen} <i className="ni ni-spaceship"></i> {this.state.DiemDi} trong thời gian này!</h2></div>;}
        else{
            var date = new Date(this.state.ngayVe);
            var show = date.toDateString()+"";
            let listCB = [];
            if(this.state.showButtonDate=='1'){
                listCB.push(<div className="container" style={{textAlign: 'center', marginBottom: '50px'}}><h2>Chuyến bay chiều đi từ  {this.state.DiemDen} <i className="ni ni-spaceship"></i>  {this.state.DiemDi}</h2></div>)
                listCB.push(
                 <div className="container">
                        <div className="row">
                           <div className="col-md-3 mt-5 mt-lg-0">
                                 <div className="mb-3">
                                  <button className="btn btn-1 btn-danger" type="button"><i className="ni ni-bold-left"></i>  <span>Ngày trước</span></button>
                                 </div>
                            </div>   
                             <div className="offset-md-1 col-md-5 mt-5 mt-lg-0">
                                 <div>
                                   <h2> <div><i className="ni ni-atom"></i>  {show} <i className="ni ni-atom"></i></div></h2>
                                 </div>
                            </div>    
                             <div className="col-md-3 mt-5 mt-lg-0">
                                 <div className="offset-md-4 mb-3">
                                  <button className="btn btn-1 btn-danger" type="button"> <span>Ngày sau</span>  <i className="ni ni-bold-right"></i></button>
                                 </div>
                            </div>     
                        </div>
                  </div>
                )
            }
            listCB.push(this.state.listCBChieuVe.map((item,index)=>{
                return <Flight key={index} maChuyenBay={item.maChuyenBay} gioKhoiHanh={item.gioBay} gioDen={item.gioDen} 
                noiDi={item.noiDi} noiDen={item.noiDen}  giaTienThuong={item.giaTien}  giaTienVip={item.giaTienVip} onSubmit={this.SubmitCBChieuVe} onSubmitGTT={()=>this.onSubmitGTT(item)} onSubmitGTV={()=>this.onSubmitGTV(item)}/>
            }))
            return listCB;
        }
    }
    renderListCbChieuDi = ()=>{
        if(this.state.listCBChieuDi==null){
            return <div className="container"><h2>Không có chuyến bay từ {this.state.DiemDi} <i className="ni ni-spaceship"></i> {this.state.DiemDen} trong thời gian này!</h2></div>;}
        else{
            var date = new Date(this.state.ngayDi);
            var show = date.toDateString();
            let listCB = [];
             if(this.state.showButtonDate=='1'){
                listCB.push(<div className="container" style={{textAlign: 'center', marginBottom: '50px'}}><h2>Chuyến bay chiều đi từ  {this.state.DiemDi} <i className="ni ni-spaceship"></i>  {this.state.DiemDen}</h2></div>)
                listCB.push(
                <div className="container">
                        <div className="row">
                           <div className="col-md-3 mt-5 mt-lg-0">
                                 <div className="mb-3">
                                  <button className="btn btn-1 btn-danger" type="button"><i className="ni ni-bold-left"></i>  <span>Ngày trước</span></button>
                                 </div>
                            </div>   
                             <div className="offset-md-1 col-md-5 mt-5 mt-lg-0">
                                 <div>
                                   <h2> <div><i className="ni ni-atom"></i>  {show} <i className="ni ni-atom"></i></div></h2>
                                 </div>
                            </div>    
                             <div className="col-md-3 mt-5 mt-lg-0">
                                 <div className="offset-md-4 mb-3">
                                  <button className="btn btn-1 btn-danger" type="button"> <span>Ngày sau</span>  <i className="ni ni-bold-right"></i></button>
                                 </div>
                            </div>     
                        </div>
                  </div>
                )
            }
            
            listCB.push(this.state.listCBChieuDi.map((item,index)=>{
                return <Flight key={index} maChuyenBay={item.maChuyenBay} gioKhoiHanh={item.gioBay} gioDen={item.gioDen} 
                noiDi={item.noiDi} noiDen={item.noiDen}  giaTienThuong={item.giaTien}  giaTienVip={item.giaTienVip} onSubmit={()=>this.SubmitCBChieuDi()} onSubmitGTT={()=>this.onSubmitGTT(item)} onSubmitGTV={()=>this.onSubmitGTV(item)}/>
            }))
            return listCB;
        }
    }
    onClickSearch = (e)=>{
        e.preventDefault();
        if(this.state.DiemDi == this.state.DiemDen){
            MyNotification.alertWarning("Điểm khởi hành và điểm đi phải khác nhau.")
            return;
        }
        if(document.getElementById("ngaydi").value==''){
            MyNotification.alertWarning("Vui lòng chọn ngày khởi hành.")
            return;
        }
        if(this.state.Person=='0' && this.state.Children=='0'){
            MyNotification.alertWarning("Vui lòng chọn ít nhất 1 người sử dụng vé(Người lớn/Trẻ em).")
            return;
        }
        if(this.state.TuyenBay =='2' && document.getElementById("ngayve").value ==''){
            MyNotification.alertWarning("Vui lòng chọn ngày về.")
            return;
        }
        if(this.state.TuyenBay =='2' && document.getElementById("ngayve").value !=''){
           var ngayVe = new Date(document.getElementById("ngayve").value).getTime();
           var ngayDi = new Date(document.getElementById("ngaydi").value).getTime();
           if(ngayVe < ngayDi){
            MyNotification.alertWarning("Vui lòng chọn ngày về lớn hơn ngày khởi hành.").
            return;
           }
        }
        if(this.state.TuyenBay == '1'){
            this.setState({
                chieudive: '1'
            })
        }
        this.setState({
            showSpinner: true,
            listCBChieuDi:[],
            listCBChieuVe:[],
            listTicket:[],
            showButtonDate:'1',
        })
        ModalStore.ListTicket = [];
        setInterval(this.funcGetSearchFlight, 3000);
    }
    render() {
        return (
            <div>
                <section className="section section-lg pt-lg-0 mt--200">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-12">
                                <div className="row row-grid">
                                    <div className="col-lg-12">
                                        <div className="card card-lift--hover shadow border-0">
                                            <div className="card-body py-5">
                                                <div className="row col-md-12" >
                                                    <div className="custom-control custom-radio col-md-2">
                                                        <input name="custom-radio-1" className="custom-control-input" id="customRadio1" value="1" defaultChecked type="radio" onChange={(e)=>this.onChangeTuyenBay(e)}/>
                                                        <label className="custom-control-label" htmlFor="customRadio1">
                                                            <span>Một chiều</span>
                                                        </label>
                                                    </div>
                                                    <div className="custom-control custom-radio col-md-2">
                                                        <input name="custom-radio-1" className="custom-control-input" id="customRadio2" value="2" type="radio" onChange={(e)=>this.onChangeTuyenBay(e)}/>
                                                        <label className="custom-control-label" htmlFor="customRadio2">
                                                            <span>Khứ hồi</span>
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className="row col-md-12">
                                                    <div className="col-md-6">
                                                        <div className="mb-3">
                                                            <small className="text-uppercase font-weight-bold">ĐIỂM ĐI</small>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="mb-3">
                                                            <small className="text-uppercase font-weight-bold">ĐIỂM ĐẾN</small>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row col-md-12">
                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <select id="DiemDi" className="form-control" onChange={(e)=>this.onHandleChangeSelect(e)}> 
                                                                {this.renderDestination()}
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                        <select id="DiemDen" className="form-control" onChange={(e)=>this.onHandleChangeSelect(e)}> 
                                                                {this.renderDestination()}
                                                        </select>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row col-md-12">
                                                    <div className="col-md-3">
                                                        <small className="text-uppercase font-weight-bold">NGÀY ĐI</small>
                                                    </div>
                                                    <div className="col-md-3">
                                                        <small className="text-uppercase font-weight-bold">NGÀY VỀ</small>
                                                    </div>
                                                    <div className="col-md-3">
                                                        <small className="text-uppercase font-weight-bold">NGƯỜI LỚN(18+)</small>
                                                    </div>
                                                    <div className="col-md-3">
                                                        <small className="text-uppercase font-weight-bold">TRẺ EM (0-17)</small>
                                                    </div>
                                                </div>
                                                <div className="row col-md-12">
                                                    <div className="col-md-3">
                                                        <div className="form-group">
                                                            <div className="input-group">
                                                                <div className="input-group-prepend">
                                                                    <span className="input-group-text"><i className="ni ni-calendar-grid-58" /></span>
                                                                </div>
                                                                <input id="ngaydi"  name="ngaydi" className="form-control" placeholder="Select date" type="date" onChange={(e)=>this.changeDate(e)}  />
                                                            </div>
                                                        </div>

                                                    </div>
                                                    <div className="col-md-3">
                                                        <div className="form-group">
                                                            <div className="input-group">
                                                                <div className="input-group-prepend">
                                                                    <span className="input-group-text"><i className="ni ni-calendar-grid-58" /></span>
                                                                </div>
                                                                <input id="ngayve"  name="ngayve" className="form-control" placeholder="Select date" type="date" onChange={(e)=>this.changeDate(e)}/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-3">
                                                        <div className="form-group">
                                                            <select id="person" className="form-control" defaultValue="1" onChange={(e)=>this.onChangePerson(e)}>
                                                                <option value="0">0</option>
                                                                <option value="1">1</option>
                                                                <option value="2">2</option>
                                                                <option value="3">3</option>
                                                                <option value="4">4</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-3">
                                                        <div className="form-group">
                                                        <select id="child" className="form-control" defaultValue="0" onChange={(e)=>this.onChangeChildren(e)}>
                                                                <option value="0">0</option>
                                                                <option value="1">1</option>
                                                                <option value="2">2</option>
                                                                <option value="3">3</option>
                                                                <option value="4">4</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row col-md-12">
                                                    <button  className="btn btn-icon btn-3 btn-primary col-md-12" type="button" onClick={(e)=>this.onClickSearch(e)}>
                                                        <span className="btn-inner--icon"><i className="ni ni-bag-17" /></span>
                                                        <span className="btn-inner--text">SHOW FLIGHTS</span>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                { this.state.showSpinner ? (<div className="container"> 
                    <div className="row">
                         <div className="offset-md-4">
                            <Loader 
                                type="Plane"
                                color="#00BFFF"
                                height="100"	
                                width="100"
                            />   
                        </div>
                    </div>
                </div>) : '' }
                {this.state.chieudive == '2' ? this.renderListCbChieuVe() : this.renderListCbChieuDi()}
            </div>
            
        )
    }
}
