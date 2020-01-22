import React, { Component } from 'react';
import {View, Text, Platform} from "react-native";

export class HeaderNavigator extends Component{

    returnHeader(){
        if(Platform.OS === 'ios'){
            return(
                <View style={{height:30, marginTop:-1, backgroundColor:'#1472B5', borderBottomLeftRadius:15, borderBottomRightRadius:15}}/>
            )
        }
        return(
            <View>
                 <Text style={{height:30, marginTop:-1, backgroundColor:'#1472B5', borderBottomLeftRadius:15, borderBottomRightRadius:15}}/>
            </View>
        )
    }
    render(){
        return(<View>
            {this.returnHeader()}
            </View>
        );
    }
}

