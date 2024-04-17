import React, { FC } from "react"
import { ViewStyle, View, TextStyle, ImageStyle, Dimensions, Image, Pressable } from "react-native"
import { Text } from "app/components"
import { typography, colors } from "app/theme"
import { FlatList } from "react-native-gesture-handler"
import { useNavigation } from "@react-navigation/native"
import { MenuItemType } from "types/tabview"
// import { useStores } from "app/models"

interface MenuTabViewProps {
  data: any
}

const { width, height } = Dimensions.get("window")

export const MenuTabView: FC<MenuTabViewProps> = ({ data }: MenuTabViewProps) => {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  const navigation = useNavigation() as any

  const handleItemOnPress = (item: MenuItemType) => {
    navigation.navigate("Item", item)
  }

  const renderItem = ({ item }: any) => {
    return (
      <Pressable style={$renderItemContainer} onPress={() => handleItemOnPress(item)}>
        <View style={$imageContainer}>
          <Image source={{ uri: item.imageURL }} resizeMethod="resize" style={$image} />
        </View>
        <View style={$itemInfoContainer}>
          <View style={$itemInnerLeftContainer}>
            <Text style={$itemTitle}>{item.name}</Text>
            <Text style={$itemDescription} numberOfLines={4} ellipsizeMode="tail">
              {item.description}
            </Text>
          </View>
          <View style={$itemInnerRightContainer}>
            <Text>{`$${item.price}`}</Text>
          </View>
        </View>
      </Pressable>
    )
  }

  return (
    <View style={$root}>
      <FlatList
        data={data}
        renderItem={renderItem}
        contentContainerStyle={$flashListContentContainer}
        scrollEnabled
      />
    </View>
  )
}

const $root: ViewStyle = {
  flex: 1,
  // height: 2,
  // paddingTop: 20,
  width: width,
}

const $flashListContentContainer: ViewStyle = {
  paddingTop: 10,
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

const $image: ImageStyle = {
  flex: 1,
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
