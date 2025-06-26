import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  Button,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SelectList } from "react-native-dropdown-select-list";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function Request({ navigation }) {
  const [name, setName] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [units, setUnits] = useState("");
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [amPm, setAmPm] = useState("AM");
  const [gender, setGender] = useState("");
  const [hospital, setHospital] = useState("");

  const bloodGroups = [
    { key: "A+", value: "A+" },
    { key: "A-", value: "A-" },
    { key: "B+", value: "B+" },
    { key: "B-", value: "B-" },
    { key: "O+", value: "O+" },
    { key: "O-", value: "O-" },
    { key: "AB+", value: "AB+" },
    { key: "AB-", value: "AB-" },
  ];

  const genders = [
    { key: "Male", value: "Male" },
    { key: "Female", value: "Female" },
    { key: "Other", value: "Other" },
  ];

  const handleSubmit = () => {
    const requestData = {
      name,
      bloodGroup,
      units,
      date: date.toDateString(),
      time: amPm,
      gender,
      hospital,
    };
    console.log("Submitted request:", requestData);
    // You can call API here
  };

  return (
    <ScrollView className="flex-1 bg-[#1E1E1E] p-4">
      {/* Header */}
      <View className="bg-[#F3366B] rounded-t-xl px-5 py-6 rounded-b-2xl">
        <View className="flex-row justify-between items-center mb-2">
          <Text className="text-white text-lg font-bold">Requests</Text>
          <Pressable onPress={() => navigation.goBack()}>
            <Text className="text-white font-semibold">Back</Text>
          </Pressable>
        </View>
        <Text className="text-white text-sm">
          Your request will be displayed to all the donors
        </Text>
      </View>

      {/* Form */}
      <View className="bg-white rounded-2xl p-5 mt-6 space-y-4 shadow-md">
        <Input
          label="Name"
          value={name}
          onChangeText={setName}
          placeholder="Enter your name"
        />
        <Dropdown
          label="Blood group"
          data={bloodGroups}
          selected={bloodGroup}
          setSelected={setBloodGroup}
        />
        <Input
          label="Number of Units"
          value={units}
          onChangeText={setUnits}
          placeholder="Enter number"
          keyboardType="numeric"
        />

        {/* Date Picker */}
        <View>
          <Text className="mb-1 text-gray-700 font-semibold">Date</Text>
          <Pressable
            onPress={() => setShowDatePicker(true)}
            className="flex-row items-center justify-between px-4 py-3 rounded-xl bg-gray-100"
          >
            <Text>{date.toDateString()}</Text>
            <Ionicons name="calendar" size={20} color="red" />
          </Pressable>
          {showDatePicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display="default"
              onChange={(event, selectedDate) => {
                setShowDatePicker(false);
                if (selectedDate) setDate(selectedDate);
              }}
            />
          )}
        </View>

        {/* Time - AM / PM */}
        <View>
          <Text className="mb-1 text-gray-700 font-semibold">Time</Text>
          <View className="flex-row space-x-4">
            {["AM", "PM"].map((period) => (
              <Pressable
                key={period}
                onPress={() => setAmPm(period)}
                className={`px-6 py-2 rounded-xl ${
                  amPm === period ? "bg-red-500" : "bg-gray-100"
                }`}
              >
                <Text
                  className={amPm === period ? "text-white" : "text-gray-700"}
                >
                  {period}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        <Dropdown
          label="Gender"
          data={genders}
          selected={gender}
          setSelected={setGender}
        />
        <Input
          label="Hospital name"
          value={hospital}
          onChangeText={setHospital}
          placeholder="Enter hospital name"
        />

        <Button title="Submit" onPress={handleSubmit} />
      </View>
    </ScrollView>
  );
}

function Input({ label, value, onChangeText, placeholder, keyboardType }) {
  return (
    <View>
      <Text className="mb-1 text-gray-700 font-semibold">{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        keyboardType={keyboardType}
        className="bg-gray-100 px-4 py-3 rounded-xl"
      />
    </View>
  );
}

function Dropdown({ label, data, selected, setSelected }) {
  return (
    <View>
      <Text className="mb-1 text-gray-700 font-semibold">{label}</Text>
      <SelectList
        setSelected={setSelected}
        data={data}
        save="value"
        boxStyles={{ backgroundColor: "#f3f4f6", borderRadius: 12 }}
        dropdownStyles={{ backgroundColor: "#f3f4f6" }}
        placeholder="Select"
        search={false}
      />
    </View>
  );
}
