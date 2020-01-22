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
    SafeAreaView 
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { ButtonKitEscola, TextInputFormBordas } from '../StyledGlobal';
import { ID_USUARIO, ID_MOBILE } from '../util/Constants'
import { TextInputMask } from 'react-native-masked-text';
import { buscarIdUsuarioLocal, buscarIdMobileLocal } from '../actions/RequestsAction'
import  TabBarNavigator  from '../util/TabBarNavigator'

class Requests extends Component {
    constructor(props) {
        super(props);
        this.listateste = [
            {
                "idKit": 1,
                "ativo": "S",
                "dataAlteracao": "2019-11-27T11:21:23.000+0000",
                "dataCadastro": "2019-11-27T11:21:20.000+0000",
                "isPromocao": "S",
                "nomeKit": "Caneta Bic Azul",
                "descricao": "Caneta esferográfica",
                "peso": 0.09,
                "quantidade": 99,
                "quantidadeComprada": 1,
                "tipoProduto": "P",
                "valorKit": 20.0,
                "valorTotal": 20.0,
                "codigoAuxiliar": "1",
                "mostrarLinha": "false",
                "url": "http://192.168.0.13:8080/file/v1/downloadFile/caneta_bic_banner.png",
                "tipoKit": {
                    "idTipoKit": 1,
                    "nomeTipoKit": "Para Escrever",
                    "ordenar": 7,
                    "siglaTipoKit": "PAE",
                    "url": "http://192.168.0.13:8080/file/v1/downloadFile/para_escrever.png",
                    "links": []
                },
                "data": [
                    {
                        "time": '09:00',
                        "title": 'Archery Training',
                        "description": 'The Beginner Archery and Beginner Crossbow course does not require you to bring any equipment, since everything you need will be provided for the course. ',

                        "icon": 'https://i.ibb.co/fXJmS0N/bolinha-azul.png',
                        "imageUrl": 'https://cloud.githubusercontent.com/assets/21040043/24240340/c0f96b3a-0fe3-11e7-8964-fe66e4d9be7a.jpg'
                    }
                    ,
                    // {
                    //     'time': '10:45',
                    //     'title': 'Play Badminton',
                    //     'description': 'Badminton is a racquet sport played using racquets to hit a shuttlecock across a net.',
                    //     'icon': 'http://192.168.0.13:8080/file/v1/downloadFile/para_escrever.png',
                    //     'imageUrl': 'https://cloud.githubusercontent.com/assets/21040043/24240405/0ba41234-0fe4-11e7-919b-c3f88ced349c.jpg'
                    // },
                    // {
                    //     time: '12:00',
                    //     title: 'Lunch',
                    //     icon: require('../img/mais.png'),
                    // },
                    // {
                    //     time: '14:00',
                    //     title: 'Watch Soccer',
                    //     description: 'Team sport played between two teams of eleven players with a spherical ball. ',
                    //     lineColor: '#009688',
                    //     icon: require('../img/menos.png'),
                    //     imageUrl: 'https://cloud.githubusercontent.com/assets/21040043/24240419/1f553dee-0fe4-11e7-8638-6025682232b1.jpg'
                    // },
                    // {
                    //     time: '16:30',
                    //     title: 'Go to Fitness center',
                    //     description: 'Look out for the Best Gym & Fitness Centers around me :)',
                    //     icon: require('../img/mais.png'),
                    //     imageUrl: 'https://cloud.githubusercontent.com/assets/21040043/24240422/20d84f6c-0fe4-11e7-8f1d-9dbc594d0cfa.jpg'
                    // }
                ],
                "comprimento": 30.0,
                "altura": 10.0,
                "largura": 10.0,
                "diametro": 5.0,
                "categoria": "OTHER_CATEGORIES",
                "links": [
                    {
                        "rel": "self",
                        "href": "http://192.168.0.13:8080/api/kit/v1/1"
                    }
                ]
            },
            {
                "idKit": 3,
                "ativo": "S",
                "dataAlteracao": "2019-11-27T11:25:16.000+0000",
                "dataCadastro": "2019-11-27T11:25:14.000+0000",
                "isPromocao": "S",
                "nomeKit": "Borracha",
                "descricao": "Borracha com proteção plástica",
                "peso": 0.05,
                "quantidade": 210,
                "quantidadeComprada": 1,
                "tipoProduto": "P",
                "valorKit": 20.0,
                "valorTotal": 20.0,
                "codigoAuxiliar": "3",
                "mostrarLinha": "false",
                "url": "http://192.168.0.13:8080/file/v1/downloadFile/borracha_banner.png",
                "tipoKit": {
                    "idTipoKit": 1,
                    "nomeTipoKit": "Para Escrever",
                    "ordenar": 7,
                    "siglaTipoKit": "PAE",
                    "url": "http://192.168.0.13:8080/file/v1/downloadFile/para_escrever.png",
                    "links": []
                },
                "data": [
                    {
                        "time": '09:00',
                        "title": 'Archery Training',
                        "description": 'The Beginner Archery and Beginner Crossbow course does not require you to bring any equipment, since everything you need will be provided for the course. ',
                        "icon": 'https://i.ibb.co/fXJmS0N/bolinha-azul.png',
                        "imageUrl": 'https://cloud.githubusercontent.com/assets/21040043/24240340/c0f96b3a-0fe3-11e7-8964-fe66e4d9be7a.jpg'
                    }
                    ,
                    {
                        'time': '10:45',
                        'title': 'Play Badminton',
                        'description': 'Badminton is a racquet sport played using racquets to hit a shuttlecock across a net.',
                        'icon': 'https://i.ibb.co/5chmhSS/com-fundo-verde-carrinho-branco-Copia.png',
                        'imageUrl': 'https://cloud.githubusercontent.com/assets/21040043/24240405/0ba41234-0fe4-11e7-919b-c3f88ced349c.jpg'
                    },
                    // {
                    //     time: '12:00',
                    //     title: 'Lunch',
                    //     icon: require('../img/mais.png'),
                    // },
                    // {
                    //     time: '14:00',
                    //     title: 'Watch Soccer',
                    //     description: 'Team sport played between two teams of eleven players with a spherical ball. ',
                    //     lineColor: '#009688',
                    //     icon: require('../img/menos.png'),
                    //     imageUrl: 'https://cloud.githubusercontent.com/assets/21040043/24240419/1f553dee-0fe4-11e7-8638-6025682232b1.jpg'
                    // },
                    // {
                    //     time: '16:30',
                    //     title: 'Go to Fitness center',
                    //     description: 'Look out for the Best Gym & Fitness Centers around me :)',
                    //     icon: require('../img/mais.png'),
                    //     imageUrl: 'https://cloud.githubusercontent.com/assets/21040043/24240422/20d84f6c-0fe4-11e7-8f1d-9dbc594d0cfa.jpg'
                    // }
                ],
                "comprimento": 30.0,
                "altura": 10.0,
                "largura": 10.0,
                "diametro": 6.5,
                "categoria": "OTHER_CATEGORIES",
                "links": [
                    {
                        "rel": "self",
                        "href": "http://192.168.0.13:8080/api/kit/v1/3"
                    }
                ]
            },
            {
                "idKit": 4,
                "ativo": "S",
                "dataAlteracao": "2019-11-27T11:27:23.000+0000",
                "dataCadastro": "2019-11-27T11:27:22.000+0000",
                "isPromocao": "S",
                "nomeKit": "Caixa de Lápis Faber Castel 24 Cores",
                "descricao": "Caixa de Lápis de madeira",
                "peso": 1.0,
                "quantidade": 18,
                "quantidadeComprada": 1,
                "tipoProduto": "P",
                "valorKit": 25.0,
                "valorTotal": 25.0,
                "codigoAuxiliar": "4",
                "mostrarLinha": "false",
                "url": "http://192.168.0.13:8080/file/v1/downloadFile/fabercastell_banner.png",
                "tipoKit": {
                    "idTipoKit": 1,
                    "nomeTipoKit": "Para Escrever",
                    "ordenar": 7,
                    "siglaTipoKit": "PAE",
                    "url": "http://192.168.0.13:8080/file/v1/downloadFile/para_escrever.png",
                    "links": []
                },
                "data": [
                    {
                        "time": '09:00',
                        "title": 'Archery Training',
                        "description": 'The Beginner Archery and Beginner Crossbow course does not require you to bring any equipment, since everything you need will be provided for the course. ',
                        "icon": 'https://i.ibb.co/fXJmS0N/bolinha-azul.png',
                        "imageUrl": 'https://cloud.githubusercontent.com/assets/21040043/24240340/c0f96b3a-0fe3-11e7-8964-fe66e4d9be7a.jpg'
                    }
                    ,
                    {
                        'time': '10:45',
                        'title': 'Play Badminton',
                        'description': 'Badminton is a racquet sport played using racquets to hit a shuttlecock across a net.',
                        'icon': 'https://i.ibb.co/5chmhSS/com-fundo-verde-carrinho-branco-Copia.png',
                        'imageUrl': 'https://cloud.githubusercontent.com/assets/21040043/24240405/0ba41234-0fe4-11e7-919b-c3f88ced349c.jpg'
                    },
                    // {
                    //     time: '12:00',
                    //     title: 'Lunch',
                    //     icon: require('../img/mais.png'),
                    // },
                    // {
                    //     time: '14:00',
                    //     title: 'Watch Soccer',
                    //     description: 'Team sport played between two teams of eleven players with a spherical ball. ',
                    //     lineColor: '#009688',
                    //     icon: require('../img/menos.png'),
                    //     imageUrl: 'https://cloud.githubusercontent.com/assets/21040043/24240419/1f553dee-0fe4-11e7-8638-6025682232b1.jpg'
                    // },
                    // {
                    //     time: '16:30',
                    //     title: 'Go to Fitness center',
                    //     description: 'Look out for the Best Gym & Fitness Centers around me :)',
                    //     icon: require('../img/mais.png'),
                    //     imageUrl: 'https://cloud.githubusercontent.com/assets/21040043/24240422/20d84f6c-0fe4-11e7-8f1d-9dbc594d0cfa.jpg'
                    // }
                ],
                "comprimento": 30.0,
                "altura": 10.0,
                "largura": 10.0,
                "diametro": 10.0,
                "categoria": "OTHER_CATEGORIES",
                "links": [
                    {
                        "rel": "self",
                        "href": "http://192.168.0.13:8080/api/kit/v1/4"
                    }
                ]
            }
        ]
        this.state = {
            idUsuario: '',
            valorTotal: 0,
            telaAtual:2
        }
    }
    componentWillMount() {
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
    valorTotal() {
        let valor = 0;
        for (let itens of this.props.listItensCesta) {
            valor += itens.valorTotal;
        }
        var value = parseFloat(this.props.cServico.valor.replace(",", "."));
        valor += value;
        var arredondado = parseFloat(valor.toFixed(2));
        this.setState({ valorTotal: arredondado })
    }

    mostrarLinhaDoTempo(item) {
        Actions.TimeLine({ item: item })
    }
    mostrarLista() {
        return (
            this.listateste.map((item) => (
                <TouchableOpacity
                    onPress={() => this.mostrarLinhaDoTempo(item)}>
                    <View style={{
                        flex: 1, justifyContent: 'center', flexDirection: 'row', backgroundColor: '#FFF',
                        shadowColor: "#000",
                        shadowOffset: {
                            width: 0,
                            height: 1,
                        },
                        shadowOpacity: 0.22,
                        shadowRadius: 2.22,

                        elevation: 3,
                        margin: 2, marginHorizontal: 7, borderRadius: 5
                    }}>
                        <Image source={{ uri: "https://www.google.com/url?sa=i&source=images&cd=&ved=2ahUKEwi-o5W7vvHmAhUnIrkGHVHIDWwQjRx6BAgBEAQ&url=https%3A%2F%2Fwww.tilibraexpress.com.br%2Fcaderno-espiral-capa-dura-universitario-20-materias-capricho-400-folhas&psig=AOvVaw3PRQH-Qe1M4NRgZbt2sPYW&ust=1578486465301048" }} style={{ padding: 10, height: 100, width: 100, margin: 5, borderRadius: 5 }} />
                        <View style={{ flexDirection: 'column', padding: 10, flex: 1, justifyContent: 'center' }}>
                            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Titulo Pedido</Text>
                            <Text style={{ fontSize: 14 }}>{"Código de referencia: 000111521355214"}</Text>
                            <Text style={{ fontWeight: 'bold', fontSize: 16, color: '#6f6f6f' }}>{"R$ 100,00"}</Text>
                        </View>
                    </View>
                </TouchableOpacity>

            ))
        )
    }
    renderScreen() {
        if (this.props.msg != '') {
            Alert.alert(this.props.msg);
            return;
        }

        if (this.props.loadingListaProdutos) {
            return (
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <ActivityIndicator size='large' color='#0075BE' />
                </View>
            )
        }

        if (this.props.listaPedidos.length == 0) {
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

                    <Text style={{ color: 'black' }}>Nenhum pedido encontrado</Text>
                </View>
            )
        }
    }
    onEventPress(data) {
        this.setState({ selected: data })
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

                <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
                    <View style={{ flex: 8 }}>
                        {this.renderScreen()}
                    </View>
                    <View style={{ flex: 1 }}>
                        <TabBarNavigator
                            tela={this.state.telaAtual} >
                        </TabBarNavigator>
                    </View>
                </SafeAreaView>
            );
        }
        return (
            <ActivityIndicator size='large' color='#0075BE' style={{ flex: 1, justifyContent: 'center', alignContent: 'center' }}>

            </ActivityIndicator>
        );
    }
}

const mapStateToProps = state => (
    {
        token: state.RequestsReducer.token,
        loadingRequest: state.RequestsReducer.loadingRequest,
        msg: state.RequestsReducer.msg,
        listaPedidos: state.RequestsReducer.listaPedidos,
        valorTotal: state.RequestsReducer.valorTotal,
        isFindIdUsuario: state.RequestsReducer.isFindIdUsuario,
        idUsuario: state.RequestsReducer.idUsuario,
        idMobile: state.RequestsReducer.idMobile,
        isFindIdMobile: state.RequestsReducer.isFindIdMobile
    }
)

export default connect(mapStateToProps, { buscarIdUsuarioLocal, buscarIdMobileLocal })(Requests)