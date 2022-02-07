import React from "react";
import { StyleSheet, TouchableWithoutFeedback, View } from "react-native";

import { useNavigation } from "@react-navigation/native";
import styled from "styled-components/native";

import { makeImgPath } from "../utils";
import Poster from "./Poster";
import { Routes } from "../navigation/Root";
import { Movie } from "../api";

const BgImg = styled.Image`
  opacity: 0.8;
`;

const Title = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: ${(props) => props.theme.textColor};
`;

const Wrapper = styled.View`
  flex-direction: row;
  height: 100%;
  width: 90%;
  margin: 0 auto;
  justify-content: space-around;
  align-items: center;
`;

const Column = styled.View`
  width: 60%;
`;

const Overview = styled.Text`
  margin-top: 10px;
  color: ${(props) => props.theme.textColor};
`;

const Votes = styled(Overview)`
  font-size: 12px;
`;

interface IProps {
  backdropPath: string;
  posterPath: string;
  originalTitle: string;
  voteAverage: number;
  overview: string;
  data: Movie;
}

const Slide: React.FC<IProps> = ({
  backdropPath,
  posterPath,
  originalTitle,
  voteAverage,
  overview,
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
      <View style={{ flex: 1 }}>
        <BgImg
          style={StyleSheet.absoluteFill}
          source={{ uri: makeImgPath(backdropPath) }}
          blurRadius={4}
        />
        <Wrapper>
          <Poster path={posterPath} />
          <Column>
            <Title numberOfLines={1}>{originalTitle}</Title>
            {voteAverage > 0 ? <Votes>⭐️ {voteAverage}/10</Votes> : null}
            <Overview numberOfLines={4}>{overview}</Overview>
          </Column>
        </Wrapper>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Slide;
