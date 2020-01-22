import {
    ALTERAR_VALOR_FRETE,
    ALTERAR_CEP,
    ALTERAR_DIAS_ENTREGA,
    ALTERAR_STATUS_ADDRESS_LOADING,
    BUSCAR_CEP_SUCESSO,
    BUSCAR_CEP_ERRO,
    BUSCAR_TOKEN_ADDRESS_ERRO,
    BUSCAR_TOKEN_ADDRESS_SUCESSO,
    ENDERECO,
    C_SERVICO,
    IS_ENTREGAR_CORREIO,
    BUSCAR_ID_USUARIO,
    BUSCAR_ID_USUARIO_ERRO,
    BUSCAR_ID_MOBILE,
    BUSCAR_ID_MOBILE_ERRO,
    ATUALIZAR_BUSCAR
} from '../actions/Types'

const INITIAL_STATE = {
    loadingAddress: false,
    endereco: [],
    cServico:[],
    cepPesquisado:[],
    isEntregarCorreio:'',
    msg:'',
    valorFrete: 0,
    cep: '',
    diasUteis: 0,
    token: '',
    mostrarParteDeBaixo: false,
    isFindIdUsuario: false,
    idUsuario: 0,
    idMobile:0,
    isFindIdMobile: false, 
}
 
export default (state = INITIAL_STATE, action) =>{

switch(action.type){

    case ALTERAR_STATUS_ADDRESS_LOADING:{
        return {... state, msg: '', loadingAddress:action.payload}
    }
    case BUSCAR_CEP_SUCESSO :{
        return {... state, cepPesquisado: action.payload, msg:'', mostrarParteDeBaixo: true}
    }
    case BUSCAR_CEP_ERRO:{
        return {... state, msg: action.payload, loadingAddress:false, mostrarParteDeBaixo: false}
    }
    case BUSCAR_TOKEN_ADDRESS_SUCESSO :{
        return {... state, token: action.payload, msg:'', mostrarParteDeBaixo: false, endereco:[], cServico:[]}
    }
    case BUSCAR_TOKEN_ADDRESS_ERRO:{
        return {... state, msg: action.payload, loadingAddress:false}
    }
    case ALTERAR_VALOR_FRETE:{
        return {... state, valorFrete: action.payload, loadingAddress:false}
    }
    case ALTERAR_CEP:{
        return {... state, cep: action.payload, loadingAddress:false}
    }
    case ALTERAR_DIAS_ENTREGA:{
        return {... state, diasUteis: action.payload, loadingAddress:false}
    }
    case ENDERECO:{
        return {... state, endereco: action.payload}
    }
    case C_SERVICO:{
        return {... state, cServico: action.payload}
    }
    case IS_ENTREGAR_CORREIO:{
        return {... state, isEntregarCorreio: action.payload, loadingAddress:false}
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
    // case SALVAR_ID_MOBILE: {
    //     return { ...state, msg: '', idMobile: action.payload, isFindIdMobile: false }
    // }
    // case SALVAR_ID_MOBILE_ERRO: {
    //     return { ...state, msg: action.payload, idMobile: 0, isFindIdMobile: true }
    // }
    case BUSCAR_ID_MOBILE: {
        return { ...state, msg: '', idMobile: action.payload, isFindIdMobile: true}
    }
    case BUSCAR_ID_MOBILE_ERRO: {
        return { ...state, msg: action.payload, idMobile: 0, isFindIdMobile: true }
    }
    case ATUALIZAR_BUSCAR: {
        return { ...state, isFindIdMobile: false, isFindIdUsuario: false }
    }
    
}  
    return state;
}