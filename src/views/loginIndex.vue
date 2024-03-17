<script setup>
import {User, Lock} from '@element-plus/icons-vue'
import {ref} from "vue";
import router from "@/router/index.js";

const isCustomer = ref(true)
const customerModel = ref({
  username: '',
  password: ''
}) // 消费消费者数据
const vendorModel = ref({
  username: '',
  password: ''
})
const customer = ref(null)
const vendor = ref(null)

//验证规则
const customerRules = ref({
  username: [
    { required: true, message: 'Please type your customer name', trigger: 'blur' },
    { min: 8, max: 20, message: 'The length should be between 8-20',trigger: 'blur' },
    { pattern: /^customer-.*/, message: 'customer name should start with customer-', trigger: 'blur' }
  ],
  password:[
    { required: true, message: 'Please type your password', trigger: 'blur' },
    { min: 6, max: 20, message: 'The length should be between 8-20',trigger: 'blur' },
  ]
})
const vendorRules = ref({
  username: [
    { required: true, message: 'Please type your vendor name', trigger: 'blur' },
    { min: 8, max: 20, message: 'The length should be between 8-20',trigger: 'blur' },
    { pattern: /^vendor-.*/, message: 'customer name should start with vendor-', trigger: 'blur' }
  ],
  password:[
    { required: true, message: 'Please type your password', trigger: 'blur' },
    { min: 6, max: 20, message: 'The length should be between 8-20',trigger: 'blur' },
  ]
})

// 登陆表单切换
const toCustomer = () =>{
  isCustomer.value = true
  vendor.value.resetFields()
}
const toVendor = () => {
  isCustomer.value = false
  customer.value.resetFields()
}

const loginVendor = () => {
  // 模拟登陆并跳转
  alert('Requesting...')
  setTimeout(() => {
    router.push('/vendor/index')
    },2000)
}

const loginCustomer = () => {
  // 模拟登陆并跳转
  alert('Requesting...')
  setTimeout(() => {
    router.push('/customer/index')
  },2000)
}

</script>

<template>
  <el-row class="login-page">
    <el-col :span="12" class="logo">
      <span class="title">COMP7640 Group Project</span>
      <ul class="member">
        <li>xxxxxxxxxx 12345678</li>
        <li>xxxxxxxxxx 12345678</li>
        <li>xxxxxxxxxx 12345678</li>
        <li>xxxxxxxxxx 12345678</li>
        <li>xxxxxxxxxx 12345678</li>
      </ul>
    </el-col>
    <el-col :span="6" :offset="3" class="form">
      <el-form ref="customer" size="large" autocomplete="off" v-if="isCustomer" :model="customerModel"
               :rules="customerRules">
        <el-form-item>
          <h1>Customer</h1>
        </el-form-item>
        <el-form-item prop="username">
          <el-input :prefix-icon="User" placeholder="Please type your Customer username" v-model="customerModel.username"></el-input>
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
          <el-button class="button" type="primary" auto-insert-space @click="loginCustomer">
            Login
          </el-button>
        </el-form-item>
        <el-form-item class="flex">
          <el-link type="info" :underline="false" @click="toVendor">
            ← Vendor
          </el-link>
        </el-form-item>
      </el-form>
      <el-form ref="vendor" size="large" autocomplete="off" v-else :model="vendorModel"
      :rules="vendorRules">
        <el-form-item>
          <h1>Vendor</h1>
        </el-form-item>
        <el-form-item prop="username">
          <el-input :prefix-icon="User" placeholder="Please type your Vendor username" v-model="vendorModel.username"></el-input>
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
          <el-button class="button" type="primary" auto-insert-space @click="loginVendor"
          >Login
          </el-button
          >
        </el-form-item>
        <el-form-item class="flex">
          <el-link type="info" :underline="false" @click="toCustomer">
            Customer →
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
  width: 60%;
  height: 14%;
  margin: 50px auto 0;
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
