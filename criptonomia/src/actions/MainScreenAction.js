import {
    BUSCAR_TOKEN,
    BUSCAR_TOKEN_ERRO,
    BUSCAR_ITENS_PROMOCAO,
    BUSCAR_ITENS_PROMOCAO_ERRO,
    BUSCAR_ITENS_KIT,
    BUSCAR_ITENS_KIT_ERRO,
    LIMPAR_TOKEN,
    ALTERAR_KIT_BY_SCHOOL_DADOS,
    BUSCAR_KIT,
    BUSCAR_KIT_ERRO,
    ALTERAR_STATUS_LOADING,
    BUSCAR_KIT_PELO_NOME,
    BUSCAR_KIT_PELO_NOME_ERRO,
    BUSCAR_TOKEN_LISTA_PRODUTOS,
    LIMPAR_TOKEN_LISTA_PRODUTO,
    ALTERAR_STATUS_LISTA_PRODUTOS_LOADING,
    LIMPAR_TOKEN_PRODUCT_DETAILS,
    ALTERAR_STATUS_PRODUCT_DETAILS_LOADING,
    BUSCAR_TOKEN_PRODUCT_DETAILS,
    BUSCAR_TOKEN_PRODUCT_DETAILS_ERRO,
    BUSCAR_LISTA_DE_ITENS_KIT,
    BUSCAR_LISTA_DE_ITENS_KIT_ERRO,
    ALTERAR_STATUS_LISTA_ITEM_KIT_LOADING,
    BUSCAR_PRODUTOS_SUCESSO,
    BUSCAR_PRODUTOS_ERRO,
    ALTERAR_STATUS_BAR_CODE_SCAN_LOADING,
    BUSCAR_TOKEN_BAR_CODE_SCAN_SUCESSO,
    BUSCAR_TOKEN_BAR_CODE_SCAN_ERRO,
    BUSCAR_PRODUTOS_CARROSSEL_ERRO,
    ALTERAR_STATUS_CARROSSEL_LOADING,
    BUSCAR_TOKEN_CARROSSEL_ERRO,
    ALTERAR_VALOR_QUANTIDADE_ITEM_LISTA_KIT,
    ALTERAR_VISIBILIDADE_BOTAO_COMPRAR,
    SALVAR_ITEM_CESTA_SERVE,
    ENVIAR_ITENS_CESTA_ERRO,
    LOADING_ENVIANDO_ITEM,
    SALVAR_ID_USUARIO,
    SALVAR_ID_USUARIO_ERRO,
    BUSCAR_ID_USUARIO,
    BUSCAR_ID_USUARIO_ERRO,
    SALVAR_ID_MOBILE,
    SALVAR_ID_MOBILE_ERRO,
    BUSCAR_ID_MOBILE,
    BUSCAR_ID_MOBILE_ERRO,
    ALTERAR_STATUS_MSG
} from './Types'

import {
    LOGIN_TOKEN, PASSWORD_TOKEN,
    RELATIVE_PATH_SERVER,
    ID_USUARIO, ID_MOBILE
} from '../util/Constants'
import axios from 'axios'
import { Actions } from 'react-native-router-flux';
import { salvarLocal, buscarLocal } from '../util/Helpers'



export const limparToken = () => {
    return {
        type: LIMPAR_TOKEN,
        payload: ''
    }
}
export const limparTokenListaProduto = () => {
    return {
        type: LIMPAR_TOKEN_LISTA_PRODUTO,
        payload: ''
    }
}

export const limparTokenProductDetails = () => {
    return {
        type: LIMPAR_TOKEN_PRODUCT_DETAILS,
        payload: ''
    }
}

export const setarToken = (token) => {
    return {
        type: SETAR_TOKEN,
        payload: token
    }
}

export const alterStatusLoading = (status) => {
    return {
        type: ALTERAR_STATUS_LOADING,
        payload: status
    }
}

export const alterStatusLoadingListaProduto = (status) => {
    return {
        type: ALTERAR_STATUS_LISTA_PRODUTOS_LOADING,
        payload: status
    }
}

export const alterStatusLoadingListaItemKit = (status) => {
    return {
        type: ALTERAR_STATUS_LISTA_ITEM_KIT_LOADING,
        payload: status
    }
}

export const alterStatusBarCodeScanLoading = (status) => {
    return {
        type: ALTERAR_STATUS_BAR_CODE_SCAN_LOADING,
        payload: status
    }
}

export const alterStatusCarrosselLoading = (status) => {
    return {
        type: ALTERAR_STATUS_CARROSSEL_LOADING,
        payload: status
    }
}

export const alterarKitBySchool = (status) => {
    return {
        type: ALTERAR_KIT_BY_SCHOOL_DADOS,
        payload: status

    }
}

export const alterarStatusMsg = (status) => {
    return {
        type: ALTERAR_STATUS_MSG,
        payload: status

    }
}

export const buscarToken = (funcao, dispatch) => {
    //return dispatch => {
    axios.post(RELATIVE_PATH_SERVER + '/auth/signin',
        {
            "username": LOGIN_TOKEN,
            "password": PASSWORD_TOKEN
        }
    ).then(response => {
        funcao(dispatch, response.data.token)
        buscarTokenSucesso(response.data.token, dispatch);
    }).catch((e) => {
        buscarTokenErro('Não foi possível conectar com o servidor, verifique sua internet!', dispatch);
    });
    // }
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

export const buscarTokenListaProdutos = () => {
    return dispatch => {
        dispatch(
            {
                type: ALTERAR_STATUS_LISTA_PRODUTOS_LOADING,
                payload: true
            }
        );
        axios.post(RELATIVE_PATH_SERVER + '/auth/signin',
            {
                "username": LOGIN_TOKEN,
                "password": PASSWORD_TOKEN
            }
        ).then(response => {
            buscarTokenListaProdutosSucesso(response.data.token, dispatch);
        }).catch((e) => {
            buscarTokenListaProdutosErro('Não foi possível conectar com o servidor, verifique sua internet!', dispatch);
        });
    }
}

const buscarTokenListaProdutosSucesso = (token, dispatch) => {
    dispatch(
        {
            type: BUSCAR_TOKEN_LISTA_PRODUTOS,
            payload: token
        }
    );

}

const buscarTokenListaProdutosErro = (msg, dispatch) => {
    dispatch(
        {
            type: BUSCAR_TOKEN_LISTA_PRODUTOS_ERRO,
            payload: msg
        }
    );

}


buscarPromocaoMain = (dispatch, token) => {
    if (token == '') {
        buscarToken(buscarPromocaoMain, dispatch)
    } else {
        axios.get(RELATIVE_PATH_SERVER + '/api/kit/v1/promocao', {
            headers: {
                'Authorization': 'Bearer ' + token,
            }
        }).then(response => {
            buscarPromocaoDados(response.data, dispatch);


            axios.get(RELATIVE_PATH_SERVER + '/api/kit/v1/tipoKit', {
                headers: {
                    'Authorization': 'Bearer ' + token,
                }
            }).then(response => {
                buscarTipoKitDados(response.data, dispatch);
            }).catch((e) => {
                console.log(e.response.status)
                if (e.response.status == "403") {
                    buscarToken(buscarPromocaoMain, dispatch)
                } else {
                    buscarTipoKitErro('Não foi possível conectar com o servidor, verifique sua internet!', dispatch);
                }
            });



        }).catch((e) => {
            if (e.response.status == "403") {
                buscarToken(buscarPromocaoMain, dispatch)
            } else {
                buscarPromocaoErro('Não foi possível conectar com o servidor, verifique sua internet!', dispatch);
            }
        });
    }
}


export const buscarPromocao = (token) => {

    return dispatch => {
        buscarPromocaoMain(dispatch, token);
    }
}

const buscarPromocaoDados = (listaPromocao, dispatch) => {
    dispatch(
        {
            type: BUSCAR_ITENS_PROMOCAO,
            payload: listaPromocao
        }
    );

}

const buscarPromocaoErro = (msg, dispatch) => {
    dispatch(
        {
            type: BUSCAR_ITENS_PROMOCAO_ERRO,
            payload: msg
        }
    );

}

export const buscarTipoKit = (token) => {

    return dispatch => {
        axios.get(RELATIVE_PATH_SERVER + '/api/kit/v1/tipoKit', {
            headers: {
                'Authorization': 'Bearer ' + token,
            }
        }).then(response => {
            buscarTipoKitDados(response.data, dispatch);
        }).catch((e) => {
            buscarTipoKitErro('Não foi possível conectar com o servidor, verifique sua internet!', dispatch);
        });
    }
}

const buscarTipoKitDados = (listaTipoKit, dispatch) => {
    dispatch(
        {
            type: BUSCAR_ITENS_KIT,
            payload: listaTipoKit
        }
    );

}

const buscarTipoKitErro = (msg, dispatch) => {
    dispatch(
        {
            type: BUSCAR_ITENS_KIT_ERRO,
            payload: msg
        }
    );

}

buscarKitMain = (idTipoKit, dispatch, token) => {
    if (token == '') {
        buscarTokenId(idTipoKit, buscarKitMain, dispatch)
    } else {
        buscarTokenListaProdutosSucesso(token, dispatch);
        axios.get(RELATIVE_PATH_SERVER + '/api/kit/v1/kit/' + idTipoKit, {
            headers: {
                'Authorization': 'Bearer ' + token,
            }
        }).then(response => {
            buscarKitDados(response.data, dispatch);
        }).catch((e) => {
            if (e.response.status == "403") {
                buscarTokenId(idTipoKit, buscarKitMain, dispatch)
            } else {
                buscarKitErro('Não foi possível conectar com o servidor, verifique sua internet!', dispatch);
            }
        });
    }
}


export const buscarKit = (idTipoKit, token) => {
    var token = ''
    return dispatch => {


        dispatch(
            {
                type: ALTERAR_STATUS_LISTA_PRODUTOS_LOADING,
                payload: true
            }
        );

        buscarKitMain(idTipoKit, dispatch, token)

    }
}

const buscarKitDados = (listaKit, dispatch) => {
    dispatch(
        {
            type: BUSCAR_KIT,
            payload: listaKit
        }
    );

}

const buscarKitErro = (msg, dispatch) => {
    dispatch(
        {
            type: BUSCAR_KIT_ERRO,
            payload: msg
        }
    );

}


buscarKitNomeMain = (nomeDigitado, dispatch, token) => {
    if (token == '') {
        buscarTokenId(nomeDigitado, buscarKitMain, dispatch)
    } else {
        buscarTokenListaProdutosSucesso(token, dispatch);
        axios.get(RELATIVE_PATH_SERVER + '/api/kit/v1/kitByName/' + nomeDigitado, {
            headers: {
                'Authorization': 'Bearer ' + token,
            }
        }).then(response => {
            buscarKitPorNomeSucesso(response.data, dispatch);
        }).catch((e) => {
            if (e.response.status == "403") {
                buscarTokenId(nomeDigitado, buscarKitMain, dispatch)
            } else {
                buscarKitPorNomeErro('Não foi possível conectar com o servidor, verifique sua internet!', dispatch);
            }
        });
    }
}


export const buscarKitPorNome = (nomeDigitado, token) => {

    return dispatch => {
        dispatch(
            {
                type: ALTERAR_STATUS_LISTA_PRODUTOS_LOADING,
                payload: true
            }
        );

        buscarKitNomeMain(nomeDigitado, dispatch, token)
    }
}

const buscarKitPorNomeSucesso = (listaKitPesquisa, dispatch) => {
    dispatch(
        {
            type: BUSCAR_KIT_PELO_NOME,
            payload: listaKitPesquisa
        }
    );

}

const buscarKitPorNomeErro = (msg, dispatch) => {
    dispatch(
        {
            type: BUSCAR_KIT_PELO_NOME_ERRO,
            payload: msg
        }
    );

}

buscarListaItemKitMain = (idkit, dispatch, token) => {
    if (token == '') {
        buscarTokenId(idkit, buscarListaItemKitMain, dispatch)
    } else {
        axios.get(RELATIVE_PATH_SERVER + '/api/kit/v1/findItemKitById/' + idkit, {
            headers: {
                'Authorization': 'Bearer ' + token,
            }
        }).then(response => {
            buscarListaItemKitSucesso(response.data, dispatch);

        }).catch((e) => {
            if (e.response.status == "403") {
                buscarTokenId(idkit, buscarListaItemKitMain, dispatch)
            } else {
                buscarListaItemKitErro('Não foi possível conectar com o servidor, verifique sua internet!', dispatch);
            }
        });
    }
}

export const buscarListaItemKit = (idkit, token) => {
    return dispatch => {
        dispatch(
            {
                type: ALTERAR_STATUS_LISTA_ITEM_KIT_LOADING,
                payload: true
            }
        );
        buscarListaItemKitMain(idkit, dispatch, token);

    }
}

const buscarListaItemKitSucesso = (listaItemKit, dispatch) => {
    dispatch(
        {
            type: BUSCAR_LISTA_DE_ITENS_KIT,
            payload: listaItemKit
        }
    );

}

const buscarListaItemKitErro = (msg, dispatch) => {
    dispatch(
        {
            type: BUSCAR_LISTA_DE_ITENS_KIT_ERRO,
            payload: msg
        }
    );

}
const buscarTokenListaItemKitSucesso = (token, dispatch) => {
    dispatch(
        {
            type: BUSCAR_TOKEN_PRODUCT_DETAILS,
            payload: token
        }
    );

}

const buscarTokenListaItemKitErro = (msg, dispatch) => {
    dispatch(
        {
            type: BUSCAR_TOKEN_PRODUCT_DETAILS_ERRO,
            payload: msg
        }
    );

}


buscarProdutosMain = (idkit, dispatch, token) => {
    if (token == '') {
        buscarTokenId(idkit, buscarProdutosMain, dispatch)
    } else {
        axios.get(RELATIVE_PATH_SERVER + '/api/kit/v1/' + idkit, {
            headers: {
                'Authorization': 'Bearer ' + token,
            }
        }).then(response => {
            var itemkite = response.data;
            //buscarProdutoSucesso(itemkite, dispatch);
            Actions.productDetails({ kit: itemkite, isMain: true });
        }).catch((e) => {
            if (e.response.status == "403") {
                buscarTokenId(idkit, buscarProdutosMain, dispatch)
            } else {
                buscarProdutoErro('Não foi possível conectar com o servidor, verifique sua internet!', dispatch);
            }
        });
    }
}



export const buscarProdutos = (idkit) => {
    var token = ''
    return dispatch => {
        dispatch(
            {
                type: ALTERAR_STATUS_BAR_CODE_SCAN_LOADING,
                payload: true
            }
        );

        buscarProdutosMain(idkit, dispatch, token)
    }
}

const buscarProdutoSucesso = (itemKit, dispatch) => {
    dispatch(
        {
            type: BUSCAR_PRODUTOS_SUCESSO,
            payload: itemKit
        }
    );

}

const buscarProdutoErro = (msg, dispatch) => {
    dispatch(
        {
            type: BUSCAR_PRODUTOS_ERRO,
            payload: msg
        }
    );

}

const buscarTokenProdutoErro = (msg, dispatch) => {
    dispatch(
        {
            type: BUSCAR_TOKEN_BAR_CODE_SCAN_ERRO,
            payload: msg
        }
    );

}
buscarProdutosCarrosselMain = (idkit, dispatch, token) => {
    if (token == '') {
        buscarTokenId(idkit, buscarProdutosCarrosselMain, dispatch)
    } else {
        axios.get(RELATIVE_PATH_SERVER + '/api/kit/v1/' + idkit, {
            headers: {
                'Authorization': 'Bearer ' + token,
            }
        }).then(response => {
            var itemkite = response.data;
            //buscarProdutoSucesso(itemkite, dispatch);
            Actions.productDetails({ kit: itemkite, isMain: true });
        }).catch((e) => {
            if (e.response.status == "403") {
                buscarTokenId(idkit, buscarProdutosCarrosselMain, dispatch)
            } else {
                buscarProdutoErro('Não foi possível conectar com o servidor, verifique sua internet!', dispatch);
            }
        });
    }
}

export const buscarProdutosCarrossel = (idkit, token) => {
    return dispatch => {
        dispatch(
            {
                type: ALTERAR_STATUS_CARROSSEL_LOADING,
                payload: true
            }
        );
        buscarProdutosCarrosselMain(idkit, dispatch, token)
    }
}

// const buscarProdutoSucessoCarrossel = (itemKit, dispatch) => {
//     dispatch(
//         {
//             type: BUSCAR_PRODUTOS_CARROSSEL_SUCESSO,
//             payload: itemKit
//         }
//     );

// }

const buscarProdutoCarrosselErro = (msg, dispatch) => {
    dispatch(
        {
            type: BUSCAR_PRODUTOS_CARROSSEL_ERRO,
            payload: msg
        }
    );


}

const buscarTokenProdutoCarrosselErro = (msg, dispatch) => {
    dispatch(
        {
            type: BUSCAR_TOKEN_CARROSSEL_ERRO,
            payload: msg
        }
    );

}

export const alterarValorQuantidadeItemListakit = (item) => {
    return dispatch => {
        dispatch(
            {
                type: ALTERAR_VALOR_QUANTIDADE_ITEM_LISTA_KIT,
                payload: item
            }
        );
    }

}

export const alterVisibilidadeBotao = (status) => {
    return {
        type: ALTERAR_VISIBILIDADE_BOTAO_COMPRAR,
        payload: status
    }
}

const salvarItemCestaServeMain = (state, dispatch, token) => {
    if (token == '') {
        buscarTokenId(state, salvarItemCestaServeMain, dispatch)
    } else {
        console.log("estou no prod")
        console.log(state)
        axios.post(RELATIVE_PATH_SERVER + '/api/cesta/v1/saveCesta',
            state,
            {
                headers: {
                    'Authorization': 'Bearer ' + token,
                }

            }
        ).then(response => {
            salvarItemCestaServeSucesso(response.data, dispatch);
            if (response.data.erro == undefined || response.data.erro === '') {
                salvarIdMobileLocal(response.data.idMobile, ID_MOBILE, dispatch);
                Actions.basket({ token: token });
            } else {
                salvarItemCestaServeErro(response.data.erro, dispatch);
            }
        }).catch((e) => {
            if (e.response.status == "403") {
                buscarTokenId(state, salvarItemCestaServeMain, dispatch)
            } else {
                salvarItemCestaServeErro('Não foi possível conectar com o servidor, verifique sua internet!', dispatch);
            }
        });
    }
}

export const salvarItemCestaServe = (state, token) => {
    return dispatch => {
        dispatch(
            {
                type: ALTERAR_STATUS_PRODUCT_DETAILS_LOADING,
                payload: true
            }
        );
        salvarItemCestaServeMain(state, dispatch, token)

    }
}
const salvarItemCestaServeSucesso = (itemCestaSalvoComSucesso, dispatch) => {
    dispatch(
        {
            type: SALVAR_ITEM_CESTA_SERVE,
            payload: itemCestaSalvoComSucesso
        }
    );

}
const salvarItemCestaServeErro = (msg, dispatch) => {
    dispatch(
        {
            type: ENVIAR_ITENS_CESTA_ERRO,
            payload: msg
        }
    );
}

export const alterStatusLoadingProductDetails = (status) => {
    return {
        type: LOADING_ENVIANDO_ITEM,
        payload: status
    }
}

export const salvarIdUsuarioLocal = (objeto, nomeVariavel, dispatch) => {
    var erro = 'Não foi possível salvar usuario!'
    salvarLocal(nomeVariavel, objeto, SALVAR_ID_USUARIO, dispatch, SALVAR_ID_USUARIO_ERRO, erro)
}

export const buscarIdUsuarioLocal = (nomeVariavel) => {
    var erro = ''
    return dispatch => {
        {
            buscarLocal(nomeVariavel, BUSCAR_ID_USUARIO, dispatch, BUSCAR_ID_USUARIO_ERRO, erro)
        }
    }

}

export const salvarIdMobileLocal = (objeto, nomeVariavel, dispatch) => {
    var erro = 'Não foi possível salvar mobile!'
    salvarLocal(nomeVariavel, objeto, SALVAR_ID_MOBILE, dispatch, SALVAR_ID_MOBILE_ERRO, erro)
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



