import {
    BUSCAR_LIST_SCHOOLS_ERRO,
    ALTERAR_STATUS_LIST_SCHOOLS_LOADING,
    BUSCAR_LIST_SCHOOLS_SUCESSO,
    BUSCAR_TOKEN_LIST_SCHOOLS_ERRO,
    ALTERAR_STATUS_FIND_KIT_BY_SCHOOLS_LOADING,
    BUSCAR_KIT_BY_SCHOOLS_SUCESSO,
    BUSCAR_KIT_BY_SCHOOLS_ERRO,
    BUSCAR_TOKEN_KIT_BY_SCHOOLS_ERRO,
    BUSCAR_SCHOOLS_BY_NOME_SUCESSO,
    BUSCAR_SCHOOLS_BY_NOME_ERRO,
    BUSCAR_TOKEN_SCHOOLS_BY_NOME_ERRO,
} from './Types'

import {
    LOGIN_TOKEN, PASSWORD_TOKEN,
    RELATIVE_PATH_SERVER
} from '../util/Constants'
import axios from 'axios'
import { importDefaultSpecifier } from '@babel/types'
import { Actions } from 'react-native-router-flux';

export const alterStatusLoading = (status) => {
    return {
        type: ALTERAR_STATUS_LIST_SCHOOLS_LOADING,
        payload: status
    }
}

export const buscarListSchools = () => {
    var token = '';
    return dispatch => {

        dispatch(
            {
                type: ALTERAR_STATUS_LIST_SCHOOLS_LOADING,
                payload: true
            }
        );

        axios.post(RELATIVE_PATH_SERVER + '/auth/signin',
            {
                "username": LOGIN_TOKEN,
                "password": PASSWORD_TOKEN
            }
        ).then(response => {
            token = response.data.token;

            axios.get(RELATIVE_PATH_SERVER + '/api/parceiro/v1/findEscola', {
                headers: {
                    'Authorization': 'Bearer ' + token,
                }
            }).then(response => {
                buscarListSchoolsDados(response.data._embedded.parceiroVoes, dispatch);
            }).catch((e) => {
                alert(e)
                buscarListSchoolsErro('Não foi possível conectar com o servidor, verifique sua internet!', dispatch);
            });


        }).catch((e) => {
            buscarTokenListSchoolsErro('Não foi possível conectar com o servidor, verifique sua internet!', dispatch);
        });
    }
}

const buscarListSchoolsDados = (listSchools, dispatch) => {
    dispatch(
        {
            type: BUSCAR_LIST_SCHOOLS_SUCESSO,
            payload: listSchools
        }
    );

}

const buscarListSchoolsErro = (msg, dispatch) => {
    dispatch(
        {
            type: BUSCAR_LIST_SCHOOLS_ERRO,
            payload: msg
        }
    );

}

const buscarTokenListSchoolsErro = (msg, dispatch) => {
    dispatch(
        {
            type: BUSCAR_TOKEN_LIST_SCHOOLS_ERRO,
            payload: msg
        }
    );

}

export const alterStatusLoadingBuscarKitBySchool = (status) => {
    return {
        type: ALTERAR_STATUS_FIND_KIT_BY_SCHOOLS_LOADING,
        payload: status
    }
}

export const buscarKitBySchool = (idEscola) => {
    var token = '';
    return dispatch => {

        dispatch(
            {
                type: ALTERAR_STATUS_FIND_KIT_BY_SCHOOLS_LOADING,
                payload: true
            }
        );

        axios.post(RELATIVE_PATH_SERVER + '/auth/signin',
            {
                "username": LOGIN_TOKEN,
                "password": PASSWORD_TOKEN
            }
        ).then(response => {
            token = response.data.token;
            axios.get(RELATIVE_PATH_SERVER + '/api/kit/v1/buscarKitEscola/' + idEscola, {
                headers: {
                    'Authorization': 'Bearer ' + token,
                }
            }).then(response => {
                // alert('entrei')
                //buscarKitBySchoolDados(response.data._embedded.kitVoes, dispatch)
                dispatch(
                    {
                        type: ALTERAR_STATUS_FIND_KIT_BY_SCHOOLS_LOADING,
                        payload: false
                    }
                );
                if (response.data !== '') {
                    Actions.listaProdutos({ listKitItens: response.data._embedded.kitVoes })
                } else {
                    buscarKitBySchoolErro('Nenhum kit foi encontrado para a escola escolhida', dispatch);
                }


            }).catch((e) => {
                buscarKitBySchoolErro('Não foi possível conectar com o servidor, verifique sua internet!', dispatch);
            });


        }).catch((e) => {
            buscarTokenKitBySchoolErro('Não foi possível conectar com o servidor, verifique sua internet!', dispatch);
        });
    }
}

const buscarKitBySchoolDados = (listKitSchool, dispatch) => {
    dispatch(
        {
            type: BUSCAR_KIT_BY_SCHOOLS_SUCESSO,
            payload: listKitSchool
        }
    );

    
}

const buscarKitBySchoolErro = (msg, dispatch) => {

    dispatch(
        {
            type: BUSCAR_KIT_BY_SCHOOLS_ERRO,
            payload: msg
        }
    );

}

const buscarTokenKitBySchoolErro = (msg, dispatch) => {
    dispatch(
        {
            type: BUSCAR_TOKEN_KIT_BY_SCHOOLS_ERRO,
            payload: msg
        }
    );

}



export const buscarSchoolsByNome = (nomeEscola) => {
    var token = '';
    return dispatch => {

        dispatch(
            {
                type: ALTERAR_STATUS_LIST_SCHOOLS_LOADING,
                payload: true
            }
        );

        axios.post(RELATIVE_PATH_SERVER + '/auth/signin',
            {
                "username": LOGIN_TOKEN,
                "password": PASSWORD_TOKEN
            }
        ).then(response => {
            token = response.data.token;

            axios.get(RELATIVE_PATH_SERVER + '/api/parceiro/v1/findParceiroEscolaByNome/'+nomeEscola, {
                headers: {
                    'Authorization': 'Bearer ' + token,
                }
            }).then(response => {
                buscarSchoolsByNomeDados(response.data._embedded.parceiroVoes, dispatch);
            }).catch((e) => {
                alert(e)
                buscarSchoolsByNomeErro('Não foi possível conectar com o servidor, verifique sua internet!', dispatch);
            });


        }).catch((e) => {
            buscarTokenSchoolsByNomeErro('Não foi possível conectar com o servidor, verifique sua internet!', dispatch);
        });
    }
}

const buscarSchoolsByNomeDados = (listSchools, dispatch) => {
    dispatch(
        {
            type: BUSCAR_SCHOOLS_BY_NOME_SUCESSO,
            payload: listSchools
        }
    );

}

const buscarSchoolsByNomeErro = (msg, dispatch) => {
    dispatch(
        {
            type: BUSCAR_SCHOOLS_BY_NOME_ERRO,
            payload: msg
        }
    );

}

const buscarTokenSchoolsByNomeErro = (msg, dispatch) => {
    dispatch(
        {
            type: BUSCAR_TOKEN_SCHOOLS_BY_NOME_ERRO,
            payload: msg
        }
    );

}