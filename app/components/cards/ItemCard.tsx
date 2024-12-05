import React from "react"
import { StyleSheet, TextStyle, View, ViewStyle } from "react-native"
import { Text, TextProps } from "../Text"
import { colors } from "app/theme"
import { Image, ImageStyle } from "expo-image"

export interface ItemCardProps {
  imageURL: any
  itemTitle: string
  itemPrice: number
}

const blurHash = "LEHLk~WB2yk8pyo0adR*.7kCMdnj"

export const ItemCard = ({ imageURL, itemTitle, itemPrice }: ItemCardProps) => {
  return (
    <View style={$container}>
      <Image source={imageURL} style={$image} contentFit="cover" placeholder={blurHash} />
      <View style={$textContainer}>
        <Text text={itemTitle} size="sm" preset="default" style={$itemTitle} />
        <Text text={`$${itemPrice}`} preset="bold" style={$itemPrice} />
      </View>
    </View>
  )
}

const $container: ViewStyle = {
  width: 160,
  height: 270,
  borderRadius: 8,
  shadowColor: colors.palette.neutral900,
  shadowOffset: { width: 0, height: 6 },
  shadowOpacity: 0.1,
  shadowRadius: 5,
  backgroundColor: colors.palette.neutral100,
}

const $image: ImageStyle = {
  height: "47%",
  borderTopLeftRadius: 8,
  borderTopRightRadius: 8,
  overflow: "hidden",
}

const $textContainer: ViewStyle = {
  height: "53%",
  justifyContent: "space-between",
  padding: 12,
}

const $itemTitle: TextStyle = {}

const $itemPrice: TextStyle = {
  color: colors.palette.primary600,
}
