import React, { useState } from "react";
import { Text, TextInput, Pressable, View, StyleSheet, TextStyle } from "react-native";
import { Link } from "expo-router";

import { useUserinfo } from "@/hooks/UserContext";
import { signin } from "@/api/Signin";
import { getApiUrl, showMsg } from  "@/Utilities/ApiUtils";
import { ThemeContextType } from '@/hooks/ThemeContext';

type SignupProps = {
    themeContext?: ThemeContextType;
};

export default function Signup ({ themeContext }: SignupProps) {

    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    // const router = useRouter();

    const { setGlobalemail } = useUserinfo(); // Access the context to set the global email

    const onSubmit = async () => {

        const url = getApiUrl('signup');

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
                setGlobalemail(email); // Set the global email in context
                await signin(email, password); // Call signin function after successful signup
                // router.push('/(entry)/MainAccount'); // not needed here, as signin will handle navigation
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
        <View style={[styles.container, themeContext?.container]}>
            <Text style={[styles.maintext, themeContext?.formsMainText]}>Enter your credentials here:</Text>
            <TextInput style={[styles.input, themeContext?.inputsText]} onChangeText={setUsername} onSubmitEditing={onSubmit} value={username} placeholder="Enter your Username" placeholderTextColor={themeContext?.inputsText?.color} selectionColor={themeContext?.colors.caret} />
            <TextInput style={[styles.input, themeContext?.inputsText]} onChangeText={setEmail} onSubmitEditing={onSubmit} value={email} placeholder="Enter your Email" placeholderTextColor={themeContext?.inputsText?.color} selectionColor={themeContext?.colors.caret} />
            <TextInput style={[styles.input, themeContext?.inputsText]} onChangeText={setPassword} onSubmitEditing={onSubmit} value={password} placeholder="Enter your Password" placeholderTextColor={themeContext?.inputsText?.color} selectionColor={themeContext?.colors.caret} secureTextEntry />
            <Pressable style={[ styles.submitbutton, themeContext?.submitButton, { backgroundColor: themeContext?.colors.buttonColor2 } ]} onPress={onSubmit}>
                <Text style={[styles.submitbuttontext, themeContext?.primaryText]}>Submit</Text>
            </Pressable>
            <View style={ { flexDirection: 'row' } } >
                <Text style={[styles.secondarytext, themeContext?.formsSecondaryText]}>Already have an account? </Text>
                <Link href="/(entry)/Sign-in" style={[styles.clickabletext, themeContext?.clickableText as TextStyle]}>Sign-in</Link>
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
        marginLeft: 12,
        marginTop: 12,
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
        borderRadius: 5,       
        margin: 12, // Affects outer spacing
        padding: 12, // Affects inner spacing
    },
    submitbuttontext: {
        fontWeight: 'bold',
        textAlign: 'center',
    },
    secondarytext: {
        color: '#000000',
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 12,
        marginBottom: 12,
    },
    clickabletext: {
        fontWeight: 'medium',
    },
});

