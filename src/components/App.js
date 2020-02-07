import React, { Component } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, HashRouter, Router} from 'react-router-dom'
import "isomorphic-fetch"
import Menu from "./component/menu/Menu";
import Modal from "./component/Modal/Modal";
import Footer from "./component/Footer/Footer";
import Routers from "./router/Routers";
class App extends Component {


  render() {

    return (
      <div>
        <Menu />
        <Routers />
        <Footer />
      </div>
    );
  }
}
ReactDOM.render(
  <HashRouter>
    <App />
  </HashRouter>
  , document.getElementById('root'));
