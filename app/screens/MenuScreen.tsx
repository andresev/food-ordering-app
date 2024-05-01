import React, { FC, useMemo, useState } from "react"
import { observer } from "mobx-react-lite"
import { Dimensions, View, Animated } from "react-native"
import { Button, Screen, Text } from "app/components"
import { MenuNavigatorScreenProps } from "app/navigators"
// @ts-ignore
import { getSquareCatalogList } from "app/services/square"
import { useQuery } from "@tanstack/react-query"
import { TabView, SceneMap } from "react-native-tab-view"
import { MenuTabView } from "./TabViews/MenuTabView"
import { MenuTab } from "app/features"
import { ConfigTabViewRoutes, TabViewRoutes } from "app/config/config.tabView"
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

  const [routes] = useState<ConfigTabViewRoutes[]>(TabViewRoutes)
  const [index, setIndex] = useState(0)

  const { data } = useQuery({
    queryKey: ["catalog"],
    queryFn: async () => {
      const data = await getSquareCatalogList()
      console.log(JSON.stringify(data, null, 2))
      return data
    },
  })

  const map = routes?.reduce((scenes: any, route: any) => {
    scenes[route?.key] = () => (
      <MenuTabView data={data?.filter((item: any) => item.category === route.title)} />
    )
    return scenes
  }, {})

  const renderScene = useMemo(() => SceneMap(map), [routes, data])

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
      lazy
    />
  )
})
