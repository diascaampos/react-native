import React, { Component } from 'react'

import{ View, Image } from 'react-native'

class Topo extends Component{
	render(){
		return(
			<View style={{width: '100%'}}>
				<Image source={require('../../imgs/jokenpo.png')} />
			</View>
		)
	}
}

export default Topo