import { Middleware } from "@reduxjs/toolkit";

export const authLocalStorageMiddleware: Middleware = store => next => action => {
  next(action);
  const authValue =  store.getState().auth;
  localStorage.setItem("__auth__", JSON.stringify(authValue));
}

export default authLocalStorageMiddleware;