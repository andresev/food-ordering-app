import * as React from "react"
import { GestureResponderEvent, StyleProp, TouchableOpacityProps, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { colors } from "app/theme"
import { Icon } from "./Icon"
import { TouchableOpacity } from "react-native-gesture-handler"

export interface PlusMinusButtonProps extends TouchableOpacityProps {
  icon: "plus" | "minus"
  iconSize?: number | undefined
  onPress: (((event: GestureResponderEvent) => void) & (() => void)) | undefined
  style?: StyleProp<ViewStyle>
}

/**
 * Describe your component here
 */
export const PlusMinusButton = observer(function PlusMinusButton({
  style,
  icon,
  iconSize,
  onPress,
}: PlusMinusButtonProps) {
  const $styles = [$container, style]

  return (
    <TouchableOpacity style={$styles} activeOpacity={0.8} onPress={onPress}>
      <Icon icon={icon} size={iconSize} />
    </TouchableOpacity>
  )
})

const $container: ViewStyle = {
  justifyContent: "center",
  alignItems: "center",
  width: 36,
  height: 36,
  borderRadius: 8,
  backgroundColor: colors.palette.neutral300,
}
