import { ParamListBase } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import { WHITE_COLOR } from "../styles/colors";

interface IProps {
  navigation: StackNavigationProp<ParamListBase>;
}

const Movies: React.FC<IProps> = ({ navigation }) => (
  <TouchableOpacity
    onPress={() => navigation.navigate("Stack", { screen: "Three" })}
    style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
  >
    <Text>Movies</Text>
  </TouchableOpacity>
);

const stylTouchableOpacitys = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE_COLOR,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Movies;
