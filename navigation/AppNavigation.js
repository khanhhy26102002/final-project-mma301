import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import Request from "../screens/Request";
import Profile from "../screens/Profile";


const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={Home} />

        <Tab.Screen
          name="Create"
          component={Request}
          options={{
            headerShown: false,
          }}
        />

        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            headerShown: false,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
