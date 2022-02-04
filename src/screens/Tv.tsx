import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { WHITE_COLOR } from "../styles/colors";

interface IProps {}

const Tv: React.FC<IProps> = () => (
  <View style={styles.container}>
    <Text>Tv</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE_COLOR,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Tv;
