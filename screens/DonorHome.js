import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons, Entypo, MaterialIcons } from "@expo/vector-icons";
import hienmau1 from "../assets/hienmau1.png"

export default function DonorHome() {
  return (
    <View className="flex-1 bg-white px-4 pt-12">
      {/* Location */}
      <View className="flex-row items-center mb-4">
        <Entypo name="location-pin" size={20} color="brown" />
        <Text className="text-base font-medium text-gray-700">
          Ho Chi Minh City, Vietnam
        </Text>
      </View>

      {/* Banner Image + Quote */}
      <View className="bg-red-100 rounded-xl p-4 mb-4">
        <Image source={hienmau1} className="w-full h-40 resize-contain mb-2" />
        <Text className="text-center text-sm italic text-gray-600">
          "The measure of life is not its DURATION but its DONATION"
        </Text>
      </View>

      {/* Eligibility Notice */}
      <View className="flex-row items-center justify-between bg-green-500 px-4 py-2 rounded-full mb-4">
        <Text className="text-white font-medium">
          You're eligible to Donate
        </Text>
        <Ionicons name="checkmark-circle" size={20} color="white" />
      </View>

      {/* Nearby Donors */}
      <TouchableOpacity className="bg-white p-4 rounded-2xl shadow mb-4">
        <View className="flex-row items-center">
          <Entypo name="location" size={24} color="deeppink" />
          <Text className="text-lg font-semibold ml-2 text-gray-700">
            Nearby donors
          </Text>
        </View>
      </TouchableOpacity>

      {/* Blood banks & Hospitals */}
      <View className="flex-row justify-between">
        <TouchableOpacity className="bg-white p-4 rounded-2xl shadow w-[48%] items-center">
          <Image
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/1147/1147766.png",
            }}
            className="w-12 h-12 mb-2"
          />
          <Text className="text-base font-medium text-gray-700">
            Blood banks
          </Text>
        </TouchableOpacity>

        <TouchableOpacity className="bg-white p-4 rounded-2xl shadow w-[48%] items-center">
          <Image
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/2965/2965567.png",
            }}
            className="w-12 h-12 mb-2"
          />
          <Text className="text-base font-medium text-gray-700">Hospital</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
