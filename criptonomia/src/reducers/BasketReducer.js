import {
    ALTERAR_STATUS_BASKET_LOADING,
    ENVIAR_BASKET_SUCESSO,
    ENVIAR_BASKET_ERRO,
    ALTERAR_LISTA_BASKET,
    ALTERAR_VALOR_PEDIDO,
    ALTERAR_VALOR_TOTAL,
    SALVAR_ITEM_CESTA_SERVE,
    BUSCAR_ITEM_CESTA_SERVE_ERRO,
    BUSCAR_ITEM_CESTA_SERVE,
    REMOVER_LIST_COM_SUCESSO,
    REMOVER_LIST_COM_ERRO,
    TENHO_KIT_NA_LISTA,
    ENTREGAR_NA_ESCOLA,
    BUSCAR_TOKEN,
    BUSCAR_TOKEN_ERRO,
    BUSCAR_ID_USUARIO,
    BUSCAR_ID_USUARIO_ERRO,
    BUSCAR_ID_MOBILE,
    BUSCAR_ID_MOBILE_ERRO,
    IS_BUSCAR_CESTA,
    ID_USUARIO_ATUALIZAR,
    IS_BUSCAR
    
} from '../actions/Types'

const INITIAL_STATE = {
    loadingBasket: true,
    listItensCesta: [],
    msg:'',
    valorPedido: 0,
    valorTotal: 0,
    tenhoKit:'N',
    entregarNaEscola: 'N',
    token:'',
    isFindIdUsuario: false,
    idUsuario: 0,
    idMobile:0,
    isFindIdMobile: false, 
    isBuscarCesta : false
    
}
 
export default (state = INITIAL_STATE, action) =>{

switch(action.type){

    case ALTERAR_STATUS_BASKET_LOADING:{
        return {... state, msg: '', loadingBasket:action.payload}
    }
    case ENVIAR_BASKET_SUCESSO :{
        return {... state, listItensCesta: action.payload, msg:''}
    }
    case ENVIAR_BASKET_ERRO:{
        return {... state, msg: action.payload}
    }
    case ALTERAR_LISTA_BASKET:{
        return {... state, listItensCesta: action.payload}
    }
    case ALTERAR_VALOR_PEDIDO:{
        return {... state, valorPedido: action.payload}
    }
    case ALTERAR_VALOR_TOTAL:{
        return {... state, valorTotal: action.payload}
    }
    case BUSCAR_ITEM_CESTA_SERVE:{
        return {... state, listItensCesta: action.payload, loadingBasket: false, isBuscarCesta: true}
    }
    case BUSCAR_ITEM_CESTA_SERVE_ERRO:{
        return {... state, msg: action.payload, isBuscarCesta: true}
    }
    case REMOVER_LIST_COM_SUCESSO:{
        return {... state, listItensCesta: action.payload, loadingBasket: false}
    }
    case REMOVER_LIST_COM_ERRO:{
        return {... state, msg: action.payload}
    }
    case TENHO_KIT_NA_LISTA:{
        return {... state, tenhoKit: action.payload}
    }
    case ENTREGAR_NA_ESCOLA:{
        return {... state, entregarNaEscola: action.payload}
    }
    case BUSCAR_TOKEN :{
        return {... state, token: action.payload, msg:''}
    }
    case BUSCAR_TOKEN_ERRO :{
        return {... state, msg: action.payload, loadingBasket:false} 
    }
    case BUSCAR_ID_USUARIO: {
        console.log("BUSCAR_ID_USUARIO_teset")
        console.log(action.payload)
        var objLogin = JSON.parse(action.payload)
        console.log("BUSCAR_ID_USUARIO OBJ")
        console.log(objLogin)
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
        // console.log("BUSCAR_ID_MOBILE_Basket")
        // console.log(action.payload)
        return { ...state, msg: '', idMobile: action.payload, isFindIdMobile: true}
    }
    case BUSCAR_ID_MOBILE_ERRO: {
        return { ...state, msg: action.payload, idMobile: 0, isFindIdMobile: true }
    }
    case IS_BUSCAR_CESTA:{
        return {... state, isBuscarCesta: action.payload}
    }
    case ID_USUARIO_ATUALIZAR:{
        return {... state, idUsuario: action.payload}
    }
    case IS_BUSCAR:{
        console.log("IS_BUSCAR")
        return {... state, isFindIdMobile: false, isFindIdUsuario : false}
    }
    
}  
    return state;
}