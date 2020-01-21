import React, {Component} from 'react'
import {
  View,
  Text,
  StyleSheet,
  Button
} from 'react-native'

import Topo from './src/components/Topo'
import Icone from './src/components/Icone'

class MeuComponente extends Component {
	render() {
		return (
			<View>
				<Text>{this.props.teste}</Text>
			</View>
		)
	}
}

export default class App extends Component {

	constructor(props) {
		 super(props)
		 
		 this.state = {
			 escolhaUsuario: '',
			 pcEscolhida: '',
			 resultadoJogo: ''
		 }
	}

	jogada(escolhaUsuario) {
		this.setState({
			escolhaUsuario: escolhaUsuario
		})

		var escolhaAleatoriaPC = Math.random()
		escolhaAleatoriaPC = Math.floor(escolhaAleatoriaPC * 3)
	
		var escolhaPC = [
			"PEDRA",
			"PAPEL",
			"TESOURA"
		]
		
		var pcEscolhida = escolhaPC[escolhaAleatoriaPC]
		this.setState({
			pcEscolhida: pcEscolhida
		})


		if(escolhaUsuario === pcEscolhida){
			var resultadoJogo = 'EMPATE :|'
		}else if(escolhaUsuario == 'PEDRA'){
			if(pcEscolhida == 'PAPEL'){
				var resultadoJogo = 'VOCÊ PERDEU! :('
			}else{
				var resultadoJogo = 'VOCÊ GANHOU! :D'
			}
		}else if( escolhaUsuario == 'PAPEL'){
			if(pcEscolhida == 'TESOURA'){
				var resultadoJogo = 'VOCÊ PERDEU! :('
			}else{
				var resultadoJogo = 'VOCÊ GANHOU! :D'
			}
		}else{
			if(pcEscolhida == 'PAPEL'){
				var resultadoJogo = 'VOCÊ GANHOU! :D'
			}else{
				var resultadoJogo = 'VOCÊ PERDEU! :('
			}
		}
		this.setState({
			resultadoJogo: resultadoJogo
		})
	}
	render() {
		return (
			<View>
				<Topo></Topo>
				
				<View style={styles.painelAcoes}>
					<View style={styles.styleButton}>
						<Button 
							onPress={() => {this.jogada('PEDRA')}}
							title='Pedra' 
						/>
					</View>
					<View style={styles.styleButton}>
						<Button 
							onPress={() => {this.jogada('PAPEL')}}
							title='Papel' 
						/>
					</View>
					<View style={styles.styleButton}>
						<Button 
							onPress={() => {this.jogada('TESOURA')}}
							title='Tesoura' 
						/>
					</View>
				</View>

				<View style={styles.palco}>
					<Text style={styles.txtResultado}>{this.state.resultadoJogo}</Text>
					<View style={{flexDirection: 'row'}}>
						<View style={{margin: 30}}>
							<Icone escolha={this.state.escolhaUsuario} jogador= 'Você'></Icone>
						</View>
						<View style={{margin: 30}}>
							<Icone escolha={this.state.pcEscolhida} jogador= 'Computador'></Icone>
						</View>
					</View>					
				</View>
			</View>
		)
	}
}


const styles =  StyleSheet.create({
	styleButton: {
		width: 90,
	},
	painelAcoes: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		margin: 10
	},
	palco: {
		alignItems: 'center',
		marginTop: 10
	},
	txtResultado:{
		fontWeight: 'bold',
		color: 'red',
		fontSize: 30,
		height: 60
	}
})