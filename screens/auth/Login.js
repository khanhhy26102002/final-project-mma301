import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  Alert,
  TouchableOpacity,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import axiosClient from "../../config/axiosClient";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);

  const handleLogin = async () => {
  try {
    const res = await axiosClient.post("/auth/login", {
      email,
      password,
    });

    console.log("✅ Login response:", res.data);

    const { accessToken, refreshToken, role } = res.data.data;

    // Đảm bảo accessToken và refreshToken không undefined
    if (!accessToken || !refreshToken) {
      throw new Error("Token bị thiếu trong phản hồi từ backend.");
    }

    await AsyncStorage.setItem("access_token", accessToken);
    await AsyncStorage.setItem("refresh_token", refreshToken);

    if (role === 1) navigation.navigate("AdminHome");
    else if (role === 2) navigation.navigate("StaffHome");
    else if (role === 3) navigation.navigate("DonorHome");
    else Alert.alert("Lỗi", "Vai trò không hợp lệ");
  } catch (err) {
    console.log("❌ Login error:", err.response?.data || err.message);
    Alert.alert("Đăng nhập thất bại", "Email hoặc mật khẩu sai!");
  }
};



  return (
    <View className="flex-1 bg-white px-6 justify-center">
      <Text className="text-2xl font-bold text-[#610000] mb-8">Welcome Back!</Text>

      <TextInput
        placeholder="E-mail/Phone Number"
        value={email}
        onChangeText={setEmail}
        className="border-b border-gray-400 py-3 mb-6"
        placeholderTextColor="#999"
      />

      <View className="flex-row items-center border-b border-gray-400 mb-2">
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          className="flex-1 py-3"
          secureTextEntry={!showPass}
          placeholderTextColor="#999"
        />
        <Ionicons
          name={showPass ? "eye-off" : "eye"}
          size={20}
          color="#999"
          onPress={() => setShowPass(!showPass)}
        />
      </View>

      <Text className="text-right text-sm text-[#C00030] mb-6">Forgot password?</Text>

      <TouchableOpacity className="bg-[#C00030] py-4 rounded-full items-center mb-8" onPress={handleLogin}>
        <Text className="text-white font-bold text-base">Login</Text>
      </TouchableOpacity>

      <View className="flex-row items-center mb-6">
        <View className="flex-1 h-px bg-gray-300" />
        <Text className="mx-2 text-gray-500">OR</Text>
        <View className="flex-1 h-px bg-gray-300" />
      </View>

      <TouchableOpacity className="bg-gray-100 py-3 rounded-md items-center">
        <Text>Sign in with Google</Text>
      </TouchableOpacity>

      <Text className="text-center mt-8 text-gray-600">
        Don’t have an account?{" "}
        <Text className="text-[#C00030]" onPress={() => navigation.navigate("Signup")}>
          Sign Up
        </Text>
      </Text>
    </View>
  );
}
