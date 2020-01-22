import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  Alert,
  Vibration,
  TouchableOpacity,
  Image
} from 'react-native';
import { RNCamera } from 'react-native-camera';
import { Actions } from 'react-native-router-flux';
import {connect} from 'react-redux';
import {buscarProdutos,alterStatusBarCodeScanLoading} from '../actions/MainScreenAction'

 class BarcodeScan extends Component {
  constructor(props) {
    super(props);
    this.handleTourch = this.handleTourch.bind(this);
    this.state = {
      torchOn: false,
      isLerQrCode: true
    }

  }

  componentWillMount(){
    this.props.alterStatusBarCodeScanLoading(false);
  }

  onBarCodeRead = (e) => {
    
    //Alert.alert('Codigo Auxiliar: '+e.data)

    if (this.state.isLerQrCode) {
      //alert('this.state.isLerQrCode')
      this.setState({ isLerQrCode: false })
      Vibration.vibrate(300)  
      this.props.buscarProdutos(e.data);
     
      

     // Actions.productDetails({ kit:  this.props.itenKit})
     //Alert.alert(this.props.itenKit )
      
   }

  }
  lerQRcode(){
    Actions.mainScreen();
  }
  renderScreen() {

    if (this.props.msg != '') {
      Alert.alert(this.props.msg);
      return;
    }
    
    if (this.props.loadingBuscarProduto) {
      //alert('entrei')
      return( 
        <View style={{ flex: 1, justifyContent:'center' }}>
          <ActivityIndicator size='large' color='#0075BE' /> 
       </View>
      )
    }


    if (this.state.isLerQrCode) {

      return (
        
        <View style={styles.container}>


          <RNCamera
            style={styles.preview}
            torchMode={this.state.torchOn ? RNCamera.Constants.FlashMode.on : RNCamera.Constants.FlashMode.off}
            onBarCodeRead={this.onBarCodeRead}
            ref={cam => this.camera = cam}
            aspect={RNCamera.Constants.aspect}
          >
            {/* <Text style={{
              backgroundColor: 'white', marginBottom: 30
            }}>BARCODE SCANNER</Text> */}
          </RNCamera>


          <View style={styles.bottomOverlay}>
            <TouchableOpacity onPress={() => this.lerQRcode()}>
              <Image style={styles.cameraIcon}
                source={(Platform.OS === 'ios'?require('../img/back-ios.png'):require('../img/back-android.png'))}
              />
            </TouchableOpacity>
          </View>
        </View>
      )
   }
    
   

  }

  render() {

    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>

            {this.renderScreen()}

        </View>
    );
}
  //isBarcodeRead = false;
  handleTourch(value) {
    if (value === true) {
      this.setState({ torchOn: false });
    } else {
      this.setState({ torchOn: true });
    }
  }
}


const mapStateToProps = state => (
  {
    itenKit: state.MainScreenReducer.itenKit,
    loadingBuscarProduto: state.MainScreenReducer.loadingBuscarProduto,
    token: state.MainScreenReducer.token,
    msg: state.MainScreenReducer.msg
  }
)


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  cameraIcon: {
    margin: 10,
    height: 40,
    width: 40,
    backgroundColor: '#1472B5',
    borderRadius: 50
  },
  bottomOverlay: {
    position: "absolute",
    width: "100%",
    display: 'flex',
    flexDirection: "row",
    justifyContent: "flex-start"
  },
});


export default connect(mapStateToProps, {buscarProdutos, alterStatusBarCodeScanLoading})(BarcodeScan)