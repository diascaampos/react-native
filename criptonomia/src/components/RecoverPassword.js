import React, { Component } from 'react';
import {
    View,
    ActivityIndicator,
    Alert,
    ScrollView,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { HeaderNavigator } from './HeaderNavigator'
import { ButtonKitEscola, TextInputFormBordas } from '../StyledGlobal';
import { atualizarToken, login } from '../actions/LoginAction'

class RecoverPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            eMail: '',
            senha: '',
            idUsuario: '',
            hidden: true
        }
    }
    componentWillMount() {
        this.props.atualizarToken(this.props.tokenAddress)
        // this.setState({ idUsuario: this.props.idMobile })
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
    setpasswordVisible(visible) {
        this.setState({ hidden: visible });
    }
    mostrarImagem() {
        if (this.state.hidden) {
            return (
                require('../img/ocultar2.png')
            )
        } else {
            return (
                require('../img/mostrar.png') 
            )
        }
    }
    login() {
        const objLogin = {
            "email": this.state.eMail,
            "senha": this.state.senha,
            "cServico": this.props.objInformacoes.objInformacoes.cServico,
            "endereco": this.props.objInformacoes.objInformacoes.endereco, 
            "isEntregarCorreio": this.props.entregarNaEscola,
            "idMobile": this.props.idMobile,
            "idUsuario": this.props.objInformacoes.idUsuario ? 0 : 0
        }
        // console.log(objLogin)
        // console.log("o que chegou")
        // console.log(this.props.objInformacoes)
        this.props.login(objLogin, this.props.token)
    }
    loginInformacoes() {
        return (
            <View style={{
                flex: 0.5, backgroundColor: 'white', marginHorizontal: 10, shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,

                elevation: 5,
                margin: 3, borderRadius: 5, borderColor: '#CCC', borderEndWidthWidth: 1
            }}>
                
                <View style={{ flexDirection: 'column', margin: 5, marginTop: 20 }}>
                    <View style={{  alignItems:'center', marginVertical: 10 }}>
                    <Text style={{ color: '#808080', fontSize: 15}}>Informe o e-mail que deseja criar outra senha</Text>
                    </View>
                    <TextInputFormBordas placeholder='E-mail' keyboardType={''} value={this.state.eMail} style={{ flex: 1, color: "#808080" }} onChangeText={text => {
                        this.setState({
                            eMail: text
                        })
                    }}></TextInputFormBordas>
                </View>
                <View style={{ flexDirection: 'row', margin: 5 }}>
                    <TextInputFormBordas placeholder='Senha' keyboardType={''} value={this.state.senha} secureTextEntry={this.state.hidden} style={{ flex: 1, color: "#808080" }} onChangeText={text => {
                        this.setState({
                            senha: text
                        })
                    }}></TextInputFormBordas>
                    <TouchableOpacity onPress={() => this.setpasswordVisible(!this.state.hidden)} style={{ height: 40, justifyContent: 'center', alignContent: 'center' }}>
                        <Image source={this.mostrarImagem()} style={{ height: 30, width: 30, borderRadius: 10 }} />
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row', margin: 15, justifyContent: 'center', marginVertical: 20 }}>
                    <ButtonKitEscola onPress={() => this.login()} style={{ flex: 0.4, height: 40 }}>
                        <Text style={{ color: '#fff' }}>Modificar Senha</Text>
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
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={{ marginBottom: (Platform.OS === 'ios' ? 20 : 10) }}>
                <View style={{ flexWrap: "nowrap", justifyContent: 'center', alignContent: 'center', marginTop: 50 }}>
                    {this.loginInformacoes()}
                </View>
            </ScrollView>
        );
    }

    render() {

        return (
            <View style={{ flex: 1, backgroundColor: '#fff' }}>

                <View style={{ flex: 1 }}>
                    {this.renderScreen()}

                </View>
            </View>
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

})


export default connect(mapStateToProps, { atualizarToken, login })(RecoverPassword)