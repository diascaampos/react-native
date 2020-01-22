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
import { listCommitPost } from '../actions/ListPostsCommitAction';
import { Actions } from 'react-native-router-flux';
class ListPostsCommit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: ''
    };

  }
  componentWillMount() {
    this.props.listCommitPost(this.props.postChosen.id)
    this.setState({ id: this.props.postChosen.id })
  }

  renderScreen() {
    console.log(this.props.listPostCommitDados.length)
    if (this.props.msg != '') {
      Alert.alert(this.props.msg);
      return;
    }

    if (this.props.loadingListCommitPost) {
      return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <ActivityIndicator size='large' color='#0075BE' />
        </View>
      )
    }

    if (this.props.listPostCommitDados.length > 0) {
      return (
        <View style={{ backgroundColor: '#fff' }} >

          <ScrollView style={{ marginBottom: (Platform.OS === 'ios' ? 20 : 10) }}>
            {this.mostrarTituloPost()}
            {this.mostrarListaPeloId()}
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
  mostrarTituloPost() {
    return (
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
        margin: 2, marginHorizontal: 10, borderRadius: 7, marginTop:10
      }}>
        <View style={{ flexDirection: 'column', padding: 10, flex: 1, justifyContent: 'center', alignItems:'center' }}>
          <Text style={{ fontSize: 18, color: 'black', fontWeight:'bold' }}>{this.props.postChosen.title}</Text>
        </View>
      </View>
    )
  }
  mostrarListaPeloId() {
    var comentariosPeloIdDoPost = [];
    for (let commit of this.props.listPostCommitDados) {
      //console.log(commit.postId);
      if (commit.postId == this.state.id) {
        comentariosPeloIdDoPost = [...comentariosPeloIdDoPost, commit]
      }
    }
    return (
      comentariosPeloIdDoPost.map((post) => (

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
          margin: 2, marginHorizontal: 20, marginBottom: 10, borderRadius: 5
        }} key={post.id}>
          <View style={{ flexDirection: 'column', padding: 10, flex: 1, justifyContent: 'center' }}>
            <Text style={{ fontSize: 12, fontWeight: 'bold' }}>{post.name}</Text>
            <Text style={{ fontSize: 12, color: '#6f6f6f' }}>{post.email}</Text>
            <Text style={{ fontSize: 16, color: '#6f6f6f' }}>{post.body}</Text>
          </View>
        </View>

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
    listPostCommitDados: state.ListPostsCommitReducer.listPostCommitDados,
    loadingListCommitPost: state.ListPostsCommitReducer.loadingListCommitPost,
    msg: state.ListPostsCommitReducer.msg
  }
)
export default connect(mapStateToProps, { listCommitPost })(ListPostsCommit)