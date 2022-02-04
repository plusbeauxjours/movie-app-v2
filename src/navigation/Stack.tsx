import React from "react";
import { Text, View, TouchableOpacity } from "react-native";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ParamListBase } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

interface IProps {
  navigation: StackNavigationProp<ParamListBase>;
}

const ScreenOne: React.FC<IProps> = ({ navigation }) => (
  <TouchableOpacity onPress={() => navigation.navigate("Two")}>
    <Text>go to two</Text>
  </TouchableOpacity>
);
const ScreenTwo: React.FC<IProps> = ({ navigation }) => (
  <TouchableOpacity onPress={() => navigation.navigate("Three")}>
    <Text>go to three</Text>
  </TouchableOpacity>
);
const ScreenThree: React.FC<IProps> = ({ navigation }) => (
  <TouchableOpacity onPress={() => navigation.setOptions({ title: "Hello!" })}>
    <Text>Change title</Text>
  </TouchableOpacity>
);

const NativeStack = createNativeStackNavigator();

const Stack = () => (
  <NativeStack.Navigator>
    <NativeStack.Screen name="One" component={ScreenOne} />
    <NativeStack.Screen name="Two" component={ScreenTwo} />
    <NativeStack.Screen name="Three" component={ScreenThree} />
  </NativeStack.Navigator>
);

export default Stack;
