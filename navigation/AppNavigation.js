import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screens/auth/Login';
import Signup from '../screens/auth/Signup';
import AdminHome from '../screens/admin/AdminHome';
import StaffHome from '../screens/staff/StaffHome';
import DonorHome from '../screens/member/DonorHome';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createNativeStackNavigator();

export default function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="AdminHome" component={AdminHome} />
        <Stack.Screen name="StaffHome" component={StaffHome} />
        <Stack.Screen name="DonorHome" component={DonorHome} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
