import React, { Component } from 'react'
import { Icon } from 'react-native-elements'
import {
	View,
	Text,
	TouchableOpacity,
	Image,
	StyleSheet,
	ScrollView
} from 'react-native'


export default class Wallet extends Component {
	constructor(props) {
		super(props)

		this.state = {
			listaHeader: {
				saldoTotal: '43.850,00',
				saldoDisponivel: '0,00',
				saldoEmOrdem: '0,00'
			},
			listaCripto: [
				{
					name: "Bitcoin",
					simboloCripto: 'BTC',
					image: 'https://s2.coinmarketcap.com/static/img/coins/32x32/1.png?_=6f9d24a',
					saldoCripto: '1,0',
					saldoReais: '38.000,00',
					ultimoPreco: '38.000,00',
					variacaoPorcentagem: '2,5',
					colorBackground: '#ffeead'
				},
				{
					name: "Ethereum",
					simboloCripto: 'ETH',
					image: 'https://s2.coinmarketcap.com/static/img/coins/32x32/1027.png?_=6f9d24a',
					saldoCripto: '2.345',
					saldoReais: '840,00',
					ultimoPreco: '420,00',
					variacaoPorcentagem: '5,25',
					colorBackground: '#C0C0C0'
				},
				{
					name: "Ripple",
					simboloCripto: 'XRP',
					image: 'https://s2.coinmarketcap.com/static/img/coins/32x32/52.png?_=6f9d24a',
					saldoCripto: '1.500,0',
					saldoReais: '1.470,00',
					ultimoPreco: '0,98',
					variacaoPorcentagem: '1,98',
					colorBackground: '#87CEEB'
				},
				{
					name: "BitcoinCash",
					simboloCripto: 'BCH',
					image: 'https://s2.coinmarketcap.com/static/img/coins/32x32/1831.png?_=6f9d24a',
					saldoCripto: '3,0',
					saldoReais: '3.540,00',
					ultimoPreco: '1.180,00‬',
					variacaoPorcentagem: '3,5',
					colorBackground: '#90EE90'
				}
			]
		}
	}
	renderScreen() {
		if (this.state.listaCripto.length > 0) {
			return (
				<View style={{ backgroundColor: '#fff' }} >

					<ScrollView style={{ marginBottom: (Platform.OS === 'ios' ? 20 : 10) }}>
						{this.mostrarLista()}

					</ScrollView>
				</View>
			)
		} else {
			return (
				<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >

					<Text style={{ color: 'black' }}>Nenhum item encontrado</Text>
				</View>
			)
		}
	}

	mostrarLista() {
		return (
			this.state.listaCripto.map((item) => (
				<View style={styles.container}>
					<View style={{
						margin: 10,
						padding: 20,
						backgroundColor: item.colorBackground,
						borderRadius: 7,
						flexDirection: 'row'
					}}>
						<View>
							<View style={styles.parCripto}>
								<Image
									style={{ width: 30, height: 30 }}
									source={{ uri: item.image }}
								/>
								<Text style={styles.parCripto}>{item.name}</Text>
							</View>
							<Text style={styles.precoParCripto}>R$<Text style={styles.saldoReal}>{item.saldoReais}</Text></Text>
							<Text style={styles.precoParCripto}>{item.saldoCripto + ' ' + item.simboloCripto}</Text>
							<TouchableOpacity style={styles.btnDetalhes}
								onPress={() => {
									this.props.navigator.push({ id: 'negociacao' })
								}}>
								<Text style={styles.btnDetalhes}>VER DETALHES</Text>
							</TouchableOpacity>

						</View>
						<View>
							<View style={styles.ultimoPreco}>
								<Text style={styles.ultimoPrecoTxt}>Último preço</Text>
							</View>
							<Text style={styles.ultimoPrecoRS}>R${item.ultimoPreco}</Text>
							<Text style={styles.variacao}>Variação 24H</Text>
							<Text style={styles.variacaoPorc}>{item.variacaoPorcentagem}%</Text>
						</View>
					</View>
				</View>
			))
		)
	}

	render() {
		return (
			<ScrollView>
				<View style={styles.header}>
					<Text style={styles.textVG}>Visão Geral</Text>
					<Text style={styles.textSaldo}>SALDO TOTAL APROXIMADO</Text>
					<Text style={styles.saldoRS}>R$<Text style={styles.saldoTotal}>{this.state.listaHeader.saldoTotal}</Text></Text>
					<Icon
						name='g-translate'
						color='#00aced' />
					<View style={styles.flexDirection}>
						<View style={styles.saldoDispxOrdens}>
							<Text style={styles.textSaldo}>DISPONÍVEL</Text>
							<Text style={styles.saldoRS}>R$<Text style={styles.saldoReal}>{this.state.listaHeader.saldoDisponivel}</Text></Text>
						</View>
						<View style={styles.saldoDispxOrdens}>
							<Text style={styles.textSaldo}>EM ORDENS</Text>
							<Text style={styles.saldoRS}>R$<Text style={styles.saldoReal}>{this.state.listaHeader.saldoEmOrdem}</Text></Text>
						</View>
					</View>
				</View>
				{this.renderScreen()}
			</ScrollView>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white'
	},

	flexDirection: {
		flexDirection: 'row',
		justifyContent: 'center',
		margin: 15
	},

	header: {
		color: '#FFF',
		backgroundColor: '#f38d28'
	},

	textVG: {
		color: '#D3D3D3',
		fontWeight: 'bold',
		fontSize: 25,
		alignItems: 'center',
		justifyContent: 'center',
		textAlign: 'center',
		margin: 25,
	},

	textSaldo: {
		color: '#D3D3D3',
		fontSize: 18,
		alignItems: 'center',
		justifyContent: 'center',
		textAlign: 'center'
	},

	saldoRS: {
		flexDirection: 'row',
		alignItems: 'center',
		fontSize: 18,
		fontWeight: 'bold',
		marginBottom: 5,
		marginLeft: 4,
		color: '#DCDCDC',
		textAlign: 'center'
	},

	saldoDispxOrdens: {
		alignItems: 'center',
		fontSize: 18,
		fontWeight: 'bold',
		marginBottom: 5,
		marginLeft: 4,
		color: '#DCDCDC',
		textAlign: 'center',
		margin: 15
	},

	postContainer: {
		margin: 10,
		padding: 20,
		backgroundColor: '#FFF',
		borderRadius: 7,
		flexDirection: 'row'
	},

	parCripto: {
		flexDirection: 'row',
		alignItems: 'center',
		fontSize: 18,
		fontWeight: 'bold',
		marginBottom: 5,
		marginLeft: 4
	},

	ultimoPrecoTxt: {
		flexDirection: 'row',
		alignItems: 'center',
		fontSize: 18,
		marginLeft: 55,
		color: '#333',
	},
	variacao: {
		flexDirection: 'row',
		alignItems: 'center',
		fontSize: 18,
		marginLeft: 55,
		color: '#333',
		marginTop: 10
	},

	precoParCripto: {
		fontSize: 18,
		marginLeft: 25,
	},
	variacaoPorc: {
		fontSize: 18,
		marginLeft: 55,
		textAlign: 'center'
	},
	ultimoPrecoRS: {
		fontSize: 21,
		fontWeight: 'bold',
		marginLeft: 50,
		fontFamily: 'Arial',
		textAlign: 'center'
	},

	card: {
		flexDirection: 'row',

	},
	saldoTotal: {
		fontSize: 34,
		marginLeft: 10,
	},
	saldoReal: {
		fontSize: 24,
		marginLeft: 10,
	},

	ultimoPreco: {
		flexDirection: 'row',
		alignItems: 'center',
		fontSize: 18,
		marginBottom: 5,
		marginLeft: 4
	},

	btnDetalhes: {
		margin: 10,
		height: 35,
		width: '90%',
		fontSize: 19,
		color: '#006400',
		textAlign: 'center',
		fontWeight: 'bold',
		alignItems: 'center',
	},
})
