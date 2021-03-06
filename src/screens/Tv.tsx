import React, { useState } from "react";
import { RefreshControl, ScrollView } from "react-native";

import { ParamListBase } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useQuery, useQueryClient } from "react-query";

import { tvApi, TVResponse } from "../api";
import Loader from "../components/Loader";
import HList from "../components/HList";

interface IProps {
  navigation: StackNavigationProp<ParamListBase>;
}

const Tv: React.FC<IProps> = () => {
  const [refreshing, setRefreshing] = useState(false);
  const queryClient = useQueryClient();

  const { isLoading: todayLoading, data: todayData } = useQuery<TVResponse>(
    ["tv", "today"],
    tvApi.airingToday
  );

  const { isLoading: topLoading, data: topData } = useQuery<TVResponse>(
    ["tv", "top"],
    tvApi.topRated
  );

  const { isLoading: trendingLoading, data: trendingData } =
    useQuery<TVResponse>(["tv", "trending"], tvApi.trending);

  const onRefresh = () => {
    setRefreshing(true);
    queryClient.refetchQueries(["tv"]);
    setRefreshing(false);
  };

  const loading = todayLoading || topLoading || trendingLoading;

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
      {trendingData && (
        <HList title="Trending TV" data={trendingData.results} />
      )}
      {todayData && <HList title="Airing Today" data={todayData.results} />}
      {topData && <HList title="Top Rated TV" data={topData.results} />}
    </ScrollView>
  );
};

export default Tv;
