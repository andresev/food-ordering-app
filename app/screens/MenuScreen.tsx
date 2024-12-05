import React, { FC, useMemo, useState, useRef, useCallback, useLayoutEffect } from "react"
import { observer } from "mobx-react-lite"
import { Dimensions, View, Animated, ViewStyle } from "react-native"
import { Button, Icon, Screen, Text } from "app/components"
import { MenuNavigatorScreenProps } from "app/navigators"
import { getSquareCatalogList } from "app/services/square"
import { useQuery } from "@tanstack/react-query"
import { TabView, SceneMap } from "react-native-tab-view"
import { MenuTabView } from "./TabViews/MenuTabView"
import { MenuTab } from "app/features"
import { ConfigTabViewRoutes, TabViewRoutes } from "app/config/config.tabView"
import { Image, ImageStyle } from "expo-image"
import BottomSheet, { BottomSheetView, BottomSheetBackdrop } from "@gorhom/bottom-sheet"
import { MenuItemSheet } from "./BottomSheets/MenuItemSheet"
import { useNavigation } from "@react-navigation/native"
import * as Haptics from "expo-haptics"
import { useStores } from "app/models"
import { MenuItemType } from "types/tabview"
import { colors } from "app/theme"

// interface MenuScreenProps extends MenuNavigatorScreenProps<"Menu"> {}
interface MenuScreenProps {}

const { width, height } = Dimensions.get("window")

export const MenuScreen: FC<MenuScreenProps> = observer(function MenuScreen({}: MenuScreenProps) {
  // Pull in one of our MST stores
  const { addToCart } = useStores()

  // Pull in navigation via hook
  const navigation = useNavigation()

  const [routes] = useState<ConfigTabViewRoutes[]>(TabViewRoutes)
  const [index, setIndex] = useState(0)
  const [selectedItem, setSelectedItem] = useState<MenuItemType | null>(null)

  const { data } = useQuery({
    queryKey: ["catalog"],
    queryFn: async () => {
      const data = await getSquareCatalogList()
      console.log(JSON.stringify(data, null, 2))
      return data
    },
  })

  // renders
  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        pressBehavior={"close"}
        opacity={0.5}
      />
    ),
    [],
  )
  // ref
  const bottomSheetRef = useRef<BottomSheet>(null)
  // variables
  const snapPoints = useMemo(() => ["90%"], [])
  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index)
  }, [])
  // handle close
  const handleOnClose = () => {
    setSelectedItem(null)
  }

  const handleItemOnPress = (item: MenuItemType) => {
    bottomSheetRef.current?.snapToIndex(0)
  }

  // Bottomsheet item Add to Cart button
  const handleAddToCart = () => {
    Haptics.selectionAsync()
    addToCart(selectedItem?.id!, selectedItem?.name!, selectedItem?.price!)
    bottomSheetRef.current?.close()
  }

  const map = routes?.reduce((scenes: any, route: any) => {
    scenes[route?.key] = () => (
      <MenuTabView
        data={data?.filter((item: any) => item.category === route.title)}
        itemOnPress={handleItemOnPress}
        selectedItem={selectedItem}
        setSelectedItem={setSelectedItem}
      />
    )
    return scenes
  }, {})

  const renderScene = useMemo(() => SceneMap(map), [routes, data])

  return (
    <>
      {/* <View>
        <Image
          style={$image}
          source={require("../../assets/images/screens/chicken-wings.jpg")}
          contentFit="cover"
        />
        <TouchableOpacity containerStyle={$buttonContainer} onPress={() => navigation.goBack()}>
          <Icon icon="chevronLeft" size={24} color={colors.palette.primary600} />
        </TouchableOpacity>
      </View> */}
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        renderTabBar={() => <MenuTab routes={routes} index={index} setIndex={setIndex} />}
        tabBarPosition="top"
        initialLayout={{ width: width }}
        orientation="horizontal"
        animationEnabled
        swipeEnabled
        lazy
      />
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        enablePanDownToClose
        index={-1}
        onClose={handleOnClose}
        backdropComponent={renderBackdrop}
      >
        <BottomSheetView style={$bottomSheetContentContainer}>
          <MenuItemSheet itemData={selectedItem} onAddToCart={handleAddToCart} />
        </BottomSheetView>
      </BottomSheet>
    </>
  )
})

const $image: ImageStyle = {
  width: width,
  height: 224,
}

// BOTTOM SHEET
const $bottomSheetContentContainer: ViewStyle = {
  flex: 1,
  alignItems: "center",
}

// BACK BUTTON
const $buttonContainer: ViewStyle = {
  position: "absolute",
  padding: 6,
  top: 60,
  left: 10,
  borderRadius: 50,
  backgroundColor: colors.palette.neutral100,
}
