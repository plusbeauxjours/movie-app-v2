import React, { useState, useCallback } from "react";
import { Dimensions, FlatList, View } from "react-native";

import { useQuery, useQueryClient } from "react-query";
import styled from "styled-components/native";
import Swiper from "react-native-swiper";
import { ParamListBase } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

import { moviesApi } from "../api";
import Slide from "../components/Slide";
import HMedia from "../components/HMedia";
import VMedia from "../components/VMedia";

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

const HSeparator = styled.View`
  height: 20px;
`;

const Movies: React.FC<IProps> = ({ navigation }) => {
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const queryClient = useQueryClient();

  const { height: SCREEN_HEIGHT } = Dimensions.get("window");
  const { isLoading: nowPlayingLoading, data: nowPlayingData } = useQuery(
    ["movies", "nowPlaying"],
    moviesApi.nowPlaying
  );
  const { isLoading: trendingLoading, data: trendingData } = useQuery(
    ["movies", "trending"],
    moviesApi.trending
  );
  const { isLoading: upcomingLoading, data: upcomingData } = useQuery(
    ["movies", "upcoming"],
    moviesApi.upcoming
  );
  const loading = nowPlayingLoading || trendingLoading || upcomingLoading;

  const onRefresh = async () => {
    setRefreshing(true);
    await queryClient.refetchQueries(["movies"]);
    setRefreshing(false);
  };

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
            keyExtractor={(item: any) => item.id + ""}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 30 }}
            ItemSeparatorComponent={() => <View style={{ width: 30 }} />}
            renderItem={({ item }: any) => (
              <VMedia
                posterPath={item.poster_path}
                originalTitle={item.original_title}
                voteAverage={item.vote_average}
              />
            )}
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
      keyExtractor={(item) => item.id + ""}
      ItemSeparatorComponent={HSeparator}
      renderItem={({ item }) => (
        <HMedia
          key={item.id}
          posterPath={item.poster_path}
          originalTitle={item.original_title}
          overview={item.overview}
          releaseDate={item.release_date}
        />
      )}
    />
  );
};

export default Movies;
