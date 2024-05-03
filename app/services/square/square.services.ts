import { api } from "../api"

export async function getSquareCatalogList() {
  try {
    const response = await api.apisauce.get("/square/list-catalog")
    const items = response?.data

    //@ts-ignore
    const menuItemMap = items?.reduce((map: any, item: any) => {
      const itemMap = {
        id: item.catalogItemObj?.id,
        name: item.catalogItemObj?.itemData?.name || null,
        description: item.catalogItemObj?.itemData?.description || null,
        price:
          (
            item.catalogItemObj.itemData?.variations?.[0]?.itemVariationData?.priceMoney?.amount /
            100
          ).toFixed(2) || null,
        imageURL: item.catalogImageObj?.imageData?.url || null,
        category: item.catalogCategoryObj?.categoryData?.name || null,
      }

      map.push(itemMap)

      return map
    }, [])

    return menuItemMap
  } catch (err) {
    console.error("Error retrieving items, ", err)
    throw err
  }
}

export async function getSquareItemObjectByID(itemID: any) {
  const { categoryID, imageID } = itemID
  console.log(categoryID, imageID)
  try {
    const response = await api.apisauce.get(`/square/retrieve-object/${categoryID}/${imageID}`)
    return response.data
  } catch (err) {
    console.log("Error retrieving item object, ", err)
  }
}
