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
    BUSCAR_ID_USUARIO,
    BUSCAR_ID_USUARIO_ERRO,
    BUSCAR_ID_MOBILE,
    BUSCAR_ID_MOBILE_ERRO,
} from './Types'

import {
    LOGIN_TOKEN, PASSWORD_TOKEN,
    RELATIVE_PATH_SERVER
} from '../util/Constants'
import axios from 'axios'
import { Actions } from 'react-native-router-flux';
import { salvarLocal, buscarLocal } from '../util/Helpers'

export const alterStatusLoading = (status) => {
    return {
        type: ALTERAR_STATUS_PAYMENT_LOADING,
        payload: status
    }
}

export const atualizarToken = (token) => {
    return {
        type: ATUALIZAR_TOKEN_PAYMENT,
        payload: token
    }
}

export const atualizarListaModel = (lista) => {
    return {
        type: ATUALIZAR_LISTA_MODEL,
        payload: lista
    }
}

export const atualizarListaAno = (lista) => {
    return {
        type: ATUALIZAR_LISTA_ANO,
        payload: lista
    }
}

export const buscarToken = (objPagamento, funcao, dispatch) => {
    //return dispatch => {
        axios.post(RELATIVE_PATH_SERVER + '/auth/signin',
            {
                "username": LOGIN_TOKEN,
                "password": PASSWORD_TOKEN
            }
        ).then(response => {
            console.log('token volta: '+response.data.token);
            buscarTokenSucesso(response.data.token, dispatch);
            funcao(objPagamento, response.data.token, dispatch)
        }).catch((e) => {
            buscarTokenErro('Não foi possível conectar com o servidor, verifique sua internet!', dispatch);
        });
   // }
}

// export const adicionarEndereco = (status) => {
//     return {
//         type: ENVIAR_CEP_SUCESSO,
//         payload: status
//     }
// }
export const paymentMain = (objPagamento, token, dispatch) =>{
    //console.log("lista "+listaCesta)
    if(token == ''){
        buscarToken(objPagamento, paymentMain, dispatch)
    }else{
        axios.post(RELATIVE_PATH_SERVER + '/api/pagamento/v1/pagar',
        objPagamento,
        {
            headers: {
                'Authorization': 'Bearer ' + token,
            }
        }).then(response => {
            
            //console.log("entrei na resposta "+response.data.erro);
            if(response.data.erro != undefined){
                paymentErro(response.data.erro, dispatch);
            }else{
                console.log(response.data);
                //loginSucesso(response.data, dispatch);
            }
        }).catch((e) => {
            console.log("to aqui"+e.response.status);
            if(e.response.status == "403"){
                buscarToken(objPagamento, paymentMain, dispatch)
            }else{
                buscarCepErro('Não foi possível conectar com o servidor, verifique sua internet!', dispatch);
            }
        });

    }
}

export const payment = (objPagamento, token) => {
    return dispatch => {

        dispatch(
            {
                type: ALTERAR_STATUS_PAYMENT_LOADING,
                payload: true
            }
        );
        console.log('token antes de ir: '+token)
        paymentMain(objPagamento, token, dispatch);
    }
}

const paymentSucesso = (pagamento, dispatch) => {
    dispatch(
        {
            type: PAYMENT_SUCESSO,
            payload: pagamento
        }
    );

}

const paymentErro = (msg, dispatch) => {
    dispatch(
        {
            type: PAYMENT_ERRO,
            payload: msg
        }
    );

}

const buscarTokenSucesso = (token, dispatch) => {
    dispatch(
        {
            type:BUSCAR_TOKEN_PAYMENT_SUCESSO,
            payload: token
        }
    );

}
const buscarTokenErro = (msg, dispatch) => {
    dispatch(
        {
            type: BUSCAR_TOKEN_PAYMENT_ERRO,
            payload: msg
        }
    );

}
export const alterarValorTotal = (status) => {
    return {
        type: ALTERAR_VALOR_TOTAL,
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
    console.log("entrei buscar local")
    return dispatch => {
        {
            buscarLocal(nomeVariavel, BUSCAR_ID_MOBILE, dispatch, BUSCAR_ID_MOBILE_ERRO, erro)
        }
    }

}
