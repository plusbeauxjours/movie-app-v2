import React, { useState, useCallback } from "react";
import { Button, View, Alert, useColorScheme } from "react-native";

import styled from "styled-components/native";
import YoutubePlayer from "react-native-youtube-iframe";
import Ionicons from "react-native-vector-icons/Ionicons";

import { BLACK_COLOR, WHITE_COLOR } from "../styles/colors";

interface IProps {
  videoId: string;
  videoName: string;
}

const Touchable = styled.TouchableOpacity`
  flex-direction: row;
`;

const BtnText = styled.Text`
  color: ${(props) => props.theme.textColor};
  font-weight: 600;
  margin-bottom: 10px;
  line-height: 24px;
  margin-left: 10px;
`;

const VideoPlayer: React.FC<IProps> = ({ videoId, videoName }) => {
  const isDark = useColorScheme() === "dark";

  const [playing, setPlaying] = useState(false);

  const onStateChange = useCallback((state) => {
    if (state === "ended") {
      setPlaying(false);
      Alert.alert("video has finished playing!");
    }
  }, []);

  const togglePlaying = useCallback(() => {
    setPlaying((prev) => !prev);
  }, []);

  return (
    <View>
      <YoutubePlayer
        height={200}
        play={playing}
        videoId={videoId}
        onChangeState={onStateChange}
      />
      <Touchable onPress={togglePlaying}>
        <Ionicons
          name="logo-youtube"
          color={isDark ? WHITE_COLOR : BLACK_COLOR}
          size={24}
        />
        <BtnText>{videoName}</BtnText>
      </Touchable>
    </View>
  );
};

export default VideoPlayer;
