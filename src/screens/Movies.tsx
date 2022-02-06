import { ParamListBase } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { WHITE_COLOR } from "../styles/colors";
import styled from "styled-components/native";

interface ISelected {
  selected: string;
}

const Container = styled.View`
  flex: 1;
  background-color: ${WHITE_COLOR};
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.mainBgColor};
`;

const Btn = styled.TouchableOpacity`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Title = styled.Text<ISelected>`
  color: ${(props) => props.theme.textColor};
`;

interface IProps {
  navigation: StackNavigationProp<ParamListBase>;
}

const Movies: React.FC<IProps> = ({ navigation }) => (
  <Container>
    <Btn onPress={() => navigation.navigate("Stack", { screen: "Three" })}>
      <Title>Movies</Title>
    </Btn>
  </Container>
);

export default Movies;
