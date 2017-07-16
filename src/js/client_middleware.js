/*Necesitamos crear nuestra tienda*/
/*Redux Middleware es la solución
para peticiones ajax y async*/
import {createStore, applyMiddleware} from "redux";

/*Los reducers son los encargados de actualizar
nuestro state del single store*/
const reducer = (state = 0, action) =>{
	switch(action.type){
		case "INC" : return state + 1; break;
		case "DEC" : return state - 1; break;
		case "ERROR" : throw new Error("Error!"); break;
		default: return state;
	}
}

const logger = store => next => action =>{
	console.log('Action Fired', action);
	//Dispara las acciones a los reducers
	next(action);
}

const error = store => next => action =>{
	try{
		next(action);
	}catch(e){
		console.log('Ahhhh!', e);
	}
}

const middleware = applyMiddleware(logger, error);

/*Creamos nuestra tienda con nuestros reducer
debemos tener uno, si tenemos mas de uno podemos
combinar reducers*/
const store = createStore(reducer, 1, middleware);


store.subscribe(() => {
	console.log('Store changed', store.getState());
});

/*Activamos acciones para ser atendidas*/
/*La acción siempre debe tener un type, no
podemos cambiar el nombre, si no tenemos el 
nombre de type no va a funcionar nuestro código*/
store.dispatch({type :'INC'});
store.dispatch({type :'INC'});
store.dispatch({type :'INC'});
store.dispatch({type :'DEC'});
store.dispatch({type :'ERROR'});