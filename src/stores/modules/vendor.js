import {defineStore} from "pinia";
import {ref} from "vue";

export const useVendorStore = defineStore('vendor',() => {
    const vendorId = ref('')
    const vendorName = ref('')
    const password = ref('')
    const businessName = ref('')
    const geographicalPresence = ref('')

    const setVendorId = id => {
        vendorId.value = id
    }

    const removeVendorId = () => {
        vendorId.value = ''
    }

    return {
      vendorId,
      vendorName,
      password,
      businessName,
      geographicalPresence,
      setVendorId,
      removeVendorId
    }
},{
    persist:true
})
