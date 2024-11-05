import React from "react";
import { Text, TextInput, Pressable, View, StyleSheet, Alert, Platform } from "react-native";
import { useState } from "react";
import { useRouter, Link } from "expo-router";

import { useUserinfo } from "@/hooks/UserContext";

export default function Signin () {

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const router = useRouter();

    const { setGlobalemail } = useUserinfo();

    const getApiUrl = () => {
        if (Platform.OS === 'web') {
            return `http://192.168.1.2:3000/api/users/login`;
        } else if (Platform.OS === 'android') {
            return `http://10.0.2.2:3000/api/users/login`;
        };
        throw new Error("Platform Unsupported!"); // Fallback for unsupported platforms
    };

    const showMsg = (title: any, msg: any) => {
        if (Platform.OS === 'web') {
            window.alert(title + ':\n' + msg);
        } else if (Platform.OS === 'android') {
            Alert.alert(title, msg);
        };
    };

    const onSubmit = async () => {

        const url = getApiUrl();

        // Simple Email validation: Ensures the email has a "username@domain.extension" structure
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showMsg("Invalid Email", "Please enter a valid email address.");
            return;
        }

        // Password validation: Ensures the password has at least 8 characters, with at least one letter and one number
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        if (!passwordRegex.test(password)) {
            showMsg("Invalid Password", "Password must be at least 8 characters, including a number and a letter.");
            return;
        }

        try {

            // Send data to express server
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                console.log("Response data:", data);
                showMsg("Login Successful", data.ServerNote);
                setGlobalemail(email);
                router.push('../../(tabs)/MainAccount');
            } else {
                console.log("Response data:", data);
                showMsg("Login Failed", data.ServerNote);
            }

        } catch (error) {
            console.error("Error submitting login data:", error);
            showMsg("Network Error", "Unable to connect to the server. Please try again later.");
        }

      };

    return (
        <View style={styles.container}>
            <Text style={styles.maintext}>Enter your login credentials here:</Text>
            <TextInput style={styles.input} onChangeText={setEmail} onSubmitEditing={onSubmit} value={email} placeholder="Enter your Email"/>
            <TextInput style={styles.input} onChangeText={setPassword} onSubmitEditing={onSubmit} value={password} placeholder="Enter your Password" secureTextEntry/>
            <Pressable style={styles.submitbutton} onPress={onSubmit}>
                <Text style={styles.submitbuttontext}>Submit</Text>
            </Pressable>
            <View style={ { flexDirection: 'row' } }>
                <Text style={styles.secondarytext}>Forgot your password?</Text>
                <Link href="../../(tabs)/Reset" style={styles.clickabletext}>Reset password</Link> 
            </View>            
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        alignContent: 'center',
        flexDirection: 'column',
    },
    maintext: {
        color: '#000000',
        fontSize: 18,
        fontWeight: 'bold',
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    submitbutton: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 1,
        backgroundColor: '#1e90ff',
    },
    submitbuttontext: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    secondarytext: {
        color: '#000000',
        fontSize: 12,
        fontWeight: 'bold',
        marginLeft: 13,
        marginRight: 5,
    },
    clickabletext: {
        color:'#ff0000',
        fontSize: 12,
        fontWeight: 'medium',
        fontStyle: 'italic',
        textDecorationLine: 'underline',
    },
});

