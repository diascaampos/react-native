import React, { Component } from 'react';
import {
  Text,
  View,
  ActivityIndicator,
  Image,
  ScrollView,
  Platform,
  TouchableOpacity,
  Alert
} from 'react-native';
import { connect } from 'react-redux';
import { listPost } from '../actions/ListPostsAction';
import { TextInputForm } from '../StyledGlobal';
import { Actions } from 'react-native-router-flux';
class ListPosts extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };

  }
  comentariosPost(post) {
    //alert(''+item)
    Actions.ListPostsCommit({ postChosen : post});
    //this.setState({idProduto:item.idKit})
  }
  componentWillMount() {
    this.props.listPost();
  }

  renderScreen() {
    console.log(this.props.listPostDados.length)
    if (this.props.msg != '') {
      Alert.alert(this.props.msg);
      return;
    }

    if (this.props.loadingListPost) {
      return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <ActivityIndicator size='large' color='#0075BE' />
        </View>
      )
    }

    if (this.props.listPostDados.length > 0) {
      
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

          <Text style={{ color: 'black' }}>Nenhum item encontrado</Text>
        </View>
      )
    }
  }
  mostrarLista() {
    return (
      this.props.listPostDados.map((post) => (
        <TouchableOpacity
          onPress={() => this.comentariosPost(post)}>
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
            margin: 2, marginHorizontal: 10, marginBottom:10, borderRadius: 5
          }} key={post.id}>
            <View style={{ flexDirection: 'column', padding: 10, flex: 1, justifyContent: 'center' }}>
              <View style={{flexWrap:'nowrap',alignItems:'center'}}>
              <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{post.title}</Text>
              </View>
              <Text style={{ fontSize: 14, color: '#6f6f6f' }}>{post.body}</Text>
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
    listPostDados: state.ListPostsReducer.listPostDados,
    loadingListPost: state.ListPostsReducer.loadingListPost,
    msg: state.ListPostsReducer.msg
  }
)
export default connect(mapStateToProps, { listPost })(ListPosts)