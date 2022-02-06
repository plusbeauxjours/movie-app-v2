import React from "react";
import { Text } from "react-native";
import { WHITE_COLOR } from "../styles/colors";
import styled from "styled-components/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { ParamListBase } from "@react-navigation/native";

interface IProps {
  navigation: StackNavigationProp<ParamListBase>;
}

interface ISelected {
  selected: string;
}

const Container = styled.View`
  flex: 1;
  background-color: ${WHITE_COLOR};
  justify-content: center;
  align-items: center;
`;

const Title = styled.Text<ISelected>`
  color: ${(props) => (props.selected ? "blue" : "red")};
`;

const Tv: React.FC<IProps> = ({ navigation }) => (
  <Container>
    <Title>Tv</Title>
  </Container>
);

export default Tv;
