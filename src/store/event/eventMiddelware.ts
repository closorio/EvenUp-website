import { Middleware } from "@reduxjs/toolkit";

export const eventLocalStorageMiddleware: Middleware = store => next => action => {
  next(action);
  const eventValue =  store.getState().event;
  localStorage.setItem("__event__", JSON.stringify(eventValue));
}


const UserMiddleware: Middleware = store => next => action => {
	const { type, payload } = action
	next(action)
	if (type === 'event/editEvent') {
		console.log('a', payload, store);
	}
}

export default UserMiddleware;