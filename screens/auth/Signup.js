import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  Alert,
  TouchableOpacity,
  Modal,
  ScrollView,
  Platform,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import DateTimePicker from '@react-native-community/datetimepicker';
import axiosClient from "../../config/axiosClient";

export default function Signup({ navigation }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    dateOfBirth: "",
    gender: "",
    address: "",
    phone: "",
  });

  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showGenderModal, setShowGenderModal] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date(2000, 0, 1)); // Default to year 2000
  const [errors, setErrors] = useState({});

  const genderOptions = [
    { label: "Male", value: "Male", icon: "male" },
    { label: "Female", value: "Female", icon: "female" },
    { label: "Other", value: "Other", icon: "person" },
  ];

  // Validation functions
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10,11}$/;
    return emailRegex.test(email) || phoneRegex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 6; // Minimum 6 characters
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^[0-9]{10,11}$/;
    return phoneRegex.test(phone);
  };

  const validateDateOfBirth = (date) => {
    if (!date) return false;
    
    const today = new Date();
    const birthDate = new Date(date);
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    // Calculate exact age
    const exactAge = monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate()) 
      ? age - 1 
      : age;
    
    return birthDate <= today && exactAge >= 13 && exactAge <= 120;
  };

  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!form.name.trim()) {
      newErrors.name = "Tên không được để trống";
    } else if (form.name.trim().length < 2) {
      newErrors.name = "Tên phải có ít nhất 2 ký tự";
    }

    // Email/Phone validation
    if (!form.email.trim()) {
      newErrors.email = "Email/Số điện thoại không được để trống";
    } else if (!validateEmail(form.email.trim())) {
      newErrors.email = "Email hoặc số điện thoại không hợp lệ";
    }

    // Password validation
    if (!form.password) {
      newErrors.password = "Mật khẩu không được để trống";
    } else if (!validatePassword(form.password)) {
      newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự";
    }

    // Confirm password validation
    if (!form.confirmPassword) {
      newErrors.confirmPassword = "Vui lòng xác nhận mật khẩu";
    } else if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = "Mật khẩu không trùng khớp";
    }

    // Date of birth validation
    if (!form.dateOfBirth) {
      newErrors.dateOfBirth = "Ngày sinh không được để trống";
    } else if (!validateDateOfBirth(form.dateOfBirth)) {
      newErrors.dateOfBirth = "Tuổi phải từ 13 đến 120";
    }

    // Gender validation
    if (!form.gender) {
      newErrors.gender = "Vui lòng chọn giới tính";
    }

    // Address validation
    if (!form.address.trim()) {
      newErrors.address = "Địa chỉ không được để trống";
    }

    // Phone validation
    if (!form.phone.trim()) {
      newErrors.phone = "Số điện thoại không được để trống";
    } else if (!validatePhone(form.phone.trim())) {
      newErrors.phone = "Số điện thoại phải có 10-11 chữ số";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    if (!validateForm()) {
      const firstError = Object.values(errors)[0];
      Alert.alert("Lỗi", firstError || "Vui lòng kiểm tra lại thông tin");
      return;
    }

    try {
      const { confirmPassword, ...data } = form;
      
      // Trim whitespace from string fields
      const cleanData = {
        ...data,
        name: data.name.trim(),
        email: data.email.trim(),
        address: data.address.trim(),
        phone: data.phone.trim(),
        dateOfBirth: data.dateOfBirth, // Keep as date string
      };

      await axiosClient.post("/auth/register", cleanData);
      Alert.alert("Thành công", "Tạo tài khoản thành công!");
      navigation.navigate("Login");
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Không thể tạo tài khoản";
      Alert.alert("Lỗi", errorMessage);
    }
  };

  const handleDateChange = (event, date) => {
    const {
      type,
      nativeEvent: { timestamp, utcOffset },
    } = event;

    if (Platform.OS === 'android') {
      setShowDatePicker(false);
    }
    
    if (type === 'set' && date) {
      setSelectedDate(date);
      const formattedDate = date.toISOString().split('T')[0]; // YYYY-MM-DD format
      setForm({ ...form, dateOfBirth: formattedDate });
      clearError('dateOfBirth');
      
      if (Platform.OS === 'ios') {
        setShowDatePicker(false);
      }
    } else if (type === 'dismissed') {
      setShowDatePicker(false);
    }
  };

  const openDatePicker = () => {
    setShowDatePicker(true);
  };

  const formatDisplayDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN'); // DD/MM/YYYY format for display
  };

  const handleGenderSelect = (gender) => {
    setForm({ ...form, gender: gender.value });
    setShowGenderModal(false);
    // Clear gender error when selected
    if (errors.gender) {
      setErrors({ ...errors, gender: null });
    }
  };

  const clearError = (field) => {
    if (errors[field]) {
      setErrors({ ...errors, [field]: null });
    }
  };

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="px-6 py-8">
        <View className="items-center mb-8">
          <Ionicons name="person-add" size={60} color="#C00030" />
          <Text className="text-2xl font-bold text-[#610000] mt-4">Create An Account</Text>
        </View>

        {/* Email/Phone Input */}
        <View className="mb-4">
          <View className={`flex-row items-center border-b ${errors.email ? 'border-red-500' : 'border-gray-400'} mb-2`}>
            <Ionicons name="mail" size={20} color="#999" style={{ marginRight: 10 }} />
            <TextInput
              placeholder="E-mail/Phone Number"
              value={form.email}
              onChangeText={(text) => {
                setForm({ ...form, email: text });
                clearError('email');
              }}
              className="flex-1 py-3"
              placeholderTextColor="#999"
            />
          </View>
          {errors.email && <Text className="text-red-500 text-sm">{errors.email}</Text>}
        </View>

        {/* Password Input */}
        <View className="mb-4">
          <View className={`flex-row items-center border-b ${errors.password ? 'border-red-500' : 'border-gray-400'} mb-2`}>
            <Ionicons name="lock-closed" size={20} color="#999" style={{ marginRight: 10 }} />
            <TextInput
              placeholder="Password"
              value={form.password}
              onChangeText={(text) => {
                setForm({ ...form, password: text });
                clearError('password');
              }}
              secureTextEntry={!showPass}
              className="flex-1 py-3"
              placeholderTextColor="#999"
            />
            <Ionicons
              name={showPass ? "eye-off" : "eye"}
              size={20}
              color="#999"
              onPress={() => setShowPass(!showPass)}
            />
          </View>
          {errors.password && <Text className="text-red-500 text-sm">{errors.password}</Text>}
        </View>

        {/* Confirm Password Input */}
        <View className="mb-4">
          <View className={`flex-row items-center border-b ${errors.confirmPassword ? 'border-red-500' : 'border-gray-400'} mb-2`}>
            <Ionicons name="lock-closed" size={20} color="#999" style={{ marginRight: 10 }} />
            <TextInput
              placeholder="Confirm Password"
              value={form.confirmPassword}
              onChangeText={(text) => {
                setForm({ ...form, confirmPassword: text });
                clearError('confirmPassword');
              }}
              secureTextEntry={!showConfirm}
              className="flex-1 py-3"
              placeholderTextColor="#999"
            />
            <Ionicons
              name={showConfirm ? "eye-off" : "eye"}
              size={20}
              color="#999"
              onPress={() => setShowConfirm(!showConfirm)}
            />
          </View>
          {errors.confirmPassword && <Text className="text-red-500 text-sm">{errors.confirmPassword}</Text>}
        </View>

        {/* Full Name Input */}
        <View className="mb-4">
          <View className={`flex-row items-center border-b ${errors.name ? 'border-red-500' : 'border-gray-400'} mb-2`}>
            <Ionicons name="person" size={20} color="#999" style={{ marginRight: 10 }} />
            <TextInput
              placeholder="Full Name"
              value={form.name}
              onChangeText={(text) => {
                setForm({ ...form, name: text });
                clearError('name');
              }}
              className="flex-1 py-3"
              placeholderTextColor="#999"
            />
          </View>
          {errors.name && <Text className="text-red-500 text-sm">{errors.name}</Text>}
        </View>

        {/* Date of Birth Input */}
<View className="mb-4">
  <TouchableOpacity
    className={`flex-row items-center border-b ${
      errors.dateOfBirth ? 'border-red-500' : 'border-gray-400'
    } py-3 mb-2`}
    onPress={openDatePicker}
    activeOpacity={0.7}
  >
    <Ionicons name="calendar" size={20} color="#999" style={{ marginRight: 10 }} />
    <Text
      className={`flex-1 ${
        form.dateOfBirth ? 'text-black' : 'text-gray-400'
      } text-base`}
    >
      {form.dateOfBirth
        ? formatDisplayDate(form.dateOfBirth)
        : 'Select Date of Birth'}
    </Text>
    <Ionicons name="chevron-down" size={20} color="#999" />
  </TouchableOpacity>
  {errors.dateOfBirth && (
    <Text className="text-red-500 text-sm">{errors.dateOfBirth}</Text>
  )}
</View>

{/* Date-picker hiển thị khi showDatePicker = true */}
{showDatePicker &&
  (Platform.OS === 'android' ? (
    <DateTimePicker
      value={selectedDate}
      mode="date"
      display="calendar"       // hoặc "default"
      maximumDate={new Date()} // không cho chọn ngày tương lai
      onChange={handleDateChange}
    />
  ) : (
    /* iOS cần gói trong Modal để tránh hiển thị inline */
    <Modal
      transparent
      animationType="slide"
      visible={showDatePicker}
      onRequestClose={() => setShowDatePicker(false)}
    >
      <View className="flex-1 justify-end bg-black/50">
        <View className="bg-white p-4 rounded-t-3xl">
          <DateTimePicker
            value={selectedDate}
            mode="date"
            display="spinner"
            maximumDate={new Date()}
            onChange={handleDateChange}
          />
          <TouchableOpacity
            className="items-end mt-2"
            onPress={() => setShowDatePicker(false)}
          >
            <Text className="text-[#C00030] font-bold text-base">
              Hoàn tất
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  ))}


        {/* Gender Selector */}
        <View className="mb-4">
          <TouchableOpacity
            className={`flex-row items-center border-b ${errors.gender ? 'border-red-500' : 'border-gray-400'} py-3 mb-2`}
            onPress={() => setShowGenderModal(true)}
          >
            <Ionicons 
              name={form.gender === 'Male' ? 'male' : form.gender === 'Female' ? 'female' : 'person'} 
              size={20} 
              color="#999" 
              style={{ marginRight: 10 }} 
            />
            <Text className={`flex-1 ${form.gender ? 'text-black' : 'text-gray-400'}`}>
              {form.gender || "Select Gender"}
            </Text>
            <Ionicons name="chevron-down" size={20} color="#999" />
          </TouchableOpacity>
          {errors.gender && <Text className="text-red-500 text-sm">{errors.gender}</Text>}
        </View>

        {/* Address Input */}
        <View className="mb-4">
          <View className={`flex-row items-center border-b ${errors.address ? 'border-red-500' : 'border-gray-400'} mb-2`}>
            <Ionicons name="location" size={20} color="#999" style={{ marginRight: 10 }} />
            <TextInput
              placeholder="Address"
              value={form.address}
              onChangeText={(text) => {
                setForm({ ...form, address: text });
                clearError('address');
              }}
              className="flex-1 py-3"
              placeholderTextColor="#999"
              multiline
            />
          </View>
          {errors.address && <Text className="text-red-500 text-sm">{errors.address}</Text>}
        </View>

        {/* Phone Input */}
        <View className="mb-6">
          <View className={`flex-row items-center border-b ${errors.phone ? 'border-red-500' : 'border-gray-400'} mb-2`}>
            <Ionicons name="call" size={20} color="#999" style={{ marginRight: 10 }} />
            <TextInput
              placeholder="Phone"
              value={form.phone}
              onChangeText={(text) => {
                setForm({ ...form, phone: text });
                clearError('phone');
              }}
              className="flex-1 py-3"
              placeholderTextColor="#999"
              keyboardType="phone-pad"
            />
          </View>
          {errors.phone && <Text className="text-red-500 text-sm">{errors.phone}</Text>}
        </View>

        {/* Create Account Button */}
        <TouchableOpacity
          className="bg-[#C00030] py-4 rounded-full items-center mb-8 flex-row justify-center"
          onPress={handleRegister}
        >
          <Ionicons name="person-add" size={20} color="white" style={{ marginRight: 8 }} />
          <Text className="text-white font-bold text-base">Create Account</Text>
        </TouchableOpacity>

        {/* Divider */}
        <View className="flex-row items-center mb-6">
          <View className="flex-1 h-px bg-gray-300" />
          <Text className="mx-2 text-gray-500">OR</Text>
          <View className="flex-1 h-px bg-gray-300" />
        </View>

        {/* Google Sign In */}
        <TouchableOpacity className="bg-gray-100 py-3 rounded-md items-center flex-row justify-center">
          <Ionicons name="logo-google" size={20} color="#DB4437" style={{ marginRight: 8 }} />
          <Text>Sign in with Google</Text>
        </TouchableOpacity>

        {/* Login Link */}
        <Text className="text-center mt-8 text-gray-600">
          Already have an account?{" "}
          <Text className="text-[#C00030]" onPress={() => navigation.navigate("Login")}>
            Login
          </Text>
        </Text>
      </View>

      {/* Gender Selection Modal */}
      <Modal
        visible={showGenderModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowGenderModal(false)}
      >
        <View className="flex-1 bg-black/50 justify-end">
          <View className="bg-white rounded-t-3xl p-6">
            <View className="flex-row justify-between items-center mb-6">
              <Text className="text-lg font-bold">Select Gender</Text>
              <TouchableOpacity onPress={() => setShowGenderModal(false)}>
                <Ionicons name="close" size={24} color="#666" />
              </TouchableOpacity>
            </View>
            
            {genderOptions.map((option) => (
              <TouchableOpacity
                key={option.value}
                className="flex-row items-center py-4 border-b border-gray-100"
                onPress={() => handleGenderSelect(option)}
              >
                <Ionicons name={option.icon} size={24} color="#C00030" />
                <Text className="ml-4 text-base">{option.label}</Text>
                {form.gender === option.value && (
                  <Ionicons name="checkmark" size={20} color="#C00030" style={{ marginLeft: 'auto' }} />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}