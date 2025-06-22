// screens/Profile.js
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

export default function Profile({ onLogout }) {
  return (
    <View className="flex-1 justify-center items-center bg-white">
      <Text className="text-lg mb-4">Profile Screen</Text>

      <TouchableOpacity
        onPress={onLogout}
        className="bg-red-600 px-6 py-2 rounded-full"
      >
        <Text className="text-white font-semibold">Logout</Text>
      </TouchableOpacity>
    </View>
  );
}
