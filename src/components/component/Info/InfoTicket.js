import React, { Component } from 'react'
import axios from 'axios';
import NumberFormat from 'react-number-format';

export default class InfoTicket extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: {
                test_value:'',
                test_id:''
            }
        };
    }
    onChange = (e) => {
        e.preventDefault();
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    onClickHandle = () => {
        axios.get(`/get-test-value`)
            .then(res => {
                console.log(res)
                res.test_value.toString
                // this.setState({
                //     value: res
                // })
            })
    }
    fetchUpdateTest = () => {
        var data = this.state.value;
        var url = '/test-value';
        fetch(url, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            }
        })
            .then(
                response => response.json()
            )
            .then(data => {
                console.log("data Response", data);

            }, () => {
                this.fetchGetTestValue();
            })
            .catch(error => {
                console.log("Error")
            });
    }

    fetchGetTestValue = () => {
        var url = '/get-test-value';
        fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            }
        })
            .then(
                response => response.json()
            )
            .then(data => {
                console.log("data Response", data)
            })
            .catch(error => {
                console.log("Error")
            });
    }


    render() {
        return (
            <div className="offset-md-4 col-md-6">
                <div className="form-group has-success">
                    <input name="value" type="text" placeholder="Success" className="form-control is-valid" onChange={(e) => this.onChange(e)} />
                </div>
                <NumberFormat value={"1234556787654123213"}  decimalScale={2} thousandSeparator={true} prefix={'$'}  />
                <button onClick={this.onClickHandle}> Click</button>
            </div>

        )
    }
}
