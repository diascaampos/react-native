import React, { Component } from 'react';
import {
    View,
    ActivityIndicator,
    Alert,
    ScrollView,
    Text,
    StyleSheet,
    AsyncStorage,
    TouchableOpacity,
    Modal,
    Image, NativeModules
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { HeaderNavigator } from './HeaderNavigator'
import { ButtonKitEscola, TextInputFormBordas } from '../StyledGlobal';
import { KEY, IV, ID_USUARIO, ID_MOBILE } from '../util/Constants'
import { TextInputMask } from 'react-native-masked-text';
import {
    atualizarToken, alterStatusLoading, atualizarListaModel, atualizarListaAno, alterarValorTotal, salvarIdUsuarioLocal
    , buscarIdUsuarioLocal, buscarIdMobileLocal, payment, atualizarIdUsuario
} from '../actions/PaymentAction'

//var Aes = NativeModules.Aes
//const generateKey = (password, salt, cost, length) => Aes.pbkdf2(password, salt, cost, length)

//import AesCrypto from 'react-native-aes-kit';

const plaintxt = 'Eu sou';
//const secretKey = '58aB814Q6Y4qjybm';
//const iv = '8047237385869380';

import AesCrypto from 'react-native-aes-pack';
class Payment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            numeroCard: '',
            nomeImpresso: '',
            mes: 'Mes',
            ano: 'Ano',
            cvv: '',
            cpf: '',
            parcelas: '',
            idUsuario: '',
            hiddenBoleto: false,
            hiddenCard: false,
            listaMes: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
            modalVisible: false,
            mesAtivo: false,
            anoAtivo: false,
            valorTotal: 0
        }
    }
    gerarData() {
        var date = new Date().getFullYear(); //Current Date
        var listAno = [];
        listAno.push(date);
        for (let i = 1; i < 16; i++) {
            listAno.push(date + i)
        }
        this.props.atualizarListaAno(listAno)
    }
    componentWillMount() {
        this.valorTotal()
        if (this.props.objInformacoes == undefined) {
            console.log("entrei no if")
            console.log(this.props.dadosLogin)
            this.props.salvarIdUsuarioLocal(this.props.dadosLogin, ID_USUARIO);
            this.props.atualizarIdUsuario(this.props.dadosLogin.idUsuario)
        }else {
            console.log('entrei no else')
            console.log(this.props.objInformacoes)
            this.props.atualizarIdUsuario(this.props.objInformacoes.idUsuario)
            //this.props.salvarIdUsuarioLocal(this.props.dadosLogin, ID_USUARIO);
        }
        
        //this.props.atualizarToken(this.props.tokenLogin)
        this.gerarData();
        //this._salvarIdUsuario();
        this.props.navigation.setParams({
            'onLeft': this.handleIconTouch
        })

    }


    handleIconTouch() {
        //Alert.alert('teste back teste')

        Actions.basket();
    }

    componentWillUnmount() {
        // BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }


    handleBackButton = () => {
        // alert('Touched!');
    }

    updateScreen() {
        this.setState({
            updateScreen: ''
        });
    }
    // _salvarIdUsuario = async () => {
    //     try {
    //         var idUsuario = this.props.dadosUsuario.idUsuario
    //         await AsyncStorage.setItem('idUsuario', "" + idUsuario);
    //         this.setState({ idUsuario: idUsuario })
    //         this.props.alterStatusLoading(false);
    //     } catch (error) {
    //         this.props.alterStatusLoading(false);
    //         alert("Não foi possivel connectar 1" + error)
    //     }
    // };
    setcardVisible(visible) {
        this.setState({ hiddenCard: visible, hiddenBoleto: false });
    }
    setboletoVisible(visible) {
        this.setState({ hiddenBoleto: visible, hiddenCard: false });
    }
    setColor(validador) {
        if (validador == 'card') {
            if (this.state.hiddenCard) {
                return '#1472b5'
            }
            return '#696969'

        } else {
            if (this.state.hiddenBoleto) {
                return '#1472b5'
            }
            return '#696969'

        }
    }
    validarInformacao(dado) {

        this.setModalVisible(!this.state.modalVisible)

        if (this.state.anoAtivo) {
            this.setState({ ano: dado })
            return;
        } else if (this.state.mesAtivo) {
            console.log('entrei')
            this.setState({ mes: dado })
            return;
        }
    }
    mostrarModel() {
        //console.log('estou no mostra model :'+this.props.tenhoKit)
        if (this.state.modalVisible) {
            return (
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.modalVisible}
                >
                    <View style={{ height: 300, width: '100%', backgroundColor: '#f0f0f0', position: 'absolute', bottom: 0, borderTopColor: '#ccc', borderTopWidth: 2 }}>
                        <ScrollView style={{ flex: 1, marginBottom: (Platform.OS === 'ios' ? 20 : 10) }} >
                            <View style={{ flexDirection: 'column' }} >
                                {this.props.listaModel.map((dado) => (
                                    <TouchableOpacity style={{ width: '100%', justifyContent: 'center', alignItems: 'center', borderBottomColor: '#ccc', borderBottomWidth: 0.5 }}
                                        onPress={() => this.validarInformacao(dado)}>
                                        <View style={{ flex: 1, justifyContent: 'center' }} >

                                            <Text style={{ fontSize: 16, marginBottom: 10 }}>{dado}</Text>

                                        </View>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </ScrollView>
                    </View>

                </Modal>

            )
        }
    }

    valorTotal() {
        let valor = 0;
        for (let itens of this.props.listItensCesta) {
            valor += itens.valorTotal;
        }
        
        var value = this.props.cServico.valor.replace(".", "");
        value = parseFloat(value.replace(",", "."));
        console.log("valor frete")
        console.log(value)
        var valorTotal =  valor + value;
        console.log("valor de tudo")
        console.log(valorTotal)
        var arredondado = parseFloat(valorTotal.toFixed(2));
        this.setState({ valorTotal: arredondado })

    }

    async pagamentoCartao(formaPagamento) {
        let dadosCartao = "";

        if (this.state.numeroCard != undefined && this.state.numeroCard.length > 13) {
            var cartao = this.state.numeroCard.replace(",", "")
            dadosCartao += cartao.trim()+","
        } else {
            Alert.alert('', 'Numero cartao invalido')
            return;
        }

        if (this.state.cvv != undefined && this.state.cvv.length >= 3) {
            dadosCartao += this.state.cvv+","
        } else {
            Alert.alert('', 'CVV invalido')
            return;
        }

        if (this.state.nomeImpresso != undefined) {
            dadosCartao += this.state.nomeImpresso+","
        } else {
            Alert.alert('', 'Nome informado invalido')
            return;
        }
        if (this.state.mes != undefined) {
            dadosCartao += this.state.mes+","
        } else {
            Alert.alert('', 'Mes invalido')
            return;
        }

        if (this.state.ano != undefined) {
            dadosCartao += this.state.ano+","
        } else {
            Alert.alert('', 'Ano invalido')
            return;
        }

        if (this.state.cpf != undefined && this.state.cpf.length > 10) {
            dadosCartao += this.state.cpf
        } else {
            Alert.alert('', 'CPF ou CNPJ informado invalido')
            return;
        }
        // const enviarDados = dadosCartao
        // console.log("dadosCartao");
        // console.log(enviarDados);// return a string type cipher
        AesCrypto.encrypt(dadosCartao, KEY, IV).then(cipher => {
            console.log(cipher);// return a string type cipher
            const objPagamento = {
                "hash": cipher
            }
            if (this.props.idUsuario != undefined && this.props.idUsuario > 0) {
                objPagamento.idUsuario = this.props.idUsuario;
            }
            if (this.props.idMobile != undefined && this.props.idMobile > 0) {
                objPagamento.idMobile = this.props.idMobile;
                
            }
            objPagamento.formaPagamento = formaPagamento;
            objPagamento.numeroParcelas = 1;
            console.log(objPagamento);// return a string type cipher
            this.props.payment(objPagamento, "")
            // this.setState({ cipher });
        }).catch(err => {
            console.log(err);
        });

        // AesCrypto.encrypt(dadosCartao,secretKey,iv).then(cipher=>{
        //     const objPagamento = {
        //         "cipher": cipher
        //     }
        //     if (this.props.idUsuario != undefined && this.props.idUsuario > 0 ) {
        //         objPagamento.idMobile = this.props.idMobile;   
        //     }
        //     if (this.props.idMobile != undefined && this.props.idMobile > 0 ) {
        //         objPagamento.idUsuario = this.props.objInformacoes.idUsuario;
        //     }
        //     console.log(objPagamento);// return a string type cipher
        //     this.props.payment(objPagamento, "")
        // }).catch(err=>{
        //     console.log(err);
        // });

        // try {
        //     generateKey(KEY, 'salt', 65536, 256).then(key => {
        //         this.encryptLocal("1234,123,rodrigo c vale,12,2019", key)
        //             .then(({ cipher, iv }) => {
        //                 console.log('Encrypted:', cipher)
        //                 this.setState({cartao:cipher}) 
        //                 alert(this.state.cartao)
        //             }).catch(function(error) {
        //                 console.log('Erro: ' + error.message);
        //                 });

        //     })
        // } catch (e) {
        //     console.error(e)
        // }
    }
    // encryptLocal = (text, key) => {
    //     var iv = IV

    //     return Aes.encrypt(text, key, iv).then(cipher => ({
    //         cipher,
    //         iv,
    //     }))

    // }
    pagamentoBoleto() {

    }

    pagamentoInformacoes() {
        return (
            <View>
                <View style={{
                    flex: 0.5, backgroundColor: 'white', marginHorizontal: 20, shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,

                    elevation: 5,
                    margin: 10, borderRadius: 5, borderColor: '#CCC', borderEndWidthWidth: 1
                }}>
                    <View style={{ flexDirection: 'column', margin: 10 }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 16, color: '#696969' }}>Resumo do pedido</Text>
                        <View style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'space-between' }}>
                            <Text style={{ color: '#696969' }}>quantidade produtos</Text>
                            <Text style={{ marginEnd: 10, color: '#696969' }}>{this.props.listItensCesta.length}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'space-between' }}>
                            <Text style={{ color: '#696969' }}>frete</Text>
                            <Text style={{ marginEnd: 10, color: '#696969' }}>R${this.props.cServico.valor}</Text>
                        </View>
                        <View style={{ backgroundColor: '#A9A9A994', height: 2, width: '100%', marginTop: 20 }} />
                        <View style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'space-between' }}>
                            <Text style={{ color: '#696969' }}>total</Text>
                            <Text style={{ marginEnd: 10, color: '#696969' }}>R${this.state.valorTotal}</Text>
                        </View>
                    </View>

                </View>
                <View style={{ marginHorizontal: 20 }}>
                    <Text style={{ marginStart: 5, marginTop: 10, color: '#696969', fontWeight: 'bold', fontSize: 18 }}>Formas de pagamento</Text>
                    <View style={{ marginStart: 10, marginTop: 10 }}>
                        <TouchableOpacity onPress={() => this.setcardVisible(!this.state.hiddenCard)} style={{ height: 40, justifyContent: 'center', alignContent: 'center' }}>
                            <View style={{ flexDirection: 'row' }}>
                                <Image source={this.state.hiddenCard ? require('../img/cardBlue.png') : require('../img/card.png')} style={{ height: 40, width: 40, borderRadius: 10 }} />
                                <View style={{ justifyContent: 'center' }}>
                                    <Text style={{ marginTop: 5, marginStart: 10, color: this.setColor('card') }}>Cartão de credito</Text>
                                </View>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => this.setboletoVisible(!this.state.hiddenBoleto)} style={{ height: 40, justifyContent: 'center', alignContent: 'center' }}>

                            <View style={{ flexDirection: 'row' }}>
                                <Image source={this.state.hiddenBoleto ? require('../img/boletoBlue.png') : require('../img/boleto.png')} style={{ height: 40, width: 40, borderRadius: 10 }} />
                                <View style={{ justifyContent: 'center' }}>
                                    <Text style={{ marginTop: 5, marginStart: 10, color: this.setColor('boleto') }}>Boleto</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
    setModalVisible(visible) {
        //console.log("estou no modal: " + visible)
        this.setState({ modalVisible: visible });
    }
    setMes(mes) {
        //console.log("estou no modal: " + visible)
        this.setState({ mesAtivo: mes });
    }
    setAno(ano) {
        //console.log("estou no modal: " + visible)
        this.setState({ anoAtivo: ano });
    }
    mostrarMes() {
        this.props.atualizarListaModel(this.state.listaMes)
        this.setMes(true)
        this.setAno(false)
        this.setModalVisible(!this.state.modalVisible);
    }
    mostrarAno() {
        this.props.atualizarListaModel(this.props.listaAnos)
        this.setMes(false)
        this.setAno(true)
        this.setModalVisible(!this.state.modalVisible);

    }
    mostrarCardOuBoleto() {
        if (this.state.hiddenCard) {
            return (
                <View>
                    <View style={{
                        flex: 0.5, backgroundColor: 'white', marginHorizontal: 20, shadowColor: "#000",
                        shadowOffset: {
                            width: 0,
                            height: 2,
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 3.84,

                        elevation: 5,
                        margin: 10, borderRadius: 5, borderColor: '#CCC', borderEndWidthWidth: 1
                    }}>
                        <View style={{ flexDirection: 'column', margin: 10 }}>

                            <TextInputMask
                                type={'credit-card'}
                                style={styles.campo}
                                placeholder='Número de cartão'
                                options={{
                                    obfuscated: false,

                                }}
                                value={this.state.numeroCard}
                                onChangeText={text => {
                                    this.setState({
                                        numeroCard: text
                                    })
                                }}
                                ref={(ref) => this.creditCardField = ref}
                            />
                            {/* <TextInputFormBordas placeholder='Número de cartão' keyboardType={'numeric'} value={this.state.numeroCard} style={{ flex: 1, color: "#808080", marginBottom: 10 }} onChangeText={text => {
                                this.setState({
                                    numeroCard: text
                                })
                            }}></TextInputFormBordas> */}
                            <TextInputFormBordas placeholder='Nome impresso no cartão' keyboardType={''} value={this.state.nomeImpresso} style={{ flex: 1, color: "#808080", marginBottom: 10 }} onChangeText={text => {
                                this.setState({
                                    nomeImpresso: text
                                })
                            }}></TextInputFormBordas>
                            <TextInputFormBordas placeholder='CPF ou CNPJ do titular' keyboardType={'numeric'} value={this.state.cpf} maxLength={14} style={{ flex: 1, color: "#808080", marginBottom: 5 }} onChangeText={text => {
                                this.setState({
                                    cpf: text
                                })
                            }}></TextInputFormBordas>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <TouchableOpacity onPress={() => this.mostrarMes()} style={{ flex: 0.49, justifyContent: 'center' }}>
                                    <Text style={styles.campoCard}>{this.state.mes}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.mostrarAno()} style={{ flex: 0.49, justifyContent: 'center' }}>
                                    <Text style={styles.campoCard}>{this.state.ano}</Text>
                                </TouchableOpacity>
                            </View>

                            <TextInputFormBordas placeholder='CVV' keyboardType={'numeric'} value={this.state.cvv} maxLength={4} style={{ flex: 1, color: "#808080", marginBottom: 5 }} onChangeText={text => {
                                this.setState({
                                    cvv: text
                                })
                            }}></TextInputFormBordas>

                            <View style={{ backgroundColor: '#A9A9A994', height: 2, width: '100%', marginTop: 20 }} />
                            <View style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'flex-end' }}>
                                <Text style={{ color: '#696969', fontSize: 15 }}>Total: </Text>
                                <Text style={{ marginEnd: 10, color: '#696969', fontSize: 15 }}>R${this.state.valorTotal}</Text>
                            </View>
                            <View style={{ marginVertical: 10, justifyContent: 'center' }}>
                                <ButtonKitEscola onPress={() => this.pagamentoCartao("CC")} style={{ flex: 0.4, height: 40 }}>
                                    <Text style={{ color: '#fff' }}>Pagar com cartão de crédito</Text>
                                </ButtonKitEscola>
                            </View>
                        </View>

                    </View>
                </View>
            )
        } else if (this.state.hiddenBoleto) {
            return (
                <View>
                    <View style={{
                        flex: 0.5, backgroundColor: 'white', marginHorizontal: 20, shadowColor: "#000",
                        shadowOffset: {
                            width: 0,
                            height: 2,
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 3.84,

                        elevation: 5,
                        margin: 10, borderRadius: 5, borderColor: '#CCC', borderEndWidthWidth: 1
                    }}>
                        <View style={{ flexDirection: 'column', margin: 10 }}>

                            <View style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'space-between' }}>
                                <Text style={{ color: '#696969' }}>Total:</Text>
                                <Text style={{ marginEnd: 10, color: '#696969' }}>R${this.state.valorTotal}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                <Image source={require('../img/imprimir.png')} style={{ height: 35, width: 35 }} />
                                <View style={{ justifyContent: 'center' }}>
                                    <Text style={{ marginStart: 10, color: '#696969', marginRight: 30 }}>imprima o boleto e <Text style={{ fontWeight: 'bold' }}>pague no banco</Text></Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                <Image source={require('../img/internet.png')} style={{ height: 35, width: 35 }} />
                                <View style={{ justifyContent: 'center' }}>
                                    <Text style={{ marginStart: 10, color: '#696969', marginRight: 30 }}><Text style={{ fontWeight: 'bold' }}>ou pague pela internet </Text>
                                        utilizando o código de barras do boleto
                                </Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                <Image source={require('../img/prazo.png')} style={{ height: 35, width: 35 }} />
                                <View style={{ justifyContent: 'center' }}>
                                    <Text style={{ marginHorizontal: 10, color: '#696969', marginRight: 30 }}>o prazo de validade do boleto é de <Text style={{ fontWeight: 'bold' }}>1 dia útil</Text></Text>
                                </View>
                            </View>
                            <View style={{ marginVertical: 10, justifyContent: 'space-between' }}>
                                <ButtonKitEscola onPress={() => this.pagamentoBoleto()} style={{ flex: 0.4, height: 40 }}>
                                    <Text style={{ color: '#fff' }}>Pagar com boleto</Text>
                                </ButtonKitEscola>
                            </View>

                        </View>

                    </View>
                </View>
            )
        }
    }
    renderScreen() {
        if (this.props.msg != '') {
            Alert.alert(this.props.msg);
        }

        if (this.props.loadingPayment) {

            return (
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <ActivityIndicator size='large' color='#0075BE' />
                </View>
            )
        }
        return (
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={{ marginBottom: (Platform.OS === 'ios' ? 20 : 10) }}>
                <View style={{ alignContent: 'center', marginTop: 10 }}>
                    {this.pagamentoInformacoes()}
                    {this.mostrarCardOuBoleto()}
                    {this.mostrarModel()}
                </View>
            </ScrollView>
        );
    }

    render() {
        console.log(this.props.isFindIdUsuario)
        if (this.props.isFindIdUsuario == false) {
            console.log("1 idUsuario")
            this.props.buscarIdUsuarioLocal(ID_USUARIO);
        } else if (this.props.isFindIdUsuario && this.props.isFindIdMobile === false) {
            console.log("2 idMobile")
            this.props.buscarIdMobileLocal(ID_MOBILE);
        }
        else if (this.props.isFindIdUsuario && this.props.isFindIdMobile) {
            console.log("idUsuario")
            console.log(this.props.idUsuario)
            console.log("idMobile")
            console.log(this.props.idMobile)
            return (
                <View style={{ flex: 1, backgroundColor: '#fff' }}>

                    {this.renderScreen()}

                </View>
            )
        }
        return (
            <ActivityIndicator size='large' color='#0075BE' style={{ flex: 1, justifyContent: 'center', alignContent: 'center' }}>

            </ActivityIndicator>
        );

        // return (
        //     <View style={{ flex: 1, backgroundColor: '#fff' }}>

        //         <View style={{ flex: 1 }}>
        //             {this.renderScreen()}

        //         </View>
        //     </View>
        // );
    }
}

const mapStateToProps = state => (
    {
        msg: state.PaymentReducer.msg,
        loadingPayment: state.PaymentReducer.loadingPayment,
        tokenLogin: state.LoginReducer.token,
        dadosLogin: state.LoginReducer.dadosLogin,
        token: state.PaymentReducer.token,
        dadosUsuario: state.CreateAccountReducer.dadosUsuario,
        listaModel: state.PaymentReducer.listaModel,
        listaAnos: state.PaymentReducer.listaAnos,
        isAtualizarLista: state.PaymentReducer.isAtualizarLista,
        listItensCesta: state.BasketReducer.listItensCesta,
        cServico: state.AddressReducer.cServico,
        valorTotal: state.PaymentReducer.valorTotal,
        isFindIdUsuario: state.PaymentReducer.isFindIdUsuario,
        isFindIdMobile: state.PaymentReducer.isFindIdMobile,
        idUsuario: state.PaymentReducer.idUsuario,
        idMobile: state.PaymentReducer.idMobile
    }
)

const styles = StyleSheet.create({
    campo: {
        flex: 2,
        backgroundColor: '#F6F6F6',
        borderRadius: 10,
        borderWidth: 0.7,
        borderColor: '#d3d3d3',
        height: 40,
        marginBottom: 10,
        color: '#949499'
    },
    campoCard: {
        backgroundColor: '#F6F6F6',
        borderRadius: 10,
        borderWidth: 0.7,
        borderColor: '#d3d3d3',
        height: 40,
        paddingStart: 5,
        paddingTop: 8,
        marginBottom: 10,
        color: '#949499'
    },
})


export default connect(mapStateToProps, {
    atualizarToken, alterStatusLoading, atualizarListaModel, atualizarListaAno,
    alterarValorTotal, salvarIdUsuarioLocal, buscarIdUsuarioLocal, buscarIdMobileLocal, payment, atualizarIdUsuario
})(Payment)