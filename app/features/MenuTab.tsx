import React, { useRef, useState } from "react"
import { TextStyle, ViewStyle, ScrollView } from "react-native"
import { observer } from "mobx-react-lite"
import { spacing, typography } from "app/theme"
import { Button } from "app/components"

export interface MenuTabProps {
  routes: any
  index: number | undefined
  setIndex: React.Dispatch<React.SetStateAction<number>>
  position?: any
  layout?: any
  jumpTo?: any
}

// const { width: screenWidth } = Dimensions.get("window")

/**
 * MenuTab: Shows a custom tab bar for menu categories
 */
export const MenuTab = observer(function MenuTab(props: MenuTabProps) {
  const scrollViewRef = useRef<ScrollView>(null)
  const [coordinate] = useState([])
  const inputRange = props?.routes?.map((x: any, i: number) => i)

  const handleTabPress = (i: number, route: any) => {
    scrollViewRef.current?.scrollTo({ x: coordinate[route.key] - 50, animated: true })
    props.setIndex(i)
  }

  return (
    <ScrollView
      ref={scrollViewRef}
      style={$scrollView}
      contentContainerStyle={$tabBar}
      horizontal
      scrollEnabled
      scrollEventThrottle={10}
      bounces={false}
      showsHorizontalScrollIndicator={false}
    >
      {props?.routes?.map((route: any, i: number) => {
        const opacity = props?.position?.interpolate({
          inputRange,
          outputRange: inputRange.map((inputIndex: any) => (inputIndex === i ? 1 : 0.5)),
        })

        return (
          <Button
            key={route.key}
            onLayout={(event) => {
              const layout = event.nativeEvent.layout
              //@ts-ignore
              coordinate[route.key] = layout.x
            }}
            text={route.title}
            style={$button}
            textStyle={[$buttonText, { opacity }]}
            preset={props.index === i ? "reversed" : "filled"}
            onPress={() => handleTabPress(i, route)}
          />
        )
      })}
    </ScrollView>
  )
})

const $scrollView: ViewStyle = {
  maxHeight: 45,
}

const $tabBar: ViewStyle = {
  flexGrow: 1,
  flexDirection: "row",
  justifyContent: "flex-start",
  alignItems: "center",
  columnGap: 10,
  backgroundColor: "transparent",
}

const $button: ViewStyle = {
  height: 32,
  paddingVertical: spacing.xxs,
  paddingHorizontal: spacing.xs,
}

const $buttonText: TextStyle = {
  fontFamily: typography.primary.bold,
  fontSize: 12,
}
