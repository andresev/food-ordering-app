import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { SafeAreaView, ViewStyle, View } from "react-native"
import { AppStackScreenProps } from "app/navigators"
import {
  Button,
  CustomIconButton,
  CustomRightIconButton,
  Icon,
  Screen,
  Text,
  TextField,
} from "app/components"
import { useSafeAreaInsetsStyle } from "app/utils/useSafeAreaInsetsStyle"
import { colors, spacing } from "app/theme"
import { MenuScreen } from "./MenuScreen"
import { ItemList } from "app/features/ItemList"
import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"

interface HomeScreenProps extends AppStackScreenProps<"Home"> {}

export const HomeScreen: FC<HomeScreenProps> = observer(function HomeScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  const navigation = useNavigation()

  // Safe area hook
  const $topContainerInset = useSafeAreaInsetsStyle(["top"])

  // Dummy data: Locations
  const locationsAvailable = ["Austin, Texas", "Killeen", "Laredo", "San Antonio"]

  return (
    <>
      <View style={[$header, $topContainerInset]}>
        <Text size="xs" text="Your Location" preset="default" />
        <View style={$selectLocationContainer}>
          <Text size="sm" text={locationsAvailable[0]} preset="bold" />
          <Icon icon="chevronDown" color={colors.palette.primary500} />
        </View>
      </View>
      <View style={$root}>
        <View style={$textFieldContainer}>
          <TextField
            inputWrapperStyle={$inputWrapperStyle}
            LeftAccessory={() => <Icon icon="search" />}
            RightAccessory={() => (
              <CustomIconButton
                icon="map"
                iconColor={colors.palette.neutral100}
                backgroundColor={colors.palette.primary600}
                onPress={() => navigation.navigate("Location")}
              />
            )}
            placeholder="What do you want to eat?"
            textAlign="left"
            cursorColor={colors.palette.primary600}
          />
        </View>
        {/* POPULAR FOODS */}
        <View style={$subContainer}>
          <Text size="xl" text="Popular Food" preset="bold" />
          <CustomRightIconButton
            text="See All"
            textColor={colors.palette.primary600}
            textPreset="bold"
            icon="caretRight"
            iconColor={colors.palette.primary600}
          />
        </View>
        <ItemList />
        {/* FULL MENU */}
        <View style={$subContainer}>
          <Text size="xl" text="Full Menu" preset="bold" />
          <CustomRightIconButton
            text="See All"
            textColor={colors.palette.primary600}
            textPreset="bold"
            icon="caretRight"
            iconColor={colors.palette.primary600}
          />
        </View>
        {/* RESTAURANTS */}
        <MenuScreen />
      </View>
    </>
  )
})

const $header: ViewStyle = {
  padding: spacing.md,
  backgroundColor: colors.palette.neutral100,
}

const $root: ViewStyle = {
  flex: 1,
  // paddingHorizontal: spacing.sm,
  paddingTop: spacing.md,
  backgroundColor: colors.palette.neutral200,
}

const $selectLocationContainer: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  columnGap: 5,
}

const $inputWrapperStyle: ViewStyle = {
  display: "flex",
  justifyContent: "space-evenly",
  alignItems: "center",
  paddingVertical: spacing.xxs,
  paddingStart: spacing.sm,
  paddingEnd: spacing.xxs,
  borderWidth: 0,
  borderRadius: 6,
  backgroundColor: colors.palette.neutral100,
}

// Sub container
const $subContainer: ViewStyle = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  paddingVertical: 5,
}

const $textFieldContainer: ViewStyle = {
  paddingHorizontal: spacing.md,
}
