import React, { Component } from 'react'
import { observable } from 'mobx'
import MyNotification from '../MyNotification'


class UserStore {

    @observable userAuthencation = {
        "id":'',
        "userName":'',
        "password":'',
        "email":'',
        "phone":'',
        "address":'',
        "sex":'',
        "role":''
    };
    
    
}

export default new UserStore();