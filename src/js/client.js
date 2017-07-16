/*Necesitamos crear nuestra tienda*/
/*Redux Middleware es la solución
para peticiones ajax y async*/
import {createStore, applyMiddleware} from "redux";
import axios from "axios";
import { createLogger } from 'redux-logger'
import thunk from "redux-thunk";
import promise from "redux-promise-middleware";

/*Los reducers son los encargados de actualizar
nuestro state del single store*/
const initialState = {
	fetching: false,
	fetched: false,
	users: [],
	error: null
}
const reducer = (state = initialState, action) =>{
	switch(action.type){
		case 'FETCH_USERS_PENDING': {
			return {
				...state, 
				fetching: true
			}
			break;
		}
		case 'FETCH_USERS_REJECTED': {
			return {
					...state, 
					fetching: false, 
					fetched: true, 
					users: action.payload
				}
			break;
		}
		case 'FETCH_USERS_FULFILLED':{
			return {
				...state, 
				fetching: false, 
				users: action.payload.data
			}
			break;
		}
	}
	return state;
}

const middleware = applyMiddleware(promise(),thunk,createLogger());

/*Creamos nuestra tienda con nuestros reducer
debemos tener uno, si tenemos mas de uno podemos
combinar reducers*/
const store = createStore(reducer, middleware);

/*Activamos acciones para ser atendidas*/
/*La acción siempre debe tener un type, no
podemos cambiar el nombre, si no tenemos el 
nombre de type no va a funcionar nuestro código*/
/*En un sólo dispatch hacemos varias acciones*/
store.dispatch({
	type: 'FETCH_USERS',
	payload: axios.get("https://jsonplaceholder.typicode.com/users")
});

/*
store.dispatch(dispatch => {
	dispatch({type: 'FETCH_USERS_START'});
	//Do something async
	axios.get("https://jsonplaceholder.typicode.com/users")
	.then(response =>{
		dispatch({type: 'RECEIVES_USERS', payload: response.data});
	})
	.catch(err =>{
		dispatch({type: 'FETCH_USERS_ERROR', payload: err});
	})
});

*/
