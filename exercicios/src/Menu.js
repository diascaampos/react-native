import React from 'react'
import {createDrawerNavigator} from 'react-navigation'

import Simples from './componentes/Simples'
import ParImpar from './componentes/ParImpar'
import {Inverter, MegaSena} from './componentes/Multi'

export default createDrawerNavigator({
    MegaSena:{
        screen: () => <MegaSena numeros={6}/>,
        navigationOptions:{
            title: 'Mega Sena'
        }
    },
    Inverter:{
        screen: () => <Inverter texto='React Native'/>
    }
    ParImpar:{
        screen: () => <MegaSena numeros={30}/>,
        navigationOptions:{
            title: 'Par & Impar'
        }
    },
    Simples:{
        screen: () => <Simples texto='Flexível!'/>
    }

}, {drawerWidth: 300})