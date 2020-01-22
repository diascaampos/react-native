import React, { Component } from 'react';
import {
    View,
    ActivityIndicator,
    Alert,
    TouchableOpacity,
    ScrollView,
    Image,
    AsyncStorage,
    Text,
    Modal,
    TouchableHighlight
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
// import { HeaderNavigator } from './HeaderNavigator'
// import { ViewShow } from './ViewShow'
import {
    alterListBasket, alterarValorPedido, alterarValorTotal, buscarCesta, alterStatusLoading, removerItem,
    tenhoKitNaLista, entregarNaEscola, buscarIdUsuarioLocal, buscarIdMobileLocal, alterarIsbuscarCesta, alterarIsbuscar
} from '../actions/BasketAction'
import { ButtonKitEscola } from '../StyledGlobal';
import {
    ID_USUARIO, ID_MOBILE
} from '../util/Constants'

class Basket extends Component {
    constructor(props) {
        super(props);
        this.state = {
            idUsuario: 0,
            modalVisible: false,
            tenhokit: 'N'
        };
    }

    componentWillMount() {
        this.props.alterarIsbuscar();
        this.props.alterarIsbuscarCesta();
        this.props.navigation.setParams({
            'onLeft': this.handleIconTouch,
            'onRight': this.handleIconTouchRight
        })
    }

    setModalVisible(visible) {
        //console.log("estou no modal: " + visible)
        this.setState({ modalVisible: visible });
    }
    // gerarIdMobile(){
    //     var date = new Date(); //Current Date
    //     var dateTotal = (date.getDate()+""+(date.getMonth()+ 1)+date.getFullYear()+
    //     date.getHours()+date.getMinutes()+date.getSeconds()+date.getMilliseconds())
    //     return(dateTotal)
    // }

    // _salvarIdMobile = async () => {
    //     try {
    //         var idMobile = this.gerarIdMobile();
    //         await AsyncStorage.setItem('idMobile', idMobile);
    //         this.setState({idMobile:idMobile});
    //         //this.props.alterStatusLoadingListaItemKit(false);
    //     } catch (error) {
    //         alert("Não foi possivel connectar 1")
    //     }
    // };

    // _buscarIdCesta = async () => {
    //     try {
    //         const valueIdMobile = await AsyncStorage.getItem('idMobile');
    //         console.log("valueIdMobile dentro de buscarID: " + valueIdMobile)
    //         const valueIdUsuario = await AsyncStorage.getItem('idUsuario');
    //         //console.log("valueIdParceiro dentro de buscarID: " + valueIdParceiro)
    //         if (valueIdUsuario !== undefined && valueIdUsuario > 0) {
    //             //console.log(valueIdParceiro)
    //             this.setState({ idUsuario: valueIdUsuario });
    //             // console.log("idParceiro dentro de buscarID: " + this.state.idUsuario)
    //             this.buscarProdutosCesta(this.state.idUsuario);

    //         } else if (valueIdMobile !== undefined && valueIdMobile > 0) {

    //             //console.log("idMobile: "+valueIdMobile);
    //             this.setState({ idUsuario: valueIdMobile });
    //             // console.log("idMobile dentro de buscarID: " + this.state.idUsuario)
    //             this.buscarProdutosCesta(this.state.idUsuario);
    //         } else {
    //             this._salvarIdMobile();
    //         }
    //     } catch (error) {
    //         alert("Não foi possivel connectar 2" + error)
    //     }
    // };

    buscarProdutosCesta(id) {

        this.props.buscarCesta(id, this.props.token);
    }

    calcularValorCesta() {
        let valorCesta = 0;
        let tenhokit = 'N';
        for (let itens of this.props.listItensCesta) {
            valorCesta += itens.valorTotal;
            if (itens.tipoProduto == 'K') {
                tenhokit = 'S';

            }
        }
        this.props.tenhoKitNaLista(tenhokit);
        this.props.alterarValorPedido(valorCesta);
        this.props.alterarValorTotal(valorCesta);
    }

    handleIconTouch() {
        //Alert.alert('teste back teste')

        Actions.mainScreen();
    }

    handleIconTouchRight() {
        //Alert.alert('teste back teste')

        Actions.Login();
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
    numberToReal(numero) {
        var numero = numero.toFixed(2).split('.');
        numero[0] = "R$ " + numero[0].split(/(?=(?:...)*$)/).join('.');
        return numero.join(',');
    }

    editarEndereco() {
        Actions.address({ basket: this.props.listItensCesta });
    }

    removerItemKit(itemBasket) {

        // if (this.props.idUsuario != undefined && this.props.idUsuario > 0) {
        //     this.props.removerItem(itemBasket.idItem, this.props.idUsuario, this.props.token);
        // } else 
        if (this.props.idMobile != undefined && this.props.idMobile > 0) {
            this.props.removerItem(itemBasket.idItem, this.props.idMobile, this.props.token);
        }

    }
    mostrarLista() {

        return (
            this.props.listItensCesta.map((itemBasket) => (
                <View style={{
                    flex: 1, justifyContent: 'center', flexDirection: 'column', backgroundColor: '#FFF',
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 1,
                    },
                    shadowOpacity: 0.22,
                    shadowRadius: 2.22,

                    elevation: 3,
                    margin: 5, marginHorizontal: 10, borderRadius: 5, borderColor: '#CCC', borderWidth: 1
                }}>
                    <View style={{ flex: 1, flexDirection: 'row' }} key={itemBasket.nomeKit}>
                        <Image source={{ uri: itemBasket.url }} style={{ margin: 8, height: 70, width: 70, borderRadius: 10, justifyContent: 'center', alignItems: 'center' }} />
                        <View style={{ flex: 1, justifyContent: 'center' }}>
                            <View style={{ flexDirection: 'column', flex: 1, justifyContent: 'center' }}>
                                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{itemBasket.nomeKit}</Text>
                                {/* <Text style={{fontSize:14}}>{"Código de referencia: "+itemBasket.codigoAuxiliar}</Text> */}
                                <Text style={{ fontSize: 14 }}>{"Quantidade: " + itemBasket.quantidadeComprada}</Text>
                                {/* <Text style={{ fontWeight: 'bold', fontSize: 15, color:'#6f6f6f' }}>{this.numberToReal(itemBasket.valorTotal)}</Text> */}
                            </View>
                        </View>
                        <View style={{ flexDirection: 'column', justifyContent: 'space-between', padding: 10 }}>

                            <TouchableOpacity style={{ alignItems: 'flex-end' }} onPress={() => this.removerItemKit(itemBasket)}>
                                <Image source={require('../img/excluir.png')} style={{ height: 25, width: 25, borderRadius: 10 }} />
                            </TouchableOpacity>

                            <Text style={{ fontWeight: 'bold', fontSize: 15, color: '#6f6f6f' }}>{this.numberToReal(itemBasket.valorTotal)}</Text>
                        </View>
                    </View>
                    {/* <View style={{flexDirection:'row'}}>
                        <TouchableOpacity onPress={() => {}}>
                            <Image source={require('../img/menos.png')} style={ {height:25, width:25, borderRadius:10}}/>
                        </TouchableOpacity>
                        <Text style={{display:'flex', fontSize:16, marginTop:3, marginHorizontal:5, alignItems:'center', justifyContent:'center'}}>{"QTD: "+itemBasket.quantidadeComprada}</Text>
                        <TouchableOpacity onPress={() => {}}>
                            <Image source={require('../img/mais.png')} style={ {height:30, width:30, borderRadius:10}}/>
                        </TouchableOpacity>
                    </View> */}
                </View>
            ))
        )


        // return (
        //     this.props.listItensCesta.map((itemBasket) => (

        //         <View style={{
        //             flex: 1, justifyContent: 'center', flexDirection: 'row', backgroundColor: '#FFF',
        //             shadowColor: "#000",
        //             shadowOffset: {
        //                 width: 0,
        //                 height: 1,
        //             },
        //             shadowOpacity: 0.22,
        //             shadowRadius: 2.22,

        //             elevation: 3,
        //             margin: 2, marginHorizontal: 7, borderRadius: 5
        //         }} key={itemBasket.nomeKit}>
        //             <Image source={{ uri: itemBasket.url }} style={{ padding: 10, height: 100, width: 100, margin: 5, borderRadius: 5 }} />
        //             <View style={{ flexDirection: 'column', padding: 10, flex: 1, justifyContent: 'center' }}>
        //                 <Text style={{ fontSize: 16 }}>{itemBasket.nomeKit}</Text>
        //                 <Text style={{ fontSize: 14 }}>{"Código de referencia:" + itemBasket.codigoAuxiliar}</Text>
        //                 <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{this.numberToReal(itemBasket.valorKit)}</Text>
        //             </View>
        //         </View>
        //     ))

        // )
    }
    entregarNaEscola(escolhido) {
        this.setModalVisible(!this.state.modalVisible);
        this.props.entregarNaEscola(escolhido);
        Actions.address({ itensCesta: this.props.listItensCesta });
    }
    mostrarModel() {
        //console.log('estou no mostra model :'+this.props.tenhoKit)
        if (this.state.modalVisible && this.props.tenhoKit == 'S') {
            return (
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.modalVisible}

                >
                    <View style={{ height: 200, backgroundColor: '#f0f0f0', padding: 20, position: 'absolute', bottom: 0, borderTopColor: '#ccc', borderTopWidth: 2 }}>
                        <TouchableOpacity style={{ alignItems: 'center', marginTop: -30 }} onPress={() => this.setModalVisible(!this.state.modalVisible)}>
                            <Image source={require('../img/seta.png')} style={{ height: 25, width: 25 }} />
                        </TouchableOpacity>
                        <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 30 }}>
                            <Text style={{ fontSize: 20 }}>Gostaria de entregar os seus kits na escola?</Text>
                            <View style={{ flexDirection: 'row', marginVertical: 30 }}>
                                <ButtonKitEscola onPress={() => this.entregarNaEscola('S')} style={{ marginHorizontal: 7, width: 150 }}>
                                    <Text style={{ color: '#fff' }}>Sim</Text>
                                </ButtonKitEscola>
                                <ButtonKitEscola onPress={() => this.entregarNaEscola('N')} style={{ marginHorizontal: 7, width: 150 }}>
                                    <Text style={{ color: '#fff' }}>Não</Text>
                                </ButtonKitEscola>
                            </View>
                        </View>
                    </View>
                </Modal>
            )
        }
    }
    mostrarSeTiverKit() {
        if (this.props.tenhoKit == 'S') {
            return (
                <ButtonKitEscola onPress={() => this.setModalVisible(!this.state.modalVisible)} style={{ marginVertical: 10, marginHorizontal: 40 }}>
                    <Text style={{ color: '#fff' }}>Calcular Frete</Text>
                </ButtonKitEscola>
            )
        } else {
            // if(this.props.idUsuario != undefined && this.props.idUsuario > 0){
            //     return (
            //         <ButtonKitEscola onPress={() => Actions.Payment()} style={{ marginVertical: 10, marginHorizontal: 40 }}>
            //             <Text style={{ color: '#fff' }}>Pagamento</Text>
            //         </ButtonKitEscola>
            //     )
            // }else{
            return (
                <ButtonKitEscola onPress={() => Actions.address({ itensCesta: this.props.listItensCesta })} style={{ marginVertical: 10, marginHorizontal: 40 }}>
                    <Text style={{ color: '#fff' }}>Calcular Frete</Text>
                </ButtonKitEscola>
            )
            //}
        }
    }
    renderScreen() {
        if (this.props.msg != '') {
            Alert.alert(this.props.msg);
            if (this.props.listItensCesta.length === 0) {
                return;
            }
        }
        if (this.props.loadingBasket) {
            return (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size='large' color='#0075BE' />
                </View>
            )
        } else if (this.props.listItensCesta.length > 0) {
            return (
                <View style={{ flex: 1 }}>
                    {/* <View style={{
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
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontWeight: 'bold' }}>Calcular Frete</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View style={{ marginStart: 10, marginVertical: 10 }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text>Cep: </Text>
                                    <Text>{this.props.cep}</Text>
                                    <Text style={{ marginLeft: 20 }}>Valor: </Text>
                                    <Text style={{ color: 'red', fontWeight: 'bold' }}>{this.numberToReal(this.props.valorFrete)}</Text>
                                </View>
                                <Text>Quando? até {this.props.diasUteis} dia úteis</Text>
                            </View>
                            <TouchableOpacity onPress={() => this.editarEndereco()}>
                                <Text style={{ color: 'red', fontWeight: 'bold', margin: 10 }}>editar</Text>
                            </TouchableOpacity>
                        </View>

                    </View> */}
                    <ScrollView style={{ flex: 1 }}>
                        {this.mostrarLista()}
                        {this.calcularValorCesta()}
                        {this.mostrarModel()}

                    </ScrollView>
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
                                {/* <Text style={{display:'flex', fontSize:12, color:'black'}}>Valor Frete:</Text>
                                <Text style={{display:'flex', fontSize:12, color:'black'}}>Valor Pedido:</Text> */}
                                <Text style={{ display: 'flex', fontSize: 16, color: '#6f6f6f' }}>Total:</Text>
                            </View>
                            <View>
                                {/* <Text style={{display:'flex',fontWeight: 'bold', fontSize:12, color:'red'}}>{this.numberToReal(this.props.valorFrete)}</Text>
                                <Text style={{display:'flex',fontWeight: 'bold', fontSize:12, color:'red'}}>{this.numberToReal(this.props.valorPedido)}</Text> */}
                                <Text style={{ display: 'flex', fontWeight: 'bold', fontSize: 20, color: '#6f6f6f' }}>{this.numberToReal(this.props.valorTotal)}</Text>
                            </View>
                        </View>
                        {this.mostrarSeTiverKit()}
                    </View>
                </View>

            )
        } else {
            return (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >

                    <Text style={{ color: 'black' }}>Você não possui nenhum item na cesta</Text>
                </View>
            )
        }
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
        // else if (this.props.idUsuario != undefined && this.props.idUsuario > 0 && this.props.isBuscarCesta == false) {
        //     this.buscarProdutosCesta(this.props.idUsuario);
        // } 
        else if (this.props.idMobile != undefined && this.props.idMobile > 0 && this.props.isBuscarCesta == false) {
            console.log("3")
            console.log(this.props.idMobile)
            this.buscarProdutosCesta(this.props.idMobile);
        }else if(this.props.idMobile == 0 && this.props.idUsuario == 0 && this.props.isBuscarCesta == false){
            return (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >

                    <Text style={{ color: 'black' }}>Você não possui nenhum item na cesta</Text>
                </View>
            )
        }

        // else if (this.props.isFindIdMobile && this.props.isFindIdUsuario && this.props.idMobile === 0) {
        //     var idMobile = this.gerarIdMobile();
        //     this.props.salvarIdMobileLocal(idMobile, ID_MOBILE);
        //     console.log("3")
        // } 

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
        listItensCesta: state.BasketReducer.listItensCesta,
        loadingBasket: state.BasketReducer.loadingBasket,
        msg: state.BasketReducer.msg,
        valorPedido: state.BasketReducer.valorPedido,
        valorTotal: state.BasketReducer.valorTotal,
        valorFrete: state.AddressReducer.valorFrete,
        cep: state.AddressReducer.cep,
        diasUteis: state.AddressReducer.diasUteis,
        tenhoKit: state.BasketReducer.tenhoKit,
        token: state.BasketReducer.token,
        idUsuario: state.BasketReducer.idUsuario,
        isFindIdUsuario: state.BasketReducer.isFindIdUsuario,
        isFindIdMobile: state.BasketReducer.isFindIdMobile,
        idMobile: state.BasketReducer.idMobile,
        isBuscarCesta: state.BasketReducer.isBuscarCesta
    }
)

export default connect(mapStateToProps, {
    alterListBasket, alterarValorPedido, alterarValorTotal, buscarCesta,
    alterStatusLoading, removerItem, tenhoKitNaLista, entregarNaEscola, buscarIdUsuarioLocal, buscarIdMobileLocal, alterarIsbuscarCesta,
    alterarIsbuscar
})(Basket)