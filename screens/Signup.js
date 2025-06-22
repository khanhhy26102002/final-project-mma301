import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  Pressable,
  TouchableOpacity,
  Alert,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function Signup({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSignup = () => {
    if (!email || !password || !confirm) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }
    if (password !== confirm) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    Alert.alert("Success", "Account created (demo only)");
    navigation.navigate("Login");
  };

  return (
    <View className="flex-1 bg-white justify-center px-6">
      <View className="items-center mb-10">
        <Image
          source={require("../assets/logo.png")}
          className="w-24 h-24 mb-4"
          resizeMode="contain"
        />
        <Text className="text-2xl font-bold text-red-600">Create An Account</Text>
      </View>

      <Text className="text-sm text-gray-600 mb-1">E-mail/Phone Number</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="you@email.com"
        className="border border-gray-300 rounded-md px-4 py-2 mb-4"
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <Text className="text-sm text-gray-600 mb-1">Password</Text>
      <View className="flex-row items-center border border-gray-300 rounded-md px-4 py-2 mb-4">
        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder="••••••"
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

      <Text className="text-sm text-gray-600 mb-1">Confirm Password</Text>
      <View className="flex-row items-center border border-gray-300 rounded-md px-4 py-2 mb-4">
        <TextInput
          value={confirm}
          onChangeText={setConfirm}
          placeholder="••••••"
          secureTextEntry={!showConfirm}
          className="flex-1"
        />
        <TouchableOpacity onPress={() => setShowConfirm(!showConfirm)}>
          <Ionicons
            name={showConfirm ? "eye-off-outline" : "eye-outline"}
            size={20}
            color="#999"
          />
        </TouchableOpacity>
      </View>

      <Pressable
        onPress={handleSignup}
        className="bg-red-600 py-3 rounded-full items-center mb-4"
      >
        <Text className="text-white text-base font-semibold">Create Account</Text>
      </Pressable>

      <View className="flex-row items-center my-4">
        <View className="flex-1 h-px bg-gray-300" />
        <Text className="px-2 text-gray-400 text-sm">OR</Text>
        <View className="flex-1 h-px bg-gray-300" />
      </View>

      <Pressable className="border border-gray-300 rounded-md py-3 items-center flex-row justify-center mb-4">
        <Image
          source={{
            uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png",
          }}
          className="w-5 h-5 mr-2"
        />
        <Text className="text-sm text-gray-700">Sign up with Google</Text>
      </Pressable>

      <View className="flex-row justify-center">
        <Text className="text-gray-500 text-sm">Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text className="text-red-500 font-semibold text-sm">Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
