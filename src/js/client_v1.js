/*Necesitamos crear nuestra tienda*/
import {createStore} from "redux";

/*Los reducers son los encargados de actualizar
nuestro state del single store*/
const reducer = (state = 0, action) =>{
	switch(action.type){
		case "INC" : return state + action.payload; break;
		case "DEC" : return state - action.payload; break;
		default: return state;
	}
}

/*Creamos nuestra tienda con nuestros reducer
debemos tener uno, si tenemos mas de uno podemos
combinar reducers*/
const store = createStore(reducer, 0);

/*Callback que se ejecuta siempre que se
cambia un estado de nuestra store*/
store.subscribe(() =>{
	console.log('Store changed = ' + store.getState());
});

/*Activamos acciones para ser atendidas*/
/*La acción siempre debe tener un type, no
podemos cambiar el nombre, si no tenemos el 
nombre de type no va a funcionar nuestro código*/
store.dispatch({type :'INC', payload: 1});
store.dispatch({type :'INC', payload: 100});
store.dispatch({type :'INC', payload: 1});
store.dispatch({type :'DEC', payload: 10});