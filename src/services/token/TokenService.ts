import CONSTANTS from "../../constants";

export class TokenService {
    static getUserInfo() {
        const userInfo = localStorage.getItem('userInfo');
        if (userInfo) {
            return JSON.parse(userInfo);
        }
        return null; 
    }

    static saveToken(token: string) {
        localStorage.setItem('token', token);
    }

    static getToken() {
        return localStorage.getItem('token');
    }

    static saveUserInfo(userInfo: string) {
        localStorage.setItem('userInfo', userInfo);
    }

    static removeToken() {
        localStorage.removeItem('token');
      }

    static async validateToken() {
        const token = TokenService.getToken() || localStorage.getItem('token');

        if (!token) {
            console.error("No se encontró un token de autenticación");
            return false;
        }

        try {
            const url = `${CONSTANTS.BASE_URL}${CONSTANTS.VALIDATE_TOKEN}${token}`;
            const response = await fetch(url, {
            method: "GET",
            headers: {
            "Content-Type": "application/json",
            },
        });

        if (response.status === 200) {
            return true;
        } else if (response.status === 403) {
            return false;
        } else {
            console.error("Código de estado inesperado:", response.status);
            return false;
          }

        } catch (error) {
            return false;
        }
    }


    // static getUserInfo() {
    //     return localStorage.getItem('userInfo');
    // }
}
