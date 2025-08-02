import React, { useState } from "react";
import { Text, TextInput, Pressable, View, StyleSheet, TextStyle } from "react-native";
import { Link } from "expo-router";

import { showMsg, validateEmail, validatePassword } from "@/Utilities/ApiUtils";
import { useUserinfo } from "@/hooks/UserContext";
import { signin } from "@/api/Signin";
import { ThemeContextType } from '@/hooks/ThemeContext';

type SigninProps = {
    themeContext?: ThemeContextType;
};

export default function Signin ({ themeContext }: SigninProps) {

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');  
    
    const { setGlobalemail } = useUserinfo(); // Access the context to set the global email

    const onSubmit = async () => {

        // Simple Email validation: Ensures the email has a "username@domain.extension" structure
        if (!validateEmail(email)) {
            showMsg("Invalid Email", "Please enter a valid email address.");
            return;
        }

        // Password validation: Ensures the password has at least 8 characters, with at least one letter and one number
        if (!validatePassword(password)) {
            showMsg("Invalid Password", "Password must be at least 8 characters, including a number and a letter.");
            return;
        }

        setGlobalemail(email); // Set the global email in context
        await signin(email, password); // Call the signin function with the email and password

      };

    return (
        <View style={[styles.container, themeContext?.container]}>
            <Text style={[styles.maintext, themeContext?.formsMainText]}>Enter your login credentials here:</Text>
            <TextInput style={[styles.input, themeContext?.inputsText]} onChangeText={setEmail} onSubmitEditing={onSubmit} value={email} placeholder="Enter your Email" placeholderTextColor={themeContext?.inputsText?.color} selectionColor={themeContext?.colors.caret} />
            <TextInput style={[styles.input, themeContext?.inputsText]} onChangeText={setPassword} onSubmitEditing={onSubmit} value={password} placeholder="Enter your Password" placeholderTextColor={themeContext?.inputsText?.color} selectionColor={themeContext?.colors.caret} secureTextEntry />
            <Pressable style={[styles.submitbutton, themeContext?.submitButton, { backgroundColor: themeContext?.colors.buttonColor2 }]} onPress={onSubmit}>
                <Text style={[styles.submitbuttontext, themeContext?.primaryText2]}>Submit</Text>
            </Pressable>
            <View style={ { flexDirection: 'row' } }>
                <Text style={[styles.secondarytext, themeContext?.formsSecondaryText]}>Forgot your password? </Text>
                <Link href="/(entry)/Reset" style={[styles.clickabletext, themeContext?.clickableText as TextStyle]}>Reset password</Link> 
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

