import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

import Simples from './componentes/Simples'
import ParImpar from './componentes/ParImpar'
import {Inverter, MegaSena} from './componentes/Multi'

export default class App extends React.Component{
  render() {
    return (
      <View style={styles.container}>
        <Simples texto="Flexível!!"/>
        <ParImpar numero={21}/>
        <Inverter texto='React Native'/>
        <MegaSena numero={6}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  f20:{
    fontSize: 40
  }
})
