import React from "react";
import { Text, TextInput, Pressable, View, StyleSheet, Alert, Platform } from "react-native";
import { useState } from "react";
import { Link } from "expo-router";

export default function Signup () {

    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const getApiUrl = () => {
        if (Platform.OS === 'web') {
            return 'http://192.168.1.2:3000/api/users/signup';
        } else if (Platform.OS === 'android') {
            return 'http://10.0.2.2:3000/api/users/signup';
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

        // Username validation: Ensures the username has a 3-25 alphanumeric characters 
        const usernameRegex = /^[a-zA-Z0-9]{3,25}$/;
        if (!usernameRegex.test(username)) {
            showMsg("Invalid Username", "Username should be 3-15 alphanumeric characters.");
            return;
        }

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
                    username,
                    email,
                    password,
                }),
            });

            const data = await response.json();

            // Check response status and provide feedback to the user
            if (response.ok) {
                console.log("Response data:", data);
                showMsg("Signup Successful", data.ServerNote);

            } else {
                console.log("Response data:", data);
                showMsg("Signup Failed", data.ServerNote);
            }

        } catch (error) {
            console.error("Error submitting signup data:", error);
            showMsg("Network Error", "Server error... Please try again later.");
        }

      };

    return (
        <View style={styles.container}>
            <Text style={styles.maintext}>Enter your credentials here:</Text>
            <TextInput style={styles.input} onChangeText={setUsername} onSubmitEditing={onSubmit} value={username} placeholder="Enter your Username"/>
            <TextInput style={styles.input} onChangeText={setEmail} onSubmitEditing={onSubmit} value={email} placeholder="Enter your Email"/>
            <TextInput style={styles.input} onChangeText={setPassword} onSubmitEditing={onSubmit} value={password} placeholder="Enter your Password" secureTextEntry/>
            <Pressable style={styles.submitbutton} onPress={onSubmit}>
                <Text style={styles.submitbuttontext}>Submit</Text>
            </Pressable>
            <View style={ { flexDirection: 'row' } } >
                <Text style={styles.secondarytext}>Already have an account?</Text>
                <Link href="../../Sign-in" style={styles.clickabletext}>Sign-in</Link>
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
        borderRadius: 30,
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

