import { combineReducers } from 'redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import Vocabulary_Reducer from './Reducer/Vocabulary_Reducer';
import errorReducer from './Reducer/errorReducer';
const middleWare = [thunk];
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const myReducer = combineReducers({
  vocabulary: Vocabulary_Reducer,
  error: errorReducer
});
var store = createStore(
  myReducer,
  composeEnhancers(applyMiddleware(...middleWare))
);
// store.subscribe(function(){
//   console.log(JSON.stringify(store.getState()));
// })
export default store;