import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { HomeScreen, LocationScreen, WelcomeScreen } from "app/screens"
import { MenuNavigator } from "./MenuNavigator"

export type HomeNavigatorParamList = {
  Menu: undefined
  Home: undefined
  Location: undefined
}

const Stack = createNativeStackNavigator<HomeNavigatorParamList>()
export const HomeNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{ cardStyle: { backgroundColor: "transparent" }, headerShown: false }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Menu" component={MenuNavigator} />
      <Stack.Screen name="Location" component={LocationScreen} />
    </Stack.Navigator>
  )
}
