import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator, Alert, Platform, Pressable } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from 'expo-router';

import { useUserinfo } from "@/hooks/UserContext";

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

    const getApiUrl = () => {
        const encodedEmail = encodeURIComponent(globalemail);
        if (Platform.OS === 'web') {
            return `http://192.168.1.2:3000/api/users/getuserinfo?email=${encodedEmail}`;
        } else if (Platform.OS === 'android') {
            return `http://10.0.2.2:3000/api/users/getuserinfo?email=${encodedEmail}`;
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

    useEffect(() => {

        const AccountData = async () => {

            const url = getApiUrl();
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
            <View style={styles.loadContainer}>                 
                <ActivityIndicator style={styles.loadWrapper} size="large" color="#ff0000" />              
            </View>    
        );
      }

    return (

        <View style={styles.container}>
            {data && data.length > 0 ? (
                // <Text style={styles.text}>Fetched Data: {JSON.stringify(data)}</Text>
                <View style={styles.tableContainer}>
                    <Text style={styles.tableTitle}>User Information</Text>
                    <View style={styles.table}>
                        {Object.entries(data[0]).map(([key, value], index, array) => (
                            <View 
                                key={key} 
                                style={[
                                    styles.row,
                                    index !== array.length - 1 && styles.rowBorder, // Apply border only if it's NOT the last row  
                                ]}
                            >
                                <Text style={styles.cellTitle}>{key}: </Text>
                                <Text style={styles.cell}>{String(value)}</Text>
                            </View>
                        ))}
                    </View>
                </View>
            ) : (
                <Text style={styles.text}>No data available: Error fetching data on the front-end side</Text>
            )}
            <Pressable style={styles.Filmsbutton} onPress={() => router.push('../films/Films')}>
                <Text style={styles.Filmsbuttontext}>Open Films</Text>
            </Pressable>
        </View>

    );
}

const styles = StyleSheet.create({
    loadContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',       
    },
    loadWrapper: {
        width: 70,
        height: 70,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        backgroundColor: "rgba(0, 0, 0, 0.1)",
    },
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    tableContainer: {
        width: "90%",
        padding: 10,
        backgroundColor: "#fff",
        borderRadius: 10,
        elevation: 3,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    tableTitle: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 10,
    },
    table: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
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
        fontSize: 16,
        color: "#666",
        flex: 1,
        flexWrap: "wrap",
    },
    text: {
      fontSize: 18,
      color: '#333',
    },
    Filmsbutton: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        backgroundColor: '#1e90ff',
        margin: 12, // Affects outer spacing
        padding: 12, // Affects inner spacing
    },
    Filmsbuttontext: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
  });


  