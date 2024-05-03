import React from "react"
import {
  StyleSheet,
  View,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
  TextStyle,
} from "react-native"
import { Text, TextProps } from "../Text"
import { Icon, IconTypes } from "../Icon"
import { spacing } from "app/theme"

export interface CustomRightIconButtonProps extends TouchableOpacityProps {
  icon: IconTypes
  iconColor?: string
  iconSize?: number
  text: string
  textColor?: string
  textStyle?: TextStyle
  textSize?: "xxl" | "xl" | "lg" | "md" | "sm" | "xs" | "xxs"
  textPreset?: "bold" | "default" | "heading" | "subheading" | "formLabel" | "formHelper"
}

export const CustomRightIconButton = ({
  icon,
  iconColor,
  iconSize,
  onPress,
  text,
  textStyle,
  textSize,
  textPreset,
  textColor,
}: CustomRightIconButtonProps) => {
  return (
    <TouchableOpacity activeOpacity={0.8} style={$buttonContainer} onPress={onPress}>
      <Text
        text={text}
        style={[textStyle, { color: textColor }]}
        size={textSize}
        preset={textPreset}
      />
      <Icon icon={icon} size={iconSize} color={iconColor} />
    </TouchableOpacity>
  )
}

const $buttonContainer: ViewStyle = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  columnGap: 4,
  paddingVertical: spacing.xxs,
  //   backgroundColor: "blue",
}
