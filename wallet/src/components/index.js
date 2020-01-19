import React, { Component } from 'react'
import { createAppContainer, createDrawerNavagitor} from 'react-navigator'

import Wallet from './Wallet'
import Login from './Login'

const myDrawer = createDrawerNavagitor(
    {
        Wallet: Wallet,
        Login: Login
    }
)

export default createAppContainer(myDrawer)