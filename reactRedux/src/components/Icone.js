import React, {Component} from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet
} from 'react-native'

class Icone extends Component{
	render(){
		if(this.props.escolha == 'PEDRA'){
			return(
				<View style={styles.icone}>
					<Text style={styles.textJogador}>{this.props.jogador}</Text>
					<Image source={require('../../imgs/pedra.png')}/>
				</View>
			)
		}else if(this.props.escolha == 'PAPEL'){
			return(
				<View style={styles.icone}>
					<Text style={styles.textJogador}>{this.props.jogador}</Text>
					<Image source={require('../../imgs/papel.png')}/>
				</View>
			)
		}else if(this.props.escolha == 'TESOURA'){
			return(
				<View style={styles.icone}>
					<Text style={styles.textJogador}>{this.props.jogador}</Text>
					<Image source={require('../../imgs/tesoura.png')}/>
				</View>
			)
		}else{
			return false
		}
	}
}


const styles =  StyleSheet.create({
	icone:{
		alignItems: 'center',
		marginBottom: 20
	},
	textJogador:{
		fontSize: 18,
	}
})

export default Icone