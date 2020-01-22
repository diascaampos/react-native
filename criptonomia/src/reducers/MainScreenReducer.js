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
    SETAR_TOKEN,
    BUSCAR_TOKEN_LISTA_PRODUTOS,
    BUSCAR_TOKEN_LISTA_PRODUTOS_ERRO,
    LIMPAR_TOKEN_LISTA_PRODUTO,
    ALTERAR_STATUS_LISTA_PRODUTOS_LOADING,
    BUSCAR_LISTA_DE_ITENS_KIT,
    BUSCAR_LISTA_DE_ITENS_KIT_ERRO,
    BUSCAR_TOKEN_PRODUCT_DETAILS,
    BUSCAR_TOKEN_PRODUCT_DETAILS_ERRO,
    LIMPAR_TOKEN_PRODUCT_DETAILS,
    ALTERAR_STATUS_LISTA_ITEM_KIT_LOADING,
    BUSCAR_PRODUTOS_SUCESSO,
    BUSCAR_PRODUTOS_ERRO,
    ALTERAR_STATUS_BAR_CODE_SCAN_LOADING,
    BUSCAR_TOKEN_BAR_CODE_SCAN_SUCESSO,
    BUSCAR_TOKEN_BAR_CODE_SCAN_ERRO,
    BUSCAR_PRODUTOS_CARROSSEL_ERRO,
    ALTERAR_STATUS_CARROSSEL_LOADING,
    ALTERAR_VALOR_QUANTIDADE_ITEM_LISTA_KIT,
    ALTERAR_VISIBILIDADE_BOTAO_COMPRAR,
    SALVAR_ITEM_CESTA_SERVE,
    ENVIAR_ITENS_CESTA_ERRO,
    LOADING_ENVIANDO_ITEM,
    ALTERAR_STATUS_PRODUCT_DETAILS_LOADING,
    SALVAR_ID_USUARIO,
    SALVAR_ID_USUARIO_ERRO,
    BUSCAR_ID_USUARIO,
    BUSCAR_ID_USUARIO_ERRO,
    BUSCAR_ID_MOBILE,
    BUSCAR_ID_MOBILE_ERRO,
    SALVAR_ID_MOBILE,
    SALVAR_ID_MOBILE_ERRO,
    ALTERAR_STATUS_MSG

} from '../actions/Types'


const INITIAL_STATE = {
    listaPromocao: [],
    listaTipoKit: [],
    listaKit: [],
    loading: true,
    token: '',
    loadingListaProdutos: true,
    msg: '',
    listaItensKit: [],
    loadingListaItensKit: true,
    itenKit: '',
    loadingBuscarProduto: false,
    itemListKit: [],
    mostrarBotaoContinuar: true,
    itemCestaServe: [],
    isFindIdUsuario: false,
    idUsuario: 0,
    idMobile:0,
    isFindIdMobile: false

}

export default (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case BUSCAR_TOKEN: {
            return { ...state, token: action.payload, msg: '' }
        }
        case BUSCAR_TOKEN_ERRO: {
            return { ...state, msg: action.payload, loading: true }
        }
        case BUSCAR_ITENS_PROMOCAO: {
            return { ...state, listaPromocao: action.payload, msg: '' }
        }
        case BUSCAR_ITENS_PROMOCAO_ERRO: {
            return { ...state, msg: action.payload, loading: false }
        }
        case BUSCAR_ITENS_KIT: {
            return { ...state, listaTipoKit: action.payload, loading: false, msg: '' }
        }
        case BUSCAR_ITENS_KIT_ERRO: {
            return { ...state, msg: action.payload, loading: false }
        }
        case LIMPAR_TOKEN: {
            return { ...state, token: action.payload, listaPromocao: [], listaTipoKit: [] }
        }
        case ALTERAR_KIT_BY_SCHOOL_DADOS: {
            return { ...state, listaKit: action.payload, loadingListaProdutos: false, msg: '' }
        }
        case BUSCAR_KIT: {
            return { ...state, listaKit: action.payload, loadingListaProdutos: false, msg: '' }
        }
        case BUSCAR_KIT_ERRO: {
            return { ...state, msg: action.payload, loadingListaProdutos: false }
        }
        case ALTERAR_STATUS_LOADING: {
            return { ...state, msg: '', loading: action.payload }
        }
        case BUSCAR_KIT_PELO_NOME: {
            return { ...state, listaKit: action.payload, loadingListaProdutos: false, msg: '' }
        }
        case BUSCAR_KIT_PELO_NOME_ERRO: {
            return { ...state, msg: action.payload, loadingListaProdutos: false }
        }
        case SETAR_TOKEN: {
            return { ...state, token: action.payload, loading: true }
        }
        case BUSCAR_TOKEN_LISTA_PRODUTOS: {
            return { ...state, token: action.payload, msg: '', listaItensKit: [], loadingListaItensKit: true }
        }
        case BUSCAR_TOKEN_LISTA_PRODUTOS_ERRO: {
            return { ...state, msg: action.payload, loadingListaProdutos: false }
        }
        case LIMPAR_TOKEN_LISTA_PRODUTO: {
            return { ...state, token: action.payload, listaKit: [] }
        }
        case ALTERAR_STATUS_LISTA_PRODUTOS_LOADING: {
            return { ...state, msg: '', loadingListaProdutos: action.payload }
        }
        case BUSCAR_LISTA_DE_ITENS_KIT: {
            return { ...state, listaItensKit: action.payload, loadingListaItensKit: false, msg: '' }
        }
        case BUSCAR_LISTA_DE_ITENS_KIT_ERRO: {
            return { ...state, msg: action.payload, loadingListaItensKit: false }
        }
        case BUSCAR_TOKEN_PRODUCT_DETAILS: {
            return { ...state, token: action.payload, msg: '' }
        }
        case BUSCAR_TOKEN_PRODUCT_DETAILS_ERRO: {
            return { ...state, msg: action.payload, loadingListaItensKit: false }
        }
        case LIMPAR_TOKEN_PRODUCT_DETAILS: {
            return { ...state, token: action.payload, listaItensKit: [] }
        }
        case ALTERAR_STATUS_LISTA_ITEM_KIT_LOADING: {
            return { ...state, msg: '', loadingListaItensKit: action.payload, listaItensKit: [] }
        }
        case BUSCAR_PRODUTOS_SUCESSO: {
            return { ...state, msg: '', itenKit: action.payload }
        }
        case BUSCAR_PRODUTOS_ERRO: {
            return { ...state, msg: action.payload, loadingBuscarProduto: false }
        }
        case ALTERAR_STATUS_BAR_CODE_SCAN_LOADING: {
            return { ...state, msg: '', loadingBuscarProduto: action.payload, itenKit: '' }
        }
        case BUSCAR_TOKEN_BAR_CODE_SCAN_SUCESSO: {
            return { ...state, msg: '', loadingBuscarProduto: false }
        }
        case BUSCAR_TOKEN_BAR_CODE_SCAN_ERRO: {
            return { ...state, msg: action.payload, loadingBuscarProduto: false }
        }

        case ALTERAR_STATUS_CARROSSEL_LOADING: {
            return { ...state, msg: '', loading: action.payload }
        }

        case BUSCAR_PRODUTOS_CARROSSEL_ERRO: {
            return { ...state, msg: action.payload, loadingListaItensKit: false }
        }
        case ALTERAR_VALOR_QUANTIDADE_ITEM_LISTA_KIT: {
            return { ...state, itemListKit: action.payload }
        }
        case ALTERAR_VISIBILIDADE_BOTAO_COMPRAR: {
            return { ...state, mostrarBotaoContinuar: action.payload }
        }
        case SALVAR_ITEM_CESTA_SERVE: {
            return { ...state, msg: '', itemCestaServe: action.payload, loadingListaItensKit: false }
        }
        case ENVIAR_ITENS_CESTA_ERRO: {
            return { ...state, msg: action.payload, loadingListaItensKit: false }
        }
        case LOADING_ENVIANDO_ITEM: {
            return { ...state, msg: '', loadingListaItensKit: action.payload }
        }
        case ALTERAR_STATUS_PRODUCT_DETAILS_LOADING: {
            return { ...state, msg: '', loading: action.payload }
        }
        case SALVAR_ID_USUARIO: {
            return { ...state, msg: '', idUsuario: action.payload, isFindIdUsuario: true }
        }
        case SALVAR_ID_USUARIO_ERRO: {
            return { ...state, msg: action.payload, idUsuario: 0, isFindIdUsuario: true }
        }
        case BUSCAR_ID_USUARIO: {
            console.log(action.payload)
            var objLogin = JSON.parse(action.payload)
            console.log('to Aqui')
            console.log(objLogin)
            console.log(objLogin.idUsuario)
            return { ...state, msg: '', idUsuario: objLogin.idUsuario, isFindIdUsuario: true, isFindIdMobile: false }
        }
        case BUSCAR_ID_USUARIO_ERRO: {
            return { ...state, msg: action.payload, idUsuario: 0, isFindIdUsuario: true , isFindIdMobile:false}
        }
        case SALVAR_ID_MOBILE: {
            return { ...state, msg: '', idMobile: action.payload, isFindIdMobile: false }
        }
        case SALVAR_ID_MOBILE_ERRO: {
            return { ...state, msg: action.payload, idMobile: 0, isFindIdMobile: true }
        }
        case BUSCAR_ID_MOBILE: {
            return { ...state, msg: '', idMobile: action.payload, isFindIdMobile: true}
        }
        case BUSCAR_ID_MOBILE_ERRO: {
            return { ...state, msg: action.payload, idMobile: 0, isFindIdMobile: true }
        }
        case ALTERAR_STATUS_MSG: {
            return { ...state, msg: action.payload}
        }

    }
    return state;
}