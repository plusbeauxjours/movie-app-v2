import React, { useCallback } from "react";
import { FlatList } from "react-native";

import styled from "styled-components/native";
import { Movie, TV } from "../api";
import VMedia from "./VMedia";

interface IProps {
  title: string;
  data: Movie[] | TV[];
}

const ListContainer = styled.View`
  margin-bottom: 40px;
  flex: 1;
  width: 100%
  align-items: flex-start;
`;

const ListTitle = styled.Text`
  color: ${(props) => props.theme.textColor};
  font-size: 18px;
  font-weight: 600;
  margin-left: 30px;
  margin-bottom: 20px;
`;

export const HListSeparator = styled.View`
  width: 20px;
`;

const HList: React.FC<IProps> = ({ title, data }) => {
  const renderVMedia = useCallback(
    ({ item }: { item: Movie | TV }) => (
      <VMedia
        posterPath={item.poster_path || ""}
        originalTitle={
          "original_title" in item ? item.original_title : item.original_name
        }
        voteAverage={item.vote_average}
        data={item}
      />
    ),
    []
  );

  return (
    <ListContainer>
      <ListTitle numberOfLines={1}>{title}</ListTitle>
      <FlatList<Movie | TV>
        data={data}
        horizontal
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={HListSeparator}
        contentContainerStyle={{ paddingHorizontal: 30 }}
        keyExtractor={(item: Movie | TV) => item.id + ""}
        renderItem={renderVMedia}
      />
    </ListContainer>
  );
};

export default HList;
