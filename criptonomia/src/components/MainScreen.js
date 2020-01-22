import React, { Component } from 'react';
import {
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Image,
  ScrollView,
  Platform,
  SafeAreaView
} from 'react-native';
import Carousel from 'react-native-looped-carousel';
import { HeaderNavigator } from './HeaderNavigator'
// import { LOGIN_TOKEN, PASSWORD_TOKEN, RELATIVE_PATH_SERVER} from '../util/Constants'
import axios from 'axios'
import { connect } from 'react-redux';
import { buscarToken, buscarPromocao, buscarTipoKit, limparToken, alterStatusLoading, buscarProdutosCarrossel } from '../actions/MainScreenAction'
import { TextInputForm } from '../StyledGlobal'
import { Actions } from 'react-native-router-flux';
import TabBarNavigator from '../util/TabBarNavigator'
const { width, height } = Dimensions.get('window');

class MainScreen extends Component {

  constructor(props) {
    super(props);

    this.state = {
      size: { width, height },
      listaItens: [],
      listaTipoKit: [],
      loading: true,
      token: '',
      campoPesquisar: '',
      idTipoKit: '',
      cartao: '',
      telaAtual:1
    };
    // this.lerQRcode = this.lerQRcode.bind(this)
  }

  componentWillMount() {
    //alert('1')
    //this.props.limparToken();
    this.props.buscarPromocao(this.props.token);
    //this.props.buscarToken();
    //this.props.buscarToken();

    //   axios.post(RELATIVE_PATH_SERVER+'/auth/signin',
    //   {
    //     "username": LOGIN_TOKEN,
    //     "password": PASSWORD_TOKEN
    // }
    //   ).then(response => {
    //       this.setState({token: response.data.token})
    //     axios.get(RELATIVE_PATH_SERVER+'/api/kit/v1/promocao',{
    //         headers: {
    //             'Authorization': 'Bearer '+this.state.token,
    //         }
    //      }).then(response => {

    //         this.setState({listaItens: response.data})

    //         axios.get(RELATIVE_PATH_SERVER+'/api/kit/v1/tipoKit',{
    //             headers: {
    //                 'Authorization': 'Bearer '+this.state.token,
    //             }
    //          }).then(response => {
    //             this.setState({listaTipoKit: response.data, loading: false})
    //             console.log(response.data)
    //             alert(this.state.listaTipoKit[0].url)
    //       }).catch((e) =>{
    //         console.log(e);
    //         this.setState({loading: false});
    //         Alert.alert('1Não foi possível conectar com o servidor, verifique sua internet!');
    //       });


    //   }).catch((e) =>{
    //     console.log(e);
    //     this.setState({loading: false});
    //     Alert.alert('1Não foi possível conectar com o servidor, verifique sua internet!');
    //   });


    //   }).catch((e) =>{
    //     console.log(e);
    //     this.setState({loading: false});
    //     Alert.alert('2Não foi possível conectar com o servidor, verifique sua internet!');
    //   });
  }

  proximaTelaPesquisar() {
    if (this.state.campoPesquisar === '') {
      alert('O campo de pesquisa é obrigatório!');
      return;
    }
    //this.props.alterStatusLoading(true);
    Actions.listaProdutos({ campoPesquisar: this.state.campoPesquisar });
  }

  proximaTelaCategoria(item) {

    if (item.siglaTipoKit === 'KTE') {
      Actions.listSchools();
    } else {
      // this.props.alterStatusLoading(true);
      Actions.listaProdutos({ idTipoKit: item.idTipoKit });
    }


  }

  lerQRcode() {
    Actions.readBarCode();
  }

  buscarProdutoCarrossel(idKitCarrossel) {
    this.props.buscarProdutosCarrossel(idKitCarrossel, this.props.token)
    //this.props.alterStatusLoading(true);
  }

  renderScreen() {
    if (this.props.msg != '') {
      Alert.alert(this.props.msg);
      return;
    }
    if (this.props.loading) {
      return (
        <ActivityIndicator size='large' color='#0075BE' />
      )
    }
    return (

      <View style={{ flex: 1, backgroundColor: '#fff', marginTop: 0 }} >
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
          <TouchableOpacity
            onPress={() => this.lerQRcode()}>
            <Image source={require('../img/qrCode.png')} style={{ width: 35, height: 35, marginLeft: 5 }} />
          </TouchableOpacity>
          <TextInputForm
            onChangeText={(texto) => {
              this.setState({ campoPesquisar: texto })
            }}
            placeholder='Digite o que deseja ou scaneie o QRcode' style={{ margin: 5, flex: 1 }} />
          <TouchableOpacity
            onPress={() => this.proximaTelaPesquisar()}>
            <Image source={require('../img/lupa.png')} style={{ width: 35, height: 35, marginRight: 5 }} />
          </TouchableOpacity>
        </View>
        <ScrollView >
          <View style={{ flex: 1, marginBottom:10 }} onLayout={this._onLayoutDidChange}>
            <Carousel

              style={this.state.size}
              delay={5000}
              isLooped={true}
              autoplay={true}
              onAnimateNextPage={p => console.log(p)}
            >
              {this.props.listaPromocao.map((item) => (
                <TouchableOpacity onPress={() => this.buscarProdutoCarrossel(item.idKit)}>
                  <View style={[{ backgroundColor: '#FFF' }, this.state.size]} key={item.nomeKit}>
                    <Image source={{ uri: item.url }} style={[this.state.size, { padding: 5 }]} />
                  </View>
                </TouchableOpacity>
              ))
              }
            </Carousel>
            {this.props.listaTipoKit.map((item) => (
              <TouchableOpacity onPress={() => this.proximaTelaCategoria(item)}
                style={{
                  backgroundColor: '#9EC63E',
                  height: 70,
                  alignItems: 'center',
                  marginTop: 5,
                  marginHorizontal: 5,
                  borderRadius: 5,
                  flexDirection: 'row',
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 1,
                  },
                  shadowOpacity: 0.7,
                  shadowRadius: 2.22,
                  elevation: 3
                }}
                key={item.nomeTipoKit}>
                <Image source={{ uri: item.url }} style={{ width: 50, height: 50, padding: 5, marginLeft: 40 }} />
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', marginRight: 50 }}>
                  <Text style={{ color: 'white', fontSize: 20 }}>{item.nomeTipoKit}</Text>
                </View>
              </TouchableOpacity>
            ))
            }


          </View>
        </ScrollView>

      </View>

    );
  }

  _onLayoutDidChange = e => {
    const layout = e.nativeEvent.layout;
    this.setState({ size: { width: layout.width, height: 250 } });
  };

  render() {

    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
        <HeaderNavigator />
        <View style={{ flex: 8, justifyContent: 'center', alignItems: 'center' }}>
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
}

const mapStateToProps = state => (
  {
    listaPromocao: state.MainScreenReducer.listaPromocao,
    listaTipoKit: state.MainScreenReducer.listaTipoKit,
    loading: state.MainScreenReducer.loading,
    token: state.MainScreenReducer.token,
    msg: state.MainScreenReducer.msg
  }
)
export default connect(mapStateToProps, { buscarToken, buscarPromocao, buscarTipoKit, limparToken, alterStatusLoading, buscarProdutosCarrossel })(MainScreen)