import React from "react"
import { createNativeStackNavigator, NativeStackScreenProps } from "@react-navigation/native-stack"
import { useNavigation } from "@react-navigation/native"
import { MenuItemType } from "types/tabview"
// import { CartScreen, MenuScreen } from "app/screens"
import * as Screens from "app/screens"

export type MenuNavigatorParamList = {
  Menu: undefined
  Cart: undefined
  Item: MenuItemType | undefined
}

export type MenuNavigatorScreenProps<T extends keyof MenuNavigatorParamList> =
  NativeStackScreenProps<MenuNavigatorParamList, T>

const Stack = createNativeStackNavigator<MenuNavigatorParamList>()
export const MenuNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Menu"
      screenOptions={{
        // cardStyle: { backgroundColor: "transparent" },
        headerShown: false,
      }}
    >
      <Stack.Screen name="Menu" component={Screens.MenuScreen} />
      <Stack.Screen name="Cart" component={Screens.CartScreen} />
      {/* <Stack.Screen name="Item" component={Screens.ItemScreen} /> */}
    </Stack.Navigator>
  )
}
