import React from "react";

import { ParamListBase } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useQuery, useQueryClient } from "react-query";
import { tvApi } from "../api";
import { RefreshControl, ScrollView } from "react-native";
import Loader from "../components/Loader";
import HList from "../components/HList";

interface IProps {
  navigation: StackNavigationProp<ParamListBase>;
}

const Tv: React.FC<IProps> = () => {
  const queryClient = useQueryClient();
  const {
    isLoading: todayLoading,
    data: todayData,
    isRefetching: todayRefetching,
  } = useQuery(["tv", "today"], tvApi.airingToday);

  const {
    isLoading: topLoading,
    data: topData,
    isRefetching: topRefetching,
  } = useQuery(["tv", "top"], tvApi.topRated);

  const {
    isLoading: trendingLoading,
    data: trendingData,
    isRefetching: trendingRefetching,
  } = useQuery(["tv", "trending"], tvApi.trending);

  const onRefresh = () => {
    queryClient.refetchQueries(["tv"]);
  };

  const loading = todayLoading || topLoading || trendingLoading;
  const refreshing = todayRefetching || topRefetching || trendingRefetching;

  if (loading) {
    return <Loader />;
  }
  return (
    <ScrollView
      contentContainerStyle={{ paddingVertical: 30 }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <HList title="Trending TV" data={trendingData.results} />
      <HList title="Airing Today" data={todayData.results} />
      <HList title="Top Rated TV" data={topData.results} />
    </ScrollView>
  );
};

export default Tv;
