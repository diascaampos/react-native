import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Actions } from 'react-native-router-flux';

class TabBarNavigator extends Component {
    render() {
        return (<View>
            {this.tabBar()}
        </View>
        );
    }

    constructor(props) {
        super(props);

        this.state = {

        };
    }

    // (this.props.tela === 1?  :  )
    tabBar() {
        return (
            <View style={{flexDirection: 'row', height: 100, alignContent: 'space-around', justifyContent: 'space-around',
                    backgroundColor: '#fff', borderTopColor: "#ccc", borderTopWidth: 0.3, borderRightColor: "#ccc",borderRightWidth: 0.3, 
                    borderLeftColor: "#ccc", borderLeftWidth: 0.3, borderTopLeftRadius: 15, borderTopRightRadius: 15,}}>
                <TouchableOpacity onPress={() => this.props.tela === 1 ? null : Actions.mainScreen()} style={styles.button}>
                    <Image source={this.props.tela === 1 ? require('../img/home1.png') : require('../img/home2.png')} style={{ height: 25, width: 25 }} />

                    <Text style={{ color: this.props.tela === 1 ? "#1472B5" : "#898A8F" }}>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.props.tela === 2 ? null : Actions.Requests()} style={styles.button}>
                    <Image source={ this.props.tela === 2 ? require('../img/pedidos1.png') : require('../img/pedidos2.png')} style={{ height: 25, width: 25 }} />

                    <Text style={{ color: this.props.tela === 2 ? "#1472B5" : "#898A8F" }}>Meus Pedidos</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.props.tela === 3 ? null : Actions.Login()} style={styles.button}>
                    <Image source={ this.props.tela === 3 ? require('../img/login1.png') : require('../img/login2.png')} style={{ height: 25, width: 25 }} />

                    <Text style={{ color: this.props.tela === 3 ? "#1472B5" : "#898A8F" }}>Login</Text>
                </TouchableOpacity>
                {/* <TouchableOpacity onPress={() => this.props.tela === 4 ? null : Actions.configuracao()} style={styles.button}>
                    <Image source={ this.props.tela === 4 ? require('../img/Config2.png') : require('../img/Config1.png')} style={{ height: 25, width: 25 }} />

                    <Text style={{ color: this.props.tela === 4 ? "#1472B5" : "#898A8F" }}>Configuração</Text>
                </TouchableOpacity> */}
            </View>
        );
    }
}
const styles = StyleSheet.create({
    button: {
        marginHorizontal: 10,
        height: 65,
        alignItems: 'center',
        justifyContent: 'space-around'
    }
});

export default (TabBarNavigator)
