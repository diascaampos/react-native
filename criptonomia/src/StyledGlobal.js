import styled from 'styled-components'
import { TextInputMask } from 'react-native-masked-text'

export const ButtonGlobal = styled.TouchableOpacity`
  background-color: #9EC63E;
  height:40;
  justify-content: center;
  align-items: center; 
  border-radius: 20;
`
export const TextInputForm = styled.TextInput.attrs({ placeholderTextColor: "#949499"})`
  background-color: #F6F6F6;
  border-radius: 10;
  border-width: 0.7;
  border-color:#d3d3d3;
  height: 40;
` 

export const TextInputMaskForm = styled(TextInputMask)`
  background-color: #F6F6F6;
  border-radius: 10;
  border-width: 0.7;
  border-color:#d3d3d3;
  height: 40;
` 

export const ButtonKitEscola = styled.TouchableOpacity`
  background-color: #e98c24;
  height:50;
  justify-content: center;
  align-items: center; 
  border-radius: 10;
`
export const ButtonCriarConta = styled.TouchableOpacity`
  background-color: #0c4361B3;
  height:50;
  justify-content: center;
  align-items: center; 
  border-radius: 10;
  border-color: white;
  border-width: 0.8;
`
export const ButtonFundoAzulBordaBranca = styled.TouchableOpacity`
  background-color: #0c4361B3;
  height:50;
  justify-content: center;
  align-items: center; 
  border-radius: 10;
  border-color: white;
  border-width: 2;
`

export const ButtonComprar = styled.TouchableOpacity`
  background-color: #77c68f;
  height:50;
  justify-content: center;
  align-items: center; 
  border-radius: 10;
  border-width: 0.8;
`

export const TextInputFormBordas = styled.TextInput.attrs({ placeholderTextColor: "#949499"})`
  background-color: #F6F6F6;
  border-radius: 10;
  border-width: 0.7;
  border-color:#d3d3d3;
  height: 40;
` 
