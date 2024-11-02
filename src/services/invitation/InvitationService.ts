import CONSTANTS from "../../constants";
import { TInvitationCreate, TInvitationData } from "../../types";
import { TokenService } from "../token/TokenService";

export const createInvitationInBd = async (invitationData: TInvitationCreate) => {
  const token = TokenService.getToken();
  console.log(JSON.stringify(invitationData));

  if (!token) {
    console.error("No se encontró un token de autenticación");
    return null;
  }

  try {
    const response = await fetch(
      `${CONSTANTS.BASE_URL}${CONSTANTS.CREATE_INVITATION}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(invitationData),
      }
    );

    if (!response.ok) {
      throw new Error(
        `Create invitation request failed: ${response.status} ${response.text}`
      );
    }
    const data: TInvitationData = await response.json();
    return data;
  } catch (err) {
    console.error("Create invitation errror", err);
    throw err;
  }
};
