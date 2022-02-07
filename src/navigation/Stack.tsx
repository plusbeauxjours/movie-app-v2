import React from "react";
import { useColorScheme } from "react-native";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Detail from "../screens/Detail";
import { BLACK_COLOR } from "../styles/colors";

interface IProps {}

const NativeStack = createNativeStackNavigator();

const Stack: React.FC<IProps> = () => {
  const isDark = useColorScheme() === "dark";
  return (
    <NativeStack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        headerStyle: {
          backgroundColor: isDark ? BLACK_COLOR : "white",
        },
        headerTitleStyle: {
          color: isDark ? "white" : BLACK_COLOR,
        },
      }}
    >
      <NativeStack.Screen name="Detail" component={Detail} />
    </NativeStack.Navigator>
  );
};

export default Stack;
