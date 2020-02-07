import React, { Component } from 'react'
import { observable } from 'mobx'
import MyNotification from '../MyNotification'
import { path } from '../path';


class ModalStore {

    @observable ListSanBay = [];
    @observable ListSearchCBChieuDi = [];
    @observable ListSearchCBChieuVe =[];
    @observable ListTicket = [];
    @observable mountTicket = '';
    funcGetListSanBay = () => {
        fetch(path.GET_LIST_SAN_BAY, {
            method: "GET",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            }
        })
            .then(
                response => response.json()
            )
            .then(data => {
                this.ListSanBay = data;
            })
            .catch(error => {
                MyNotification.alertError("Error get list destination.")
            });
    }

    
}

export default new ModalStore();