import {
    ATUALIZAR_TOKEN_LOGIN,
    ALTERAR_STATUS_LOGIN_LOADING,
    BUSCAR_TOKEN_LOGIN_SUCESSO,
    BUSCAR_TOKEN_LOGIN_ERRO,
    LOGAR_ERRO,
    LOGIN_SUCESSO
} from '../actions/Types'

const INITIAL_STATE = {
    token: '',
    loadingLogin: false,
    msg:'',
    dadosLogin:[]
}
 
export default (state = INITIAL_STATE, action) =>{

    switch(action.type){

        case ATUALIZAR_TOKEN_LOGIN:{
            return {... state, msg: '', token:action.payload}
        }
        case ALTERAR_STATUS_LOGIN_LOADING:{
            return {... state, msg: '', loadingLogin:action.payload}
        }
        case BUSCAR_TOKEN_LOGIN_SUCESSO:{
            return {... state, msg: '', token:action.payload}
        }
        case BUSCAR_TOKEN_LOGIN_ERRO:{
            return {... state, msg: action.payload, loadingLogin: false}
        }
        case LOGAR_ERRO:{
            return {... state, msg: action.payload, loadingLogin: false}
        }
        case LOGIN_SUCESSO:{
            return {... state, msg: '', dadosLogin: action.payload, loadingLogin: false}
        }
    }  
    return state;
}