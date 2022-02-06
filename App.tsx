import React from "react";
import { useColorScheme } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "react-query";
import { ThemeProvider } from "styled-components";

import Root from "./src/navigation/Root";
import { darkTheme, lightTheme } from "./src/styles/styled";

const client = new QueryClient();

export default function App() {
  const isDark = useColorScheme() === "dark";
  return (
    <QueryClientProvider client={client}>
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <NavigationContainer>
          <Root />
        </NavigationContainer>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
