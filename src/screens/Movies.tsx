import React, { useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  useColorScheme,
  Appearance,
} from "react-native";

import { useQuery } from "react-query";
import styled from "styled-components/native";
import Swiper from "react-native-swiper";
import { DefaultTheme, ParamListBase } from "@react-navigation/native";
import { BlurView } from "@react-native-community/blur";
import { StackNavigationProp } from "@react-navigation/stack";

import { makeImgPath } from "../utils";
import { moviesApi } from "../api";
interface IProps {
  navigation: StackNavigationProp<ParamListBase>;
}

const Container = styled.ScrollView`
  flex: 1;
  background-color: ${(props) => props.theme.mainBgColor};
`;

const View = styled.View`
  flex: 1;
`;

const Loader = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const BgImg = styled.Image`
  opacity: 0.8;
`;

const Poster = styled.Image`
  width: 100px;
  height: 160px;
  border-r
  adius: 5px;
`;
const Title = styled.Text<{ isDark: boolean }>`
  font-size: 16px;
  font-weight: 600;
  color: ${(props) => (props.isDark ? "white" : props.theme.textColor)};
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

const Overview = styled.Text<{ isDark: boolean }>`
  margin-top: 10px;
  color: ${(props) =>
    props.isDark ? "rgba(255, 255, 255, 0.8)" : "rgba(0, 0, 0, 0.8)"};
`;

const Votes = styled(Overview)`
  font-size: 12px;
`;

const Movies: React.FC<IProps> = ({ navigation }) => {
  const isDark = useColorScheme() === "dark";
  const { height: SCREEN_HEIGHT } = Dimensions.get("window");
  const { isLoading: nowPlayingLoading, data: nowPlayingData } = useQuery(
    ["movies", "nowPlaying"],
    moviesApi.nowPlaying
  );
  const loading = nowPlayingLoading;
  return loading ? (
    <Loader />
  ) : (
    <Container>
      <Swiper
        horizontal
        loop
        autoplay
        autoplayTimeout={3.5}
        showsButtons={false}
        showsPagination={false}
        containerStyle={{ width: "100%", height: SCREEN_HEIGHT / 4 }}
      >
        {nowPlayingData?.results.map((movie) => (
          <View key={movie.id}>
            <BgImg
              style={StyleSheet.absoluteFill}
              source={{ uri: makeImgPath(movie.backdrop_path) }}
              blurRadius={4}
            />
            <Wrapper>
              <Poster source={{ uri: makeImgPath(movie.poster_path) }} />
              <Column>
                <Title isDark={isDark}>{movie.original_title}</Title>
                {movie.vote_average > 0 ? (
                  <Votes isDark={isDark}>⭐️ {movie.vote_average}/10</Votes>
                ) : null}
                <Overview isDark={isDark} numberOfLines={4}>
                  {movie.overview}...
                </Overview>
              </Column>
            </Wrapper>
          </View>
        ))}
      </Swiper>
    </Container>
  );
};

export default Movies;
