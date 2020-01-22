import {
    ATUALIZAR_TOKEN_PAYMENT,
    ALTERAR_STATUS_PAYMENT_LOADING,
    BUSCAR_TOKEN_PAYMENT_SUCESSO,
    BUSCAR_TOKEN_PAYMENT_ERRO,
    PAYMENT_ERRO,
    PAYMENT_SUCESSO,
    ATUALIZAR_LISTA_MODEL,
    ATUALIZAR_LISTA_ANO,
    ALTERAR_VALOR_TOTAL,
    SALVAR_ID_USUARIO,
    SALVAR_ID_USUARIO_ERRO,
    BUSCAR_ID_USUARIO,
    BUSCAR_ID_USUARIO_ERRO,
    BUSCAR_ID_MOBILE,
    BUSCAR_ID_MOBILE_ERRO,
    ATUALIZAR_ID_USUARIO
} from '../actions/Types'

const INITIAL_STATE = {
    token: '',
    loadingPayment: false,
    msg:'',
    dadosPayment:[], 
    listaAnos: [],
    listaModel:[],
    valorTotal:0,
    dados:[],
    isFindIdUsuario: false,
    idUsuario: 0,
    idMobile:0,
    isFindIdMobile: false, 
}
 
export default (state = INITIAL_STATE, action) =>{

    switch(action.type){

        case ATUALIZAR_TOKEN_PAYMENT:{
            return {... state, msg: '', token:action.payload}
        }
        case ALTERAR_STATUS_PAYMENT_LOADING:{
            return {... state, msg: '', loadingPayment:action.payload}
        }
        case BUSCAR_TOKEN_PAYMENT_SUCESSO:{
            return {... state, msg: '', token:action.payload}
        }
        case BUSCAR_TOKEN_PAYMENT_ERRO:{
            return {... state, msg: action.payload, loadingPayment: false}
        }
        case PAYMENT_ERRO:{
            return {... state, msg: action.payload, loadingPayment: false}
        }
        case PAYMENT_SUCESSO:{
            return {... state, msg: '', dadosPayment: action.payload, loadingPayment: false}
        }
        case ATUALIZAR_LISTA_MODEL:{
            return {... state, msg: '', listaModel:action.payload}
        }
        case ATUALIZAR_LISTA_ANO:{
            return {... state, msg: '', listaAnos:action.payload}
        }
        case ALTERAR_VALOR_TOTAL:{
            return {... state, valorTotal:action.payload}
        }
        case SALVAR_ID_USUARIO:{
            return {... state, dados:action.payload}
        }
        case SALVAR_ID_USUARIO_ERRO:{
            return {... state, msg:action.payload}
        }
        case BUSCAR_ID_USUARIO: {
            // console.log("BUSCAR_ID_USUARIO_teset")
            // console.log(action.payload)
            var objLogin = JSON.parse(action.payload)
            return { ...state, msg: '', idUsuario: objLogin.idUsuario, isFindIdUsuario: true, isFindIdMobile: false }
        }
        case BUSCAR_ID_USUARIO_ERRO: {
            return { ...state, msg: action.payload, idUsuario: 0, isFindIdUsuario: true , isFindIdMobile:false}
        }
        case BUSCAR_ID_MOBILE: {
            return { ...state, msg: '', idMobile: action.payload, isFindIdMobile: true}
        }
        case BUSCAR_ID_MOBILE_ERRO: {
            return { ...state, msg: action.payload, idMobile: 0, isFindIdMobile: true }
        }
        case ATUALIZAR_ID_USUARIO: {
            return { ...state, idUsuario: action.payload}
        }
        
    }  
    return state;
}