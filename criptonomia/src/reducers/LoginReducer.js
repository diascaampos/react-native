import {
    ATUALIZAR_TOKEN_LOGIN,
    ALTERAR_STATUS_LOGIN_LOADING,
    BUSCAR_TOKEN_LOGIN_SUCESSO,
    BUSCAR_TOKEN_LOGIN_ERRO,
    LOGAR_ERRO,
    LOGIN_SUCESSO,
    SALVAR_ID_USUARIO,
    SALVAR_ID_USUARIO_ERRO,
    BUSCAR_ID_USUARIO,
    BUSCAR_ID_USUARIO_ERRO,
    SALVAR_ID_MOBILE,
    SALVAR_ID_MOBILE_ERRO,
    BUSCAR_ID_MOBILE,
    BUSCAR_ID_MOBILE_ERRO,
} from '../actions/Types'

const INITIAL_STATE = {
    token: '',
    loadingLogin: false,
    msg:'',
    dadosLogin:[],
    isFindIdUsuario: false,
    idUsuario: 0,
    idMobile:0,
    isFindIdMobile: false
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
            var objLogin = JSON.parse(action.payload)
            return {... state, msg: '', dadosLogin: objLogin, loadingLogin: false, idUsuario: objLogin.idUsuario}
        }
        case SALVAR_ID_USUARIO: {
            console.log('idUsuario ok salvar')
            return { ...state, msg: '', idUsuario: action.payload, isFindIdUsuario: true }
        }
        case SALVAR_ID_USUARIO_ERRO: {
            console.log('idUsuario Deu erro')
            return { ...state, msg: action.payload, idUsuario: 0, isFindIdUsuario: true }
        }
        case BUSCAR_ID_USUARIO: {
            return { ...state, msg: '', idUsuario: action.payload, isFindIdUsuario: true, isFindIdMobile: false }
        }
        case BUSCAR_ID_USUARIO_ERRO: {
            return { ...state, msg: action.payload, idUsuario: 0, isFindIdUsuario: true , isFindIdMobile:false}
        }
        case SALVAR_ID_MOBILE: {
            return { ...state, msg: '', idMobile: action.payload, isFindIdMobile: false }
        }
        case SALVAR_ID_MOBILE_ERRO: {
            return { ...state, msg: action.payload, idMobile: 0, isFindIdMobile: true }
        }
        case BUSCAR_ID_MOBILE: {
            return { ...state, msg: '', idMobile: action.payload, isFindIdMobile: true}
        }
        case BUSCAR_ID_MOBILE_ERRO: {
            return { ...state, msg: action.payload, idMobile: 0, isFindIdMobile: true }
        }
    }  
    return state;
}