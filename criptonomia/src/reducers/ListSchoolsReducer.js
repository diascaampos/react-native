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

} from '../actions/Types'

const INITIAL_STATE = {
    loadingListSchools: true,
  
    listSchools: [],
    listKitSchool: [],
    msg:''
}
 
export default (state = INITIAL_STATE, action) =>{

switch(action.type){

    case BUSCAR_LIST_SCHOOLS_SUCESSO :{
        return {... state, listSchools: action.payload, loadingListSchools:false, msg:''}
    }
    case ALTERAR_STATUS_LIST_SCHOOLS_LOADING:{
        return {... state, msg: '', loadingListSchools:action.payload}
    }
    case BUSCAR_LIST_SCHOOLS_ERRO:{
        return {... state, msg: action.payload, loadingListSchools:false}
    }
    case BUSCAR_TOKEN_LIST_SCHOOLS_ERRO:{
        return {... state, msg: action.payload, loadingListSchools:false}
    }
    case BUSCAR_KIT_BY_SCHOOLS_SUCESSO :{
        return {... state, listKitSchool: action.payload, loadingListSchools:false, msg:''}
    }
    case ALTERAR_STATUS_FIND_KIT_BY_SCHOOLS_LOADING:{
        return {... state, msg: '', loadingListSchools:action.payload}
    }
    case BUSCAR_KIT_BY_SCHOOLS_ERRO:{
        return {... state, msg: action.payload, loadingListSchools:false}
    }
    case BUSCAR_TOKEN_KIT_BY_SCHOOLS_ERRO:{
        return {... state, msg: action.payload, loadingListSchools:false}
    }
    case BUSCAR_SCHOOLS_BY_NOME_SUCESSO :{
        return {... state, listSchools: action.payload, loadingListSchools:false, msg:''}
    }
    case BUSCAR_SCHOOLS_BY_NOME_ERRO:{
        return {... state, msg: action.payload, loadingListSchools:false}
    }
    case BUSCAR_TOKEN_SCHOOLS_BY_NOME_ERRO:{
        return {... state, msg: action.payload, loadingListSchools:false}
    }
    

}  
    return state;
}