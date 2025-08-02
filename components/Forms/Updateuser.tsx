import React, { useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";
import axios from "axios";
import { useRouter } from "expo-router";

import { getApiUrl, showMsg, validateUsername, validateEmail } from "@/Utilities/ApiUtils"; 
import { useUserinfo } from "@/hooks/UserContext";
import { ThemeContextType } from '@/hooks/ThemeContext';

type UpdateUserProps = {
    themeContext?: ThemeContextType;
};

export default function Updateuser({ themeContext }: UpdateUserProps) {

    const [newUsername, setNewUsername] = useState<string>('');
    const [newEmail, setNewEmail] = useState<string>('');
    const router = useRouter();

    const { globalId } = useUserinfo();

    const onUpdate = async () => {

        if (!validateUsername(newUsername) || !validateEmail(newEmail)) {
            showMsg("One of the user's parameters is Invalid:", "Recheck!");
            return;
        }

        const url = getApiUrl(`updateuserinfo/${globalId}`);

        try {

            const response = await axios.put(url, { username: newUsername, email: newEmail });

            if (response.status === 200) {
                showMsg("User Info Updated", "Info has been updated successfully!");
                setNewUsername('');
                setNewEmail('');
                router.push('/(entry)/MainAccount');
            } else {
                console.log("Response data:", response.data);
                showMsg("User Info Update Failed", response.data.ServerNote);
            }
            
        } catch (error) {
            console.error("Error updating info:", error);
            showMsg("Error updating info", "Please try again later!");
        }

        };

    return (
        
        <View style={[styles.container, themeContext?.container]}>
            <Text style={[styles.maintext, themeContext?.formsMainText]}>Put your new username here:</Text>
            <TextInput style={[styles.input, themeContext?.inputsText]} onChangeText={setNewUsername} onSubmitEditing={onUpdate} value={newUsername} placeholderTextColor={themeContext?.inputsText?.color} selectionColor={themeContext?.colors.caret} />
            <Text style={[styles.maintext, themeContext?.formsMainText]}>Put your new email here:</Text>
            <TextInput style={[styles.input, themeContext?.inputsText]} onChangeText={setNewEmail} onSubmitEditing={onUpdate} value={newEmail} placeholderTextColor={themeContext?.inputsText?.color} selectionColor={themeContext?.colors.caret} />
            <Pressable style={[styles.submitbutton, themeContext?.submitButton, { backgroundColor: themeContext?.colors.buttonColor3 }]} onPress={onUpdate}>
                <Text style={[styles.submitbuttontext, themeContext?.primaryText2]}>Update Info</Text>
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
        margin: 12, // Affects outer spacing
        padding: 12, // Affects inner spacing
    },
    submitbuttontext: {
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

