import React, { useCallback } from "react";
import { Dimensions, FlatList } from "react-native";

import Swiper from "react-native-swiper";
import styled from "styled-components/native";
import { useQuery, useQueryClient } from "react-query";
import { ParamListBase } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

import { moviesApi } from "../api";
import Slide from "../components/Slide";
import HMedia from "../components/HMedia";
import VMedia from "../components/VMedia";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

interface IProps {
  navigation: StackNavigationProp<ParamListBase>;
}

const Loader = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const ListTitle = styled.Text`
  color: ${(props) => props.theme.textColor};
  font-size: 18px;
  font-weight: 600;
  margin-left: 30px;
`;

const TrendingFlatList = styled.FlatList`
  margin-top: 20px;
`;

const ListContainer = styled.View`
  margin-bottom: 40px;
`;

const ComingSoonTitle = styled(ListTitle)`
  margin-bottom: 30px;
`;

const VSeparator = styled.View`
  width: 20px;
`;

const HSeparator = styled.View`
  width: 20px;
`;

const Movies: React.FC<IProps> = ({ navigation }) => {
  const queryClient = useQueryClient();

  const {
    isLoading: nowPlayingLoading,
    data: nowPlayingData,
    isRefetching: isRefetchingNowPlaying,
  } = useQuery(["movies", "nowPlaying"], moviesApi.nowPlaying);

  const {
    isLoading: upcomingLoading,
    data: upcomingData,
    isRefetching: isRefetchingUpcoming,
  } = useQuery(["movies", "upcoming"], moviesApi.upcoming);

  const {
    isLoading: trendingLoading,
    data: trendingData,
    isRefetching: isRefetchingTrending,
  } = useQuery(["movies", "trending"], moviesApi.trending);

  const movieKeyExtractor = (item) => item.id + "";
  const onRefresh = async () => queryClient.refetchQueries(["movies"]);

  const loading = nowPlayingLoading || trendingLoading || upcomingLoading;
  const refreshing =
    isRefetchingNowPlaying || isRefetchingUpcoming || isRefetchingTrending;

  const renderVMedia = useCallback(
    ({ item }) => (
      <VMedia
        posterPath={item.poster_path}
        originalTitle={item.original_title}
        voteAverage={item.vote_average}
      />
    ),
    []
  );

  const renderHMedia = useCallback(
    ({ item }) => (
      <HMedia
        posterPath={item.poster_path}
        originalTitle={item.original_title}
        overview={item.overview}
        releaseDate={item.release_date}
      />
    ),
    []
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
              backdropPath={movie.backdrop_path}
              posterPath={movie.poster_path}
              originalTitle={movie.original_title}
              voteAverage={movie.vote_average}
              overview={movie.overview}
            />
          ))}
        </Swiper>
        <ListContainer>
          <ListTitle>Trending Movies</ListTitle>
          <TrendingFlatList
            data={trendingData?.results}
            horizontal
            keyExtractor={movieKeyExtractor}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 30 }}
            ItemSeparatorComponent={VSeparator}
            renderItem={renderVMedia}
          />
        </ListContainer>
        <ComingSoonTitle>Coming soon</ComingSoonTitle>
      </>
    ),
    []
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
