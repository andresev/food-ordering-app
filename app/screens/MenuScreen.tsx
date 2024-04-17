import React, { FC, useState } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, TextStyle, useWindowDimensions, Dimensions, View } from "react-native"
// import { Button, Screen, Text } from "app/components"
import { MenuNavigatorScreenProps } from "app/navigators"
//@ts-ignore
import { getSquareCatalogList } from "app/services/square"
import { useQuery } from "@tanstack/react-query"
import { typography } from "app/theme"
import { TabView } from "react-native-tab-view"
import { MenuTabView } from "./TabViews/MenuTabView"

// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"

interface MenuScreenProps extends MenuNavigatorScreenProps<"Menu"> {}

export const MenuScreen: FC<MenuScreenProps> = observer(function MenuScreen({
  navigation,
}: MenuScreenProps) {
  const [catalogList, setCatalogList] = useState<any>()
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()

  const { data, isPending } = useQuery({
    queryKey: ["catalog"],
    queryFn: async () => {
      const data = await getSquareCatalogList()
      console.log(JSON.stringify(data, null, 2))
      return data
    },
  })

  const renderScene = ({ route }: any) => {
    switch (route.key) {
      case "entree":
        return <MenuTabView data={data} />
      case "breakfast":
      // return <MenuTabView data={data?.filter((item: any) => item.category === "Breakfast")} />
      default:
        return null
    }
  }

  const layout = useWindowDimensions()

  const [index, setIndex] = useState(0)
  const [routes] = useState([
    { key: "entree", title: "Entree" },
    { key: "breakfast", title: "Breakfast" },
  ])

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      // renderTabBar={() => <View style={{ backgroundColor: "red", height: 100, width: 100 }} />}
      tabBarPosition="top"
      initialLayout={{ width: Dimensions.get("window").width }}
      orientation="horizontal"
      animationEnabled
      swipeEnabled
    />
  )
})

const $root: ViewStyle = {
  flex: 1,
}

const $flashList: ViewStyle = {
  flex: 1,
}

const $flashListContainer: ViewStyle = {
  minHeight: 100,
  // paddingHorizontal: 20,
}

const $itemSeparator: ViewStyle = {
  height: 1,
  backgroundColor: "black",
}

// Render Item
const $renderItemContainer: ViewStyle = {
  flexDirection: "row",
  height: 120,
  // borderWidth: 1,
}

const $imageContainer: ViewStyle = {
  flex: 2,
  // backgroundColor: "blue",
}

const $itemInfoContainer: ViewStyle = {
  flexDirection: "row",
  flex: 5,
  padding: 10,
  // backgroundColor: "red",
}

const $itemTitle: TextStyle = {
  fontFamily: typography.primary?.bold,
  fontSize: 16,
  lineHeight: 16,
}

const $itemDescription: TextStyle = {
  fontFamily: typography.primary.normal,
  fontSize: 12,
  lineHeight: 12,
  textAlign: "left",
}

const $itemInnerLeftContainer: ViewStyle = {
  flex: 8,
  rowGap: 10,
  // backgroundColor: "green",
}

const $itemInnerRightContainer: ViewStyle = {
  flex: 3,
  justifyContent: "center",
  alignItems: "center",
  // backgroundColor: "cyan",
}
