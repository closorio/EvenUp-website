import { Middleware } from "@reduxjs/toolkit";
import { RootState } from "..";
import { addContact } from "../../services/user/UserService";
import { IUserWithId } from "../../types";

const contactsMiddleware: Middleware = store => next => async action => {
  const { type } = action

  if (type === 'contacts/createContact') {
    const payload: IUserWithId = action.payload;
    const {user} = store.getState() as RootState
    
    try {
      await addContact(payload.id, user.id)
    } catch (error) {
      console.error('Error al agregar contacto:', error);
    }

  }

  return next(action);
};

export default contactsMiddleware;