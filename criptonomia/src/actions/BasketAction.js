import {
    ALTERAR_STATUS_BASKET_LOADING,
    ENVIAR_BASKET_SUCESSO,
    ENVIAR_BASKET_ERRO,
    ALTERAR_LISTA_BASKET,
    ALTERAR_VALOR_PEDIDO,
    ALTERAR_VALOR_TOTAL,
    BUSCAR_ITEM_CESTA_SERVE,
    BUSCAR_ITEM_CESTA_SERVE_ERRO,
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
} from './Types'

import {
    LOGIN_TOKEN, PASSWORD_TOKEN,
    RELATIVE_PATH_SERVER,
    ID_USUARIO, ID_MOBILE
} from '../util/Constants'
import axios from 'axios'
import { Actions } from 'react-native-router-flux';
import { salvarLocal, buscarLocal } from '../util/Helpers'

export const alterStatusLoading = (status) => {
    return {
        type: ALTERAR_STATUS_BASKET_LOADING,
        payload: status
    }
}

export const alterListBasket = (status) => {
    return {
        type: ALTERAR_LISTA_BASKET,
        payload: status
    }
}

export const alterarValorPedido = (status) => {
    return {
        type: ALTERAR_VALOR_PEDIDO,
        payload: status
    }
}

export const alterarValorTotal = (status) => {
    return {
        type: ALTERAR_VALOR_TOTAL,
        payload: status
    }
}

export const buscarTokenId = (id, funcao, dispatch) => {
    //return dispatch => {
        axios.post(RELATIVE_PATH_SERVER + '/auth/signin',
            {
                "username": LOGIN_TOKEN,
                "password": PASSWORD_TOKEN
            }
        ).then(response => {
            funcao(id, dispatch, response.data.token)
            buscarTokenSucesso(response.data.token, dispatch);
        }).catch((e) => {
            buscarTokenErro('Não foi possível conectar com o servidor, verifique sua internet!', dispatch);
        });
   // }
}
export const buscarTokenIdIdUsuario = (id, funcao, dispatch, idUsuario) => {
    //return dispatch => {
        axios.post(RELATIVE_PATH_SERVER + '/auth/signin',
            {
                "username": LOGIN_TOKEN,
                "password": PASSWORD_TOKEN
            }
        ).then(response => {
            funcao(id, dispatch, idUsuario, response.data.token)
            buscarTokenSucesso(response.data.token, dispatch);
        }).catch((e) => {
            buscarTokenErro('Não foi possível conectar com o servidor, verifique sua internet!', dispatch);
        });
   // }
}


const buscarTokenSucesso = (token, dispatch) => {
    dispatch(
        {
            type: BUSCAR_TOKEN,
            payload: token
        }
    );

}
const buscarTokenErro = (msg, dispatch) => {
    dispatch(
        {
            type: BUSCAR_TOKEN_ERRO,
            payload: msg
        }
    );

}

buscarCestaMain = (id, dispatch, token) =>{
    if(token == ''){
        buscarTokenId(id, buscarCestaMain, dispatch)
    }else{
        axios.get(RELATIVE_PATH_SERVER + '/api/cesta/v1/buscarCesta/' + id, {
            headers: {
                'Authorization': 'Bearer ' + token,
            }
        }).then(response => {
            console.log(response.data);
            //console.log("entrei na resposta "+response.data.length);
            buscarCestaSucesso(response.data, dispatch)
        }).catch((e) => {
            //console.log("entrei no erro "+ e);
            if(e.response.status == "403"){
                buscarTokenId(state, buscarCestaMain, dispatch)
            }else{
                buscarCestaErro('Não foi possível conectar com o servidor, verifique sua internet!', dispatch);
            }
        });
    }
}
export const buscarCesta = (id, token) => {
    return dispatch => {
        dispatch(
            {
                type: ALTERAR_STATUS_BASKET_LOADING,
                payload: true
            }
        );
        buscarCestaMain(id, dispatch, token);
    }
}
const buscarCestaSucesso = (listaCesta, dispatch) => {
    dispatch(
        {
            type: BUSCAR_ITEM_CESTA_SERVE,
            payload: listaCesta
        }
    );

}
const buscarCestaErro = (msg, dispatch) => {
    dispatch(
        {
            type: BUSCAR_ITEM_CESTA_SERVE_ERRO,
            payload: msg
        }
    );
}

removerItemMain = (id, dispatch, idUsuario, token) =>{
    //console.log("id:"+id + "idUsuario:"+idUsuario + " token:"+token)
    if(token == ''){
        buscarTokenIdIdUsuario(id, removerItemMain, dispatch, idUsuario)
    }else{
        axios.get(RELATIVE_PATH_SERVER + '/api/cesta/v1/removerItemCesta/idTem/'+id+'/idUsuarioMobile/'+idUsuario, {
            headers: {
                'Authorization': 'Bearer ' + token,
            }
        }).then(response => {
            //console.log("id "+id);
            //console.log("entrei na resposta "+response.data.length);
            removerListComSucesso(response.data, dispatch)
        }).catch((e) => {
            //console.log(e.response.status);
            if(e.response.status == "403"){
                buscarTokenIdIdUsuario(id, removerItemMain, dispatch, idUsuario)
            }else{
                removerListComErro('Não foi possível conectar com o servidor, verifique sua internet!', dispatch);
            }
        });
    }
}

export const removerItem = (id, idUsuario, token) => {
    return dispatch => {
        dispatch(
            {
                type: ALTERAR_STATUS_BASKET_LOADING,
                payload: true
            }
        );
        removerItemMain(id, dispatch, idUsuario, token)
    }
}
const removerListComSucesso = (listaCesta, dispatch) => {
    dispatch(
        {
            type: REMOVER_LIST_COM_SUCESSO,
            payload: listaCesta
        }
    );

}
const removerListComErro = (msg, dispatch) => {
    dispatch(
        {
            type: REMOVER_LIST_COM_ERRO,
            payload: msg
        }
    );
}
export const tenhoKitNaLista = (status) => {
    return {
        type: TENHO_KIT_NA_LISTA,
        payload: status
    }
}
export const entregarNaEscola = (status) => {
    return {
        type: ENTREGAR_NA_ESCOLA,
        payload: status
    }
}

export const buscarIdUsuarioLocal = (nomeVariavel) => {
    var erro = ''
    console.log("entrei buscar IDlocal")
    return dispatch => {
        {
            buscarLocal(nomeVariavel, BUSCAR_ID_USUARIO, dispatch, BUSCAR_ID_USUARIO_ERRO, erro)
        }
    }

}

export const buscarIdMobileLocal = (nomeVariavel) => {
    var erro = ''
    return dispatch => {
        {
            buscarLocal(nomeVariavel, BUSCAR_ID_MOBILE, dispatch, BUSCAR_ID_MOBILE_ERRO, erro)
        }
    }

}

export const alterarIsbuscarCesta = () => {
    return dispatch => {
        dispatch(
            {
                type: IS_BUSCAR_CESTA,
                payload: false
            }
        );
    }
}

export const atualizarIdUsuario = (idUsuario) => {
    return dispatch => {
        dispatch(
            {
                type: ID_USUARIO_ATUALIZAR,
                payload: idUsuario
            }
        );
    }
}
export const alterarIsbuscar = () => {
    return dispatch => {
        dispatch(
            {
                type: IS_BUSCAR,
                payload: false
            }
        );
    }
}

