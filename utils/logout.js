import AsyncStorage from "@react-native-async-storage/async-storage";

export const logout = async (navigation) => {
  await AsyncStorage.removeItem("access_token");
  await AsyncStorage.removeItem("refresh_token");
  navigation.reset({
    index: 0,
    routes: [{ name: "Login" }],
  });
};
