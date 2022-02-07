import React, { useState } from "react";
import { Text, View } from "react-native";

import { useQuery } from "react-query";
import styled from "styled-components/native";
import { ParamListBase } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

import { MovieResponse, moviesApi, tvApi, TVResponse } from "../api";
import HList from "../components/HList";
import Loader from "../components/Loader";
import { DARK_GREY } from "../styles/colors";

interface IProps {
  navigation: StackNavigationProp<ParamListBase>;
}

const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.mainBgColor};
  justify-content: flex-start;
  align-items: center;
`;

const SearchBar = styled.TextInput`
  background-color: ${DARK_GREY};
  padding: 10px 15px;
  border-radius: 15px;
  width: 90%;
  margin: 10px auto;
  margin-bottom: 40px;
`;

const Search: React.FC<IProps> = ({ navigation }) => {
  const [query, setQuery] = useState("");

  const {
    isLoading: moviesLoading,
    data: moviesData,
    refetch: searchMovies,
  } = useQuery<MovieResponse>(["searchMovies", query], moviesApi.search, {
    enabled: false,
  });

  const {
    isLoading: tvLoading,
    data: tvData,
    refetch: searchTv,
  } = useQuery<TVResponse>(["searchTv", query], tvApi.search, {
    enabled: false,
  });

  const onChangeText = (text: string) => setQuery(text);
  const onSubmit = () => {
    if (query === "") {
      return;
    }
    searchMovies();
    searchTv();
  };

  return (
    <Container>
      <SearchBar
        placeholder="Search for Movie or TV Show"
        placeholderTextColor="grey"
        returnKeyType="search"
        onChangeText={onChangeText}
        onSubmitEditing={onSubmit}
      />
      {moviesLoading || tvLoading ? <Loader /> : null}
      {moviesData && <HList title="Movie Results" data={moviesData?.results} />}
      {tvData && <HList title="TV Results" data={tvData?.results} />}
    </Container>
  );
};

export default Search;
