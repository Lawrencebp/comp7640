import {defineStore} from "pinia";
import {ref} from "vue";

export const useGoodsStore = defineStore('goods',() => {
    const cartList = ref([])
    const chosenList = ref([])
    const setCartList = value => {
      cartList.value.push(value)
    }

    const removeCartList = () => {
      cartList.value = []
    }

    return {
        cartList,
        setCartList,
        removeCartList,
        chosenList
    }
})
