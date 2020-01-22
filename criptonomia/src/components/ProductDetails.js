import React, { Component } from 'react';
import { HeaderNavigator } from './HeaderNavigator';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { ButtonKitEscola } from '../StyledGlobal';
import {
    buscarListaItemKit, limparTokenProductDetails, alterStatusLoadingListaItemKit, alterarValorQuantidadeItemListakit,
    alterVisibilidadeBotao, salvarItemCestaServe, alterStatusLoadingProductDetails, salvarIdUsuarioLocal,
    buscarIdUsuarioLocal, salvarIdMobileLocal, buscarIdMobileLocal, alterarStatusMsg
} from '../actions/MainScreenAction';
import { buscarCesta } from '../actions/BasketAction'
import {
    ID_USUARIO, ID_MOBILE
} from '../util/Constants'
import {
    Image,
    Text,
    ScrollView,
    View,
    TouchableOpacity,
    ActivityIndicator,
    AsyncStorage,
    Alert
} from 'react-native';

class ProductDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            idMobile: 0,
            idUsuario: 0,
            isMain: false
        };
        this.handleIconTouch = this.handleIconTouch.bind(this);
    }
    componentWillMount() {

        this.setState({ isMain: this.props.isMain })
        //this._buscarIdCesta();
        if (this.props.kit.tipoProduto === 'K') {
            //this.props.alterStatusLoadingListaItemKit(true);
            this.props.buscarListaItemKit(this.props.kit.idKit, this.props.token);
        }
        if (this.props.kit.tipoProduto === 'P') {
            this.props.alterStatusLoadingListaItemKit(false);

        }
        this.props.navigation.setParams({
            'onLeft': this.handleIconTouch
        })
    }

    handleIconTouch() {
        if (this.state.isMain) {
            this.props.alterarStatusMsg('')
            Actions.mainScreen();
        } else {
            this.props.navigation.goBack()
        }
    }

    componentWillUnmount() {
        // BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }


    handleBackButton = () => {
        // alert('Touched!');
    }

    numberToReal(numero) {
        var numero = numero.toFixed(2).split('.');
        numero[0] = "R$ " + numero[0].split(/(?=(?:...)*$)/).join('.');
        return numero.join(',');
    }

    somarKit() {
        this.props.kit.quantidadeComprada++;
        this.props.kit.valorTotal = this.props.kit.valorKit * this.props.kit.quantidadeComprada
        //this.alterarValoritens();
        this.updateScreen()
    }
    alterarValoritens() {
        if (this.props.listaItensKit.length > 0) {
            for (let itens of this.props.listaItensKit) {
                itens.quantidadeComprada = itens.quantidade * this.props.kit.quantidadeComprada;
                itens.valorTotal = itens.valorKit * itens.quantidadeComprada
            }
        }
    }

    subtrairKit() {
        if (this.props.kit.quantidadeComprada > 1) {
            this.props.kit.quantidadeComprada--
            this.props.kit.valorTotal = this.props.kit.valorKit * this.props.kit.quantidadeComprada
            // this.alterarValoritens();
            this.updateScreen()
            //console.log(this.props.kit);
        }
    }

    somarKitItem(item) {

        for (let itens of this.props.listaItensKit) {
            if (itens.idProduto == item.idProduto) {
                itens.quantidadeComprada++;
                itens.quantidade++;
                itens.valorTotal = item.valorKit * itens.quantidadeComprada
                this.verificarValorDosItensKit()
            }

        }

    }

    subtrairKitItem(item) {
        for (let itens of this.props.listaItensKit) {
            //alert("do loop: "+itens.codigoAuxiliar+" o que chegou: "+item.codigoAuxiliar)
            if (itens.idProduto == item.idProduto) {
                if (itens.quantidadeComprada > 1) {
                    itens.quantidadeComprada--;
                    itens.quantidade--;
                    itens.valorTotal = item.valorKit * itens.quantidadeComprada
                    this.verificarValorDosItensKit()

                }

            }
        }
    }

    verificarValorDosItensKit() {
        let somaDosValores = 0;
        for (let itens of this.props.listaItensKit) {
            somaDosValores += itens.valorTotal;

        }
        this.props.kit.valorKit = somaDosValores;
        somaDosValores = somaDosValores * this.props.kit.quantidadeComprada;
        this.props.kit.valorTotal = somaDosValores;
        //this.props.kit.valorKit = somaDosValores;
        this.updateScreen()
    }

    updateScreen() {
        this.setState({
            updateScreen: ''
        });
    }

    removerItemKit(item) {
        let lista = this.props.listaItensKit;
        lista.splice(lista.indexOf(item), 1);
        this.verificarValorDosItensKit()
    }

    mostrarValorEBotao() {
        if (this.props.mostrarBotaoContinuar) {
            return (
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <View style={{ marginTop: 15, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ display: 'flex', fontWeight: 'bold', fontSize: 28, color: 'red' }}>{this.numberToReal(this.props.kit.valorTotal)}</Text>
                    </View>
                    <ButtonKitEscola onPress={() => { }} style={{ marginVertical: 15, marginHorizontal: 40 }}>
                        <Text style={{ color: '#fff' }}>Adicionar ao Carrinho</Text>
                    </ButtonKitEscola>
                </View>
            )
        }
    }
    // _salvarIdMobile = async () => {
    //     try {
    //         var idMobile = this.gerarIdMobile();
    //         await AsyncStorage.setItem('idMobile', idMobile);
    //         this.setState({ idMobile: idMobile });
    //         //this.props.alterStatusLoadingListaItemKit(false);
    //     } catch (error) {
    //         alert("Não foi possivel connectar 1")
    //     }
    // };

    buscarIdCesta() {
        
    }

    // _buscarIdCesta = async () => {
    //     try {
    //         const valueIdMobile = await AsyncStorage.getItem('idMobile');
    //         //alert("valueidmobile: "+valueIdMobile);
    //         const valueIdUsuario = await AsyncStorage.getItem('idUsuario');
    //         if (valueIdUsuario !== undefined && valueIdUsuario > 0) {

    //             // We have data!!
    //             //alert(valueIdUsuario)
    //             this.setState({idUsuario:valueIdUsuario});

    //         }else if(valueIdMobile !== undefined && valueIdMobile > 0){

    //             //alert("idMobile: "+valueIdMobile);
    //             this.setState({idMobile:valueIdMobile});

    //         }else{
    //             //alert("salvarID");
    //             this._salvarIdMobile();

    //         }
    //     } catch (error) {
    //         alert("Não foi possivel connectar 2"+error)
    //     }
    // };

    enviarProdutoParaCesta() {
        this.props.alterStatusLoadingProductDetails(true);
        if (this.props.listaItensKit != undefined && this.props.listaItensKit.length > 0) {
            this.props.kit.kitVOs = this.props.listaItensKit;
        }
        this.props.kit.idMobile = this.props.idMobile;
        this.props.kit.idUsuario = this.props.idUsuario;
        // console.log(this.props.kit);
        // const kitJson = JSON.stringify(this.props.kit)
        //alert("antes: "+this.props.kit.idParceiro)
        this.props.salvarItemCestaServe(this.props.kit, this.props.token);

        //console.log("antes: "+this.props.kit.idParceiro)
        // if(this.props.itemCestaServe.erro != null || this.props.itemCestaServe.erro != undefined){
        //     alert("aqui"+this.props.itemCestaServe.erro);
        // }

        // this.props.alterListBasket(this.props.kit);
        //this._buscarIdCesta();
        //alert(this.state.idCesta); 

        // if ()
        //     Actions.basket();
    }

    // gerarIdMobile() {
    //     var date = new Date(); //Current Date
    //     var dateTotal = (date.getDate() + "" + (date.getMonth() + 1) + date.getFullYear() +
    //         date.getHours() + date.getMinutes() + date.getSeconds() + date.getMilliseconds())
    //     return (dateTotal)
    // }


    renderScreen() {

        if (this.props.msg != '') {
            Alert.alert(this.props.msg);
            return;
        }

        if (this.props.loadingListaItensKit) {
            return (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size='large' color='#0075BE' />
                </View>

            )
        }
        if (this.props.kit.tipoProduto === 'K') {
            return (
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <ScrollView >
                        <View style={{ flex: 1, justifyContent: 'center' }}>
                            {this.mostrarDetalhesTipoKit()}
                            {this.mostrarLista()}
                        </View>
                    </ScrollView>
                    <View style={{ backgroundColor: '#f8f8f8' }}>
                        <View style={{ marginTop: 10, alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ display: 'flex', fontWeight: 'bold', fontSize: 28, color: '#6f6f6f' }}>{this.numberToReal(this.props.kit.valorTotal)}</Text>
                        </View>
                        <ButtonKitEscola onPress={() => this.enviarProdutoParaCesta()} style={{ marginVertical: 15, marginHorizontal: 40 }}>
                            <Text style={{ color: '#fff' }}>Adicionar a Cesta</Text>
                        </ButtonKitEscola>
                    </View>
                </View>
            )
        }
        return (
            <View style={{ flex: 1 }} >
                {this.mostrarDetalhesTipoKit()}

                <View >
                    <ButtonKitEscola onPress={() => this.enviarProdutoParaCesta()} style={{ marginBottom: 15, marginHorizontal: 40 }}>
                        <Text style={{ color: '#fff' }}>Adicionar a Cesta</Text>
                    </ButtonKitEscola>
                </View>
            </View>
        )

    }
    mostrarDetalhesTipoKit() {
        return (
            <View style={{ flex: 1, backgroundColor: '#fff', margin: 5, borderRadius: 10 }} >
                <View style={{ borderTopLeftRadius: 9, borderTopRightRadius: 9, borderLeftColor: '#8c8c8c', borderRightColor: '#8c8c8c', borderTopColor: '#8c8c8c', borderLeftWidth: 1, borderRightWidth: 1, borderTopWidth: 1 }}>
                    <Image source={{ uri: this.props.kit.url }} style={{ height: 180, borderTopLeftRadius: 8, borderTopRightRadius: 8 }} />
                </View>
                <View style={{ flexDirection: 'column', borderColor: '#8c8c8c', borderWidth: 1 }}>
                    <View style={{ alignItems: 'center', marginTop: 10 }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{this.props.kit.nomeKit}</Text>
                    </View>
                    <Text style={{ fontSize: 16, marginStart: 10 }}>{this.props.kit.descricao}</Text>
                    <Text style={{ fontSize: 13, marginStart: 10, marginTop: 5 }}>{"Código de referencia: " + this.props.kit.codigoAuxiliar}</Text>
                    <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 5, flexDirection: 'row' }}>
                        <TouchableOpacity onPress={() => this.subtrairKit()}>
                            <Image source={require('../img/menos.png')} style={{ height: 30, width: 30, borderRadius: 10 }} />
                        </TouchableOpacity>
                        <Text style={{ display: 'flex', fontSize: 16, marginHorizontal: 10 }}>{"QTD: " + this.props.kit.quantidadeComprada}</Text>
                        <TouchableOpacity onPress={() => this.somarKit()}>
                            <Image source={require('../img/mais.png')} style={{ height: 30, width: 30, borderRadius: 10 }} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ alignItems: 'center', marginTop: 10 }}>
                        <Text style={{ display: 'flex', fontWeight: 'bold', fontSize: 28, color: '#6f6f6f', alignContent: 'center', justifyContent: 'center', marginBottom: 5 }}>{this.numberToReal(this.props.kit.valorTotal)}</Text>
                    </View>
                </View>
            </View>
        );
    }

    mostrarLista() {
        return (
            this.props.listaItensKit.map((item) => (
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
                    <View style={{ flex: 1, flexDirection: 'row' }} key={item.nomeKit}>
                        <Image source={{ uri: item.url }} style={{ margin: 8, height: 100, width: 100, borderRadius: 10, justifyContent: 'center', alignItems: 'center' }} />
                        <View style={{ flex: 1, justifyContent: 'center' }}>
                            <View style={{ flexDirection: 'column', flex: 1, justifyContent: 'center' }}>
                                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{item.nomeKit}</Text>
                                <Text style={{ fontSize: 14 }}>{"Código de referencia: " + item.codigoAuxiliar}</Text>
                                <Text style={{ fontWeight: 'bold', fontSize: 16, color: '#6f6f6f' }}>{"Valor Total: " + this.numberToReal(item.valorTotal)}</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', padding: 10 }}>
                            <TouchableOpacity onPress={() => this.removerItemKit(item)}>
                                <Image source={require('../img/excluir.png')} style={{ height: 25, width: 25, borderRadius: 10 }} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity onPress={() => this.subtrairKitItem(item)}>
                            <Image source={require('../img/menos.png')} style={{ height: 25, width: 25, borderRadius: 10 }} />
                        </TouchableOpacity>
                        <Text style={{ display: 'flex', fontSize: 16, marginTop: 3, marginHorizontal: 5, alignItems: 'center', justifyContent: 'center' }}>{"QTD: " + item.quantidadeComprada}</Text>
                        <TouchableOpacity onPress={() => this.somarKitItem(item)}>
                            <Image source={require('../img/mais.png')} style={{ height: 30, width: 30, borderRadius: 10 }} />
                        </TouchableOpacity>
                    </View>
                </View>
            ))
        )
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
            return (
                <View style={{ flex: 1, backgroundColor: '#fff' }}>
                    <HeaderNavigator />
                    {this.renderScreen()}

                </View>
            )
        }
        return (
            <ActivityIndicator size='large' color='#0075BE' style={{ flex: 1, justifyContent: 'center', alignContent: 'center' }}>
                
            </ActivityIndicator>
        );
    }
}
const mapStateToProps = state => (
    {
        listaItensKit: state.MainScreenReducer.listaItensKit,
        token: state.MainScreenReducer.token,
        msg: state.MainScreenReducer.msg,
        loadingListaItensKit: state.MainScreenReducer.loadingListaItensKit,
        mostrarBotaoContinuar: state.MainScreenReducer.mostrarBotaoContinuar,
        itemListKit: state.MainScreenReducer.itemListKit,
        itemCestaServe: state.MainScreenReducer.itemCestaServe,
        listItensCesta: state.BasketReducer.listItensCesta,
        idUsuario: state.MainScreenReducer.idUsuario,
        isFindIdUsuario: state.MainScreenReducer.isFindIdUsuario,
        isFindIdMobile: state.MainScreenReducer.isFindIdMobile,
        idMobile: state.MainScreenReducer.idMobile
    }
)
export default connect(mapStateToProps, {
    buscarListaItemKit, limparTokenProductDetails, alterStatusLoadingListaItemKit, alterarValorQuantidadeItemListakit, alterVisibilidadeBotao, salvarItemCestaServe,
    alterStatusLoadingProductDetails, salvarIdUsuarioLocal, buscarIdUsuarioLocal, salvarIdMobileLocal, buscarIdMobileLocal,alterarStatusMsg
})(ProductDetails)

