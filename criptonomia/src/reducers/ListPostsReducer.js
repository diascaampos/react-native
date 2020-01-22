import {
    IMPORT_LIST_SUCCESS,
    ALTER_LOADING_LIST_POST,
    IMPORT_LIST_ERRO
} from '../actions/Types'

const INITIAL_STATE = {
    loadingListPost: true,
    listPostDados: [],
    msg:''
}
 
export default (state = INITIAL_STATE, action) =>{

    switch(action.type){

        case ALTER_LOADING_LIST_POST:{
            return {... state, msg: '', loadingListPost:action.payload}
        }
        case IMPORT_LIST_SUCCESS:{
            return {... state, msg: '', listPostDados:action.payload, loadingListPost:false}
        }
        case IMPORT_LIST_ERRO:{
            return {... state, msg: action.payload, loadingListPost:false}
        }
        
    }  
    return state;
}