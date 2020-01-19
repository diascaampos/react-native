import React, {Component} from 'react'
import {
  Text,
  View,
  Button
} from 'react-native'

const geraNumeroAleatorio=()=>{
  var numAleatorio = Math.random()

  numAleatorio = Math.floor(numAleatorio * 10)
  alert(numAleatorio)
}
export default class App extends Component{

	render(){
		return(
			<View>
				<Text>Gerador de números randômicos</Text>
				<Button title="Gerar número" onPress={geraNumeroAleatorio}/>
			</View>
		)
	}
}