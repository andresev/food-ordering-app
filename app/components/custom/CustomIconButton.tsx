import React from "react"
import { TouchableOpacity, TouchableOpacityProps, ViewStyle } from "react-native"
import { Icon, IconTypes } from "../Icon"
import { spacing } from "app/theme"

export interface CustomIconButtonProps extends TouchableOpacityProps {
  icon: IconTypes
  iconColor?: string
  size?: number
  backgroundColor?: string
}

export const CustomIconButton = ({
  icon,
  iconColor,
  size,
  onPress,
  backgroundColor,
}: CustomIconButtonProps) => {
  return (
    <TouchableOpacity
      style={[$buttonContainer, { backgroundColor, padding: spacing.xs }]}
      onPress={onPress}
    >
      <Icon icon={icon} color={iconColor} size={size} />
    </TouchableOpacity>
  )
}

const $buttonContainer: ViewStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: 6,
}
