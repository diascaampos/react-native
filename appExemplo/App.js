

import React, { Component } from 'react';
import {
	SafeAreaView,
	StyleSheet,
	ScrollView,
	View,
	Text,
	StatusBar,
} from 'react-native';

import BarraNavegacao from './src/components/BarraNavegacao'

export default class App extends Component {
	render() {
		return (
			<StatusBar
				hidden={true}
			/>
			<BarraNavegacao />
		)
	}
}

const styles = StyleSheet.create({
	
});
