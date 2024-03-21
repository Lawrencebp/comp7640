<script setup>
import {User, Lock} from '@element-plus/icons-vue'
import {ref} from "vue";
import router from "@/router/index.js";
import { customerLoginReq } from "@/api/loginIndexRequest/request.js";
import { ElMessage } from "element-plus";
import {useCustomerStore} from "@/stores/index.js";

const customerStore = useCustomerStore()
const isCustomerLogin = ref(true)
const isVendorLogin = ref(true)
const customerModel = ref({
  username: '',
  password: '',
  rePassword: ''
})
// 消费消费者数据
const vendorModel = ref({
  username: '',
  password: ''
})
const customer = ref(null)
const vendor = ref(null)


//验证规则
const validCustomerRePassword = (rule,value,callback ) => {
  if(value !== customerModel.value.password){
    callback(new Error('Two inputs are different'))
  }
  callback()
}
const validVendorRePassword = (rule,value,callback ) => {
  if(value !== vendorModel.value.password){
    callback(new Error('Two inputs are different'))
  }
  callback()
}
const validPassword = (rule,value,callback ) => {
  if (customerModel.value.repassword !== '' ){
    if (!customer.value) return
    customer.value.validateField('rePassword',() => null)
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
  rePassword: [
    {required: true, message: 'Please type your password', trigger: 'blur'},
    {min: 6, max: 20, message: 'The length should be between 8-20', trigger: 'blur'},
    {validator: validCustomerRePassword ,trigger: "blur"}
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
  rePassword: [
    {required: true, message: 'Please type vendor password', trigger: 'blur'},
    {min: 6, max: 20, message: 'The length should be between 8-20', trigger: 'blur'},
    {validator: validVendorRePassword ,trigger: "blur"}
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
  // 模拟登陆并跳转
  // await vendor.value.validate()
  // alert('Requesting...')
  setTimeout(() => {
    router.push('/vendor/index')
  }, 2000)
}
const vendorRegister = async () => {
  await vendor.value.validate()
  alert('Requesting...')
  setTimeout(() => {
    router.push('/vendor/index')
  }, 2000)
}
const customerRegister = async () => {
  await customer.value.validate()
  alert('Requesting...')
  setTimeout(() => {
    router.push('/vendor/index')
  }, 2000)
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
      <el-form ref="customer" size="large" autocomplete="off" v-else  :model="customerModel"
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
        <el-form-item prop="rePassword">
          <el-input
              :prefix-icon="Lock"
              type="password"
              v-model="customerModel.rePassword"
              placeholder="Please type your password again"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="button" type="primary" auto-insert-space @click="customerRegister">
            Register
          </el-button>
        </el-form-item>
        <el-form-item class="flex">
          <el-link type="info" :underline="false" @click="toCustomerLogin">
            -> Login
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
      <el-form ref="vendor" size="large" autocomplete="off" v-else  :model="vendorModel"
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
        <el-form-item prop="rePassword">
          <el-input
              :prefix-icon="Lock"
              type="password"
              v-model="vendorModel.rePassword"
              placeholder="Please type your password again"
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
