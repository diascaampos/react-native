import {MODIFICA_EMAIL,
    MODIFICA_SENHA,
    LOGAR_USUARIO, 
    LOGIN_ANDAMENTO,
    LOGAR_ERRO} from '../actions/Types'

const INITIAL_STATE = {
    email: '',
    senha: '',
    array: [],
    loading_login: false,
    is_logado: false,
    msg: ''
}

export default (state = INITIAL_STATE, action) =>{
    if(action.type == MODIFICA_EMAIL){
        return {... state, email: action.payload}
    }
    if(action.type == MODIFICA_SENHA){
        return {... state, senha: action.payload}
    }
    if(action.type == LOGAR_USUARIO){
        return {... state, array: action.payload, loading_login:false, is_logado: true, msg:''}
    }
    if(action.type == LOGIN_ANDAMENTO){
        return {... state, loading_login: true}
    }
    if(action.type == LOGAR_ERRO){
        return {... state, loading_login:false, msg: action.payload}
    }
    return state;
}