import React from "react";
import { Text, TextInput, Pressable, View, StyleSheet, Alert } from "react-native";
import { useState } from "react";
import { Link } from "expo-router";

export default function Signin () {

    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const onSubmit = async () => {

        // Username validation: Ensures the username has a 3-25 alphanumeric characters 
        const usernameRegex = /^[a-zA-Z0-9]{3,25}$/;
        if (!usernameRegex.test(username)) {
            Alert.alert("Invalid Username", "Username should be 3-15 alphanumeric characters.");
            return;
        }

        // Simple Email validation: Ensures the email has a "username@domain.extension" structure
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            Alert.alert("Invalid Email", "Please enter a valid email address.");
            return;
        }

        // Password validation: Ensures the password has at least 8 characters, with at least one letter and one number
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        if (!passwordRegex.test(password)) {
            Alert.alert("Invalid Password", "Password must be at least 8 characters, including a number and a letter.");
            return;
        }

        try {

            // Send data to express server
            const response = await fetch('http://127.0.0.1:3000/api/users', {
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
                Alert.alert("Signup Successful", data.message);
            } else {
                Alert.alert("Signup Failed", data.message);
            }

        } catch (error) {
            console.error("Error submitting signup data:", error);
            Alert.alert("Network Error", "Unable to connect to the server. Please try again later.");
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
            <View style={ { flexDirection: 'row', flex: 1 } }>
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
        flex: 1,
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
    },
    clickabletext: {
        color:'#ff0000',
        fontSize: 12,
        fontWeight: 'medium',
        fontStyle: 'italic',
        textDecorationLine: 'underline',
    },
});

