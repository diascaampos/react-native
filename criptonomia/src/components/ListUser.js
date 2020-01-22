import React, { Component } from 'react';
import {
  Text,
  View,
  ActivityIndicator,
  Modal,
  ScrollView,
  Platform,
  Image,
  TouchableOpacity,
  Alert,
  Dimensions
} from 'react-native';
import { connect } from 'react-redux';
import { listUser, svUser, svAddress, svCompany } from '../actions/ListUserAction';
import { ButtonListaUsuarios } from '../StyledGlobal';
import { Actions } from 'react-native-router-flux';
class ListUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      infUser: [],
      address: []

    };

  }
  comentariosPost(post) {

    //alert(''+item)
    // Actions.ListPostsCommit({ postChosen : post});
    //this.setState({idProduto:item.idKit})
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  setModalVisibleEObj(visible, post) {
    this.props.svUser(post);
    this.props.svAddress(post.address);
    this.props.svCompany(post.company);
    this.setState({ modalVisible: visible })

  }

  componentWillMount() {
    this.props.listUser();
  }
  imformacoesDaEmpresa(){
    Alert.alert("","nome: "+this.props.companySave.name+"\n"+
                "catchPhrase: "+this.props.companySave.catchPhrase+"\n"+
                "bs: "+this.props.companySave.bs)
  }
  mostrarModel() {
    // var company = this.props.userSave.company;
    //console.log(this.props.userSave.company)
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.state.modalVisible}

      >
        <View style={{ height: 280, width: '100%', backgroundColor: '#f0f0f0', padding: 20, position: 'absolute', bottom: 0, borderTopColor: '#ccc', borderTopWidth: 2 }}>
          <TouchableOpacity style={{ alignItems: 'center', marginTop: -30 }} onPress={() => this.setModalVisible(!this.state.modalVisible)}>
            <Image source={require('../img/seta.png')} style={{ height: 25, width: 25 }} />
          </TouchableOpacity>
          <View style={{ flexDirection: 'column', justifyContent: 'center'}}>
           <Text style={{ fontSize: 16 }}>{"nome: "+this.props.userSave.name}</Text>
            <Text style={{ fontSize: 16  }}>{"usuario: @" + this.props.userSave.username}</Text>
            <Text style={{ fontSize: 1 }}>{"e-mail: "+this.props.userSave.email}</Text>
            <Text style={{ fontSize: 16 }}>{"site: "+this.props.userSave.website}</Text>
            <Text style={{ fontSize: 16}}>{"telefone: "+this.props.userSave.phone}</Text>
            <Text style={{ fontSize: 16 }}>{"nome empresa: "+this.props.companySave.name}</Text>
            

            <Text style={{ fontSize: 1 }}>{"rua: "+this.props.addressSave.street}</Text>
            <Text style={{ fontSize: 16 }}>{"ap: "+this.props.addressSave.suite}</Text>
            <Text style={{ fontSize: 16}}>{"cidade: "+this.props.addressSave.city}</Text>
            <Text style={{ fontSize: 16 }}>{"cep: "+this.props.addressSave.zipcode}</Text>

            <TouchableOpacity
              onPress={() => this.imformacoesDaEmpresa()}>
              <Text style={{ fontSize: 16, fontWeight:'bold', color: '#0d0d58' }}>Informações da Empresa</Text>
            </TouchableOpacity>

            {/* <Text style={{ fontSize: 20 }}>{this.props.addressSave.city}</Text>

            <View style={{ flexDirection: 'row', marginVertical: 30 }}>
              <ButtonListaUsuarios onPress={() => this.entregarNaEscola('S')} style={{ marginHorizontal: 7, width: 150 }}>
                <Text style={{ color: '#fff' }}>Sim</Text>
              </ButtonListaUsuarios>
              <ButtonListaUsuarios onPress={() => this.entregarNaEscola('N')} style={{ marginHorizontal: 7, width: 150 }}>
                <Text style={{ color: '#fff' }}>Não</Text>
              </ButtonListaUsuarios>
            </View> */}
          </View>
        </View>
      </Modal>
    )

  }

  renderScreen() {
    console.log(this.props.listUserDados.length)
    if (this.props.msg != '') {
      Alert.alert(this.props.msg);
      return;
    }

    if (this.props.loadingListUser) {
      return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <ActivityIndicator size='large' color='#0075BE' />
        </View>
      )
    }

    if (this.props.listUserDados.length > 0) {

      return (
        <View style={{ backgroundColor: '#fff' }} >

          <ScrollView style={{ marginBottom: (Platform.OS === 'ios' ? 20 : 10) }}>
            {this.mostrarLista()}
            {this.mostrarModel()}
          </ScrollView>
        </View>
      )
    } else {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >

          <Text style={{ color: 'black' }}>Nenhum item encontrado</Text>
        </View>
      )
    }
  }
  mostrarLista() {
    return (
      this.props.listUserDados.map((post) => (
        <TouchableOpacity
          onPress={() => this.setModalVisibleEObj(!this.state.modalVisible, post)}>
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
            margin: 2, marginHorizontal: 10, marginBottom: 10, borderRadius: 5
          }} key={post.id}>
            <View style={{ flexDirection: 'column', padding: 10, flex: 1, justifyContent: 'center' }}>
              <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{post.name}</Text>
              <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{"@" + post.username}</Text>
              <Text style={{ fontSize: 14, color: '#6f6f6f' }}>{post.email}</Text>
            </View>
          </View>
        </TouchableOpacity>
      ))
    )
  }

  render() {

    return (
      <View style={{ flex: 1, backgroundColor: '#fff' }}>

        {this.renderScreen()}

      </View>
    );
  }
}

const mapStateToProps = state => (
  {
    loadingListUser: state.ListUserReducer.loadingListUser,
    listUserDados: state.ListUserReducer.listUserDados,
    msg: state.ListUserReducer.msg,
    userSave: state.ListUserReducer.userSave,
    addressSave: state.ListUserReducer.addressSave,
    companySave: state.ListUserReducer.companySave
  }
)
export default connect(mapStateToProps, { listUser, svUser, svAddress, svCompany })(ListUser)