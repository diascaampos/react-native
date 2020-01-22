import {
    ALTERAR_STATUS_ADDRESS_LOADING,
    MUDAR_COR_GRAFICO,
    MUDAR_COR_ORDENS,
    MUDAR_COR_NEGOCIACOES

} from '../actions/Types'

const INITIAL_STATE = {
    loadingAddress: false,
    msg:'',
    corGrafico: '#f38d28',
    corNegociacoes: '#ffffff',
    corOrdens: '#ffffff',
    imagemGrafico: require('../img/Grafico_laranja.png'),
    imagemNegociacoes: require('../img/Negociacoes__branca.png'),
    imagemOrdens: require('../img/Ordens__branca.png')

}
 
export default (state = INITIAL_STATE, action) =>{

switch(action.type){

    case ALTERAR_STATUS_ADDRESS_LOADING:{
        return {... state, msg: '', loadingAddress:action.payload}
    }
    case MUDAR_COR_GRAFICO:{
        return {... state, msg: '', corGrafico:action.payload, imagemGrafico: require('../img/Grafico_laranja.png'), 
        imagemOrdens: require('../img/Ordens__branca.png'), imagemNegociacoes:require('../img/Negociacoes__branca.png'),
         corNegociacoes: '#ffffff', corOrdens:'#ffffff'}
    }
    case MUDAR_COR_ORDENS:{
        return {... state, msg: '', corGrafico:'#ffffff', imagemGrafico: require('../img/Grafico_branco.png'), 
        imagemOrdens: require('../img/Ordens__laranja.png'), imagemNegociacoes:require('../img/Negociacoes__branca.png') ,corNegociacoes: '#ffffff', corOrdens:action.payload}
    }
    case MUDAR_COR_NEGOCIACOES:{
        return {... state, msg: '', corGrafico:'#ffffff', imagemGrafico: require('../img/Grafico_branco.png'), 
        imagemOrdens: require('../img/Ordens__branca.png'), imagemNegociacoes:require('../img/Negociacoes__laranja.png') , corNegociacoes: action.payload, corOrdens:'#ffffff'}
    }
    
}  
    return state;
}