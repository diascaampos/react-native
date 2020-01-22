import {
  BUSCAR_TOKEN,
  BUSCAR_TOKEN_ERRO,
  MODIFICA_EMAIL,
  MODIFICA_SENHA,
  LOGAR_USUARIO,
  LOGIN_ANDAMENTO,
  ALTERAR_STATUS_LOGIN_LOADING,
  LOGAR_ERRO
} from './Types'
import {
  RELATIVE_PATH_SERVER,
  TOKEN,
  
} from '../util/Contants'

import { openDatabaseHelper, salvarLocal, buscarLocal } from '../util/Helpers'
import { Actions } from 'react-native-router-flux';
import axios from 'axios'

export const buscarTokenLocal = (chave) => {
  var erro = 'Não foi possível buscar usuario!'
  return dispatch => {
     { 
       buscarLocal(chave, BUSCAR_TOKEN, dispatch, BUSCAR_TOKEN_ERRO, erro)
     }
  }

}

export const modificaEmail = (texto) => {
  console.log(texto);
  return {
    type: MODIFICA_EMAIL,
    payload: texto
  }
}

export const modificaSenha = (texto) => {
  console.log(texto);
  return {
    type: MODIFICA_SENHA,
    payload: texto
  }
}

export const logarUsuario = ({ email, senha }) => {

  var token = '';
  return dispatch => {

    if (email === '') {
      logarUsuarioErro("O Email é obrigatório!", dispatch)
    } else if (senha === '') {
      logarUsuarioErro("A senha é obrigatória!", dispatch)
    } else {
      //dispatch({type: LOGIN_ANDAMENTO});

      dispatch(
        {
            type: ALTERAR_STATUS_LOGIN_LOADING,
            payload: true
        }
    );

      axios.post(RELATIVE_PATH_SERVER + '/api/v1/tokens',
      {
        "email": email,
        "password": senha
      }
      ).then(response => {
        token = response.data.token;  
        erro = 'Não foi possível salvar token local!'
        salvarLocal(TOKEN, token, BUSCAR_TOKEN, dispatch, BUSCAR_TOKEN_ERRO, erro )

        console.log("teste token:\n"+token+ "\n")
        console.log("tela Main token 2")
      
        Actions.selectCompanies({token: token});

      }).catch((e) => {
        buscarTokenErro('Não foi possível conectar com o servidor, verifique sua internet!', dispatch);
      });
    }
  }
}

// export const logarUsuario = ({email,senha}) =>{
//     return dispatch =>{
//       alert(email)
//       if(email === ''){
//         logarUsuarioErro("O Email é obrigatório!", dispatch)
//       }else if(senha === ''){
//         logarUsuarioErro("A senha é obrigatória!", dispatch)
//       } else {


//         dispatch({type: LOGIN_ANDAMENTO});
//         var db = openDatabaseHelper();

//           db.transaction(function(tx) {
//               tx.executeSql("SELECT * FROM usuario where email = ? and senha = ?", [email, senha], (tx, rs) => {
//                 var len = rs.rows.length;
//                 var array = []; 

//                 for(let i = 0; i < len; i++){
//                   let row = rs.rows.item(i);
//                   array[i] = row;
//                 // alert('vou entrar'+ row.email)
//                 }
//                 if(len > 0){
//                   logarUsuarioSucesso(array, dispatch);  
//                   Actions.listaOpcoes({email});
//                 }else{
//                   logarUsuarioErro("Email ou senha inválidos!", dispatch)
//                 }

//                 /*for(let i = 0; i < len; i++){
//                   let row = rs.rows.item(i);


//                 }*/
//               }, function(tx, error) { 
//                 //alert(error) 
//                 logarUsuarioErro("Não foi possível recuperar o usuário",dispatch)
//               });
//             });  
//     }
//   } 
// }


const buscarTokenErro = (msg, dispatch) => {
  dispatch(
      {
          type: BUSCAR_TOKEN_ERRO,
          payload: msg
      }
  );

}

export const incluirUsuario = ({ email, senha }) => {

  return dispatch => {
    var db = openDatabaseHelper();
    db.transaction(function (tx) {
      tx.executeSql("insert into usuario (email, senha) values ('" + email + "', '" + senha + "')", [], (tx, rs) => {

        logarUsuarioSucesso([], dispatch);

      }, function (tx, error) {

        logarUsuarioErro("Não foi possível incluir usuário", dispatch)
      });
    });
  }

}



const logarUsuarioSucesso = (array, dispatch) => {
  dispatch(
    {
      type: LOGAR_USUARIO,
      payload: array
    }
  );

}

const logarUsuarioErro = (error, dispatch) => {
  dispatch(
    {
      type: LOGAR_ERRO,
      payload: error
    }
  );
}



