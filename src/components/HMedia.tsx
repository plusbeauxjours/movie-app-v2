import React from "react";
import { Dimensions } from "react-native";

import styled from "styled-components/native";

import Poster from "./Poster";
import Votes from "./Votes";

const HMovie = styled.View`
  padding: 0px 30px;
  flex-direction: row;
`;

const HColumn = styled.View`
  margin-left: 15px;
  width: 80%;
`;

const Overview = styled.Text`
  color: ${(props) => props.theme.textColor};
  opacity: 0.8;
  width: 80%;
`;

const Release = styled.Text`
  color: ${(props) => props.theme.textColor};
  font-size: 12px;
  margin-vertical: 10px;
  font-weight: 500;
  opacity: 0.6;
`;

const Title = styled.Text`
  width: ${Dimensions.get("window").width - 170}px;
  color: ${(props) => props.theme.textColor};
  font-weight: 600;
  margin-top: 7px;
`;

interface IProps {
  posterPath: string;
  originalTitle: string;
  overview: string;
  releaseDate?: string;
  voteAverage?: number;
}

const HMedia: React.FC<IProps> = ({
  posterPath,
  originalTitle,
  overview,
  releaseDate,
  voteAverage,
}) => {
  return (
    <HMovie>
      <Poster path={posterPath} />
      <HColumn>
        <Title numberOfLines={1}>{originalTitle}</Title>
        {releaseDate && (
          <Release>
            {new Date(releaseDate).toLocaleDateString("ko", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </Release>
        )}
        {voteAverage && <Votes votes={voteAverage} />}
        <Overview numberOfLines={5}>{overview}</Overview>
      </HColumn>
    </HMovie>
  );
};

export default HMedia;
