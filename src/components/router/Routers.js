import React, { Component } from 'react'
import { BrowserRouter, HashRouter, Route, Switch } from 'react-router-dom'
import Modal from '../component/Modal/Modal';
import Discount from '../component/Discount/Discount';
import Login from '../component/User/Login';
import Register from '../component/User/Register';
import Ticket from '../component/Ticket/Ticket';
import ConfirmInfo from '../component/Ticket/ConfirmInfo';
import Success from '../component/Success/Success'
import InfoTicket from '../component/Info/InfoTicket';
import History from '../component/User/History';
import PaymentSuccess from '../component/Success/PaymentSuccess';

export default class Routers extends Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route exact path="/" component={Modal} />
                    <Route  path="/discount" component={Discount} />
                    <Route  path="/login" component={Login} />
                    <Route  path="/register" component={Register} />
                    <Route  path="/confirm" component={Ticket} />
                    <Route  path="/info" component={ConfirmInfo} />
                    <Route  path="/success" component={Success} />
                    <Route  path="/history" component={History} />
                    <Route  path="/payment-success" component={PaymentSuccess} />
                </Switch>
            </div>
        )
    }
}
