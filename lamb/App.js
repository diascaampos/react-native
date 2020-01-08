
import React, { Component } from 'react';
import Header from './src/componentes/Header'
import {View, Text} from 'react-native'
import Post from './src/componentes/Post'

export default class App extends Component{
	render(){
		const comments = [{
			nickname: 'Joana Elena',
			comment: 'Excelente foto'
		}, {
			nickname: 'Guilherme Dias',
			comment: 'Cara pica'
		}]

		return(
			<View style={{flex: 1}}>
				<Header />
				<Post image={require('./assets/imgs/fence.jpg')} comments={comments}/>
			</View>
		)
  	}
}