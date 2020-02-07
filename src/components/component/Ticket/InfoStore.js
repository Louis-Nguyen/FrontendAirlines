import React, { Component } from 'react'
import { observable } from 'mobx'
import MyNotification from '../MyNotification'
 class InfoStore extends Component {
    @observable infoContact = {
        ho:'',
        ten:'',
        so_dien_thoai:'',
        email:''
    };
    @observable infoPassenger = [{
        id:'',
        ho:'',
        ten:'',
        cmnd:'',
        gioiTinh:'',
    }];
    @observable infoFlight = [];

    
}

export default new InfoStore();
