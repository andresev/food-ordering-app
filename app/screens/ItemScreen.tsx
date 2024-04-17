import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, Image, ImageSourcePropType, ImageStyle, View } from "react-native"
import { MenuNavigatorScreenProps } from "app/navigators"
import { Screen, Text } from "app/components"
import { number } from "mobx-state-tree/dist/internal"
import { useNavigation, useRoute } from "@react-navigation/native"
// import { useStores } from "app/models"

interface ItemScreenProps extends MenuNavigatorScreenProps<"Item"> {
  itemName: string
  itemDescription: string
  itemPrice: string | number
  itemImageURL: ImageSourcePropType
}

export const ItemScreen: FC<ItemScreenProps> = observer(function ItemScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()

  const route = useRoute()
  const { name, description, price, category, imageURL } = route.params
  return (
    <Screen style={$root} preset="scroll">
      <View>
        <Image source={{ uri: imageURL }} style={$image} resizeMode="contain" />
      </View>
      <Text text={name} />
      <Text text={description} />
      <Text text={`$${price}`} />
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
}

const $image: ImageStyle = {
  height: 200,
  width: 200,
}
