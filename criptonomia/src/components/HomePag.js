import React, { Component } from 'react';
import {
    Platform,
    Dimensions,
    StyleSheet,
    View,
    Image,
    SafeAreaView, Alert
} from 'react-native';
import { Container, Header, Content, Tab, Tabs, Text, TabHeading } from 'native-base';
import { connect } from 'react-redux';
import { Icon } from 'react-native-elements'
import { ALTERAR_STATUS_PRODUCT_DETAILS_LOADING } from '../actions/Types';
import { alterCorGrafico, alterCorNegociacoes, alterCorOrdens } from '../actions/HomePagAction'
import Ordens from '../components/Ordens'


class HomePag extends Component {
    constructor(props) {
        super(props);
        this.state = {
            corGrafico: '#0a3f5e',
            corNEg: false,
            corOrd: false,
            ref: '',
            keyGrafico: '01',
        }

    }
    mostrarCor(tab) {
        if (tab == '01') {
            this.props.alterCorGrafico('#f38d28')
        } else if (tab == '02') {
            this.props.alterCorNegociacoes('#f38d28')
        } else if (tab == '03') {
            this.props.alterCorOrdens('#f38d28')

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
                                {/* {this.setState({corGrafico : !this.state.corGrafico})} */}
                                <Image source={this.props.imagemGrafico} style={{ height: 15, width: 15, marginEnd: 5 }} ></Image>
                                <Text style={{ color: this.props.corGrafico }}>Gráfico</Text>
                            </TabHeading>}>
                        <View style={[styles.container, { backgroundColor: '#ccc' }]}>

                            <Text>Aba 1</Text>
                        </View>
                    </Tab>

                    <Tab
                        heading={
                            <TabHeading key="02" style={{ backgroundColor: '#0a3f5e', borderBottomWidth: 4, borderBottomColor: '#fff' }} >
                                {/* {this.setState({corOrd : !this.state.corOrd})} */}
                                <Image source={this.props.imagemNegociacoes} style={{ height: 15, width: 15, marginEnd: 5 }} ></Image>
                                <Text style={{ color: this.props.corNegociacoes }}>Negociações</Text>
                            </TabHeading>}>
                        {/* <Tab heading="Negociações" tabStyle={{ backgroundColor: '#0a3f5e', borderBottomWidth: 4, borderBottomColor: '#fff' }} textStyle={{ color: '#fff' }} activeTabStyle={{ backgroundColor: '#0a3f5e' }} activeTextStyle={{ color: '#f38d28', fontWeight: 'normal', marginBottom: 4 }}> */}
                        <View style={[styles.container, { backgroundColor: '#673ab7' }]}>
                            <Text>Aba 2</Text>
                        </View>
                    </Tab>

                    <Tab
                        heading={
                            <TabHeading key="03" style={{ backgroundColor: '#0a3f5e', borderBottomWidth: 4, borderBottomColor: '#fff' }} >
                                {/* {this.setState({corGrafico : !this.state.corGrafico})} */}
                                <Image source={this.props.imagemOrdens} style={{ height: 15, width: 15, marginEnd: 5 }} ></Image>
                                <Text style={{ color: this.props.corOrdens }}>Ordens</Text>
                            </TabHeading>}>
                            <Ordens/>
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
                <View style={{ flex: 0.08, flexDirection: 'row' }}>
                    <Icon name='keyboard-arrow-down' color='#f49021' iconStyle={{ marginStart: 15, marginTop: 15 }} />
                    <Image source={require('../img/BTC.png')} style={{ height: 25, width: 25, marginTop: 5, marginStart: 10 }} />
                    <View style={{ flexDirection: 'column', marginStart:10 }}>
                        <Text style={{fontSize:19, fontWeight:'bold'}}>Bitcoin (BTC)</Text>
                        <Text style={{fontSize:15, color:'#cococo'}}>0.00000018</Text>
                    </View>
                    <View style={{ flex: 0.8, alignItems:'flex-end'}}>
                    <Image source={require('../img/logo-cointrade.png')} style={{ height: 50, width: 120 }} />
                    </View>
                </View>
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
        corGrafico: state.HomePagReducer.corGrafico,
        imagemGrafico: state.HomePagReducer.imagemGrafico,
        corNegociacoes: state.HomePagReducer.corNegociacoes,
        imagemNegociacoes: state.HomePagReducer.imagemNegociacoes,
        corOrdens: state.HomePagReducer.corOrdens,
        imagemOrdens: state.HomePagReducer.imagemOrdens,
    }
)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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
});

export default connect(mapStateToProps, { alterCorGrafico, alterCorNegociacoes, alterCorOrdens })(HomePag);