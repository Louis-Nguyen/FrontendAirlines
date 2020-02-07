import React, { Component } from 'react'

export default class PaymentSuccess extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
      }
    componentDidMount() {
    }
    onClickHistory = () => {
        this.props.history.push("/history");
    } 
    onClickLogin = () => {
        this.props.history.push("/login");
    }
    renderBtn = () => {
        console.log(this.state.user)
        if(!!sessionStorage.getItem("user")){
            return  <button type="button" className="btn btn-primary my-4" onClick={this.onClickHistory}>Lịch sử đặt vé</button>
        }
        else{
            return  <button type="button" className="btn btn-primary my-4" onClick={this.onClickLogin}>Đăng nhập</button>
        }
    }
    render() {
        return (
            <div className="row row-grid justify-content-center">
                <div className="col-lg-8 text-center">
                    <h2 className="display-3">Thanh toán thành công
            <span className="text-success">Xem thông tin chuyến bay của bạn trong lịch sử đặt vé và trong gmail.Cảm ơn bạn đã đặt vé tại FlyAirlines.com! Hãy luôn ủng hộ chúng tôi nhé. Love you ^-^.</span>
                    </h2>
                    <div className="text-center">
                       {this.renderBtn()}
                    </div>
                </div>
            </div>
        )
    }
}
