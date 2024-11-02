import { createSlice } from "@reduxjs/toolkit";
import { IUserWithId } from "../../types";

export const DEFAULT_USER_STATE = {
  id: "",
  email: "",
  name: "",
  lastName: "",
  password: "",
  username: "",
  roles: []
}

const initialState: IUserWithId = (() => {
	const persistedState = localStorage.getItem("__redux__user__");
	return persistedState ? JSON.parse(persistedState).user : DEFAULT_USER_STATE;
})();

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    editUser: (_state, action) => {
      return {
        ...action.payload,
      }
    }
  }
})

export const { editUser } = userSlice.actions;
export default userSlice.reducer;