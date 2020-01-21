import React, {Component} from 'react'
import {
  Text,
  View,
  Button,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert
} from 'react-native'

const gerarNovaFrase = () =>{
	var numeroAleatorio = Math.random()
	numeroAleatorio = Math.floor(numeroAleatorio * 5)

	var frases =[
		"Os problemas são oportunidades para se mostrar o que sabe. - Duke Ellington",
		"Nossos fracassos, às vezes, são mais frutíferos do que os êxitos. - Henry Ford",
		"Tente de novo. Fracasse de novo. Mas fracasse melhor. - Samuel Beckett",
		"É costume de um tolo, quando erra, queixar-se dos outros. É costume de um sábio queixar-se de si mesmo. - Sócrates",
		"O verdadeiro heroísmo consiste em persistir por mais um momento, quando tudo parece perdido - W. F. Grenfel"
	]
	
	var fraseEscolhida = frases[numeroAleatorio]
	Alert.alert(fraseEscolhida)
}

export default class FraseDoDia extends Component{

	render(){
		return(
			<View style={styles.styleView}>
				<Image source={require('./imgs/logo.png')}/>
				<TouchableOpacity 
					onPress={gerarNovaFrase}		
					style={styles.styleButton}>
					<Text style={styles.styleTextButton}>Nova Frase</Text>
				</TouchableOpacity>
			</View>
		)
	}
}

const styles =  StyleSheet.create({
	styleView:{
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	styleButton:{
		backgroundColor: '#538530',
		paddingHorizontal: 40,
		paddingVertical: 10,
		marginTop: 40
	},
	styleTextButton:{
		color: 'white',
		fontSize: 16,
		fontWeight: 'bold'
	}
})