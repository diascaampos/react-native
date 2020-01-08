import React, {Component} from 'react'
import{
    StyleSheet,
    Text,
    View,
    Plataform,
    Image
} from 'react-native'
import icon from '../../assets/imgs/logoAzul.png'

class Header extends Component{
    render() {
        return(
            <View style={styles.container}>
                <View style={styles.rowContainer}>
                    <Image source={icon} style={styles.image}/>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        padding: 10,
        borderBottomWidth: 1,
        borderColor: '#888'
    },
    rowContainer:{
        flexDirection: 'row',
        alignItems: 'center'
    },

    image:{
        height: 50,
        width: 180,
        resizeMode: 'contain'
    },
    title:{
        color: '#000',
        fontFamily: 'shelter',
        height: 30,
        fontSize: 28
    }
})

export default Header