import React, { Component } from 'react';
import {
  Platform,
  Dimensions,
  StyleSheet,
  View,
  Image,
  SafeAreaView, Alert,
  Switch, TextInput
} from 'react-native';
import { Container, Header, Content, Tab, Tabs, Text, TabHeading } from 'native-base';
import { connect } from 'react-redux';
import { Icon } from 'react-native-elements'
import { ALTERAR_STATUS_PRODUCT_DETAILS_LOADING } from '../actions/Types';
import { alterCorComprar, alterCorVender } from '../actions/OrdensAction'
import Toggle from "../util/Toggle"
import { ButtonFundoAzulBordaBranca, ButtonComprar } from '../StyledGlobal';


class Ordens extends Component {
  constructor(props) {
    super(props);
    this.state = {
      corGrafico: '#0a3f5e',
      corNEg: false,
      corOrd: false,
      ref: '',
      keyGrafico: '01',
      alertsIsOn: true,
      valor: 0,
      quantidade: 0,

    }

  }
  alertsToggleHandle(state) {
    this.setState({ alertsIsOn: state })
  }
  mostrarCor(tab) {
    if (tab == '01') {
      this.props.alterCorComprar('#f38d28')
    } else if (tab == '02') {
      this.props.alterCorVender('#f38d28')
    }
  }
  mostrarTabView() {
    return (
      <Container>
        <Tabs initialPage={0}
          tabBarActiveTextColor='#f38d28'
          tabBarUnderlineStyle={{ backgroundColor: '#f38d28' }}
          tabContainerStyle={{ backgroundColor: '#0a3f5e' }}
          onChangeTab={({ ref }) => this.mostrarCor(ref.props.heading.key)}
        >
          <Tab
            heading={
              <TabHeading key="01" style={{ backgroundColor: '#0a3f5e', borderBottomWidth: 4, borderBottomColor: '#fff' }} >
                <Icon name='keyboard-arrow-down' color='#f49021' iconStyle={{ marginTop: 15 }} />
                <Text style={{ color: this.props.corComprar, fontSize: 19, fontWeight: 'bold' }}>Comprar</Text>
              </TabHeading>}>
            <View style={[styles.container, { backgroundColor: 'white' }]}>
              {/* <View style={{ height: 88, width: '100%', flexDirection: 'row', justifyContent: 'space-around', backgroundColor: '#0a3f5e' }}>
                <Text style={{ color: 'white', marginTop: 30, marginStart: 35 }}>Compra rápida</Text>
                <Toggle />
                <Text style={{ color: 'white', marginTop: 30, marginRight: 35 }}>Ordem Limitada</Text>
              </View> */}
              <View style={{ flex: 1, marginVertical: 10, marginHorizontal: 20 }}>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ color: '#b5b5b5', fontSize: 18, marginEnd: 20 }}>Preço</Text>
                  <Text style={{ color: '#b5b5b5', fontSize: 18, marginEnd: 20 }}>R$</Text>
                  <TextInput placeholder='0,00' placeholderTextColor="#b5b5b5" keyboardType={''} value={this.state.valor} style={{ flex: 1, marginStart: -15, marginTop: -8, color: '#b5b5b5', fontSize: 18 }} onChangeText={text => {
                    this.setState({
                      valor: text
                    })
                  }}></TextInput>
                </View>
                <View style={{ height: 2, backgroundColor: '#b5b5b5', marginTop: -10, marginStart: 75 }}></View>
                <View style={{ flex: 0.45, justifyContent: 'space-evenly' }}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                    <Text style={{ color: '#b5b5b5' }}>Último preço     </Text>
                    <Text style={styles.valores}>R$ 29.310,01</Text>
                  </View>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                    <Text style={{ color: '#b5b5b5' }}>Preço de compra</Text>
                    <Text style={styles.valores}>R$ 29.310,01</Text>
                  </View>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                    <Text style={{ color: '#b5b5b5' }}>Preço ofertado   </Text>
                    <Text style={styles.valores}>R$ 29.310,01</Text>
                  </View>
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ color: '#b5b5b5', fontSize: 18 }}>Quantidade</Text>
                  <TextInput placeholder='' placeholderTextColor="#b5b5b5" keyboardType={''} value={this.state.quantidade} style={{ flex: 1, marginStart: 10, marginTop: -8, color: '#b5b5b5', fontSize: 18 }} onChangeText={text => {
                    this.setState({
                      quantidade: text
                    })
                  }}></TextInput>
                  <Text style={{ color: '#b5b5b5', fontSize: 18 }}>BTC</Text>
                </View>
                <View style={{ height: 2, backgroundColor: '#b5b5b5', marginTop: -10, marginStart: 115, marginBottom:10 }}></View>
                <Text style={{ color: '#b5b5b5', fontSize: 18 }}>Total = R$</Text>
              </View>
              <View style={{
                width: '100%', height: 250, position: 'absolute', bottom: 0,
                backgroundColor: '#0a3f5e', justifyContent: 'center', alignItems: 'center'
              }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 20 }}>
                  <ButtonFundoAzulBordaBranca onPress={() => Actions.CreateAccount()} style={{ width: 220, height: 50 }}>
                    <Text style={{ color: '#fff', fontSize: 18, fontWeight:'bold' }}>Usar saldo disponivel</Text>
                  </ButtonFundoAzulBordaBranca>
                  <Text style={{ color: 'white', marginStart: 30, fontSize: 20, fontWeight: 'bold' }}>(R$:)</Text>
                </View>
                <ButtonComprar onPress={() => Actions.CreateAccount()} style={{ width: 380, height: 50 }}>
                  <Text style={{ color: '#fff', fontSize: 18, fontWeight:'bold' }}>Comprar</Text>
                </ButtonComprar>

              </View>
            </View>
          </Tab>

          <Tab
            heading={
              <TabHeading key="02" style={{ backgroundColor: '#0a3f5e', borderBottomWidth: 4, borderBottomColor: '#fff' }} >
                <Icon name='keyboard-arrow-up' color='#f49021' iconStyle={{ marginTop: 15 }} />
                <Text style={{ color: this.props.corVender, fontSize: 19, fontWeight: 'bold' }}>Vender</Text>
              </TabHeading>}>
            {/* <Tab heading="Negociações" tabStyle={{ backgroundColor: '#0a3f5e', borderBottomWidth: 4, borderBottomColor: '#fff' }} textStyle={{ color: '#fff' }} activeTabStyle={{ backgroundColor: '#0a3f5e' }} activeTextStyle={{ color: '#f38d28', fontWeight: 'normal', marginBottom: 4 }}> */}
            <View style={[styles.container, { backgroundColor: '#673ab7' }]}>
              <Text>Aba 2</Text>
            </View>
          </Tab>

        </Tabs>
      </Container>
    );
  }
  renderScreen() {
    // if (this.props.msg != '') {
    //     Alert.alert(this.props.msg);
    // }

    // if (this.props.loadingLogin) {

    //     return (
    //         <View style={{ flex: 1, justifyContent: 'center' }}>
    //             <ActivityIndicator size='large' color='#0075BE' />
    //         </View>
    //     )
    // }
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center' }}>
        {this.mostrarTabView()}
      </View>
    );
  }
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        {/* <HeaderNavigator /> */}
        {/* <View style={{ flex: 8}}> */}
        {this.renderScreen()}
        {/* </View> */}
        {/* <View style={{ flex: 1 }}>
                    <TabBarNavigator
                        tela={this.state.telaAtual} >
                    </TabBarNavigator>
                </View> */}
      </View>
    );
  }
}
const mapStateToProps = state => (
  {

    corComprar: state.OrdensReducer.corComprar,
    corVender: state.OrdensReducer.corVender,

  }
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  valores: {
    alignContent: 'center',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#4764b0',
    padding: 6
  }
});

export default connect(mapStateToProps, { alterCorComprar, alterCorVender })(Ordens);