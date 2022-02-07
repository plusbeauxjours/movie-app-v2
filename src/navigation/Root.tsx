import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Tabs from "./Tabs";
import Stack from "./Stack";

const Nav = createNativeStackNavigator();

export const Routes = {
  Tabs: "Tabs",
  Stack: "Stack",
  Detail: "Detail",
};

const Root = () => (
  <Nav.Navigator screenOptions={{ presentation: "modal", headerShown: false }}>
    <Nav.Screen name={Routes.Tabs} component={Tabs} />
    <Nav.Screen name={Routes.Stack} component={Stack} />
  </Nav.Navigator>
);
export default Root;
