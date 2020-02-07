import React, { Component } from 'react'

export default class Footer extends Component {
    render() {
        return (
            <div>
                <footer className="footer has-cards">
                    <div className="container">
                        <div className="row row-grid align-items-center my-md">
                            <div className="col-lg-6">
                                <h3 className="text-primary font-weight-light mb-2">Tại sao nên đặt chỗ với Fly Airlines?</h3>
                                <h4 className="mb-0 font-weight-light">Giá rẻ mỗi ngày với ưu đãi đặc biệt dành riêng cho ứng dụng.
                  Đặt chuyến bay qua ứng dụng để nhận giá tốt nhất với các khuyến mãi tuyệt vời!</h4>
                            </div>
                            <div className="col-lg-6 text-lg-center btn-wrapper">
                                <a target="_blank" href="https://twitter.com/Louis16811925" className="btn btn-neutral btn-icon-only btn-twitter btn-round btn-lg" data-toggle="tooltip" data-original-title="Follow us">
                                    <i className="fa fa-twitter" />
                                </a>
                                <a target="_blank" href="https://www.facebook.com/mark280797" className="btn btn-neutral btn-icon-only btn-facebook btn-round btn-lg" data-toggle="tooltip" data-original-title="Like us">
                                    <i className="fa fa-facebook-square" />
                                </a>
                                <a target="_blank" href="https://github.com/Mark-AC" className="btn btn-neutral btn-icon-only btn-github btn-round btn-lg" data-toggle="tooltip" data-original-title="Star on Github">
                                    <i className="fa fa-github" />
                                </a>
                            </div>
                        </div>
                        <hr />
                        <div className="row align-items-center justify-content-md-between">
                            <div className="col-md-6">
                                <div className="copyright">
                                    © 2018 copyright Louis Nguyen Quoc Anh Chuong
  </div>
                                 </div>

                        </div>
                    </div>
                </footer>
            </div>
        )
    }
}
