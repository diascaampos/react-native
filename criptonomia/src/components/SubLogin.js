import React, { Component } from 'react';
import {
    View,
    ActivityIndicator,
    Alert,
    ScrollView,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    SafeAreaView,
    TextInput
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { HeaderNavigator } from './HeaderNavigator'
import { ButtonKitEscola, ButtonCriarConta } from '../StyledGlobal';
import { atualizarToken, login } from '../actions/LoginAction'
import { resetarBuscar } from '../actions/AddressAction'
import { Icon } from 'react-native-elements'
// import TabBarNavigator from '../util/TabBarNavigator'
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            eMail: '',
            senha: '',
            idUsuario: '',
            hidden: true,
            telaAtual: 3
        }
    }
    componentWillMount() {
        this.props.atualizarToken(this.props.tokenAddress)
        this.props.resetarBuscar();
        this.setState({ idUsuario: this.props.idMobile })
        // this.props.navigation.setParams({
        //     'onLeft': this.handleIconTouch
        // })

    }


    // handleIconTouch() {
    //     //Alert.alert('teste back teste')

    //     Actions.basket();
    // }

    // componentWillUnmount() {
    //     // BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    // }


    // handleBackButton = () => {
    //     // alert('Touched!');
    // }

    updateScreen() {
        this.setState({
            updateScreen: ''
        });
    }
    setpasswordVisible(visible) {
        this.setState({ hidden: visible });
    }
    mostrarImagem() {
        if (this.state.hidden) {
            return (
                'visibility-off'
            )
        } else {
            return (
                'visibility'
            )
        }
    }
    login() {
        // const objLogin = {
        //     "email": this.state.eMail,
        //     "senha": this.state.senha,
        //     "cServico": this.props.objInformacoes.objInformacoes.cServico,
        //     "endereco": this.props.objInformacoes.objInformacoes.endereco,
        //     "isEntregarCorreio": this.props.entregarNaEscola,
        //     "idMobile": this.props.idMobile,
        //     "idUsuario": this.props.objInformacoes.idUsuario ? 0 : 0
        // }
        // console.log(objLogin)
        // this.props.login(objLogin, this.props.token)

    }
    loginInformacoes() {
        return (
            <View>
                <View style={{
                    backgroundColor: '#0c4361B3', marginHorizontal: 30, shadowColor: '#FFFFFF',
                    margin: 5, borderRadius: 30, borderColor: '#FFFFFF', borderWidth: 1, marginTop: -60,
                    padding: 30
                }}>
                    {/* <View style={styles.EMailStyle}>
                    <Image source={require('../img/carta.png')} style={{ height: 30, width: 30, marginStart: 15 }} ></Image> 
                    <Icon name='mail' color='white' iconStyle={{marginStart: 15}} />
                    <TextInput placeholder='E-mail' placeholderTextColor="white" keyboardType={''} value={this.state.eMail} style={{ flex: 1, color: "#ffffff", fontSize: 16 }} onChangeText={text => {
                        this.setState({
                            eMail: text
                        })
                    }}></TextInput>
                </View>
                <View style={styles.PasswordStyle}>

                    <Image source={require('../img/cadiado.png')} style={{ height: 30, width: 30, marginStart: 15 }} ></Image> *
                    <Icon name='lock' color='white' iconStyle={{marginStart: 15}} />
                    <TextInput placeholder='Password' placeholderTextColor="white" keyboardType={''} value={this.state.senha} secureTextEntry={this.state.hidden} style={{ flex: 1, color: "#ffffff", fontSize: 16 }} onChangeText={text => {
                        this.setState({
                            senha: text
                        })
                    }}></TextInput>

                    <TouchableOpacity onPress={() => this.setpasswordVisible(!this.state.hidden)} style={{ height: 40, justifyContent: 'center', alignContent: 'center' }}>
                        <Icon name={this.mostrarImagem()} color='white' iconStyle={{marginEnd: 15}} />
                         <Image source={this.mostrarImagem()} style={{ height: 30, width: 30, borderRadius: 10, marginEnd: 15 }} /> 
                    </TouchableOpacity>
                </View> */}
                    <View style={{ flexDirection: 'row', marginBottom: 20 }}>
                        <Text style={styles.InformacoesParaLogar}>1</Text>
                        <Text style={{ flex: 1, color: 'white', fontSize: 16 }}>
                            <Text style={{ fontWeight: "bold" }}>Acesse o site Cointrade e faça </Text>
                            login em sua conta
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginBottom: 20 }}>
                        <Text style={styles.InformacoesParaLogar}>2</Text>
                        <Text style={{ flex: 1, color: 'white', fontSize: 16 }}>
                            Clique no botão
                            <Text style={{ fontWeight: "bold" }}>"Aplicativo" </Text>
                            localizado na barra superior da pagina
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginBottom: 20 }}>
                        <Text style={styles.InformacoesParaLogar}>3</Text>
                        <Text style={{ flex: 1, color: 'white', fontSize: 16 }}>
                            Faça a leitura do
                            <Text style={{ fontWeight: "bold" }}> código QR </Text>
                            mostrado ou insira manualmente o
                            <Text style={{ fontWeight: "bold" }}>código de autorização</Text>

                        </Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 20, marginTop: 40 }}>
                    <ButtonKitEscola onPress={() => Actions.HomePag()} style={{ flex: 1, height: 50, marginHorizontal: 30 }}>
                        <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 18 }}>Escanear código QR</Text>
                    </ButtonKitEscola>

                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                    <ButtonCriarConta onPress={() => Actions.CreateAccount()} style={{ flex: 1, height: 50, marginHorizontal: 30 }}>
                        <Text style={{ color: '#fff', fontSize: 18 }}>Inserir manualmente</Text>
                    </ButtonCriarConta>
                </View>
                <View style={{ alignItems:'center', marginBottom:-90, marginTop:20 }}>
                    <Text style={{color:'white', fontSize:16}}>Está enfrentando problemas ?</Text>
                    <Text style={{color:'#d19043', fontSize:16, fontWeight:'bold'}}>Solicite suporte</Text>
                </View>
            </View>
        )
    }
    renderScreen() {
        if (this.props.msg != '') {
            Alert.alert(this.props.msg);
        }

        if (this.props.loadingLogin) {

            return (
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <ActivityIndicator size='large' color='#0075BE' />
                </View>
            )
        }
        return (

            <View style={{ flex: 1, backgroundColor: '#0a3f5e' }}>
                <View style={{ alignItems: 'center', backgroundColor: '#ffffff1A', marginTop: 20, height: 100 }}>
                    <Image source={require('../img/logo-cointrade.png')} style={{ marginTop: 10, flex: 0.9 }} ></Image>
                </View>
                <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }} style={{ marginBottom: (Platform.OS === 'ios' ? 20 : 10) }}>

                    <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center' }}>
                        {this.loginInformacoes()}
                    </View>

                </ScrollView>
            </View>

        );
    }

    render() {

        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
                {/* <HeaderNavigator /> */}
                {/* <View style={{ flex: 8}}> */}
                {this.renderScreen()}
                {/* </View> */}
                {/* <View style={{ flex: 1 }}>
                    <TabBarNavigator
                        tela={this.state.telaAtual} >
                    </TabBarNavigator>
                </View> */}
            </SafeAreaView>

        );
    }
}

const mapStateToProps = state => (
    {
        msg: state.LoginReducer.msg,
        tokenAddress: state.AddressReducer.token,
        token: state.LoginReducer.token,
        loadingLogin: state.LoginReducer.loadingLogin,
        entregarNaEscola: state.BasketReducer.entregarNaEscola
    }
)

const styles = StyleSheet.create({
    EMailStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0c436100',
        borderWidth: 0.5,
        borderColor: '#ffffff',
        height: 50,
        borderRadius: 10,
        marginHorizontal: 30,
        marginTop: 35
    },
    PasswordStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0c436100',
        borderWidth: 0.5,
        borderColor: '#ffffff',
        height: 50,
        borderRadius: 10,
        marginHorizontal: 30,
        marginVertical: 30
    },
    ImageStyle: {
        padding: 10,
        margin: 5,
        height: 25,
        width: 25,
        resizeMode: 'stretch',
        alignItems: 'center',
    },
    InformacoesParaLogar: {
        alignContent: 'center',
        paddingVertical: 5,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: 'white',
        paddingStart: 15,
        color: 'white',
        height: 40,
        width: 40,
        fontSize: 18,
        marginEnd: 20

    }
})


export default connect(mapStateToProps, { atualizarToken, login, resetarBuscar })(Login)