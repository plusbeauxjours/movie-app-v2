import React, { useCallback } from "react";
import { FlatList } from "react-native-gesture-handler";

import styled from "styled-components/native";
import VMedia from "./VMedia";

interface IProps {
  title: string;
  data: any[];
}

const ListContainer = styled.View`
  margin-bottom: 40px;
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
    ({ item }) => (
      <VMedia
        posterPath={item.poster_path}
        originalTitle={item.original_title}
        voteAverage={item.vote_average}
      />
    ),
    []
  );

  return (
    <ListContainer>
      <ListTitle numberOfLines={1}>{title}</ListTitle>
      <FlatList
        data={data}
        horizontal
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={HListSeparator}
        contentContainerStyle={{ paddingHorizontal: 30 }}
        keyExtractor={(item) => item.id + ""}
        renderItem={renderVMedia}
      />
    </ListContainer>
  );
};

export default HList;
