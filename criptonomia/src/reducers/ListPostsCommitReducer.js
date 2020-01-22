import {
    IMPORT_LIST_COMMIT_POST_SUCCESS,
    ALTER_LOADING_LIST_COMMIT_POST,
    IMPORT_LIST_COMMIT_POST_ERRO
} from '../actions/Types'

const INITIAL_STATE = {
    loadingListCommitPost: true,
    listPostCommitDados: [],
    msg:''
}
 
export default (state = INITIAL_STATE, action) =>{

    switch(action.type){

        case ALTER_LOADING_LIST_COMMIT_POST:{
            return {... state, msg: '', loadingListCommitPost:action.payload}
        }
        case IMPORT_LIST_COMMIT_POST_SUCCESS:{
            return {... state, msg: '', listPostCommitDados:action.payload, loadingListCommitPost:false}
        }
        case IMPORT_LIST_COMMIT_POST_ERRO:{
            return {... state, msg: action.payload, loadingListCommitPost:false}
        }
        
    }  
    return state;
}