import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator, Alert, Platform } from "react-native";

import { useUserinfo } from "@/hooks/UserContext";

export default function MainAccount() {

    const [data, setData] = useState(null); // No type for data bc it's null as a default
    const [loading, setLoading] = useState<Boolean>(true);

    const { globalemail } = useUserinfo();

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

            try {

                //Request data from express server
                const response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }); 

                const result = await response.json();

                if (response.ok) {
                    console.log("Response data:", result);
                    showMsg("Fetch Successful", result.ServerNote);
                    setData(result.data);
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
                <ActivityIndicator style={styles.load} size="large" color="#ff0000" />
            </View>    
        );
      }

    return (

        <View style={styles.container}>
            {data ? (
                <Text style={styles.text}>Fetched Data: {JSON.stringify(data)}</Text>

            ) : (
                <Text style={styles.text}>No data available: Error fetching data on the front-end side</Text>
            )}
        </View>

    );
}

const styles = StyleSheet.create({
    loadContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    load: {
        padding: 20,
        borderRadius: 10,
        backgroundColor: "rgba(0, 0, 0, 0.1)",
        elevation: 5, // Android shadow
        shadowColor: "#000", // iOS shadow
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    container: {
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    text: {
      fontSize: 18,
      color: '#333',
    },
  });


  