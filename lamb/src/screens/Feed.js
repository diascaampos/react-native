import React, {Component} from 'react'
import {StyleSheet, FlatList, View} from 'react-native'
import Header from '../componentes/Header'
import Post from '../componentes/Post'

class Feed extends Component{
    state={
        posts:[{
            id: Math.random(),
            nickname: 'Rafael',
            email: "rafaelp@gmail.com",
            image: require('../../assets/imgs/fence.jpg'),
            comments:[{
                nickname: 'John',
                comment: 'Show!'
            },{
                nickname: 'Julia',
                comment: 'Legal'
            }]
        },{
            id: Math.random(),
            nickname: 'Francisco',
            email: 'chikin@gmail.com',
            image: require('../../assets/imgs/bw.jpg'),
            comments:[]
        }]
    }

    render(){
        return(
            <View style={styles.container}>
                <Header/>
                <FlatList
                    data={this.state.posts}
                    keyExtractor={item => `${item.id}`}
                    renderItem={({item}) =>
                    <Post key={item.id}{...item}/>}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
    }
})

export default Feed