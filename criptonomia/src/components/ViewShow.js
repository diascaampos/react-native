import React, {Component} from 'react';
import {Modal, Text, TouchableHighlight, View, Alert} from 'react-native';

export default class ViewShow extends Component {
  state = {
    modalVisible: false,
  };

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  returnViewShow(){
    <View style={{backgroundColor: '#00ff001C'}}>
    
        <Modal 
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
          >
          <View style={{flex:1,backgroundColor: '#00ff001C'}}>
            <View style={{backgroundColor: '#00ff001C'}}>
              <Text>Hello World!</Text>

              <TouchableHighlight style={{height:45}}
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}>
                <Text style={{fontSize:20}}>Hide Modal</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>
        <TouchableHighlight 
          onPress={() => {
            this.setModalVisible(true);
          }}>
          <Text>Show Modal</Text>
        </TouchableHighlight>
      </View>
  }
  render() {
    return (
      <View>
        {this.returnViewShow()}
      </View>
    );
  }
}