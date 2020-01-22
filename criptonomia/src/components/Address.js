import React, { Component } from 'react';
import {
    View,
    ActivityIndicator,
    Alert,
    ScrollView,
    Text,
    StyleSheet, 
    AsyncStorage
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { HeaderNavigator } from './HeaderNavigator'
import { alterarCep, alterarDiasEntrega, alterarValorFrete, buscarCep, atualizarToken, buscarIdUsuarioLocal, buscarIdMobileLocal } from '../actions/AddressAction'
import { TextInputMask } from 'react-native-masked-text'
import { ButtonKitEscola, TextInputFormBordas } from '../StyledGlobal';
import {
    ID_USUARIO, ID_MOBILE
} from '../util/Constants'


class Address extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cep: '30640270',
            //tipoDeLogradouro:'',
            //nomeLogradouro: '',
            numero: '',
            complemento: '',
            referencia: '',
            //bairro: '',
            //cidade: '',
            //uf: '',
            endereco: [],
            cServico: [],
            idMobile: 0,
            idUsuario: 0
        };

    }
    componentWillMount() {
        this.props.atualizarToken(this.props.tokenMain)
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

    buscar() {
        const unmasked =  this.zipCodeField.getRawValue()
        console.log("cestaItens")
        console.log(this.props.itensCesta)
        this.props.buscarCep(unmasked, this.props.entregarNaEscola, this.props.itensCesta, this.props.token)
        //console.log("voltei"+this.props.cepPesquisado)
        if (this.props.cepPesquisado != undefined) {
            this.setState({ endereco: this.props.endereco, cServico: this.props.cServico })
            //this.setarInformacoesNaTela();
        }

        // console.log(this.props.endereco);
        // console.log(this.props.cServico);
        // if(this.props.cepPesquisado != undefined){
        //     this.setState({nomeLogradouro: this.props.cepPesquisado.endereco.logradouro,
        //         bairro: this.props.cepPesquisado.endereco.bairro,
        //         cidade: this.props.cepPesquisado.endereco.localidade,
        //         uf: this.props.cepPesquisado.endereco.uf})
        // }
        // if(this.props.cepPesquisado.cServico != undefined){
        //     this.props.alterarDiasEntrega(this.props.cepPesquisado.cServico.prazoEntrega);
        //     this.props.alterarValorFrete(this.props.cepPesquisado.cServico.valor)
        // }
    }
    verificarInformacoesProximaTela() {
        const objInformacoes = {};
        if (this.state.numero == '') {
            Alert.alert("Nº e obrigatorio")
            return;
        } else {
            this.props.endereco.numero = this.state.numero;
            console.log(this.props.endereco)
            if (this.state.complemento != '') {
                this.props.endereco.complemento = this.state.complemento;
            }
            if (this.state.referencia != '') {
                this.props.endereco.pontoDeReferencia = this.state.referencia;
            }
            objInformacoes.cServico = this.props.cServico;
            objInformacoes.endereco = this.props.endereco;
            this._confirmaUsuario({objInformacoes : objInformacoes});
        }
    }

    _confirmaUsuario (objInformacoes) {
        if (this.props.idUsuario != undefined && this.props.idUsuario > 0 ) {
            console.log(this.props.idUsuario)
            console.log(this.props.idMobile)
            this.setState({ idUsuario: this.props.idUsuario });
            objInformacoes.idUsuario = this.props.idUsuario
            objInformacoes.idMobile = this.props.idMobile
            Actions.Payment({objInformacoes : objInformacoes});
        } else if (this.props.idMobile != undefined && this.props.idMobile > 0 ) {
            objInformacoes.idMobile = this.props.idMobile;
            console.log("obj informacoes")
            console.log(this.props.idUsuario)
            Actions.Login({ idMobile: this.props.idMobile, objInformacoes : objInformacoes});
        }

    }

    // setarInformacoesNaTela() {
    //     this.setState({
    //         nomeLogradouro: this.props.endereco.logradouro,
    //         bairro: this.props.endereco.bairro,
    //         cidade: this.props.endereco.localidade,
    //         uf: this.props.endereco.uf,
    //         diasUteis: this.props.cServico.prazoEntrega,
    //         valorFrete: this.props.cServico.valor
    //     })

    //     this.props.alterarDiasEntrega(this.state.cServico.prazoEntrega);
    //     this.props.alterarValorFrete(this.state.cServico.valor)
    // }
    parteDeCima() {
        return (
            <View>
                {/* <Text style = {{textAlign:'center', color:'red', marginTop:5}}>Atenção a nota fiscal sera enviada para o endereço fornecido</Text> */}

                <View style={{ paddingHorizontal: 15, marginTop: 20 }}>
                    <View style={{ flexDirection: 'row', margin: 5 }}>
                        <TextInputMask
                            style={styles.cep}
                            placeholder='cep*'
                            type={'zip-code'}
                            //keyboardType={'numeric'}
                            //maxLength={9}
                            value={this.state.cep}
                            onChangeText={text => {
                                this.setState({
                                    cep: text
                                })
                            }}
                            ref={(ref) => this.zipCodeField = ref}
                        />
                        {/* <TextInputFormBordas
                                    style={{ flex: 2 }}
                                    placeholder='CEP*'
                                    keyboardType={'numeric'}
                                    maxLength={9}
                                    onChangeText={(value) => this.setState({ cep: value })}
                                    value={this.state.cep}></TextInputFormBordas> */}
                        <ButtonKitEscola onPress={() => this.buscar()} style={{ flex: 0.5, marginStart: 10, height: 40 }}>
                            <Text style={{ color: '#fff' }}>Buscar</Text>
                        </ButtonKitEscola>
                    </View>
                    <View style={{ flexDirection: 'row', margin: 5 }}>
                        {/* <TextInputFormBordas placeholder='tipo de logradouro*' editable={false} style={{ flex: 0.5 }} value={this.state.tipoDeLogradouro}></TextInputFormBordas> */}
                        <TextInputFormBordas style={{ flex: 2, color: '#949499' }} editable={false} value={this.props.endereco.logradouro} placeholder='nome de logradouro' ></TextInputFormBordas>
                    </View>
                    <View style={{ flexDirection: 'row', margin: 5 }}>
                        <TextInputFormBordas placeholder='n°*' keyboardType={'numeric'} value={this.state.numero} style={{ flex: 0.5, color: "#808080" }} onChangeText={text => {
                            this.setState({
                                numero: text
                            })
                        }}></TextInputFormBordas>
                        <TextInputFormBordas placeholder='complemento' value={this.state.complemento} style={{ flex: 2, marginStart: 10, color: "#808080" }} onChangeText={text => {
                            this.setState({
                                complemento: text
                            })
                        }}></TextInputFormBordas>
                    </View>
                    <TextInputFormBordas style={{ margin: 5, color: "#808080" }} value={this.state.referencia} placeholder='ponto de referência' onChangeText={text => {
                        this.setState({
                            referencia: text
                        })
                    }}></TextInputFormBordas>
                    <TextInputFormBordas style={{ margin: 5 , color: "#808080"}} value={this.props.endereco.bairro} editable={false} placeholder='bairro'></TextInputFormBordas>
                    <View style={{ flexDirection: 'row', margin: 5 }}>
                        <TextInputFormBordas style={{ flex: 2 , color: "#808080"}} editable={false} value={this.props.endereco.localidade} placeholder='cidade'></TextInputFormBordas>
                        <TextInputFormBordas style={{ flex: 0.5, marginStart: 10 , color: "#808080"}} value={this.props.endereco.uf} editable={false} placeholder='uf'></TextInputFormBordas>
                    </View>


                </View>
            </View>
        )
    }
    informacoesDeEntregaEValor() {
        if (this.props.mostrarParteDeBaixo) {
            return (
                <View style={{
                    justifyContent: 'center', flexDirection: 'column', backgroundColor: '#f4f4f4',
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 1,
                    },
                    shadowOpacity: 0.22,
                    shadowRadius: 2.22,

                    elevation: 3,
                    margin: 3, borderRadius: 5, borderColor: '#CCC', borderWidth: 1
                }}>
                    <View style={{ marginTop: 10, flexDirection: 'row', justifyContent: 'space-around', marginHorizontal: 10 }}>
                        <View>
                            <Text style={{ display: 'flex', fontSize: 12, color: 'black' }}>Dias Para entrega:</Text>
                            <Text style={{ display: 'flex', fontSize: 12, color: 'black' }}>Valor Frete:</Text>
                        </View>
                        <View>
                            <Text style={{ display: 'flex', fontWeight: 'bold', fontSize: 12, color: 'red' }}>{this.props.cServico.prazoEntrega}</Text>
                            <Text style={{ display: 'flex', fontWeight: 'bold', fontSize: 12, color: 'red' }}>{"R$ " + this.props.cServico.valor}</Text>
                        </View>
                    </View>
                    <ButtonKitEscola onPress={() => this.verificarInformacoesProximaTela()} style={{ marginVertical: 10, marginHorizontal: 40 }}>
                        <Text style={{ color: '#fff' }}>Confirma Endereço</Text>
                    </ButtonKitEscola>
                </View>
            )
        }
    }

    renderScreen() {
        if (this.props.msg != '') {
            Alert.alert(this.props.msg);
        }

        if (this.props.loadingAddress) {

            return (
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <ActivityIndicator size='large' color='#0075BE' />
                </View>
            )
        }
        return (
            <View style={{ flex: 1 }}>

                <ScrollView contentContainerStyle={{ flexGrow: 1, flexDirection: 'column', justifyContent: 'space-between' }}>
                    {this.parteDeCima()}
                    {this.informacoesDeEntregaEValor()}
                </ScrollView>


            </View>
        );
    }

    render() {
        console.log("1")
        if(this.props.isFindIdUsuario == false){
            this.props.buscarIdUsuarioLocal(ID_USUARIO);
        }else if (this.props.idUsuario === 0 && this.props.isFindIdUsuario && this.props.isFindIdMobile === false) {
            this.props.buscarIdMobileLocal(ID_MOBILE);
            console.log("2")
        } 
        
        // else if (this.props.isFindIdMobile && this.props.isFindIdUsuario && this.props.idMobile === 0) {
        //     var idMobile = this.gerarIdMobile();
        //     this.props.salvarIdMobileLocal(idMobile, ID_MOBILE);
        //     console.log("3")
        // } 
        
        else if (this.props.isFindIdUsuario && this.props.isFindIdMobile) {
            console.log("4")
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
    }
    //     return (
    //         <View style={{ flex: 1, backgroundColor: '#fff' }}>

    //             <View style={{ flex: 1 }}>
    //                 {this.renderScreen()}

    //             </View>
    //         </View>
    //     );
    // }
}

const mapStateToProps = state => (
    {
        valorFrete: state.AddressReducer.valorFrete,
        cep: state.AddressReducer.cep,
        diasUteis: state.AddressReducer.diasUteis,
        msg: state.AddressReducer.msg,
        loadingAddress: state.AddressReducer.loadingAddress,
        token: state.AddressReducer.token,
        entregarNaEscola: state.BasketReducer.entregarNaEscola,
        tokenMain: state.MainScreenReducer.token,
        cepPesquisado: state.AddressReducer.cepPesquisado,
        endereco: state.AddressReducer.endereco,
        cServico: state.AddressReducer.cServico,
        mostrarParteDeBaixo: state.AddressReducer.mostrarParteDeBaixo,
        idUsuario: state.AddressReducer.idUsuario,
        isFindIdUsuario: state.AddressReducer.isFindIdUsuario,
        isFindIdMobile: state.AddressReducer.isFindIdMobile,
        idMobile: state.AddressReducer.idMobile,
    }
)

const styles = StyleSheet.create({
    cep: {
        flex: 2,
        backgroundColor: '#F6F6F6',
        borderRadius: 10,
        borderWidth: 0.7,
        borderColor: '#d3d3d3',
        height: 40,
        color: '#949499'
    },

})


export default connect(mapStateToProps, { alterarCep, alterarDiasEntrega, alterarValorFrete, 
    buscarCep, atualizarToken, buscarIdUsuarioLocal, buscarIdMobileLocal })(Address)