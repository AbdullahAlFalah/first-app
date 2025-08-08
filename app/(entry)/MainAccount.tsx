import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator, Pressable, TextStyle, ViewStyle } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from 'expo-router';

import { useUserinfo } from "@/hooks/UserContext";
import { getApiUrl, showMsg } from "@/Utilities/ApiUtils";
import Phasedemo_BTN from "@/components/navigation/Phasedemo_BTN";
import  Ads_BTN  from "@/components/navigation/Ads_BTN";
import { useThemeMode } from "@/hooks/ThemeContext";

type UserData = {
    email: string;
    idUsers: number;
    password: string;
    username: string;
};

export default function MainAccount() {

    const [data, setData] = useState<UserData[] | null>(null); // No type for data bc it's null as a default so created type
    const [loading, setLoading] = useState<Boolean>(true);

    const { globalemail, setGlobalId } = useUserinfo();

    // Access the theme context inside the component for needed inline styling and onPress toggle theme function
    const themeContext = useThemeMode();

    /* Either apply the theme styles from theme context directly using premade styles:
    Like themeContext.container, themeContext.text, etc.
    Or use the responsive theme styles from the context to create dynamic styles here:
    Like dynamicStyles.Togglebutton, dynamicStyles.Togglebuttontext, etc.
    */
    const dynamicStyles = StyleSheet.create({
        Togglebutton: {
            backgroundColor: themeContext.colors.card,
            borderRadius: themeContext.radius.sm,
            margin: themeContext.spacing.sm, // Affects outer spacing
            marginTop: themeContext.spacing.lg, // Affects outer spacing on top of the button
            padding: themeContext.spacing.sm, // Affects inner spacing
        },
        Togglebuttontext: {
            color: themeContext.colors.primaryText,
            fontSize: themeContext.fontSize.sm,
        },
        Filmsbutton: {        
            backgroundColor: themeContext.colors.buttonColor2,
            borderRadius: themeContext.radius.sm,
            margin: themeContext.spacing.sm, // Affects outer spacing
            marginTop: themeContext.spacing.lg, // Affects outer spacing on top of the button
            padding: themeContext.spacing.sm, // Affects inner spacing
        },
        Filmsbuttontext: {
            color: themeContext.colors.primaryText2,
            fontSize: themeContext.fontSize.md,
        },
    });

    const { toggleTheme } = themeContext; // Destructure toggleTheme from themeContext

    useEffect(() => {

        const AccountData = async () => {

            const encodedEmail = encodeURIComponent(globalemail);
            const url = getApiUrl(`getuserinfo?email=${encodedEmail}`); // Use the global email to fetch user data
            const token = await AsyncStorage.getItem('token'); // Get token from AsyncStorage

            try {

                //Request data from express server
                const response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`, // Include token in the request headers
                    },
                }); 

                const result = await response.json();

                if (response.ok) {
                    console.log("Response data:", result);
                    showMsg("Fetch Successful", result.ServerNote);
                    setData(result.data);
                    // Extract and set globalId from the fetched data
                    if (result.data && result.data.length > 0) {
                        const userId = result.data[0].idUsers; // Assuming you want the `idUsers` of the first entry
                        setGlobalId(userId); // Set globalId to the `idUsers` value
                    }                   
                } else {
                    console.log("Response data:", result);
                    showMsg("Fetch Failed", result.ServerNote);
                }
                             
            } catch (error) {
                console.error("Error fetching user data:", error);
                showMsg("Network Error", "Unable to connect to the server. Please try again later.");
            } finally {
                setLoading(false);
            }

        };
    
        AccountData();

    }, []);
    
    if (loading) {
        return (
            <View style={themeContext.loadContainer as ViewStyle}>                 
                <ActivityIndicator style={themeContext.loadWrapper as ViewStyle} size="large" color={themeContext.colors.loadIndicator} />              
            </View>    
        );
    }

    return (

        <View style={[styles.container, themeContext.container]}> 
            <Pressable style={[styles.Togglebutton, dynamicStyles.Togglebutton]} onPress={toggleTheme}>
                <Text style={[styles.Togglebuttontext, dynamicStyles.Togglebuttontext]}>Toggle Theme</Text>
            </Pressable>
            {data && data.length > 0 ? (               
                <View style={[styles.tableContainer, themeContext.tableContainer]}>
                    <Text style={[styles.tableTitle, themeContext.titleText as TextStyle]}>User Information</Text>
                    <View style={[styles.table, themeContext.tableOuterBorder]}>
                        {Object.entries(data[0]).map(([key, value], index, array) => (
                            <View 
                                key={key} 
                                style={[
                                    styles.row,
                                    themeContext.tabelRow,
                                    index !== array.length - 1 && [styles.rowBorder, themeContext.tableRowBorder], // Apply border only if it's NOT the last row  
                                ]}
                            >
                                <Text style={[styles.cellTitle, themeContext.boldText as TextStyle]}>{key}: </Text>
                                <Text style={[styles.cell, themeContext.cellText]}>{String(value)}</Text>
                            </View>
                        ))}
                    </View>
                </View>
            ) : (
                <Text style={[styles.text, themeContext.primaryText]}>No data available: Error fetching data on the front-end side</Text>
            )}
            <Pressable style={[styles.Filmsbutton, dynamicStyles.Filmsbutton]} onPress={() => router.push('/(films)/Films')}>
                <Text style={[styles.Filmsbuttontext, dynamicStyles.Filmsbuttontext]}>Open Films</Text>
            </Pressable>
            <Phasedemo_BTN themeContext={themeContext}/>
            <Ads_BTN themeContext={themeContext}/>
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    Togglebutton: {
        width: '45%',
        justifyContent: 'center',
        alignItems: 'center',  
    },
    Togglebuttontext: {
        fontWeight: 'bold',
        textAlign: 'center',
    },
    tableContainer: {
        width: "90%",     
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 3,
    },
    tableTitle: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 10,
    },
    table: {
        overflow: "hidden",
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 8,
        paddingHorizontal: 10,
    },
    rowBorder: {
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
    },
    cellTitle: {
        fontWeight: "bold",
        fontSize: 16,
        color: "#333",
    },
    cell: {
        flex: 1,
        flexWrap: "wrap",
        fontSize: 16,
        color: "#666",    
    },
    text: {
      fontSize: 18,
      color: '#333',
    },
    Filmsbutton: {
        width: '45%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    Filmsbuttontext: {
        fontWeight: 'bold',
        textAlign: 'center',
    },
  });

