import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import DonorHome from "../screens/DonorHome";
import AdminHome from "../screens/AdminHome";
import StaffHome from "../screens/StaffHome";
import Request from "../screens/Request";
import Profile from "../screens/Profile";

const Tab = createBottomTabNavigator();

export default function MainApp({ role, onLogout }) {
  return (
    <Tab.Navigator>
      {role === "member" && (
        <>
          <Tab.Screen
            name="member"
            component={DonorHome}
            options={{
              headerShown: false,
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="member" size={size} color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="staff"
            component={StaffHome}
            options={{
              headerShown: false,
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="staff" size={size} color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="Request"
            component={Request}
            options={{
              headerShown: false,
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="add-circle-outline" size={size} color={color} />
              ),
            }}
          />
        </>
      )}

      {role === "admin" && (
        <Tab.Screen
          name="Home"
          component={AdminHome}
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home" size={size} color={color} />
            ),
          }}
        />
      )}

      <Tab.Screen
        name="Profile"
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="accessibility-outline" size={size} color={color} />
          ),
        }}
      >
        {(props) => <Profile {...props} onLogout={onLogout} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}
