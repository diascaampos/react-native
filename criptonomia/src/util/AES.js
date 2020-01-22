import { NativeModules, Platform } from 'react-native'
var Aes = NativeModules.Aes

import {KEY, IV} from './Constants'

const generateKey = (password, salt, cost, length) => Aes.pbkdf2(password, salt, cost, length)
 
export const  encrypt = async (text, state) => {
    try {
        generateKey(KEY, 'salt', 65536, 256).then(key => {
            encryptLocal(text, key)
                .then(({ cipher, iv }) => {
                    console.log('Encrypted:', cipher)
                    state.setState({cartao:cipher}) 
                    alert(state.cartao)
                }).catch(function(error) {
                    console.log('There has been a problem with your fetch operation: ' + error.message);
                    });
                
        })
    } catch (e) {
        console.error(e)
    }
      
   
}

const encryptLocal = (text, key) => {
        var iv = IV
        return Aes.encrypt(text, key, iv).then(cipher => ({
            cipher,
            iv,
        }))
    
}