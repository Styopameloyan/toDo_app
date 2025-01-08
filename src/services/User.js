import { jwtDecode } from "jwt-decode";

export class UserService {
    static user = {};
    static token = localStorage.token || "";
    static requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${this.token}`,
        },
    };

    static getRequestOptions = (options = {}) => {
        const newOptions = { ...this.requestOptions, ...options };
        if (options.body) newOptions.body = JSON.stringify(options.body);

        return newOptions;
    }


    static checkTokenExpired = () => {
        try {
            const decodedToken = jwtDecode(this.token);
            const expired = decodedToken.exp * 1000 < Date.now();
            return expired;
        }
        catch (error) { return true }
    }

    static afterLogin = (user) => {

        this.token = user.token;
        this.user = { ...user };
        this.requestOptions.headers.Authorization = `Bearer ${user.token}`;

        localStorage.token = user.token;
    }

    static login = async (mail, password) => {
        const requestOption = this.getRequestOptions({ body: { mail, password } });

        try {
            const response = await fetch("http://localhost:5001/api/users/login", requestOption);
            const data = await response.json();

            if (!response.ok) return [new Error("Ungültige E-Mail oder Kennwort.")]

            this.afterLogin(data);
            return [null, data];

        } catch (error) {
            console.log(error);
            return [new Error("Ungültige E-Mail oder Kennwort."), null];
        }
    }


    static register = async (mail, password, displayName) => {
        const requestOption = this.getRequestOptions({ body: { mail, password, displayName } });

        try {
            const response = await fetch("http://localhost:5001/api/users/register", requestOption);
            const data = await response.json();
            if (!response.ok) return [new Error("Registrierung Fehlgeschlagen")]
            return [null, data];

        } catch (error) {
            console.log(error);
            return [new Error("Registrierung Fehlgeschlagen"), null];
        }
    }

    static passCheck(pass1, pass2) {
        if (pass1 !== pass2) return [true, "Paswörter stimmen nicht Überein"]
        if (!/[A-Z]/.test(pass1)) return [true, "Passwort muss min. 1 Großbuchstaben enthalten"]
        if (!/[!@#$%^&*(),.?":{}|<>]/.test(pass1)) return [true, "Passwort muss min. 1 Sonderzeichen enthalten"]
        if (!/[0-9]/.test(pass1)) return [true, "Passwort muss min. 1 Ziffer enthalten"]
        return [false, ""];
    }


}