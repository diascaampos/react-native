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
    ImageBackground,
    TextInput
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { HeaderNavigator } from './HeaderNavigator'
import { ButtonKitEscola, ButtonCriarConta } from '../StyledGlobal';
import { atualizarToken, login } from '../actions/LoginAction'
import { resetarBuscar } from '../actions/AddressAction'
import { Icon } from 'react-native-elements'
import RNPasswordStrengthMeter from 'react-native-password-strength-meter';
// import TabBarNavigator from '../util/TabBarNavigator'
class CreateAccount extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nome: '',
            eMail: '',
            senha: '',
            confirmarSenha: '',
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
                'visibility'
            )
        } else {
            return (
                'visibility-off'
            )
        }
    }
    criarConta() {
        const objCriarConta = {};
        if (this.state.nome != undefined && this.state.nome.length > 4) {
            objCriarConta.nome = this.state.nome;
        } else {
            Alert.alert('', 'Nome informado invalido');
            return;
        }
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (reg.test(this.state.eMail) === false) {
            Alert.alert('',"Email informado invalido");
            return ;
        }
        else {
            objCriarConta.email = this.state.eMail
        }
        if(this.state.senha != undefined && this.state.senha.length > 5){
            if(this.state.confirmarSenha != undefined && this.state.confirmarSenha == this.state.senha){
                objCriarConta.senha = this.state.senha
            }else{
                Alert.alert('', 'As senhas digitadas não conferem.');
            return;
            } 
        }else{
            Alert.alert('', 'Senha informado invalido');
            return;
        }
        
        Alert.alert('',"Usuario salvo com sucesso");
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
    onChange = (senha, score, { label, labelColor, activeBarColor }) => {
        this.setState({senha: senha})
        console.log(senha, score, { label, labelColor, activeBarColor });
    }
    loginInformacoes() {

        return (
            <View>
                <View style={{
                    backgroundColor: '#0c4361B3', marginHorizontal: 30, shadowColor: '#FFFFFF',
                    margin: 5, borderRadius: 20, borderColor: '#FFFFFF', borderWidth: 1, marginTop: -60
                }}>
                    <View style={styles.UsuarioStyle}>

                        <Icon name='perm-identity' color='white' iconStyle={{ marginStart: 15 }} />
                        <TextInput placeholder='Nome' placeholderTextColor="white" keyboardType={''} value={this.state.nome} style={{ flex: 1, color: "#ffffff", fontSize: 16 }} onChangeText={text => {
                            this.setState({
                                nome: text
                            })
                        }}></TextInput>
                    </View>
                    <View style={styles.EMailStyle}>

                        <Icon name='mail' color='white' iconStyle={{ marginStart: 15 }} />
                        <TextInput placeholder='E-mail' placeholderTextColor="white" keyboardType={''} value={this.state.eMail} style={{ flex: 1, color: "#ffffff", fontSize: 16 }} onChangeText={text => {
                            this.setState({
                                eMail: text
                            })
                        }}></TextInput>
                    </View>
                    {/* <View style={styles.PasswordStyle}>
                        <Icon name='lock' color='white' iconStyle={{ marginStart: 15 }} />
                        <TextInput placeholder='Senha' placeholderTextColor="white" keyboardType={''} value={this.state.senha} secureTextEntry={this.state.hidden} style={{ flex: 1, color: "#ffffff", fontSize: 16 }} onChangeText={text => {
                            this.setState({
                                senha: text
                            })
                        }}></TextInput>
                        <TouchableOpacity onPress={() => this.setpasswordVisible(!this.state.hidden)} style={{ height: 40, justifyContent: 'center', alignContent: 'center' }}>
                            <Icon name={this.mostrarImagem()} color='white' iconStyle={{ marginEnd: 15 }} />
                        </TouchableOpacity>

                    </View> */}
                    <View >
                        <RNPasswordStrengthMeter
                            onChangeText={this.onChange}
                            meterType="box"
                        />
                    </View>
                    <View style={styles.PasswordCStyle}>
                        <Icon name='lock' color='white' iconStyle={{ marginStart: 15 }} />
                        <TextInput placeholder='Confirmação Senha' placeholderTextColor="white" keyboardType={''} value={this.state.confirmarSenha} secureTextEntry={this.state.hidden} style={{ flex: 1, color: "#ffffff", fontSize: 16 }} onChangeText={text => {
                            this.setState({
                                confirmarSenha: text
                            })
                        }}></TextInput>

                        <TouchableOpacity onPress={() => this.setpasswordVisible(!this.state.hidden)} style={{ height: 40, justifyContent: 'center', alignContent: 'center' }}>
                            <Icon name={this.mostrarImagem()} color='white' iconStyle={{ marginEnd: 15 }} />
                        </TouchableOpacity>

                    </View>
                    {/* <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 30, marginTop:40 }}>
                    <ButtonKitEscola onPress={() => Actions.HomePag()} style={{ flex: 1, height: 50, marginHorizontal: 30 }}>
                        <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 18 }}>Login</Text>
                    </ButtonKitEscola>
                    
                </View> */}
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'center', marginVertical: 20 }}>
                    <ButtonKitEscola onPress={() => this.criarConta()} style={{ flex: 1, height: 50, marginHorizontal: 30 }}>
                        <Text style={{ color: '#fff', fontSize: 18 }}>Criar Conta</Text>
                    </ButtonKitEscola>
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

            <ImageBackground source={require('../img/fundo.png')} style={{ flex: 1 }}>


                <View style={{ alignItems: 'center', backgroundColor: '#ffffff1A', marginTop: 20, height: 100 }}>
                    <Image source={require('../img/logo-cointrade.png')} style={{ marginTop: 10, flex: 0.8 }} ></Image>
                </View>
                <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
                >
                    <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center', marginTop: 100 }}>
                        {this.loginInformacoes()}
                    </View>

                </ScrollView>
            </ImageBackground>

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
    UsuarioStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0c436100',
        borderWidth: 0.5,
        borderColor: '#ffffff',
        height: 50,
        borderRadius: 10,
        marginHorizontal: 30,
        marginTop: 35,
    },
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
        marginTop: 35,
        marginBottom: 30
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
        marginVertical: 30,
    },
    PasswordCStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0c436100',
        borderWidth: 0.5,
        borderColor: '#ffffff',
        height: 50,
        borderRadius: 10,
        marginHorizontal: 30,
        marginBottom: 30
    },
    ImageStyle: {
        padding: 10,
        margin: 5,
        height: 25,
        width: 25,
        resizeMode: 'stretch',
        alignItems: 'center',
    }
})


export default connect(mapStateToProps, { atualizarToken, login, resetarBuscar })(CreateAccount)