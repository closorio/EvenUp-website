import { useAppDispatch } from "../../hooks/store";
import { login, logout } from "./authSlice";

export const 	useAuthActions = () => {
	const dispatch = useAppDispatch();

	const loginUserState = (token: string) => {
			dispatch(login(token));
	};

	const logoutUser = () => {
		dispatch(logout());
	};

	return { loginUserState, logoutUser };
};