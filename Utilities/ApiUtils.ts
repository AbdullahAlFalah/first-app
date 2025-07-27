import { Platform, Alert } from 'react-native';

export const getApiUrl = (path: string) => {
    
    const baseUrl = `http://52.59.130.11:3000/api/users/`; // Using the public IP of my EC2 instance
    if (!baseUrl) {
        throw new Error("Platform Unsupported!"); // Fallback for unsupported platforms
    }
    return `${baseUrl}${path}`;

};

export const getFilmApiUrl = (path: string) => {

    const baseUrl = `http://52.59.130.11:3000/api/films/`; 
    if (!baseUrl) {
        throw new Error("Platform Unsupported!"); 
    }
    return `${baseUrl}${path}`;

};

export const getWalletApiUrl = (path: string) => {
    const baseUrl = `http://52.59.130.11:3000/api/wallet/`;
    if (!baseUrl) {
        throw new Error("Platform Unsupported!"); 
    }
    return `${baseUrl}${path}`;
};

export const getPurchaseApiUrl = (path: string) => {
    const baseUrl = `http://52.59.130.11:3000/api/purchase/`;
    if (!baseUrl) {
        throw new Error("Platform Unsupported!"); 
    }
    return `${baseUrl}${path}`;
};

export const getRewardApiUrl = (path: string) => {
    const baseUrl = `http://52.59.130.11:3000/api/rewards/`;
    if (!baseUrl) {
        throw new Error("Platform Unsupported!"); 
    }
    return `${baseUrl}${path}`;
};

export const getBackgroundApiUrl = (path: string) => {
    const baseUrl = `http://52.59.130.11:3000/api/background/`;
    if (!baseUrl) {
        throw new Error("Platform Unsupported!"); 
    }       
    return `${baseUrl}${path}`;
};

export const getRemoteNotificationApiUrl = (path: string) => {
    const baseUrl = `http://52.59.130.11:3000/api/notification/`;
    if (!baseUrl) {
        throw new Error("Platform Unsupported!");
    }
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


