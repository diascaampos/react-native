import React from 'react'
import { Text } from 'react-native'
import Padrao from '../style/Padrao'
// export default  function (props){
//     return <Text>{props.texto}</Text>
// }

// export default (props) =>{
//     return <Text> Arrow: {props.texto}</Text>
// }

// export default props => [
//     <Text key={1}>Arrow 1: {props.texto}</Text>,
//     <Text key={2}>Arrow 2: {props.texto}</Text>
// ]

export default (props) =>{
    return <Text style={[Padrao.ex]}> Arrow: {props.texto}</Text>
}