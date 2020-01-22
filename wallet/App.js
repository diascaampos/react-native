import React, {Component} from 'react'
import {
	Navigator,
    StyleSheet
} from 'react-native'

import Wallet from './src/components/Wallet'
import waaaa from './src/components/waaaa'

export default class App extends Component {
    
	render() {
		return (
			<Navigator
				initialRoute={{id: 'Wallet'}}
				renderScene={(route, navigator) =>{
					if(route.id === 'Wallet'){
						return(<Wallet />)
					}
	
					if(route.id === 'waaaa'){
						return(<waaaa />)
					}
				}}
			/>
		)
	}
}

const styles =  StyleSheet.create({
	
})
