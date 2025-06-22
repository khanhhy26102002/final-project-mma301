import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Login from "../screens/Login";
import Signup from "../screens/Signup";
import MainApp from "./MainApp";
import { ActivityIndicator, View } from "react-native";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true); // loading lúc đầu app mở

  // Load role từ AsyncStorage khi mở app
  useEffect(() => {
    const loadRole = async () => {
      const savedRole = await AsyncStorage.getItem("userRole");
      if (savedRole) {
        setRole(savedRole);
      }
      setLoading(false);
    };

    loadRole();
  }, []);

  // Khi login thành công → lưu role vào AsyncStorage
  const handleLogin = async (userRole) => {
    await AsyncStorage.setItem("userRole", userRole);
    setRole(userRole);
  };

  // Khi logout → xoá role
  const handleLogout = async () => {
    await AsyncStorage.removeItem("userRole");
    setRole(null);
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#E11D48" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!role ? (
          <>
            <Stack.Screen name="Login">
              {(props) => <Login {...props} onLogin={handleLogin} />}
            </Stack.Screen>
            <Stack.Screen name="Signup" component={Signup} />
          </>
        ) : (
          <Stack.Screen name="MainApp">
            {() => <MainApp role={role} onLogout={handleLogout} />}
          </Stack.Screen>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
