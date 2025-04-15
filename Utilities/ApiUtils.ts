import { Platform, Alert } from 'react-native';

export const getApiUrl = (path: string) => {
    
    const baseUrl = Platform.OS === 'web' 
        ? `http://192.168.1.2:3000/api/users/`
        : Platform.OS === 'android' 
            ? `http://10.0.2.2:3000/api/users/`
            : (() => { throw new Error("Platform Unsupported!"); })();

    return `${baseUrl}${path}`;
};

export const getFilmApiUrl = (path: string) => {

    const baseUrl = Platform.OS === 'web'
        ? `http://192.168.1.2:3000/api/films/`
        : Platform.OS === 'android'
            ? `http://10.0.2.2:3000/api/films/`
            : (() => { throw new Error("Platform Unsupported!"); })();
    
    return `${baseUrl}${path}`;        
};

export const showMsg = (title: string, msg: any) => {
    if (Platform.OS === 'web') {
        window.alert(`${title}:\n${msg}`);
    } else if (Platform.OS === 'android') {
        Alert.alert(title, msg);
    }
};

// username validation
export const validateUsername = (username: string): boolean => {
    const usernameRegex = /^[a-zA-Z0-9]{3,25}$/;
    if (!usernameRegex.test(username)) {
        return false; // Invalid username
    }
    return true; // Valid username
};

// email validation
export const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return false; // Invalid email
    }
    return true; // Valid email
};

// password validation
export const validatePassword = (password: string): boolean => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!passwordRegex.test(password)) {
        return false; // Invalid password
    }
    return true; // Valid password
};


