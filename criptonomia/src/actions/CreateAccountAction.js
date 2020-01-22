import {
    ATUALIZAR_TOKEN_CREATE_ACCOUNT,
    ALTERAR_STATUS_LOGIN_CREATE_ACCOUNT,
    CADASTRAR_USUARIO_SUCESSO,
    CADASTRAR_USUARIO_ERRO,
    BUSCAR_TOKEN_CREATE_ACCOUNT_ERRO,
    BUSCAR_TOKEN_CREATE_ACCOUNT_SUCESSO,
    ATUALIZAR_MSG
} from './Types'

import {
    LOGIN_TOKEN, PASSWORD_TOKEN,
    RELATIVE_PATH_SERVER
} from '../util/Constants'
import axios from 'axios'
import { Actions } from 'react-native-router-flux';

export const alterStatusLoading = (status) => {
    return {
        type: ALTERAR_STATUS_LOGIN_CREATE_ACCOUNT,
        payload: status
    }
}

export const alterMsg = (status) => {
    return {
        type: ATUALIZAR_MSG,
        payload: status
    }
}

export const atualizarToken = (token) => {
    return {
        type: ATUALIZAR_TOKEN_CREATE_ACCOUNT,
        payload: token
    }
}
export const buscarTokenUsuario = (funcao, dadosCadastro, dispatch) => {
    //return dispatch => {
        axios.post(RELATIVE_PATH_SERVER + '/auth/signin',
            {
                "username": LOGIN_TOKEN,
                "password": PASSWORD_TOKEN
            }
        ).then(response => {
            console.log('token volta: '+response.data.token);
            buscarTokenSucesso(response.data.token, dispatch);
            funcao(dadosCadastro, response.data.token, dispatch)
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
const cadastrarUsuarioMain = (state, token, dispatch) =>{
    console.log(state)
    if(token == ''){
        buscarTokenUsuario(cadastrarUsuarioMain, state, dispatch)
    }else{
        // console.log(state)
        // console.log(token)
        axios.post(RELATIVE_PATH_SERVER + '/api/usuario/v1/criarUsuario', 
        state,
        {
            headers: {
                'Authorization': 'Bearer ' + token,
            }
        }).then(response => {
            
            // console.log("entrei na resposta "+response.data.idUsuario);
            // console.log(response.data.erro);
            // console.log("\n\n\n\n\n");
            // console.log(response.data.idUsuario);
            if(response.data.erro != undefined && response.data.erro != ''){
                cadastrarUsuarioErro(response.data.erro, dispatch);
            }else{
                console.log("nao tem erro retorno:")
                console.log(response.data);
                cadastroComSucesso(response.data, dispatch);
                Actions.Payment();
            }
        }).catch((e) => {
            console.log(e.response.status);
            if(e.response.status == "403"){
                buscarTokenUsuario(cadastrarUsuarioMain, state, dispatch)
            }else{
                cadastrarUsuarioErro('Não foi possível conectar com o servidor, verifique sua internet!', dispatch);
            }
        });

    }
}

export const cadastrarUsuario = ( token, state ) => {
    return dispatch => {

        dispatch(
            {
                type: ALTERAR_STATUS_LOGIN_CREATE_ACCOUNT,
                payload: true
            }
        );
        cadastrarUsuarioMain(state, token, dispatch);
    }
}

const cadastroComSucesso = (dadosUsuario, dispatch) => {
    dispatch(
        {
            type: CADASTRAR_USUARIO_SUCESSO,
            payload: dadosUsuario
        }
    );

}

const cadastrarUsuarioErro = (msg, dispatch) => {
    dispatch(
        {
            type: CADASTRAR_USUARIO_ERRO,
            payload: msg
        }
    );

}

const cServico = (cServico, dispatch) => {
    dispatch(
        {
            type: C_SERVICO,
            payload: cServico
        }
    );

}

const endereco = (endereco, dispatch) => {
    dispatch(
        {
            type: ENDERECO,
            payload: endereco
        }
    );

}

const buscarTokenSucesso = (token, dispatch) => {
    dispatch(
        {
            type: BUSCAR_TOKEN_CREATE_ACCOUNT_SUCESSO,
            payload: token
        }
    );

}
const buscarTokenErro = (msg, dispatch) => {
    dispatch(
        {
            type: BUSCAR_TOKEN_CREATE_ACCOUNT_ERRO,
            payload: msg
        }
    );

}

