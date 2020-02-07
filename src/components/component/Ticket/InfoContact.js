import React, { Component } from 'react'
import InfoStore from './InfoStore';
import { observer } from 'mobx-react';

@observer
export default class InfoContact extends Component {
    constructor(props) {
        super(props);
        this.state = {
           
        };
      }
      handleChange =(e)=>{
        e.preventDefault();
        InfoStore.infoContact[e.target.name] = e.target.value
      }
    render() {
        return (
            <div className="container mb-5">
                {/* Inputs */}
                <h2 className="h4 text-success font-weight-bold mb-4">Thông tin liên hệ</h2>
                <div className="row">
                    <div className="col-md-6">
                        <span>Thông tin liên hệ</span>
                    </div>
                    <div className="offset-md-4">
                        <span>Điền thông tin</span>
                    </div>
                </div>
                <hr />
                <div className="row">
                    <div className="col-md-6 col-sm-6 ">
                        <div className="mb-2">Họ (vd: Nguyen)*</div>
                        <div className="form-group">
                            <input name="ho" type="text"  className="form-control" onChange={(e)=>this.handleChange(e)}/>
                            <p className="text-muted mb-0">như trên CMND (không dấu)</p>
                        </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                        <div  className="mb-2">Tên Đệm & Tên (vd:Quoc Anh Chuong)*</div>
                        <div className="form-group">
                            <input name="ten" type="text" className="form-control" onChange={(e)=>this.handleChange(e)}/>
                            <p className="text-muted mb-0">như trên CMND (không dấu)</p>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6 col-sm-6 ">
                        <div  className="mb-2">Điện thoại di động*</div>
                        <div className="form-group">
                            <input name="so_dien_thoai" type="number"  className="form-control" onChange={(e)=>this.handleChange(e)}/>
                            <p className="text-muted mb-0">VD: +84 901234567 trong đó (+84) là mã quốc gia và 901234567 là số di động</p>
                        </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                        <div className="mb-2">Email*</div>
                        <div className="form-group">
                            <input name="email" type="text"  className="form-control" onChange={(e)=>this.handleChange(e)} />
                            <p className="text-muted mb-0">VD: email@example.com</p>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}
