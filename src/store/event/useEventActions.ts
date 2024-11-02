import { IEvent } from "../../types";
import { useAppDispatch } from "../../hooks/store";
import { editEvent } from "./eventSlice";

export const useEventActions = () => {
	const dispatch = useAppDispatch();

  const updateEvent = async (event: IEvent) => {
		dispatch(editEvent(event))
	}

	return { updateEvent };
};