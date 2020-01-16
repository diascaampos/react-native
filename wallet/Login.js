import React, {useState, useEffect} from 'react';
import {
	View, 
	KeyboardAvoidingView, 
	Image, 
	Text, 
	TextInput, 
	TouchableOpacity,
	StyleSheet,
	Animated,
	Keyboard,
	ImageBackground
} from 'react-native';
import { create } from 'react-test-renderer';

export default function App(){

	const [offset] = useState(new Animated.ValueXY({x: 0, y: 95}))
	const [opacity] = useState(new Animated.Value(0))	
	const [logo] = useState(new Animated.ValueXY({x: 130, y: 155}))
	
	useEffect(()=>{

		keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', keyboardDidShow)
		keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', keyboardDidHide)

		Animated.parallel([
			Animated.spring(offset.y,{
				toValue: 0,
				speed: 4,
				bounciness: 15
			}),
			Animated.timing(opacity,{
				toValue: 1,
				duration: 200
			})
		]).start()
		
	}, [])

	function keyboardDidShow(){
		Animated.parallel([
			Animated.timing(logo.y,{
				toValue: 80,
				duration: 100
			}),
			Animated.timing(logo.x,{
				toValue: 174,
				duration: 100
			})
		]).start()
	}
	
	function keyboardDidHide(){
		Animated.parallel([
			Animated.timing(logo.y,{
				toValue: 154,
				duration: 100
			}),
			Animated.timing(logo.x,{
				toValue: 340,
				duration: 100
			})
		]).start()
	}

	return(
		<ImageBackground source={require('./imgs/background.png')} style={{flex: 1}}>
			<KeyboardAvoidingView style={styles.background}>
				
				<View style={styles.containerLogo}>
					<Animated.Image 
					style={{
						width: logo.x,
						height: logo.y,
					}}
					source={require('./imgs/logoAzul')}/>
				</View>

				<Animated.View style={[
					styles.container,
					{
						opacity: opacity,
						transform: [
							{ translateY: offset.y}
						]
					}
					
					]}>
					<TextInput 
					style={styles.input} 
					placeholder="Digite seu e-mail" 
					value={this.state.email} 
					onChangeText={email => this.setState({email})}
					/>
					
					<TextInput 
					style={styles.input} 
					placeholder="*******" 
					value={this.state.password}
					onChangeText={password => this.setState({password})}
					/>
					
					<TouchableOpacity style={styles.btnSubmit}>
						<Text style={styles.submitText}>Acessar</Text>
					</TouchableOpacity>

					<TouchableOpacity style={styles.btnRegister}>
						<Text style={styles.registerText}>Criar conta gratuita</Text>
					</TouchableOpacity>
				</Animated.View>
			</KeyboardAvoidingView>
		</ImageBackground>
	)
}

const styles = StyleSheet.create({
	background:{
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	containerLogo:{
		flex: 1,
		justifyContent: 'center'
	},
	container:{
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		width: '90%',
		paddingBottom:50
	},
	input:{
		backgroundColor: '#FFF',
		width: '90%',
		marginBottom: 15,
		color: '#222',
		fontSize: 17,
		borderRadius: 7,
		padding: 10,
	},
	btnSubmit:{
		backgroundColor: '#35AAFF',
		width: '90%',
		height: 45,
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 7
	},
	submitText:{
		color: "#FFF",
		fontSize: 18
	},
	btnRegister:{
		marginTop: 10,
	},
	registerText:{
		color: '#FFF'
	}

})