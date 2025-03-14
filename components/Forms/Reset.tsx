import React, { useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";
import axios from "axios";

import { getApiUrl, showMsg, validatePassword } from "@/Utilities/ApiUtils"; 
import { useUserinfo } from "@/hooks/UserContext";

export default function Resetpassword() {

    const [oldPassword, setOldPassword] = useState<string>('');
    const [newPassword, setNewPassword] = useState<string>('');

    const { globalId } = useUserinfo();

    const onReset = async () => {

        if (!validatePassword(oldPassword) || !validatePassword(newPassword)) {
            showMsg("One of the passwords is Invalid:", "Recheck!");
            return;
        }

        const url = getApiUrl(`resetpassword/${globalId}`);

        try {

            const response = await axios.put(url, { oldPassword, newPassword });

            if (response.status === 200) {
                showMsg("Password Reset", "Password has been reset successfully!");
                setOldPassword('');
                setNewPassword('');
            } else {
                console.log("Response data:", response.data);
                showMsg("Reset Failed", response.data.ServerNote);
            }

        } catch (error) {
            console.error("Error resetting password:", error);
            showMsg("Error resetting password", "Please try again later!");
        }

    };

    return (

        <View style={styles.container}>
            <Text style={styles.maintext}>Put your current password here:</Text>
            <TextInput style={styles.input} onChangeText={setOldPassword} onSubmitEditing={onReset} value={oldPassword}  />
            <Text style={styles.maintext}>Put your new password here:</Text>
            <TextInput style={styles.input} onChangeText={setNewPassword} onSubmitEditing={onReset} value={newPassword}  />
            <Pressable style={styles.submitbutton} onPress={onReset}>
                <Text style={styles.submitbuttontext}>Reset Password</Text>
            </Pressable>
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
        borderWidth: 1,
        margin: 12,
    },
    submitbutton: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
        backgroundColor: '#4b0082',
        margin: 12, // Affects outer spacing
        padding: 12, // Affects inner spacing
    },
    submitbuttontext: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

