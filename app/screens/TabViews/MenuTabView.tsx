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

const { width } = Dimensions.get("window")

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
          <View style={$itemInnerTopContainer}>
            <Text style={$itemPrice}>{`$${item.price}`}</Text>
          </View>
          <View style={$itemInnerMiddleContainer}>
            <Text style={$itemTitle}>{item.name}</Text>
            <Text style={$itemDescription} numberOfLines={2} ellipsizeMode="tail">
              {item.description}
            </Text>
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
        ItemSeparatorComponent={() => <View style={$itemSeparator} />}
      />
    </View>
  )
}

const $root: ViewStyle = {
  flex: 1,
  // width: width,
}

const $flashListContentContainer: ViewStyle = {
  paddingTop: 10,
  alignItems: "center",
}

const $itemSeparator: ViewStyle = {
  height: 8,
}

// RENDER ITEM
const $renderItemContainer: ViewStyle = {
  flexDirection: "row",
  alignItems: "center", // Ensure content is centered within the container
  height: 120,
  width: 335,
  backgroundColor: "#fff", // Essential for iOS shadows
  borderRadius: 6,
  shadowOffset: { width: 0, height: 2 },
  shadowColor: "#000",
  shadowOpacity: 0.3,
  shadowRadius: 1.5,
  elevation: 3, // Android shadow
  marginBottom: 10, // Add margin to ensure space for shadow
}

const $image: ImageStyle = {
  flex: 1,
  borderTopLeftRadius: 6,
  borderBottomLeftRadius: 6,
}

const $imageContainer: ViewStyle = {
  width: "35%",
  height: "100%",
}

const $itemInfoContainer: ViewStyle = {
  flexDirection: "column",
  rowGap: 5,
  width: "65%",
  height: "100%",
  padding: 10,
}

const $itemTitle: TextStyle = {
  fontFamily: typography.primary.medium,
  fontSize: 16,
  lineHeight: 16,
}

const $itemDescription: TextStyle = {
  fontFamily: typography.primary.light,
  fontSize: 12,
  lineHeight: 12,
  textAlign: "left",
}

const $itemInnerTopContainer: ViewStyle = {
  flexDirection: "row",
}

const $itemInnerMiddleContainer: ViewStyle = {
  flex: 8,
  rowGap: 10,
}

const $itemPrice: TextStyle = {
  fontFamily: typography.primary.bold,
  fontSize: 14,
  color: colors.palette.primary600,
}
