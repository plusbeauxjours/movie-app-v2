import React, { useCallback, useState } from "react";
import { Dimensions, FlatList } from "react-native";

import Swiper from "react-native-swiper";
import styled from "styled-components/native";
import { useQuery, useQueryClient } from "react-query";
import { ParamListBase } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

import { MovieResponse, moviesApi } from "../api";
import Slide from "../components/Slide";
import HMedia from "../components/HMedia";
import HList from "../components/HList";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

interface IProps {
  navigation: StackNavigationProp<ParamListBase>;
}

const Loader = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const ComingSoonTitle = styled.Text`
  color: ${(props) => props.theme.textColor};
  font-size: 18px;
  font-weight: 600;
  margin-left: 30px;
  margin-bottom: 30px;
`;

const HSeparator = styled.View`
  height: 20px;
`;

const Movies: React.FC<IProps> = ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);
  const queryClient = useQueryClient();

  const { isLoading: nowPlayingLoading, data: nowPlayingData } =
    useQuery<MovieResponse>(["movies", "nowPlaying"], moviesApi.nowPlaying);

  const { isLoading: upcomingLoading, data: upcomingData } =
    useQuery<MovieResponse>(["movies", "upcoming"], moviesApi.upcoming);

  const { isLoading: trendingLoading, data: trendingData } =
    useQuery<MovieResponse>(["movies", "trending"], moviesApi.trending);

  const onRefresh = async () => {
    setRefreshing(true);
    await queryClient.refetchQueries(["tv"]);
    setRefreshing(false);
  };

  const loading = nowPlayingLoading || trendingLoading || upcomingLoading;
  const movieKeyExtractor = (item) => item?.id + "";

  const renderHMedia = useCallback(
    ({ item }) => (
      <HMedia
        posterPath={item?.poster_path || ""}
        originalTitle={item?.original_title || ""}
        overview={item?.overview}
        releaseDate={item?.release_date}
        data={item}
      />
    ),
    [upcomingData]
  );

  const ListHeaderComponent = useCallback(
    () => (
      <>
        <Swiper
          horizontal
          loop
          autoplay
          autoplayTimeout={3.5}
          showsButtons={false}
          showsPagination={false}
          containerStyle={{
            marginBottom: 40,
            width: "100%",
            height: SCREEN_HEIGHT / 4,
          }}
        >
          {nowPlayingData?.results.map((movie) => (
            <Slide
              key={movie.id}
              backdropPath={movie.backdrop_path || ""}
              posterPath={movie.poster_path || ""}
              originalTitle={movie.original_title}
              voteAverage={movie.vote_average}
              overview={movie.overview}
              data={movie}
            />
          ))}
        </Swiper>
        {trendingData && (
          <HList title="Trending Movies" data={trendingData.results} />
        )}
        <ComingSoonTitle>Coming soon</ComingSoonTitle>
      </>
    ),
    [nowPlayingData, trendingData]
  );

  return loading ? (
    <Loader />
  ) : (
    <FlatList
      onRefresh={onRefresh}
      refreshing={refreshing}
      ListHeaderComponent={ListHeaderComponent}
      data={upcomingData?.results}
      keyExtractor={movieKeyExtractor}
      ItemSeparatorComponent={HSeparator}
      renderItem={renderHMedia}
    />
  );
};

export default Movies;
