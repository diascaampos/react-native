import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { Router, Scene } from 'react-native-router-flux';
import MainScreen from './src/components/MainScreen';
import ListaProdutos from './src/components/ListaProdutos';
import RNCameraClass from './src/components/RNCameraClass';
import BarcodeScan from './src/components/BarcodeScan';
import ProductDetails from './src/components/ProductDetails';
import { Platform } from 'react-native';
import ListSchools from './src/components/ListSchools';
import Basket from './src/components/Basket';
import Address from './src/components/Address';
import ViewShow from './src/components/ViewShow';
import Login from './src/components/Login';
import CreateAccount from './src/components/CreateAccount';
import Payment from './src/components/Payment';
import RecoverPassword from './src/components/RecoverPassword';
import Requests from './src/components/Requests';
import TimeLine from './src/components/TimeLine';
import HomePag from './src/components/HomePag';
import SubLogin from './src/components/SubLogin'

class Routes extends Component {

    render() {
        return (
            <Router>

                <Scene key="root" navBarButtonColor='#FFF' navigationBarStyle={{
                    backgroundColor: '#1472B5', hight: 70, elevation: 0, shadowOpacity: 0, borderBottomWidth: 0
                }}>
                    <Scene key='mainScreen' component={MainScreen} title='Olá Cliente'
                        titleStyle={{ color: 'white', flex: 1, textAlign: 'center', justifyContent: 'center', }}
                        onLeft={() => { }}
                        leftTitle=' '
                        onRight={() => Actions.basket()}
                        // leftTitle=' teste'
                        rightButtonImage={require('./src/img/basket.png')}

                    />

                    <Scene key='listaProdutos' component={ListaProdutos} title='Lista de Produtos'
                        titleStyle={(Platform.OS === 'ios' ? { color: 'white', flex: 1, textAlign: 'center' } :
                            { color: 'white', flex: 1, textAlign: 'center', justifyContent: 'center', marginStart: -40 })}
                    />

                    <Scene key='camera' component={RNCameraClass} title='Camera'
                        titleStyle={(Platform.OS === 'ios' ? { color: 'white', flex: 1, textAlign: 'center' } :
                            { color: 'white', flex: 1, textAlign: 'center', justifyContent: 'center', marginStart: -40 })}
                    />

                    <Scene key='readBarCode' component={BarcodeScan} title='Codigo de Barras' hideNavBar
                        titleStyle={(Platform.OS === 'ios' ? { color: 'white', flex: 1, textAlign: 'center' } :
                            { color: 'white', flex: 1, textAlign: 'center', justifyContent: 'center', marginStart: -40 })}
                    />

                    <Scene key='productDetails' component={ProductDetails} title='Detalhes do Produto'
                        titleStyle={(Platform.OS === 'ios' ? { color: 'white', flex: 1, textAlign: 'center' } :
                            { color: 'white', flex: 1, textAlign: 'center', justifyContent: 'center', marginStart: -40 })}
                        onLeft={() => { }}
                        // leftTitle=' teste'
                        leftButtonImage={(Platform.OS === 'ios' ? require('./src/img/back-ios.png') : require('./src/img/back-android.png'))}
                    />

                    <Scene key='listSchools' component={ListSchools} title='Lista de Escolas'
                        titleStyle={(Platform.OS === 'ios' ? { color: 'white', flex: 1, textAlign: 'center' } :
                            { color: 'white', flex: 1, textAlign: 'center', justifyContent: 'center', marginStart: -40 })}
                    />

                    <Scene key='basket' component={Basket} title='Cesta'
                        titleStyle={(Platform.OS === 'ios' ? { color: 'white', flex: 1, textAlign: 'center' } :
                            { color: 'white', flex: 1, textAlign: 'center', justifyContent: 'center', marginStart: -40 })}
                        onLeft={() => { }}
                        //leftTitle= ""
                        leftButtonImage={require('./src/img/plus_plus.png')}
                        rightTitle="Login"
                    />

                    <Scene key='address' component={Address} title='Endereço de Entrega'
                        titleStyle={(Platform.OS === 'ios' ? { color: 'white', flex: 1, textAlign: 'center' } :
                            { color: 'white', flex: 1, textAlign: 'center', justifyContent: 'center', marginStart: -40 })}
                    />

                    <Scene key='ViewShow' component={ViewShow} title='ViewShow'
                        titleStyle={(Platform.OS === 'ios' ? { color: 'white', flex: 1, textAlign: 'center' } :
                            { color: 'white', flex: 1, textAlign: 'center', justifyContent: 'center', marginStart: -40 })}
                    />
                    <Scene key='Login' component={Login} title='Login' hideNavBar
                        titleStyle={(Platform.OS === 'ios' ? { color: 'white', flex: 1, textAlign: 'center' } :
                            { color: 'white', flex: 1, textAlign: 'center', justifyContent: 'center' })} 
                    />

                    <Scene key='HomePag' component={HomePag} title='' hideNavBar
                        titleStyle={(Platform.OS === 'ios' ? { color: 'white', flex: 1, textAlign: 'center' } :
                            { color: 'white', flex: 1, textAlign: 'center', justifyContent: 'center' })}initial
                    />

                    <Scene key='CreateAccount' component={CreateAccount} title='Cadastro' hideNavBar
                        titleStyle={(Platform.OS === 'ios' ? { color: 'white', flex: 1, textAlign: 'center' } :
                            { color: 'white', flex: 1, textAlign: 'center', justifyContent: 'center', marginStart: -40 })}
                    />

                    <Scene key='Payment' component={Payment} title='Pagamento'
                        titleStyle={(Platform.OS === 'ios' ? { color: 'white', flex: 1, textAlign: 'center' } :
                            { color: 'white', flex: 1, textAlign: 'center', justifyContent: 'center', marginStart: -40 })}
                        onLeft={() => { }}
                        // leftTitle=' teste'
                        leftButtonImage={(Platform.OS === 'ios' ? require('./src/img/back-ios.png') : require('./src/img/back-android.png'))}
                    />
                    <Scene key='RecoverPassword' component={RecoverPassword} title='Recuperar Senha'
                        titleStyle={(Platform.OS === 'ios' ? { color: 'white', flex: 1, textAlign: 'center' } :
                            { color: 'white', flex: 1, textAlign: 'center', justifyContent: 'center', marginStart: -40 })}
                    />
                    <Scene key='Requests' component={Requests} title='Meus pedidos'
                        titleStyle={(Platform.OS === 'ios' ? { color: 'white', flex: 1, textAlign: 'center' } :
                            { color: 'white', flex: 1, textAlign: 'center', justifyContent: 'center', marginStart: -40 })}
                    />
                    <Scene key='TimeLine' component={TimeLine} title=''
                        titleStyle={(Platform.OS === 'ios' ? { color: 'white', flex: 1, textAlign: 'center' } :
                            { color: 'white', flex: 1, textAlign: 'center', justifyContent: 'center', marginStart: -40 })}
                    />
                    <Scene key='SubLogin' component={SubLogin} title='' hideNavBar
                        titleStyle={(Platform.OS === 'ios' ? { color: 'white', flex: 1, textAlign: 'center' } :
                            { color: 'white', flex: 1, textAlign: 'center', justifyContent: 'center', marginStart: -40 })}
                    />
                    
                    
                </Scene>

            </Router>
        );
    };
}


export default Routes