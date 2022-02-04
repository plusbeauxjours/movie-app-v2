import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { WHITE_COLOR } from "../styles/colors";

interface IProps {}

const Search: React.FC<IProps> = () => (
  <View style={styles.container}>
    <Text>Search</Text>
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

export default Search;
