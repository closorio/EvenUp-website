import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { TInvitationData } from "../../types";

const DEFAULT_STATE: TInvitationData[] = [];

const initialState: TInvitationData[] = (() => {
  const persistedState = localStorage.getItem("__invitations__");
  return persistedState ? JSON.parse(persistedState) : DEFAULT_STATE;
})();

export const invitationsSlice = createSlice({
  name: "invitations",
  initialState,
  reducers: {
    addInvitation: (state, action: PayloadAction<TInvitationData>) => {
      state.push(action.payload);
    },
    updateInvitations: (_, action: PayloadAction<TInvitationData[]>) => {
      return action.payload;
    },
    editInvitation: (_state, action: PayloadAction<TInvitationData[]>) => {
      return action.payload;
    },
  },
});

export default invitationsSlice.reducer;

export const { addInvitation, editInvitation, updateInvitations } =
  invitationsSlice.actions;
