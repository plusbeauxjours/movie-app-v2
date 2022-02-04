import React from "react";
import { useColorScheme } from "react-native";

import Feather from "react-native-vector-icons/Feather";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  BLACK_COLOR,
  DARK_GREY,
  LIGHT_GREY,
  WHITE_COLOR,
  YELLOW_COLOR,
} from "../styles/colors";

import Movies from "../screens/Movies";
import Tv from "../screens/Tv";
import Search from "../screens/Search";

const Tab = createBottomTabNavigator();

const Tabs = () => {
  const isDark = useColorScheme() === "dark";
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: isDark ? BLACK_COLOR : WHITE_COLOR,
        },
        tabBarActiveTintColor: isDark ? YELLOW_COLOR : BLACK_COLOR,
        tabBarInactiveTintColor: isDark ? DARK_GREY : LIGHT_GREY,
        headerStyle: {
          backgroundColor: isDark ? BLACK_COLOR : WHITE_COLOR,
        },
        headerTitleStyle: {
          color: isDark ? WHITE_COLOR : BLACK_COLOR,
        },
        tabBarLabelStyle: {
          marginTop: -5,
          fontSize: 10,
          fontWeight: "600",
        },
      }}
    >
      <Tab.Screen
        name="Movies"
        component={Movies}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name={"film"} color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="TV"
        component={Tv}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="tv" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name={"search"} color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
