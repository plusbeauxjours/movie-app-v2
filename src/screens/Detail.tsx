import React, { useEffect } from "react";
import {
  Dimensions,
  Platform,
  Share,
  StyleSheet,
  useColorScheme,
} from "react-native";

import styled from "styled-components/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { ParamListBase, RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import LinearGradient from "react-native-linear-gradient";

import { makeImgPath } from "../utils";
import Poster from "../components/Poster";
import { BLACK_COLOR, WHITE_COLOR } from "../styles/colors";
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

const Touchable = styled.TouchableOpacity``;

const Detail: React.FC<IProps> = ({
  navigation: { setOptions },
  route: { params },
}) => {
  const isDark = useColorScheme() === "dark";
  const isMovie = "original_title" in params;
  const { isLoading, data } = useQuery<MovieDetails | TVDetails>(
    [isMovie ? "movies" : "tv", params.id],
    isMovie ? moviesApi.detail : tvApi.detail
  );

  const shareMedia = async () => {
    if (data) {
      const isAndroid = Platform.OS === "android";
      const homepage =
        isMovie && "imdb_id" in data
          ? `https://www.imdb.com/title/${data.imdb_id}/`
          : data.homepage;
      if (isAndroid) {
        await Share.share({
          message: `${params.overview}\nCheck it out: ${homepage}`,
          title:
            "original_title" in params
              ? params.original_title
              : params.original_name,
        });
      } else {
        await Share.share({
          url: homepage,
          title:
            "original_title" in params
              ? params.original_title
              : params.original_name,
        });
      }
    }
  };

  useEffect(() => {
    if (data) {
      setOptions({
        headerRight: () => (
          <Touchable onPress={shareMedia}>
            <Ionicons
              name="share-outline"
              color={isDark ? WHITE_COLOR : BLACK_COLOR}
              size={24}
            />
          </Touchable>
        ),
      });
    }
  }, [data]);

  useEffect(() => {
    setOptions({
      title:
        "original_title" in params
          ? params.original_title
          : params.original_name,
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
        {data?.videos?.results?.map((video) => (
          <VideoPlayer
            key={video?.key}
            videoId={video?.key}
            videoName={video?.name}
          />
        ))}
      </Data>
    </Container>
  );
};

export default Detail;
