import { ParamListBase } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import styled from "styled-components/native";
import { WHITE_COLOR } from "../styles/colors";

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

const Search: React.FC<IProps> = ({ navigation }) => (
  <Container>
    <Title>Search</Title>
  </Container>
);

export default Search;
