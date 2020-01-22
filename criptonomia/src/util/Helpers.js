import { AsyncStorage } from 'react-native';

export const salvarLocal = async (nomeObjeto, objeto, type, dispatch, typeErro, erro) => {
  
  try {
    console.log("entrei salvar")
    await AsyncStorage.setItem(nomeObjeto, objeto);
    dispatch(
      {
        type: type,
        payload: objeto
      }
    );
  } catch (error) {
    console.log(error)
    dispatch(
      {
        type: typeErro,
        payload: erro
      }
    );
  }
};

export const buscarLocal = async (nomeObjeto, type, dispatch, typeErro, erro) => {
  
  try {
    const value = await AsyncStorage.getItem(nomeObjeto);
    if (value != undefined && value != null) {
      console.log("entrei no if do buscar")
      dispatch(
        {
          type: type,
          payload: value
        }
      );
    } else {
      console.log("entrei no else do buscar")
      dispatch(
        {
          type: typeErro,
          payload: erro
        }
      );
    }
  } catch (error) {
    console.log(error)
    dispatch(
      {
        type: typeErro,
        payload: erro
      }
    );
  }
};






