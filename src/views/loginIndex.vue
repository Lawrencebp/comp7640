<script setup>
import {User, Lock, Location} from '@element-plus/icons-vue'
import {ref, watch} from "vue";
import router from "@/router/index.js";
import { vendorRegisterReq, vendorLoginReq, customerLoginReq, customerRegisterReq } from "@/api/loginIndexRequest/request.js";
import { ElMessage } from "element-plus";
import {useVendorStore, useCustomerStore} from "@/stores/index.js";

const customerStore = useCustomerStore()
const vendorStore = useVendorStore()
const isCustomerLogin = ref(true)
const isVendorLogin = ref(true)

const customerModel = ref({
// for login
  username: '',
  password: '',
  repassword: '',
})

const vendorModel = ref({
// for login
  username: '',
  password: '',
  repassword: '',
})

const vendorRegisterModel = ref({
  username: '',
  password: '',
  repassword: '',
  businessName: '',
  hkarea: 'HKI',
  hkdistrict: 'HK-WC',
  address:''
})

const customerRegisterModel = ref({
  username: '',
  password: '',
  repassword: '',
  nickName: '',
  contactNumber: '',
  hkarea: 'HKI',
  hkdistrict: 'HK-WC',
  address:''
})

const optionValue_2 = ref([
  {
    label: 'Wan Chai',
    value: "HK-WC"
  },
  {
    label: 'Southern',
    value: "HK-SO"
  },
  {
    label: 'Central and Western',
    value: "HK-CW"
  },
  {
    label:'Eastern',
    value:"HK-EA"
  }
])
watch(() => customerRegisterModel.value.hkarea, newvalue => {
  customerRegisterModel.value.hkdistrict = ''
  if (newvalue === 'HKI') {
    optionValue_2.value = [
      {
        label: 'Wan Chai',
        value: "HK-WC"
      },
      {
        label: 'Southern',
        value: "HK-SO"
      },
      {
        label: 'Central and Western',
        value: "HK-CW"
      },
      {
        label:'Eastern',
        value:"HK-EA"
      }
    ]
  } else if (newvalue === 'KL') {
    optionValue_2.value = [
      {
        label: 'Yau Tsim Mong',
        value: "HK-YT"
      },
      {
        label: 'Wong Tai Sin',
        value: "HK-WT"
      },
      {
        label: 'Sham Shui Po',
        value: "HK-SS"
      },
      {
        label: 'Kwun Tong',
        value: "HK-KU"
      },
      {
        label: 'Kowloon City',
        value: "HK-KC"
      }
    ]
  } else {
    optionValue_2.value = [
      {
        label: 'Yuen Long',
        value: 'HK-YL'
      },
      {
        label: 'Tsuen Wan',
        value: 'HK-TW'
      },
      {
        label: 'Tai Po',
        value: 'HK-TP'
      },
      {
        label: 'Sha Tin',
        value: 'HK-ST'
      },
      {
        label: 'Sai Kung',
        value: 'HK-SK'
      },
      {
        label: 'North',
        value: 'HK-NO'
      },
      {
        label: 'Kwai Tsing',
        value: 'HK-KI'
      },
      {
        label: 'Islands',
        value: 'HK-IS'
      },
      {
        label: 'Tuen Mun',
        value: 'HK-TM'
      },
    ]
  }

})

const optionValue = ref([
  {
    label: 'Wan Chai',
    value: "HK-WC"
  },
  {
    label: 'Southern',
    value: "HK-SO"
  },
  {
    label: 'Central and Western',
    value: "HK-CW"
  },
  {
    label:'Eastern',
    value:"HK-EA"
  }
])
watch(() => vendorRegisterModel.value.hkarea, newvalue => {
  vendorRegisterModel.value.hkdistrict = ''
  if (newvalue === 'HKI') {
    optionValue.value = [
      {
        label: 'Wan Chai',
        value: "HK-WC"
      },
      {
        label: 'Southern',
        value: "HK-SO"
      },
      {
        label: 'Central and Western',
        value: "HK-CW"
      },
      {
        label:'Eastern',
        value:"HK-EA"
      }
    ]
  } else if (newvalue === 'KL') {
    optionValue.value = [
      {
        label: 'Yau Tsim Mong',
        value: "HK-YT"
      },
      {
        label: 'Wong Tai Sin',
        value: "HK-WT"
      },
      {
        label: 'Sham Shui Po',
        value: "HK-SS"
      },
      {
        label: 'Kwun Tong',
        value: "HK-KU"
      },
      {
        label: 'Kowloon City',
        value: "HK-KC"
      }
    ]
  } else {
    optionValue.value = [
      {
        label: 'Yuen Long',
        value: 'HK-YL'
      },
      {
        label: 'Tsuen Wan',
        value: 'HK-TW'
      },
      {
        label: 'Tai Po',
        value: 'HK-TP'
      },
      {
        label: 'Sha Tin',
        value: 'HK-ST'
      },
      {
        label: 'Sai Kung',
        value: 'HK-SK'
      },
      {
        label: 'North',
        value: 'HK-NO'
      },
      {
        label: 'Kwai Tsing',
        value: 'HK-KI'
      },
      {
        label: 'Islands',
        value: 'HK-IS'
      },
      {
        label: 'Tuen Mun',
        value: 'HK-TM'
      },
    ]
  }

})
const customer = ref(null)
const vendor = ref(null)
const customerReg = ref(null)
const vendorReg = ref(null)

const validCustomerRePassword = (rule,value,callback ) => {
  if(value !== customerRegisterModel.value.password){
    callback(new Error('Two inputs are different'))
  }
  callback()
}
const validVendorRePassword = (rule,value,callback ) => {
  if(value !== vendorRegisterModel.value.password){
    callback(new Error('Two inputs are different'))
  }
  callback()
}
const validPassword = (rule,value,callback ) => {
  if (customerModel.value.repassword !== '' ){
    if (!customer.value) return
    customer.value.validateField('repassword',() => null)
  }
  callback()
}
const customerRules = ref({
  username: [
    {required: true, message: 'Please type your customer name', trigger: 'blur'},
    {min: 8, max: 20, message: 'The length should be between 8-20', trigger: 'blur'},
    {pattern: /^customer-.*/, message: 'customer name should start with customer-', trigger: 'blur'}
  ],
  password: [
    {required: true, message: 'Please type your password', trigger: 'blur'},
    {min: 6, max: 20, message: 'The length should be between 8-20', trigger: 'blur'},
    {
      validator: validPassword,
      trigger: 'blur'
    }
  ],
})

const customerRegRules = ref({
  username: [
    {required: true, message: 'Please type your customer name', trigger: 'blur'},
    {min: 8, max: 20, message: 'The length should be between 8-20', trigger: 'blur'},
    {pattern: /^customer-.*/, message: 'customer name should start with customer-', trigger: 'blur'}
  ],
  password: [
    {required: true, message: 'Please type customer password', trigger: 'blur'},
    {min: 6, max: 20, message: 'The length should be between 8-20', trigger: 'blur'},
  ],
  repassword: [
    {required: true, message: 'Please type customer password again', trigger: 'blur'},
    {min: 6, max: 20, message: 'The length should be between 8-20', trigger: 'blur'},
    {validator: validCustomerRePassword ,trigger: "blur"}
  ],
  nickName:[
    {required: true, message: 'Please type nick name', trigger: 'blur'},
  ],
  contactNumber:[
    {required: true, message: 'Please type contact number', trigger: 'blur'},
  ],
  hkarea:[
    {required: true, message: 'Please select', trigger: 'blur'},
  ],
  hkdistrict:[
    {required: true, message: 'Please select your living district', trigger: 'blur'},
  ],
  address:[
    {required: true, message: 'Please type your living address', trigger: 'blur'},
  ]
})

const vendorRules = ref({
  username: [
    {required: true, message: 'Please type your vendor name', trigger: 'blur'},
    {min: 8, max: 20, message: 'The length should be between 8-20', trigger: 'blur'},
    {pattern: /^vendor-.*/, message: 'customer name should start with vendor-', trigger: 'blur'}
  ],
  password: [
    {required: true, message: 'Please type vendor password', trigger: 'blur'},
    {min: 6, max: 20, message: 'The length should be between 8-20', trigger: 'blur'},
  ],
})

const vendorRegRules = ref({
  username: [
    {required: true, message: 'Please type your vendor name', trigger: 'blur'},
    {min: 8, max: 20, message: 'The length should be between 8-20', trigger: 'blur'},
    {pattern: /^vendor-.*/, message: 'customer name should start with vendor-', trigger: 'blur'}
  ],
  password: [
    {required: true, message: 'Please type vendor password', trigger: 'blur'},
    {min: 6, max: 20, message: 'The length should be between 8-20', trigger: 'blur'},
  ],
  repassword: [
    {required: true, message: 'Please type vendor password', trigger: 'blur'},
    {min: 6, max: 20, message: 'The length should be between 8-20', trigger: 'blur'},
    {validator: validVendorRePassword ,trigger: "blur"}
  ],
  businessName:[
    {required: true, message: 'Please type business name', trigger: 'blur'},
  ],
  hkarea:[
    {required: true, message: 'Please select', trigger: 'blur'},
  ],
  hkdistrict:[
    {required: true, message: 'Please select your company district', trigger: 'blur'},
  ],
  address:[
    {required: true, message: 'Please type your company address', trigger: 'blur'},
  ]
})

const toCustomerLogin = () => {
  isCustomerLogin.value = true
  customer.value.resetFields()
}
const toCustomerRegister = () => {
  isCustomerLogin.value = false
  customer.value.resetFields()
}
const toVendorRegister = () => {
  isVendorLogin.value = false
  vendor.value.resetFields()
}
const toVendorLogin = () => {
  isVendorLogin.value = true
  vendor.value.resetFields()
}

const isSuccess = code => code === 200


//Register and login respectively for consumers and vendors
const vendorLogin = async () => {
  await vendor.value.validate()
  const data = await vendorLoginReq(vendorModel.value.username,vendorModel.value.password)
  if (!isSuccess(data.code)){
    ElMessage({
      message: 'Password wrong',
      showClose: true,
      type: 'error',
      duration:2000
    })
    return
  } else {
     ElMessage({
      message: 'Login Success',
      showClose: true,
      type: 'success',
      duration:2000
    })
    vendorStore.setCustomerId(data.data.userId) // stored in memory
    await router.push('/vendor/index')
  }
}

const vendorRegister = async () => {
  await vendorReg.value.validate();
  // Pass all necessary fields to the vendorRegisterReq function
  const data = await vendorRegisterReq(
    vendorRegisterModel.value.username,
    vendorRegisterModel.value.password,
    vendorRegisterModel.value.businessName,
    vendorRegisterModel.value.hkarea,
    vendorRegisterModel.value.hkdistrict,
    vendorRegisterModel.value.address
  );
  if (!isSuccess(data.code)){
    ElMessage({
      message: 'Registration failed', // Updated the message to reflect the registration context
      showClose: true,
      type: 'error',
      duration: 2000
    });
    return;
  } else {
     ElMessage({
      message: 'Registration successful', // Updated the message to reflect successful registration
      showClose: true,
      type: 'success',
      duration: 2000
    });
    vendorStore.setCustomerId(data.data.userId); // Stored in memory
    await router.push('/vendor/index');
  }
};

const customerRegister = async () => {
  await customerReg.value.validate();
  // Pass all necessary fields to the vendorRegisterReq function
  const data = await customerRegisterReq(
    customerRegisterModel.value.username,
    customerRegisterModel.value.password,
    customerRegisterModel.value.nickName,
    customerRegisterModel.value.contactNumber,
    customerRegisterModel.value.hkarea,
    customerRegisterModel.value.hkdistrict,
    customerRegisterModel.value.address
  );
  if (!isSuccess(data.code)){
    ElMessage({
      message: 'Registration failed', // Updated the message to reflect the registration context
      showClose: true,
      type: 'error',
      duration: 2000
    });
    return;
  } else {
     ElMessage({
      message: 'Registration successful', // Updated the message to reflect successful registration
      showClose: true,
      type: 'success',
      duration: 2000
    });
    vendorStore.setCustomerId(data.data.userId); // Stored in memory
    await router.push('/vendor/index');
  }
}

const customerLogin = async () => {
  await customer.value.validate()
  const data = await customerLoginReq(customerModel.value.username,customerModel.value.password)
  if (!isSuccess(data.code)){
    ElMessage({
      message: 'Password wrong',
      showClose: true,
      type: 'error',
      duration:2000
    })
    return
  } else {
     ElMessage({
      message: 'Login Success',
      showClose: true,
      type: 'success',
      duration:2000
    })
    customerStore.setCustomerId(data.data.userId)
    await router.push('/customer/index')
  }
}

</script>

<template>
  <el-row class="login-page">
    <el-col :span="12" class="logo">
      <span class="title">COMP7640 Group Project</span>
      <ul class="member">
        <li>23430370&nbsp; Guixian CHEN</li>
        <li>23459026&nbsp; Jiawei WANG</li>
        <li>23459034&nbsp; Guohang ZOU</li>
        <li>23452315&nbsp; Haochen WANG</li>
        <li>23439416&nbsp; Huiwen HUANG</li>
      </ul>
    </el-col>
    <el-col :span="6" :offset="3" class="form">

      <!--  Customer: Register and login   -->
      <el-form ref="customer" size="large" autocomplete="off" v-if="isCustomerLogin"  :model="customerModel"
               :rules="customerRules">
        <el-form-item>
          <h1>Customer</h1>
        </el-form-item>
        <el-form-item prop="username">
          <el-input :prefix-icon="User" placeholder="Please type your Customer username"
                    v-model="customerModel.username"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
              :prefix-icon="Lock"
              type="password"
              v-model="customerModel.password"
              placeholder="Please type your password"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="button" type="primary" auto-insert-space @click="customerLogin">
            Login
          </el-button>
        </el-form-item>
        <el-form-item class="flex">
          <el-link type="info" :underline="false" @click="toCustomerRegister">
            ← Register
          </el-link>
        </el-form-item>
      </el-form>

      <el-form ref="customerReg" size="large" autocomplete="off" v-else  :model="customerRegisterModel" :rules="customerRegRules">
        <el-form-item>
          <h1>New Customer Register</h1>
        </el-form-item>
        <el-form-item label="" prop="username">
          <el-input :prefix-icon="User" placeholder="Please type your customer username" v-model="customerRegisterModel.username"></el-input>
        </el-form-item>
        <el-form-item label="" prop="password">
          <el-input
              name="password"
              :prefix-icon="Lock"
              type="password"
              v-model="customerRegisterModel.password"
              placeholder="Please type your password"
          ></el-input>
        </el-form-item>
        <el-form-item label="" prop="repassword">
          <el-input
              name="password"
              :prefix-icon="Lock"
              type="password"
              v-model="customerRegisterModel.repassword"
              placeholder="Please type your password AGAIN"
          ></el-input>
        </el-form-item>
        <el-form-item label="" prop="businessName">
          <el-input :prefix-icon="User" placeholder="Please type your nick name" v-model="customerRegisterModel.nickName"></el-input>
        </el-form-item>
        <el-form-item label="" prop="contactNumber">
          <el-input :prefix-icon="User" placeholder="Please type your contact number" v-model="customerRegisterModel.contactNumber"></el-input>
        </el-form-item>
        <!-- Area -->
        <el-form-item label="Area" prop="hkarea">
          <el-select v-model="customerRegisterModel.hkarea" placeholder="please select your area">
            <el-option label="Hong Kong Island" value="HKI"/>
            <el-option label="Kowloon" value="KL"/>
            <el-option label="New Territories" value="NT"/>
          </el-select>
        </el-form-item>

        <!-- District -->
        <el-form-item label="District" prop="hkdistrict">
          <el-select v-model="customerRegisterModel.hkdistrict" placeholder="please select your District">
            <el-option v-for="each in optionValue_2" :key="each.value" :label="each.label" :value="each.value"/>
          </el-select>
        </el-form-item>

        <el-form-item label="Address" prop="address">
          <el-input
              :prefix-icon="Location"
              placeholder="Please type your Address"
              v-model="customerRegisterModel.address"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="button" type="primary" auto-insert-space @click="customerRegister"
          >Register
          </el-button
          >
        </el-form-item>
        <el-form-item class="flex">
          <el-link type="info" :underline="false" @click="toCustomerLogin">
            Login →
          </el-link>
        </el-form-item>
      </el-form>
      <!--   Vendor: Register and login   -->
      <el-form ref="vendor" size="large" autocomplete="off" v-if="isVendorLogin"  :model="vendorModel"
               :rules="vendorRules">
        <el-form-item>
          <h1>Vendor</h1>
        </el-form-item>
        <el-form-item prop="username">
          <el-input :prefix-icon="User" placeholder="Please type your Vendor username"
                    v-model="vendorModel.username"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
              name="password"
              :prefix-icon="Lock"
              type="password"
              v-model="vendorModel.password"
              placeholder="Please type your password"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="button" type="primary" auto-insert-space @click="vendorLogin"
          >Login
          </el-button
          >
        </el-form-item>
        <el-form-item class="flex">
          <el-link type="info" :underline="false" @click="toVendorRegister">
            Register →
          </el-link>
        </el-form-item>
      </el-form>
      <el-form ref="vendorReg" size="large" autocomplete="off" v-else  :model="vendorRegisterModel" :rules="vendorRegRules">
        <el-form-item>
          <h1>Introduce New Vendor</h1>
        </el-form-item>
        <el-form-item label="" prop="username">
          <el-input :prefix-icon="User" placeholder="Please type your vendor username" v-model="vendorRegisterModel.username"></el-input>
        </el-form-item>
        <el-form-item label="" prop="password">
          <el-input
              name="password"
              :prefix-icon="Lock"
              type="password"
              v-model="vendorRegisterModel.password"
              placeholder="Please type your password"
          ></el-input>
        </el-form-item>
        <el-form-item label="" prop="repassword">
          <el-input
              name="password"
              :prefix-icon="Lock"
              type="password"
              v-model="vendorRegisterModel.repassword"
              placeholder="Please type your password AGAIN"
          ></el-input>
        </el-form-item>
        <el-form-item label="" prop="businessName">
          <el-input :prefix-icon="User" placeholder="Please type your Business Name" v-model="vendorRegisterModel.businessName"></el-input>
        </el-form-item>
        <!-- Area -->
        <el-form-item label="Area" prop="hkarea">
          <el-select v-model="vendorRegisterModel.hkarea" placeholder="please select your area">
            <el-option label="Hong Kong Island" value="HKI"/>
            <el-option label="Kowloon" value="KL"/>
            <el-option label="New Territories" value="NT"/>
          </el-select>
        </el-form-item>

        <!-- District -->
        <el-form-item label="District" prop="hkdistrict">
          <el-select v-model="vendorRegisterModel.hkdistrict" placeholder="please select your District">
            <el-option v-for="each in optionValue" :key="each.value" :label="each.label" :value="each.value"/>
          </el-select>
        </el-form-item>

        <el-form-item label="Address" prop="address">
          <el-input
              :prefix-icon="Location"
              placeholder="Please type your Address"
              v-model="vendorRegisterModel.address"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="button" type="primary" auto-insert-space @click="vendorRegister"
          >Register
          </el-button
          >
        </el-form-item>
        <el-form-item class="flex">
          <el-link type="info" :underline="false" @click="toVendorLogin">
            Login →
          </el-link>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<style scoped>
.login-page {
  height: 100vh;
  background-color: #fff;
}

.logo {
  width: 100%;
  height: 100%;
  background: url("@/assets/login_bg.webp") no-repeat 50% center / 100vh 100vh;
  border-right: 1px black solid;
  border-radius: 0 20px 20px 0;
  padding-top: 10%;
}

.logo .title {
  display: block;
  text-align: center;
  font-size: 70px;
  font-weight: 500;
}

.logo .member {
  width: 50%;
  height: 14%;
  margin: 20px auto ;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  font-size: 25px;
}

.form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  user-select: none;
}

.form .title {
  margin: 0 auto;
}

.form .button {
  width: 100%;
}

.form .flex {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

img {
  width: 100%;
  height: 100%;
}
</style>
