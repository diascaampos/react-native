import {
    IMPORT_LIST_USER_SUCCESS,
    IMPORT_LIST_USER_ERRO,
    ALTER_LOADING_LIST_USER,
    SAVE_USER,
    SAVE_ADDRESS,
    SAVE_COMPANY
} from './Types'

import axios from 'axios'
import { Actions } from 'react-native-router-flux';

export const listUser = () => {
    return dispatch => {

        axios.get('https://jsonplaceholder.typicode.com/users',
            {
            }).then(response => {


                if (response.data != undefined) {

                    listUserSucesso(response.data, dispatch);
                }
                // if(response.data.erro != undefined){
                //     buscarCepErro(response.data.erro, dispatch);
                // }else{
                //     console.log(response.data);
                //     buscarCepDados(response.data, dispatch);
                //     endereco(response.data.endereco, dispatch);
                //     cServico(response.data.cServico, dispatch);
                // }
            }).catch((e) => {
                //console.log("to aqui"+e.response.status);
                listUserErro('Não foi possível conectar com o servidor, verifique sua internet!', dispatch);
            });

    }
}

const listUserSucesso = (list, dispatch) => {
    dispatch(
        {
            type: IMPORT_LIST_USER_SUCCESS,
            payload: list
        }
    );

}

const listUserErro = (msg, dispatch) => {
    dispatch(
        {
            type: IMPORT_LIST_USER_ERRO,
            payload: msg
        }
    );

}

export const svUser = (user) => {
    return {
        type: SAVE_USER,
        payload: user
    }
}

export const svAddress = (address) => {
    return {
        type: SAVE_ADDRESS,
        payload: address
    }
}

export const svCompany = (company) => {
    return {
        type: SAVE_COMPANY,
        payload: company
    }
}






















// export const alterStatusLoading = (status) => {
//     return {
//         type: ALTERAR_STATUS_LOGIN_LOADING,
//         payload: status
//     }
// }

// export const atualizarToken = (token) => {
//     return {
//         type: ATUALIZAR_TOKEN_LOGIN,
//         payload: token
//     }
// }
// export const buscarTokenIdUsuario = (funcao, cep, isEntregarEscola, listaCesta, dispatch) => {
//     //return dispatch => {
//         axios.post(RELATIVE_PATH_SERVER + '/auth/signin',
//             {
//                 "username": LOGIN_TOKEN,
//                 "password": PASSWORD_TOKEN
//             }
//         ).then(response => {
//             console.log('token volta: '+response.data.token);
//             buscarTokenSucesso(response.data.token, dispatch);
//             funcao(cep, isEntregarEscola, listaCesta, response.data.token, dispatch)
//         }).catch((e) => {
//             buscarTokenErro('Não foi possível conectar com o servidor, verifique sua internet!', dispatch);
//         });
//    // }
// }

// // export const adicionarEndereco = (status) => {
// //     return {
// //         type: ENVIAR_CEP_SUCESSO,
// //         payload: status
// //     }
// // }
// buscarCepMain = (cep, isEntregarEscola, listaCesta, token, dispatch) =>{
//     //console.log("lista "+listaCesta)
//     if(token == ''){
//         buscarTokenIdUsuario(buscarCepMain, cep, isEntregarEscola, listaCesta, dispatch)
//     }else{
//         axios.post(RELATIVE_PATH_SERVER + '/api/kit/v1/buscarEndereco/'+cep+'/entregarEscola/'+isEntregarEscola, 
//         listaCesta,
//         {
//             headers: {
//                 'Authorization': 'Bearer ' + token,
//             }
//         }).then(response => {

//             //console.log("entrei na resposta "+response.data.erro);
//             if(response.data.erro != undefined){
//                 buscarCepErro(response.data.erro, dispatch);
//             }else{
//                 console.log(response.data);
//                 buscarCepDados(response.data, dispatch);
//                 endereco(response.data.endereco, dispatch);
//                 cServico(response.data.cServico, dispatch);
//             }
//         }).catch((e) => {
//             console.log("to aqui"+e.response.status);
//             if(e.response.status == "403"){
//                 buscarTokenIdUsuario(buscarCepMain, cep, isEntregarEscola, listaCesta, dispatch)
//             }else{
//                 buscarCepErro('Não foi possível conectar com o servidor, verifique sua internet!', dispatch);
//             }
//         });

//     }
// }

// export const buscarCep = (cep, isEntregarEscola, listaCesta, token) => {
//     return dispatch => {

//         dispatch(
//             {
//                 type: ALTERAR_STATUS_ADDRESS_LOADING,
//                 payload: true
//             }
//         );
//         console.log('token antes de ir: '+token)
//         buscarCepMain(cep, isEntregarEscola, listaCesta, token, dispatch);
//     }
// }

// const buscarCepDados = (endereco, dispatch) => {
//     dispatch(
//         {
//             type: BUSCAR_CEP_SUCESSO,
//             payload: endereco
//         }
//     );

// }

// const cServico = (cServico, dispatch) => {
//     dispatch(
//         {
//             type: C_SERVICO,
//             payload: cServico
//         }
//     );

// }

// const endereco = (endereco, dispatch) => {
//     dispatch(
//         {
//             type: ENDERECO,
//             payload: endereco
//         }
//     );

// }

// const buscarCepErro = (msg, dispatch) => {
//     dispatch(
//         {
//             type: BUSCAR_CEP_ERRO,
//             payload: msg
//         }
//     );

// }

// const buscarTokenSucesso = (token, dispatch) => {
//     dispatch(
//         {
//             type: BUSCAR_TOKEN_ADDRESS_SUCESSO,
//             payload: token
//         }
//     );

// }
// const buscarTokenErro = (msg, dispatch) => {
//     dispatch(
//         {
//             type: BUSCAR_TOKEN_ADDRESS_ERRO,
//             payload: msg
//         }
//     );

// }

