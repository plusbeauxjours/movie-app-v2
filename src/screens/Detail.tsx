import { ParamListBase } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { Text, View } from "react-native";
import styled from "styled-components/native";

interface IProps {
  navigation: StackNavigationProp<ParamListBase>;
}

const Detail: React.FC<IProps> = ({ navigation }) => (
  <View>
    <Text>Detail</Text>
  </View>
);

export default Detail;
