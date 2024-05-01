import { types } from "mobx-state-tree";

export const CartModel = types.model("CartModel", {
    id: types.string,
    name: types.string,
    price: types.string,
})