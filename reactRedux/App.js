import React, {Component} from 'react'
import {
	StyleSheet,
} from 'react-native'
import ListaItens from './src/components/ListaItens'

export default class App extends Component {
	//constroi a aplicação
	constructor(props){
		super(props)
		
	}
	//Obj é renderizado
	render() {
		return (
			<ListaItens />
		)
	}
}


const styles =  StyleSheet.create({

})