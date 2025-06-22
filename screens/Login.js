import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  Pressable,
  Alert,
  TouchableOpacity,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const USERS = [
  { email: "member@example.com", password: "123456", role: "member" },
  { email: "admin@example.com", password: "123456", role: "admin" },
  { email: "staff@example.com", password: "123456", role: "staff" },
];

export default function Login({ navigation, onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);

  const handleLogin = () => {
    const user = USERS.find(
      (u) => u.email === email.trim() && u.password === password
    );

    if (user) {
      onLogin(user.role);
    } else {
      Alert.alert("Login failed", "Invalid email or password");
    }
  };

  return (
    <View className="flex-1 bg-white justify-center px-6">
      {/* Logo */}
      <View className="items-center mb-10">
        <Image
          source={require("../assets/logo.png")}
          className="w-24 h-24 mb-4"
          resizeMode="contain"
        />
        <Text className="text-2xl font-bold text-red-600">Welcome Back!</Text>
      </View>

      {/* Email input */}
      <Text className="text-sm text-gray-600 mb-1">E-mail</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="example@example.com"
        className="border border-gray-300 rounded-md px-4 py-2 mb-4"
        keyboardType="email-address"
        autoCapitalize="none"
      />

      {/* Password input */}
      <Text className="text-sm text-gray-600 mb-1">Password</Text>
      <View className="flex-row items-center border border-gray-300 rounded-md px-4 py-2 mb-1">
        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder="••••••••"
          secureTextEntry={!showPass}
          className="flex-1"
        />
        <TouchableOpacity onPress={() => setShowPass(!showPass)}>
          <Ionicons
            name={showPass ? "eye-off-outline" : "eye-outline"}
            size={20}
            color="#999"
          />
        </TouchableOpacity>
      </View>

      {/* Forgot password */}
      <TouchableOpacity className="self-end mb-6">
        <Text className="text-xs text-red-500 font-semibold">Forgot password?</Text>
      </TouchableOpacity>

      {/* Login button */}
      <Pressable
        onPress={handleLogin}
        className="bg-red-600 py-3 rounded-full items-center mb-4"
      >
        <Text className="text-white text-base font-semibold">Login</Text>
      </Pressable>

      {/* OR Divider */}
      <View className="flex-row items-center my-4">
        <View className="flex-1 h-px bg-gray-300" />
        <Text className="px-2 text-gray-400 text-sm">OR</Text>
        <View className="flex-1 h-px bg-gray-300" />
      </View>

      {/* Google login */}
      <Pressable className="border border-gray-300 rounded-md py-3 items-center flex-row justify-center mb-4">
        <Image
          source={{
            uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png",
          }}
          className="w-5 h-5 mr-2"
        />
        <Text className="text-sm text-gray-700">Sign in with Google</Text>
      </Pressable>

      {/* Signup link */}
      <View className="flex-row justify-center mt-4">
        <Text className="text-gray-500 text-sm">Don't have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
          <Text className="text-red-500 font-semibold text-sm">Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
