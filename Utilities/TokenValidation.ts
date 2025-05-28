import { jwtDecode } from "jwt-decode";

export const isTokenValid = (token: string): boolean => {
    try {
        const decoded: any = jwtDecode(token);
        if (!decoded.exp) return false;
        return decoded.exp * 1000 > Date.now();
    } catch {
        return false;
    }
};


