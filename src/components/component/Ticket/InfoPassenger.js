import React, { Component } from 'react'
import InfoStore from './InfoStore';
import ModalStore from '../Modal/ModalStore';

export default class InfoPassenger extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ho:'',
            ten:'',
            cmnd:'',
            gioiTinh:'0'
        };
      }
      onChangeSex = (e) =>{
        e.preventDefault();
        this.setState({
            gioiTinh: document.getElementById("sex").value
        })
    }
      handleChange=(e)=>{
        e.preventDefault();
        this.setState({
            [e.target.name] : e.target.value
        },()=>{
              for (let i = 0; i < parseInt(sessionStorage.getItem("mountTicket")); i++) {
                let InfoPassenger ={};
                InfoPassenger['id'] = this.props.id
                InfoPassenger['ho'] = this.state.ho;
                InfoPassenger['ten'] = this.state.ten;
                InfoPassenger['cmnd'] = this.state.cmnd;
                InfoPassenger['gioiTinh'] = this.state.gioiTinh;
                for(let j=0 ; j < parseInt(InfoStore.infoPassenger.length);j++){
                    if(InfoStore.infoPassenger[j]["id"] == InfoPassenger['id']){
                        InfoStore.infoPassenger[j] = InfoPassenger;
                        break;
                    }
                    else if(parseInt(InfoStore.infoPassenger.length)== (j+1)){
                        InfoStore.infoPassenger.push(InfoPassenger);
                        break;
                    }
                }
              }
        })
      }
    render() {
        return (
            <div className="py-5 bg-secondary">
                <div className="container">
                    {/* Inputs (alternative) */}
                    <h2 className="h4 text-success font-weight-bold mb-4">Thông tin hành khách</h2>
                    <div className="row">
                        <div className="col-md-6">
                            <span>Hành Khách {this.props.id}</span>
                        </div>
                        <div className="offset-md-4">
                            <span>Điền thông tin</span>
                        </div>
                    </div>
                    <hr />
                    <div className="row">
                        <div className="col-md-3">
                            <p>Danh xưng*</p>
                            <div className="form-group">
                                <select id="sex" className="form-control" defaultValue="0" onChange={(e)=>this.onChangeSex(e)}>
                                    <option value="0">Ông</option>
                                    <option value="1">Bà</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6 col-sm-6">
                            <div className="mb-2">Họ (vd: Nguyen)*</div>
                            <div className="form-group">
                                <input name="ho" type="text" className="form-control" onChange={(e)=>this.handleChange(e)}/>
                                <p className="text-muted mb-0">như trên CMND (không dấu)</p>
                            </div>
                        </div>
                        <div className="col-md-6 col-sm-6">
                            <div className="mb-2">Tên Đệm & Tên (vd:Quoc Anh Chuong)*</div>
                            <div className="form-group">
                                <input name="ten" type="text" className="form-control" onChange={(e)=>this.handleChange(e)}/>
                                <p className="text-muted mb-0">như trên CMND (không dấu)</p>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6 col-sm-6">
                            <div className="mb-2">Số CMND</div>
                            <div className="form-group">
                                <input name="cmnd" type="number" className="form-control" onChange={(e)=>this.handleChange(e)}/>
                                <p className="text-muted mb-0">VD: 206435985(Có thể bỏ qua nếu là trẻ em.)</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
