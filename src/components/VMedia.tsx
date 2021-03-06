import React from "react";
import { TouchableWithoutFeedback } from "react-native";

import { useNavigation } from "@react-navigation/native";
import styled from "styled-components/native";

import Poster from "./Poster";
import Votes from "./Votes";
import { Routes } from "../navigation/Root";
import { Movie, TV } from "../api";

const Container = styled.View`
  align-items: center;
`;

const Title = styled.Text`
  width: 100px;
  color: ${(props) => props.theme.textColor};
  font-weight: 600;
  margin-top: 7px;
  margin-bottom: 5px;
`;

interface IProps {
  posterPath: string;
  originalTitle: string;
  voteAverage: number;
  data: Movie | TV;
}

const VMedia: React.FC<IProps> = ({
  posterPath,
  originalTitle,
  voteAverage,
  data,
}) => {
  const navigation = useNavigation();
  const goToDetail = () =>
    navigation.navigate(
      Routes.Stack as never,
      {
        screen: Routes.Detail,
        params: {
          ...data,
        },
      } as never
    );

  return (
    <TouchableWithoutFeedback onPress={goToDetail}>
      <Container>
        <Poster path={posterPath} />
        <Title numberOfLines={1}>{originalTitle}</Title>
        <Votes votes={voteAverage} />
      </Container>
    </TouchableWithoutFeedback>
  );
};

export default VMedia;
