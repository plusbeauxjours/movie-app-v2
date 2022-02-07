import React, { useEffect } from "react";
import { Dimensions, FlatList, StyleSheet, useColorScheme } from "react-native";

import styled from "styled-components/native";
import { ParamListBase, RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import LinearGradient from "react-native-linear-gradient";

import { makeImgPath } from "../utils";
import Poster from "../components/Poster";
import { BLACK_COLOR } from "../styles/colors";
import { MovieDetails, moviesApi, tvApi, TVDetails } from "../api";
import { useQuery } from "react-query";
import Loader from "../components/Loader";
import VideoPlayer from "../components/VideoPlayer";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");
interface IProps {
  navigation: StackNavigationProp<ParamListBase>;
  route?: RouteProp<{ params }, "params">;
}

const Container = styled.ScrollView`
  background-color: ${(props) => props.theme.mainBgColor};
`;

const Header = styled.View`
  height: ${SCREEN_HEIGHT / 4}px;
  justify-content: flex-end;
  padding: 20px;
`;

const Background = styled.Image``;

const HSeparator = styled.View`
  height: 20px;
`;

const Column = styled.View`
  flex-direction: row;
  width: 80%;
`;

const Title = styled.Text`
  color: ${(props) => props.theme.textColor};
  font-size: 36px;
  align-self: flex-end;
  margin-left: 15px;
  font-weight: 500;
`;

const Data = styled.View`
  padding: 0px 20px;
`;

const Overview = styled.Text`
  color: ${(props) => props.theme.textColor};
  padding: 20px;
`;

const Detail: React.FC<IProps> = ({
  navigation: { setOptions },
  route: { params },
}) => {
  const isMovie = "original_title" in params;
  const { isLoading, data } = useQuery<MovieDetails | TVDetails>(
    [isMovie ? "movies" : "tv", params.id],
    isMovie ? moviesApi.detail : tvApi.detail
  );

  useEffect(() => {
    setOptions({
      title: "original_title" in params ? "Movie" : "TV Show",
    });
  }, []);

  return (
    <Container>
      <Header>
        <Background
          style={StyleSheet.absoluteFill}
          source={{ uri: makeImgPath(params.backdrop_path || "") }}
        />
        <LinearGradient
          colors={["transparent", BLACK_COLOR]}
          style={StyleSheet.absoluteFill}
        />
        <Column>
          <Poster path={params.poster_path || ""} />
          <Title>
            {"original_title" in params
              ? params.original_title
              : params.original_name}
          </Title>
        </Column>
      </Header>
      <Overview>{params.overview}</Overview>
      <Data>
        {isLoading ? <Loader /> : null}
        <FlatList
          data={data?.videos?.results}
          ItemSeparatorComponent={HSeparator}
          renderItem={({ item }) =>
            item.site === "YouTube" && (
              <VideoPlayer videoId={item?.key} videoName={item?.name} />
            )
          }
        />
      </Data>
    </Container>
  );
};

export default Detail;
