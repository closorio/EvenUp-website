import { createContact, deleteContactById, updateContacts } from "./contactsSlice";
import { useAppDispatch } from "../../hooks/store";

export const 	useContactsActions = () => {
	const dispatch = useAppDispatch();

	const addContact = (contact: any) => {
			dispatch(createContact(contact));
	};

	const removeUser = (id: string) => {
		dispatch(deleteContactById(id));
	};

	const refreshContacts = (newContacts: any) => {
		dispatch(updateContacts(newContacts));
	};

	return { addContact, removeUser, refreshContacts };
};