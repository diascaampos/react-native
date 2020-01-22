import {
    MUDAR_COR_GRAFICO,
    MUDAR_COR_ORDENS,
    MUDAR_COR_NEGOCIACOES
} from './Types'

import {
    LOGIN_TOKEN, PASSWORD_TOKEN,
    RELATIVE_PATH_SERVER
} from '../util/Constants'
import axios from 'axios'
import { Actions } from 'react-native-router-flux';
import { salvarLocal, buscarLocal } from '../util/Helpers'

export const alterCorGrafico = (status) => {
    return {
        type: MUDAR_COR_GRAFICO,
        payload: status
    }
}
export const alterCorNegociacoes = (status) => {
    return {
        type: MUDAR_COR_NEGOCIACOES,
        payload: status
    }
}
export const alterCorOrdens = (status) => {
    return {
        type: MUDAR_COR_ORDENS,
        payload: status
    }
}

// export const alterarCep = (status) => {
//     return {
//         type: ALTERAR_CEP,
//         payload: status
//     }
// }

// export const alterarValorFrete = (status) => {
//     return {
//         type: ALTERAR_VALOR_FRETE,
//         payload: status
//     }
// }

// export const alterarDiasEntrega = (status) => {
//     return {
//         type: ALTERAR_DIAS_ENTREGA,
//         payload: status
//     }
// }

// export const atualizarToken = (token) => {
//     return {
//         type: BUSCAR_TOKEN_ADDRESS_SUCESSO,
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
// export const buscarCepMain = (cep, isEntregarEscola, listaCesta, token, dispatch) =>{
//     if(token == ''){
//         buscarTokenIdUsuario(buscarCepMain, cep, isEntregarEscola, listaCesta, dispatch)
//     }else{
        
//         axios.post(RELATIVE_PATH_SERVER + '/api/kit/v1/buscarEndereco/'+cep+'/entregarEscola/'+isEntregarEscola, 
//         listaCesta,
//         {
//             headers: {
//                 'Authorization': 'Bearer ' + token
//             }
//         }).then(response => {
            
//             //console.log("entrei na resposta "+response.data);
//             if(response.data.erro != undefined){
//                 buscarCepErro(response.data.erro, dispatch);
//             }else{
//                 console.log("retorno resposta"+response.data)
//                 console.log(response.data);
//                 buscarCepDados(response.data, dispatch);
//                 endereco(response.data.endereco, dispatch);
//                 cServico(response.data.cServico, dispatch);
//                 isEntregarCorreio(response.data.isEntregarCorreio, dispatch);
//             }
//         }).catch((e) => {
//             console.log("to aqui"+e);
//             buscarCepErro('Não foi possível conectar com o servidor, verifique sua internet!', dispatch);
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
//         //console.log("cep "+cep+" isEntregarEscola "+isEntregarEscola+" listaCesta "+listaCesta+"token"+token)
//         buscarCepMain(cep, isEntregarEscola, listaCesta, token, dispatch);
//     }
// }
// export const resetarBuscar = () => {
//     return dispatch => {

//         dispatch(
//             {
//                 type: ATUALIZAR_BUSCAR,
//                 payload: false
//             }
//         );
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

// const isEntregarCorreio = (isEntregarCorreio, dispatch) => {
//     dispatch(
//         {
//             type: IS_ENTREGAR_CORREIO,
//             payload: isEntregarCorreio
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
// export const buscarIdUsuarioLocal = (nomeVariavel) => {
//     var erro = ''
//     console.log("entrei buscar IDlocal")
//     return dispatch => {
//         {
//             buscarLocal(nomeVariavel, BUSCAR_ID_USUARIO, dispatch, BUSCAR_ID_USUARIO_ERRO, erro)
//         }
//     }

// }

// export const buscarIdMobileLocal = (nomeVariavel) => {
//     var erro = ''
//     console.log("entrei buscar local")
//     return dispatch => {
//         {
//             buscarLocal(nomeVariavel, BUSCAR_ID_MOBILE, dispatch, BUSCAR_ID_MOBILE_ERRO, erro)
//         }
//     }

// }

