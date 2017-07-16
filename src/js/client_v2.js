/*Necesitamos crear nuestra tienda*/
import {createStore, combineReducers} from "redux";

/*Los reducers son los encargados de actualizar
nuestro state del single store*/
/*Esto estaría en un archivo de User*/
const userReducer = (state = {}, action) =>{
	switch(action.type){
		case 'CHANGE_USER' : return {...state, name: action.payload};
		case 'CHANGE_AGE' : return {...state, age: action.payload};
		default: return state;
	}
}

/*Esto estaría en un archivo de Tweets*/
const tweetReducer = (state = [], action) =>{
	return state;
}

const reducers = combineReducers({
	user: userReducer,
	tweets: tweetReducer
});

/*Creamos nuestra tienda con nuestros reducer
debemos tener uno, si tenemos mas de uno podemos
combinar reducers*/
/*Esto estaría en un archivo de index.js*/
const store = createStore(reducers);

/*Callback que se ejecuta siempre que se
cambia un estado de nuestra store*/
store.subscribe(() =>{
	console.log('Store changed', store.getState());
});

/*Activamos acciones para ser atendidas*/
/*La acción siempre debe tener un type, no
podemos cambiar el nombre, si no tenemos el 
nombre de type no va a funcionar nuestro código*/
store.dispatch({type :'CHANGE_USER', payload: "Will"});
store.dispatch({type :'CHANGE_AGE', payload: 40});
store.dispatch({type :'CHANGE_AGE', payload: 45});