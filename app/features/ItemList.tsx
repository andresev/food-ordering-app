import React from "react"
import { FlatList, ScrollView, View, ViewStyle } from "react-native"
import { ItemCard } from "app/components/cards/ItemCard"
import { useQuery } from "@tanstack/react-query"
import { getSquareCatalogList } from "app/services/square"
import { colors } from "app/theme"

export const ItemList = () => {
  const { data } = useQuery({
    queryKey: ["itemList"],
    queryFn: async () => {
      const data = await getSquareCatalogList()
      console.log(JSON.stringify(data, null, 2))
      return data
    },
  })

  return (
    <View style={$container}>
      {/* <ScrollView contentContainerStyle={$scrollView} scrollEnabled horizontal>
        {data?.map((item: any) => (
          // <>
          <ItemCard itemTitle={item.name} itemPrice={item.price} imageURL={item.imageURL} />
          // </>
        ))}
      </ScrollView> */}
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <ItemCard itemTitle={item.name} itemPrice={item.price} imageURL={item.imageURL} />
        )}
        contentContainerStyle={$flatlistContentContainer}
        keyExtractor={(item: any) => item.id}
        scrollEnabled
        horizontal
        ItemSeparatorComponent={() => <View style={$itemSeparator} />}
      />
    </View>
  )
}

const $container: ViewStyle = {
  height: 280,
  backgroundColor: colors.palette.neutral200,
}

const $scrollView: ViewStyle = {
  // flex: 1,
  columnGap: 15,
}

const $flatlistContentContainer: ViewStyle = {
  display: "flex",
  alignItems: "center",
  paddingHorizontal: "5%",
}

const $itemSeparator: ViewStyle = {
  paddingHorizontal: 10,
}
