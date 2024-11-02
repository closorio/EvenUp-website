import { editUser } from "./Userslice";
import { TProfileForEdit } from "../../types";
import { useAppDispatch } from "../../hooks/store";

export const useUserActions = () => {
	const dispatch = useAppDispatch();

  const updateUser = async (user: TProfileForEdit) => {
		dispatch(editUser(user))
	}

	return { updateUser };
};