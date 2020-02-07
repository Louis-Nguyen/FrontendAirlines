import React, { Component } from 'react'

export default class Flight extends Component {
    constructor(props) {
        super(props);
        this.state = {
          
        };
      }
      onClickSubmitGTT =()=>{
        this.props.onSubmitGTT();
        this.props.onSubmit();
      }
      onClickSubmitGTV =()=>{
        this.props.onSubmitGTV();
        this.props.onSubmit();
      }
  render() {
    return (
      <div>
        <div className="container">
        <div className="card bg-gradient-success shadow-lg border-0">
          <div className="p-5">
            <div className="row align-items-center">
              <div className="col-md-2">
                <h3 className="text-white">{this.props.maChuyenBay}</h3>
                <p className="lead text-white mt-3">Fly Airlines</p>
              </div>
              <div className="col-md-2">
                <span className="text-white">{this.props.gioKhoiHanh}</span>
                <p className="lead text-white mt-3">{this.props.noiDi}</p>
              </div>
              <div className="offset-col-5 col-md-2">
              <i className="ni ni-spaceship" style={{marginLeft: '50px'}}></i>
              </div>
              <div className="col-md-2">
                <span className="text-white">{this.props.gioDen}</span>
                <p className="lead text-white mt-3">{this.props.noiDen}</p>
              </div>
              <div className="col-md-2">
                <div className="text-white" style={{marginBottom: '20px'}}>{this.props.giaTienThuong} USD</div>
                <button type="button" className="btn btn-danger" onClick={this.onClickSubmitGTT}>Phổ thông</button>
              </div>
              <div className="col-md-2">
                <div className="text-white" style={{marginBottom: '20px'}}>{this.props.giaTienVip} USD</div>
                <button type="button" className="btn btn-danger" onClick={this.onClickSubmitGTV}>Thương gia</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style={{marginTop: '20px'}}></div>
      </div>
    )
  }
}
