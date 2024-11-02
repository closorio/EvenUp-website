import { createSlice } from "@reduxjs/toolkit";
import { IEventWithId } from "../../types";

export const DEFAULT_EVENT_STATE: IEventWithId = {
  event_id: "",
  name: "",
  description: "",
  type: "",
  owner_id: "",
  picture: "",
}

const initialState: IEventWithId = (() => {
	const persistedState = localStorage.getItem("__event__");
	return persistedState ? JSON.parse(persistedState) : DEFAULT_EVENT_STATE;
})();

export const eventSlice = createSlice({
  name: 'event',
  initialState,
  reducers: {
    editEvent: (_, action) => {
      return {
        ...action.payload,
      }
    }
  }
})

export const { editEvent } = eventSlice.actions;
export default eventSlice.reducer;