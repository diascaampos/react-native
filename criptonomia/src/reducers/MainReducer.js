import {
    BUSCAR_TOKEN_LOCAL,
    ALTERAR_STATUS_MAIN_LOADING,
    BUSCAR_COMPANY_LOCAL,
    BUSCAR_TOKEN_LOCAL_ERRO,
    BUSCAR_COMPANY_LOCAL_ERRO
} from '../actions/Types'

const INITIAL_STATE = {
    token: '',
    loading: true,
    msg: '',
    company:'',
    accesses: [],
    isFindToken: false,
    isFindCompany: false,
}

export default (state = INITIAL_STATE, action) =>{
    switch(action.type){
        
        case BUSCAR_TOKEN_LOCAL :{
            return {... state, token: action.payload, msg:'', isFindToken: true, loading:false}
        }
        case BUSCAR_TOKEN_LOCAL_ERRO :{
            return {... state, msg: action.payload, loading:false, isFindToken:true} 
        }
        case ALTERAR_STATUS_MAIN_LOADING :{
            return {... state, msg: '', loading:action.payload}
        }
        case BUSCAR_COMPANY_LOCAL :{
            return {... state, company: action.payload, msg:'', loading:false, isFindCompany: true}
        }
        case BUSCAR_COMPANY_LOCAL_ERRO :{
            return {... state, msg: action.payload, loading:false, isFindCompany: true} 
        }
        
        
    }  
        return state;
}
    