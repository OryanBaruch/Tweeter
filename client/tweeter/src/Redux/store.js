import {combineReducers ,createStore, applyMiddleware} from 'redux'
import { composeWithDevTools } from "redux-devtools-extension";
import {registerReducer, loginReducer} from './Reducers/userReducer'
import thunk from "redux-thunk";


const combine_reducers=combineReducers({
    registerReducer,
    loginReducer
})

const middleware=[thunk]
const store=createStore(
    combine_reducers,composeWithDevTools(applyMiddleware(...middleware))
)

 export default store;