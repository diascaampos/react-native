import {
    ALTERAR_STATUS_TIMELINE_LOADING,
    BUSCAR_TOKEN_TIMELINE_SUCESSO,
    BUSCAR_TOKEN_TIMELINE_ERRO
} from '../actions/Types'

const INITIAL_STATE = {
    token: '',
    loadingTimeLine: false,
    msg:'',
}
 
export default (state = INITIAL_STATE, action) =>{

    switch(action.type){

        case ALTERAR_STATUS_TIMELINE_LOADING:{
            return {... state, msg: '', loadingTimeLine:action.payload}
        }
        case BUSCAR_TOKEN_TIMELINE_SUCESSO:{
            return {... state, msg: '', token:action.payload}
        }
        case BUSCAR_TOKEN_TIMELINE_ERRO:{
            return {... state, msg: action.payload, loadingTimeLine: false}
        }
    
    }  
    return state;
}