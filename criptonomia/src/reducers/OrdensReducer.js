import {
    ALTERAR_STATUS_ADDRESS_LOADING,
    MUDAR_COR_COMPRAR,
    MUDAR_COR_VENDER

} from '../actions/Types'

const INITIAL_STATE = {
    loadingAddress: false,
    msg:'',
    corComprar: '#f38d28',
    corVender: '#ffffff',
    imagemComprar: require('../img/Grafico_laranja.png'),
    imagemVender: require('../img/Negociacoes__branca.png'),
    

}
 
export default (state = INITIAL_STATE, action) =>{

switch(action.type){

    case ALTERAR_STATUS_ADDRESS_LOADING:{
        return {... state, msg: '', loadingAddress:action.payload}
    }
    case MUDAR_COR_COMPRAR:{
        return {... state, msg: '', corComprar:action.payload, corVender: '#ffffff'}
    }
    case MUDAR_COR_VENDER:{
        return {... state, msg: '', corComprar:'#ffffff', corVender: action.payload}
    }
    
    
}  
    return state;
}