import React from "react";

import styled from "styled-components/native";
import { ParamListBase } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

interface IProps {
  navigation: StackNavigationProp<ParamListBase>;
}

const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.mainBgColor};
  justify-content: center;
  align-items: center;
`;

const Title = styled.Text`
  color: ${(props) => props.theme.textColor};
`;

const Search: React.FC<IProps> = ({ navigation }) => (
  <Container>
    <Title>Search</Title>
  </Container>
);

export default Search;
