import {
    ATUALIZAR_TOKEN_CREATE_ACCOUNT,
    ALTERAR_STATUS_LOGIN_CREATE_ACCOUNT,
    CADASTRAR_USUARIO_SUCESSO,
    CADASTRAR_USUARIO_ERRO,
    BUSCAR_TOKEN_CREATE_ACCOUNT_ERRO,
    BUSCAR_TOKEN_CREATE_ACCOUNT_SUCESSO,
    ATUALIZAR_MSG
} from '../actions/Types'

const INITIAL_STATE = {
    token: '',
    loadingCreateAccount: false,
    msg:'',
    dadosUsuario: {}
}
 
export default (state = INITIAL_STATE, action) =>{

    switch(action.type){

        case ATUALIZAR_TOKEN_CREATE_ACCOUNT:{
            return {... state, msg: '', token:action.payload}
        }
        case ALTERAR_STATUS_LOGIN_CREATE_ACCOUNT:{
            return {... state, msg: '', loadingCreateAccount:action.payload}
        }
        case BUSCAR_TOKEN_CREATE_ACCOUNT_SUCESSO:{
            return {... state, token: action.payload, msg:''}
        }
        case CADASTRAR_USUARIO_SUCESSO:{
            return {... state, dadosUsuario:action.payload, msg:'', loadingCreateAccount: false}
        }
        case CADASTRAR_USUARIO_ERRO:{
            return {... state, msg:action.payload, loadingCreateAccount: false}
        }
        case ATUALIZAR_MSG:{
            return {... state, msg:action.payload}
        }
        
        
    }  
    return state;
}