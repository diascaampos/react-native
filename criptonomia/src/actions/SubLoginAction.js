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
} from './Types'
import {
    LOGIN_TOKEN, PASSWORD_TOKEN,
    RELATIVE_PATH_SERVER,
    ID_USUARIO
} from '../util/Constants'
import axios from 'axios'
import { Actions } from 'react-native-router-flux';
import { salvarLocal, buscarLocal } from '../util/Helpers'

export const alterStatusLoading = (status) => {
    return {
        type: ALTERAR_STATUS_LOGIN_LOADING,
        payload: status
    }
}

export const atualizarToken = (token) => {
    return {
        type: ATUALIZAR_TOKEN_LOGIN,
        payload: token
    }
}
export const buscarToken = (objLogin, funcao, dispatch) => {
    //return dispatch => {
        axios.post(RELATIVE_PATH_SERVER + '/auth/signin',
            {
                "username": LOGIN_TOKEN,
                "password": PASSWORD_TOKEN
            }
        ).then(response => {
            console.log('token volta: '+response.data.token);
            buscarTokenSucesso(response.data.token, dispatch);
            funcao(objLogin, token, response.data.token, dispatch)
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
export const loginMain = (objLogin, token, dispatch) =>{
    if(token === '' || token === undefined){
        buscarToken(objLogin, loginMain, dispatch)
    }else{
        axios.post(RELATIVE_PATH_SERVER + '/api/usuario/v1/logar',
        objLogin,
        {
            headers: {
                'Authorization': 'Bearer ' + token,
            }
        }).then(response => {
            
            //console.log(response.data.erro);
            if(response.data.erro != undefined){
                logarErro(response.data.erro, dispatch);
            }else{
                
                loginSucesso(response.data, dispatch);
                Actions.Payment({objDoLogin:response.data});
            }
        }).catch((e) => {
            console.log("to aqui"+e.response.status);
            if(e.response.status == "403"){
                buscarToken(objLogin, loginMain, dispatch)
            }else{
                buscarTokenErro('Não foi possível conectar com o servidor, verifique sua internet!', dispatch);
            }
        });

    }
}

export const login = (objLogin, token) => {
    return dispatch => {

        dispatch(
            {
                type: ALTERAR_STATUS_LOGIN_LOADING,
                payload: true
            }
        );
        loginMain(objLogin, token, dispatch);
    }
}

const loginSucesso = (login, dispatch) => {
    var objLogin = JSON.stringify(login)
    dispatch(
        {
            type: LOGIN_SUCESSO,
            payload: objLogin
        }
    );

}

const logarErro = (msg, dispatch) => {
    dispatch(
        {
            type: LOGAR_ERRO,
            payload: msg
        }
    );

}

const buscarTokenSucesso = (token, dispatch) => {
    dispatch(
        {
            type: BUSCAR_TOKEN_LOGIN_SUCESSO,
            payload: token
        }
    );

}
const buscarTokenErro = (msg, dispatch) => {
    dispatch(
        {
            type: BUSCAR_TOKEN_LOGIN_ERRO,
            payload: msg
        }
    );

}
export const salvarIdUsuarioLocal = (objeto, nomeVariavel, dispatch) => {
    var erro = 'Não foi possível salvar usuario!'
    var objLogin = JSON.stringify(objeto)
    console.log('entrei em salvar idUsuario')
    console.log(objeto)
    salvarLocal(nomeVariavel, objLogin, LOGIN_SUCESSO, dispatch, SALVAR_ID_USUARIO_ERRO, erro)

}

export const salvarIdMobileLocal = (objeto, nomeVariavel, dispatch) => {
    var erro = 'Não foi possível salvar mobile!'
    salvarLocal(nomeVariavel, objeto, SALVAR_ID_MOBILE, dispatch, SALVAR_ID_MOBILE_ERRO, erro)
}
