import {defineStore} from "pinia";
import {ref} from "vue";

export const useCustomerStore = defineStore('customer',() => {
    const customerId = ref('')
    const customerNickName = ref('')
    const shippingDetails = ref('')
    const contactNumber = ref('')
    const customerName = ref('')

    const setCustomerId = id => {
        customerId.value = id
    }

    const removeCustomerId = () => {
        customerId.value = ''
    }

    const setCustomerNickName = nickName => {
        customerNickName.value = nickName
    }

    const removeCustomerNickname = () => {
        customerId.value = ''
    }

    return {
        customerId,
        customerNickName,
        shippingDetails,
        contactNumber,
        customerName,
        setCustomerId,
        removeCustomerId,
        setCustomerNickName,
        removeCustomerNickname
    }
},{
    persist:true
})
