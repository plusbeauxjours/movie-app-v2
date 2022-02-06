import React from "react";
import { Dimensions, View } from "react-native";

import styled from "styled-components/native";
import Swiper from "react-native-web-swiper";
import { DefaultTheme, ParamListBase } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

interface IProps {
  navigation: StackNavigationProp<ParamListBase>;
}

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.mainBgColor};
`;

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const Movies: React.FC<IProps> = ({ navigation }) => (
  <Container>
    <Swiper
      loop
      timeout={3.5}
      controlsEnabled={false}
      containerStyle={{ width: "100%", height: SCREEN_HEIGHT / 4 }}
    >
      <View style={{ backgroundColor: "red" }}></View>
      <View style={{ backgroundColor: "blue" }}></View>
      <View style={{ backgroundColor: "red" }}></View>
      <View style={{ backgroundColor: "blue" }}></View>
    </Swiper>
  </Container>
);

export default Movies;
