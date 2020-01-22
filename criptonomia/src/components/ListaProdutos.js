import React, {Component} from 'react';
import {HeaderNavigator} from './HeaderNavigator';
import {Text,
  View,
  ActivityIndicator,
  Image,
  ScrollView,
  Platform,
  TouchableOpacity,
  Alert
} from 'react-native';
import {connect} from 'react-redux';
import {buscarTokenListaProdutos, limparTokenListaProduto, buscarKit, buscarKitPorNome, alterStatusLoadingListaProduto, alterarKitBySchool} from '../actions/MainScreenAction';
import {TextInputForm} from '../StyledGlobal';
import {Actions} from 'react-native-router-flux';
class ListaProdutos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      campoPesquisar:'',
      token: '',
      idProduto:'',
      isBuscaTela:false,
      loading: true
      
    };

  } 
  proximaTela(item){
    //alert(''+item)
    Actions.productDetails({kit:item, isMain: false });
    //this.setState({idProduto:item.idKit})
  }

  pesquisar(){
    if(this.state.campoPesquisar === ''){
      alert('O campo de pesquisa é obrigatório!');
      return;
    }
    this.props.buscarKitPorNome(this.state.campoPesquisar, this.props.token);
  }

  lerQRcode() {
    Actions.readBarCode();
  }

  componentWillMount(){
    
    this.props.limparTokenListaProduto();
      if (this.props.campoPesquisar !== undefined && this.props.campoPesquisar !== '') {
        this.props.buscarKitPorNome(this.props.campoPesquisar, this.props.token);
      } else if (this.props.idTipoKit !== undefined) {
        this.props.buscarKit(this.props.idTipoKit, this.props.token);
      }else if(this.props.listKitItens !== undefined){
        this.props.alterarKitBySchool(this.props.listKitItens)
      }
  }

  renderScreen(){
 
    if (this.props.msg != '') {
      Alert.alert(this.props.msg);
      return;
    }

    if (this.props.loadingListaProdutos) {
      return( 
        <View style={{ flex: 1, justifyContent:'center' }}>
          <ActivityIndicator size='large' color='#0075BE' /> 
       </View>
      )
    }
    
    if(this.props.listaKit.length > 0){
      return( 
          <View style={{  backgroundColor:'#fff'}} >
           
          <ScrollView style={{marginBottom:(Platform.OS === 'ios'?20:10)}}>
            {this.mostrarLista()}
          </ScrollView> 
        </View>  
      )
    }else{
      return( 
        <View style={{flex:1, justifyContent:'center', alignItems:'center'}} >
           
          <Text style={{color:'black'}}>Nenhum item encontrado</Text>
        </View>  
      )
    }
  }
  numberToReal(numero) {
    var numero = numero.toFixed(2).split('.');
    numero[0] = "R$ " + numero[0].split(/(?=(?:...)*$)/).join('.');
    return numero.join(',');
  }
  mostrarLista(){
    return(
      this.props.listaKit.map((item) => (
        <TouchableOpacity 
            onPress={() => this.proximaTela(item)}>
          <View style={{flex:1, justifyContent:'center',flexDirection:'row', backgroundColor: '#FFF',
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.22, 
          shadowRadius: 2.22,
        
          elevation: 3,
          margin:2, marginHorizontal:7, borderRadius:5}} key={item.nomeKit}>
            <Image source={{uri:item.url}} style={ {padding: 10, height:100, width:100, margin:5, borderRadius:5}}/>
            <View style={{flexDirection:'column', padding:10, flex:1, justifyContent:'center'}}>
              <Text style={{fontSize:16, fontWeight:'bold'}}>{item.nomeKit}</Text>
              <Text style={{fontSize:14}}>{"Código de referencia:"+item.codigoAuxiliar}</Text>
              <Text style={{fontWeight: 'bold', fontSize:16, color:'#6f6f6f'}}>{this.numberToReal(item.valorKit)}</Text>
            </View>
          </View>
        </TouchableOpacity>
        ))
    )
  }

  render() {
    
    return (
        <View style={{flex:1, backgroundColor:'#fff'}}> 
            <HeaderNavigator/>
            <View style={{ flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
              <TouchableOpacity onPress={() => this.lerQRcode()} >
                <Image source={require('../img/qrCode.png')} style={{width:35, height:35, marginLeft:5}}/>
              </TouchableOpacity> 
              <TextInputForm
                onChangeText={(texto) => {
                  this.setState({campoPesquisar: texto})
              }}
              placeholder='Digite o que deseja ou scaneie o QRcode' style={{margin:5, flex:1}} /> 
              <TouchableOpacity 
                onPress={() => this.pesquisar()}>
                <Image source={require('../img/lupa.png')} style={{width:35, height:35, marginRight:5}}/>
              </TouchableOpacity>
            </View> 
  
              {this.renderScreen()}
             
            
      </View>
    );
}
}

const mapStateToProps = state => (
  {
    listaKitPesquisa: state.MainScreenReducer.listaKitPesquisa,
    listaKit: state.MainScreenReducer.listaKit,
    loadingListaProdutos: state.MainScreenReducer.loadingListaProdutos,
    token: state.MainScreenReducer.token,
    msg: state.MainScreenReducer.msg
  }
)
export default connect(mapStateToProps, {buscarTokenListaProdutos, limparTokenListaProduto, buscarKit, buscarKitPorNome, alterStatusLoadingListaProduto, alterarKitBySchool})(ListaProdutos)