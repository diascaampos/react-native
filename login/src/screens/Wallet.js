import React, { Component } from 'react'

import{
    StyleSheet,
    Text,
    View,
    ScrollView,
    Image,
    TouchableOpacity
} from 'react-native'

export default class Wallet extends Component{
    render(){
        return(
            <ScrollView style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.textVG}>Visão Geral</Text>
                    <Text style={styles.textSaldo}>SALDO TOTAL APROXIMADO</Text>
                    <Text style={styles.saldoRS}>R$<Text style={styles.saldoReal}>0,00</Text></Text>
                    
                    <View style={styles.flexDirection}>
                        <View style={styles.saldoDispxOrdens}>
                            <Text style={styles.textSaldo}>DISPONÍVEL</Text>
                            <Text style={styles.saldoRS}>R$<Text style={styles.saldoReal}>0,00</Text></Text>
                        </View>
                        <View style={styles.saldoDispxOrdens}>
                            <Text style={styles.textSaldo}>EM ORDENS</Text>
                            <Text style={styles.saldoRS}>R$<Text style={styles.saldoReal}>0,00</Text></Text>
                        </View>
                    </View>
                    
                </View>
                <View style={styles.postContainer}>
                    <View>
                        <View style={styles.parCripto}>
                            <Image source={require('../assets/imgs/Bitcoin.png')} />
                            <Text style={styles.parCripto}>Bitcoin (BTC)</Text>
                        </View>
                        <Text style={styles.precoParCripto}>R$<Text style={styles.saldoReal }>0,00</Text></Text>
                        <Text style={styles.precoParCripto}>0,0000 BTC</Text>
                        <TouchableOpacity style={styles.btnDetalhes}>
						    <Text style={styles.btnDetalhes}>VER DETALHES</Text>
					    </TouchableOpacity>
                        
                    </View>
                    <View style={{flexDirection:'flex-end'}}>
                        <View style={styles.ultimoPreco}>
                            <Text style={styles.parCripto}>Último preço</Text>
                        </View>
                        <Text style={styles.precoParCripto}>R$36.464,34</Text>
                    </View>
                </View> 

                <View style={styles.postContainer}>
                    <View>
                        <View style={styles.parCripto}>
                            <Image source={require('../assets/imgs/Ethereum.png')} />
                            <Text style={styles.parCripto}>Ethereum (ETH)</Text>
                        </View>
                        <Text style={styles.precoParCripto}>R$<Text style={styles.saldoReal }>0,00</Text></Text>
                        <Text style={styles.precoParCripto}>0,0000 ETH</Text>
                        <TouchableOpacity style={styles.btnDetalhes}>
						    <Text style={styles.btnDetalhes}>VER DETALHES</Text>
					    </TouchableOpacity>
                        
                    </View>
                    <View>
                        <View style={styles.ultimoPreco}>
                            <Text style={styles.parCripto}>Último preço</Text>
                        </View>
                        <Text style={styles.precoParCripto}>R$675,92</Text>
                    </View>
                </View> 

                <View style={styles.postContainer}>
                    <View>
                        <View style={styles.parCripto}>
                            <Image source={require('../assets/imgs/Ripple.png')} />
                            <Text style={styles.parCripto}>Ripple (XRP)</Text>
                        </View>
                        <Text style={styles.precoParCripto}>R$<Text style={styles.saldoReal }>0,00</Text></Text>
                        <Text style={styles.precoParCripto}>0,0000 XRP</Text>
                        <TouchableOpacity style={styles.btnDetalhes}>
						    <Text style={styles.btnDetalhes}>VER DETALHES</Text>
					    </TouchableOpacity>
                        
                    </View>
                    <View>
                        <View style={styles.ultimoPreco}>
                            <Text style={styles.parCripto}>Último preço</Text>
                        </View>
                        <Text style={styles.precoParCripto}>R$0,96</Text>
                    </View>
                </View> 
            </ScrollView>
        )
    }
}

const styles =  StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#D3D3D3'
    },

    flexDirection:{
        flexDirection: 'row',
        justifyContent: 'center',
        margin: 15
    },

    header:{
        color: '#FFF',
        backgroundColor: '#4682B4'
    },

    textVG:{
        color: '#D3D3D3',
        fontWeight: 'bold',
        fontSize: 25,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        margin: 25,
    },

    textSaldo:{
        color: '#D3D3D3',
        fontSize: 18,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center'
    },

    saldoRS:{
        flexDirection: 'row',
        alignItems: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
        marginLeft: 4,
        color: '#DCDCDC',
        textAlign: 'center'
    },

    saldoDispxOrdens:{
        alignItems: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
        marginLeft: 4,
        color: '#DCDCDC',
        textAlign: 'center',
        margin: 15
    },

    postContainer:{
        marginHorizontal: 10,
        marginVertical: 10,
        margin: 20,
        padding: 20,
        backgroundColor: '#FFF',
        borderRadius: 7,
        flexDirection: 'row'
    },

    parCripto:{
        flexDirection: 'row',
        alignItems: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
        marginLeft: 4
    },

    precoParCripto:{
        fontSize: 18,
        marginLeft: 25,

    },
    
    card:{
        flexDirection: 'row',
        
    },
    saldoReal:{
        fontSize: 22,
        marginLeft: 10,
    },
    ultimoPreco:{
        flexDirection: 'row',
        alignItems: 'flex-end',
        fontSize: 18,
        marginBottom: 5,
        marginLeft: 4
    },
    btnDetalhes:{
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