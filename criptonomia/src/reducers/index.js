import {combineReducers} from 'redux';
import Autenticacaoreducer from './AutenticacaoReducer'
import MainScreenReducer from './MainScreenReducer'
import ListSchoolsReducer from './ListSchoolsReducer'
import BasketReducer from './BasketReducer'
import AddressReducer from './AddressReducer'
import LoginReducer from './LoginReducer'
import CreateAccountReducer from './CreateAccountReducer'
import PaymentReducer from './PaymentReducer'
import RecoverPasswordReducer from './RecoverPasswordReducer'
import RequestsReducer from './RequestsReducer'
import TimeLineReducer from './TimeLineReducer'
import HomePagReducer from './HomePagReducer'
import OrdensReducer from './OrdensReducer'
import SubLoginReducer from'./SubLoginReducer'
export default combineReducers({
    LoginReducer: LoginReducer,
    HomePagReducer : HomePagReducer,
    OrdensReducer : OrdensReducer,
    Autenticacaoreducer: Autenticacaoreducer,
    MainScreenReducer: MainScreenReducer,
    ListSchoolsReducer: ListSchoolsReducer,
    BasketReducer: BasketReducer,
    AddressReducer: AddressReducer,
    CreateAccountReducer: CreateAccountReducer,
    PaymentReducer: PaymentReducer,
    RecoverPasswordReducer: RecoverPasswordReducer,
    RequestsReducer: RequestsReducer,
    TimeLineReducer: TimeLineReducer,
    SubLoginReducer: SubLoginReducer,
    
})