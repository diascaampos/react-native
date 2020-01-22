import {
    IMPORT_LIST_USER_SUCCESS,
    IMPORT_LIST_USER_ERRO,
    ALTER_LOADING_LIST_USER,
    SAVE_USER,
    SAVE_ADDRESS,
    SAVE_COMPANY
} from '../actions/Types'

const INITIAL_STATE = {
    loadingListUser: true,
    listUserDados: [],
    msg:'',
    userSave:[],
    addressSave:[],
    companySave:[]
}
 
export default (state = INITIAL_STATE, action) =>{

    switch(action.type){

        case ALTER_LOADING_LIST_USER:{
            return {... state, msg: '', loadingListUser:action.payload}
        }
        case IMPORT_LIST_USER_SUCCESS:{
            return {... state, msg: '', listUserDados:action.payload, loadingListUser:false}
        }
        case IMPORT_LIST_USER_ERRO:{
            return {... state, msg: action.payload, loadingListUser:false}
        }
        case SAVE_USER:{
            return {... state, userSave:action.payload}
        }
        case SAVE_ADDRESS:{
            return {... state, addressSave:action.payload}
        }
        case SAVE_COMPANY:{
            return {... state, companySave:action.payload}
        }
        
    }  
    return state;
}