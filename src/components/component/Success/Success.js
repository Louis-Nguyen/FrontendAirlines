import React, { Component } from 'react'
import PaypalExpressBtn from 'react-paypal-express-checkout';
import MyNotification from '../MyNotification'
import { path } from '../path';

export default class Success extends Component {
    constructor(props) {
        super(props);
        this.state = {
            total: 0,
            currency:'USD',
            env:'sandbox'
        };
      }
    componentDidMount() {
      var listTicket = [];
      listTicket=  JSON.parse(sessionStorage.getItem("listTicket"));
      let totalMount = 0;
      listTicket.map((item,index)=>{
          console.log(index)
            if(item.loai_ghe == "0"){
                totalMount += item.giaTien;
            }
            else if(item.loai_ghe == "1"){
                totalMount += item.giaTienVip;
            }
      })
      totalMount *= sessionStorage.getItem("mountTicket")
      this.setState({
          total: totalMount
      })
    }
    fetchUpdateBook = () => {
        var maDatCho = sessionStorage.getItem("maDatCho").toString();
        console.log(maDatCho)
        fetch(path.PAYMENT_SUCCESS, {
          method: "POST",
          body: maDatCho,
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
              console.log("Asdasdasda")
              this.props.history.push("/payment-success");
          })
          .catch(error => {
            MyNotification.alertError("Có lỗi xảy ra trong quá trình thanh toán!")
          });
      }
    onSuccess = (payment)=>{
        this.fetchUpdateBook();
        console.log(payment);
    }
    onCancel = (data) =>{
        MyNotification.alertError("Bạn đã hủy thanh toán trực tuyến! Vui lòng thanh toán sớm nhất qua các dịch vụ thanh toán khác.")
        console.log(data);
    }
    onError = (err) =>{
        MyNotification.alertError("Thanh toán thất bại!")
        console.log(err);
    }
    render() {
		const client = {
			sandbox:    'AYy6B0XgYHUvo_e2Tyq4gfwqT0sfQaEQCNlWUQB1cUACL1LhduLNZyg4LukQwDRX_GxKK8U2uQm2bAp5',
			production: 'AQf6Kb7pbw7keptJJooS1Bj0BUTkB2o5vkDXVqqsK9Tazs0VxwLsrvgnDCNmTUUGVblsDLjE-trxCbFd',
		}
        return (
            <div className="row row-grid justify-content-center">
                <div className="col-lg-8 text-center">
                    <h2 className="display-3">Đặt vé thành công
                    <span className="text-success">Chúng tôi sẽ giữ vé của bạn trong vòng 24h. Vui lòng thanh toán để hoàn tất thủ tục mua vé.</span>
                    </h2>
                    <p className="lead">Bạn có thể đến cửa hàng tiện lợi, chuyển khoản ngân hàng, hoặc thanh toán trực tuyến với Paypal.</p>
                    <PaypalExpressBtn env={this.state.env} client={client} currency={this.state.currency} total={this.state.total} onError={this.onError} onSuccess={this.onSuccess} onCancel={this.onCancel} />
                </div>
                </div>
        )
    }
}
