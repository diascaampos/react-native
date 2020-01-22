import {
  BUSCAR_TOKEN_LOCAL,
  ALTERAR_STATUS_MAIN_LOADING,
  BUSCAR_COMPANY_LOCAL,
  BUSCAR_TOKEN_LOCAL_ERRO,
  BUSCAR_COMPANY_LOCAL_ERRO
} from './Types'

import {buscarLocal } from '../util/Helpers'



export const alterStatusLoading = (status) => {
  return {
    type: ALTERAR_STATUS_MAIN_LOADING,
    payload: status
  }
}

export const buscarTokenLocal = (chave) => {
  var erro = 'Não foi possível buscar usuario!'
  return dispatch => {
    {
      buscarLocal(chave, BUSCAR_TOKEN_LOCAL, dispatch, BUSCAR_TOKEN_LOCAL_ERRO, erro)
     
    }
  }
 
}

export const buscarUserCompanyLocal = (chave) => {
  var erro = 'Não foi possível buscar usuario!'
  return dispatch => {
    {
      buscarLocal(chave, BUSCAR_COMPANY_LOCAL, dispatch, BUSCAR_COMPANY_LOCAL_ERRO, erro)
    }
  }

}


