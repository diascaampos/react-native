import React, {Component} from 'react'
import{
    Navigator
} from 'react-native'

import Login from './Login'
import App from '../../App'

export default class Route extends Component{
    render(){
        return(
            <Navigator
                initialRoute={{ id: 'app'}}
                renderScene={(route, navigator) =>{
                    if(route.id === 'app'){
                        return(<Login navigator={navigator} />)
                    }
                    if(route.id === 'login'){
                        return(<App />)
                    }
                }}
        )
    }
}