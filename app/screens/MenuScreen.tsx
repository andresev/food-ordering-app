import React, { FC, useState } from "react"
import { observer } from "mobx-react-lite"
import { Dimensions, View, Animated } from "react-native"
// import { Button, Screen, Text } from "app/components"
import { MenuNavigatorScreenProps } from "app/navigators"
// @ts-ignore
import { getSquareCatalogList } from "app/services/square"
import { useQuery } from "@tanstack/react-query"
import { SceneRendererProps, TabView } from "react-native-tab-view"
import { MenuTabView } from "./TabViews/MenuTabView"
import { MenuTab } from "app/features"

// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"

interface MenuScreenProps extends MenuNavigatorScreenProps<"Menu"> {}

export const MenuScreen: FC<MenuScreenProps> = observer(function MenuScreen({
  navigation,
  route,
}: MenuScreenProps) {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()

  const { data } = useQuery({
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
        return <MenuTabView data={data?.filter((item: any) => item.category === "Entree")} />
      case "breakfast":
        return <MenuTabView data={data?.filter((item: any) => item.category === "Breakfast")} />
      case "null":
        return <MenuTabView data={data?.filter((item: any) => item.category === null)} />
      default:
        return null
    }
  }

  const [index, setIndex] = useState(0)
  const [routes] = useState([
    { key: "entree", title: "Entree" },
    { key: "breakfast", title: "Breakfast" },
    { key: "null", title: "Other" },
    { key: "drinks", title: "Drinks" },
    { key: "lunch", title: "Lunch" },
    { key: "snack", title: "Snack" },
  ])

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      renderTabBar={() => <MenuTab routes={routes} index={index} setIndex={setIndex} />}
      tabBarPosition="top"
      initialLayout={{ width: Dimensions.get("window").width }}
      orientation="horizontal"
      animationEnabled
      swipeEnabled
    />
  )
})
