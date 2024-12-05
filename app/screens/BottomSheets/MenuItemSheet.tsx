import React, { useState, useRef } from "react"
import { StyleProp, TextStyle, View, ViewStyle, ImageStyle, ScrollView } from "react-native"
import { observer } from "mobx-react-lite"
import { colors, typography } from "app/theme"
import { Text } from "app/components/Text"
import { Button, PlusMinusButton } from "app/components"
import { Image } from "expo-image"

export interface MenuItemSheetProps {
  itemData: any
  onAddToCart: () => void
  style?: StyleProp<ViewStyle>
}

/**
 * Describe your component here
 */
export const MenuItemSheet = observer(function MenuItemSheet({
  itemData,
  onAddToCart,
  style,
}: MenuItemSheetProps) {
  const [cartCount, setCartCount] = useState<number>(1)
  const $styles = [$container, style]

  return (
    <>
      {/* ITEM INFO */}
      <ScrollView
        contentContainerStyle={$styles}
        scrollEnabled
        scrollEventThrottle={10}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        <View style={$imageContainer}>
          <Image style={$image} source={itemData?.imageURL} contentFit="fill" />
        </View>
        <View style={$itemTitleContainer}>
          <Text style={$itemTitle}>{itemData?.name}</Text>
          <Text style={$itemPrice}>{`$${itemData?.price}`}</Text>
        </View>
        <View style={$itemDescriptionContainer}>
          <Text style={$itemDescription}>{itemData?.description}</Text>
        </View>
      </ScrollView>
      {/* ADD TO CART */}
      <View style={$addToCartContainer}>
        <View style={$addMinusButtonContainer}>
          <PlusMinusButton
            icon="minus"
            onPress={cartCount > 0 ? () => setCartCount((prevValue) => prevValue - 1) : undefined}
          />
          <View style={$cartCountContainer}>
            <Text style={$cartCount}>{cartCount}</Text>
          </View>
          <PlusMinusButton icon="plus" onPress={() => setCartCount((prevValue) => prevValue + 1)} />
        </View>
        <Button
          style={$addToCartButton}
          text="Add to Cart"
          textStyle={$addToCartButtonText}
          preset="reversed"
          onPress={onAddToCart}
        />
      </View>
    </>
  )
})

const $container: ViewStyle = {
  flexGrow: 1,
  justifyContent: "flex-start",
  rowGap: 15,
  paddingBottom: 200,
}

const $imageContainer: ViewStyle = {
  width: 335,
  maxHeight: 285,
  // borderRadius: 10,
}

const $image: ImageStyle = {
  width: "100%",
  height: "100%",
  borderRadius: 10,
  overflow: "hidden",
}

const $itemTitleContainer: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
  width: 335,
}

const $itemTitle: TextStyle = {
  fontFamily: typography.primary.bold,
  fontSize: 22,
  color: colors.palette.neutral900,
  width: 228,
}

const $itemPrice: TextStyle = {
  fontFamily: typography.primary.bold,
  fontSize: 22,
  color: colors.palette.primary600,
}

const $itemDescription: TextStyle = {
  fontFamily: typography.primary.normal,
  fontSize: 14,
  color: colors.palette.neutral900,
}

const $itemDescriptionContainer: ViewStyle = {
  width: 335,
}

const $addToCartContainer: ViewStyle = {
  position: "absolute",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  bottom: 0,
  width: "100%",
  height: 110,
  paddingHorizontal: 20,
  backgroundColor: colors.palette.neutral100,
  shadowColor: colors.palette.neutral900,
  shadowOffset: { width: 0, height: -8 },
  shadowOpacity: 0.1,
  shadowRadius: 4,
  elevation: 4,
}

const $addMinusButtonContainer: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  columnGap: 1,
}

const $cartCount: TextStyle = {
  fontFamily: typography.primary.bold,
  fontSize: 18,
}

const $cartCountContainer: ViewStyle = {
  alignItems: "center",
  width: 36,
  // backgroundColor: "red",
}

const $addToCartButton: ViewStyle = {
  width: 200,
  height: 52,
}

const $addToCartButtonText: TextStyle = {
  fontFamily: typography.primary.bold,
}
