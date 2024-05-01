import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { CartModel } from "./CartModel"

/**
 * A RootStore model.
 */
export const RootStoreModel = types.model("RootStore", {
    cart: types.array(CartModel)
}).actions((store) => ({
    addToCart(id: string, name: string, price: any) {
        store.cart.push({id, name, price})
    }
}))


/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> {}
/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
