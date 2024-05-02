import React, { FC } from "react"
import {
  ViewStyle,
  View,
  TextStyle,
  ImageStyle,
  Dimensions,
  Pressable,
  FlatList,
} from "react-native"
import { Image } from "expo-image"
import { Text } from "app/components"
import { typography, colors } from "app/theme"
import { useStores } from "app/models"
import { useNavigation } from "@react-navigation/native"
import { MenuItemType } from "types/tabview"

// import { useStores } from "app/models"
interface MenuTabViewProps {
  itemOnPress: any
  data: any
  selectedItem: any
  setSelectedItem: any
}

// const { width, height } = Dimensions.get("window")

export const MenuTabView: FC<MenuTabViewProps> = ({
  data,
  itemOnPress,
  setSelectedItem,
}: MenuTabViewProps) => {
  // const [selectedItem, setSelectedItem] = useState<MenuItemType | null>(null)
  // Pull in one of our MST stores
  // const { addToCart } = useStores()

  // // Pull in navigation via hook
  const navigation = useNavigation() as any

  const renderItem = ({ item }: any) => {
    const handleItemOnPress = (item: MenuItemType) => {
      setSelectedItem(item)
      itemOnPress(item)
    }

    const blurHash = "LEHLk~WB2yk8pyo0adR*.7kCMdnj"

    return (
      <Pressable style={$renderItemContainer} onPress={() => handleItemOnPress(item)}>
        <View style={$imageContainer}>
          <Image
            source={item.imageURL}
            style={$image}
            contentFit="fill"
            placeholder={blurHash}
            placeholderContentFit="fill"
          />
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
    <>
      <View style={$root}>
        <FlatList
          data={data}
          renderItem={renderItem}
          contentContainerStyle={$flashListContentContainer}
          keyExtractor={(item: any) => item.id}
          scrollEnabled
          ItemSeparatorComponent={() => <View style={$itemSeparator} />}
        />
      </View>
    </>
  )
}

const $root: ViewStyle = {
  flex: 1,
}

const $flashListContentContainer: ViewStyle = {
  paddingTop: 15,
  paddingBottom: 100,
  alignItems: "center",
}

const $itemSeparator: ViewStyle = {
  paddingVertical: 10,
}

// RENDER ITEM
const $renderItemContainer: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  height: 120,
  width: 335,
  backgroundColor: colors.palette.neutral100,
  borderRadius: 6,
  shadowOffset: { width: 0, height: 2 },
  shadowColor: "#000",
  shadowOpacity: 0.3,
  shadowRadius: 1.5,
  elevation: 3,
}

const $image: ImageStyle = {
  flex: 1,
  borderTopLeftRadius: 6,
  borderBottomLeftRadius: 6,
  overflow: "hidden",
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

// BOTTOM SHEET
const $bottomSheetContentContainer: ViewStyle = {
  flex: 1,
  alignItems: "center",
}
