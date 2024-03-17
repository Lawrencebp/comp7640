<script setup>
import {Lock, User, Location} from "@element-plus/icons-vue";
import {ref, watch} from "vue";

const vendor = ref({
  hkarea: 'HKI',
  hkdistrict: 'HK-WC',
  address:''
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
watch(() => vendor.value.hkarea, newvalue => {
  vendor.value.hkdistrict = ''
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
</script>

<template>
  <el-row>
    <el-col :span="12" :offset="6">
      <el-form :model="vendor" size="large" autocomplete="off">
        <el-form-item>
          <h1>Introduce New Vendor</h1>
        </el-form-item>
        <el-form-item label="Business Name">
          <el-input :prefix-icon="User" placeholder="Please type your Business Name" ></el-input>
        </el-form-item>
        <el-form-item label="Password">
          <el-input
              name="password"
              :prefix-icon="Lock"
              type="password"
              placeholder="Please type your password"
          ></el-input>
        </el-form-item>
        <el-form-item label="Check Password">
          <el-input
              name="password"
              :prefix-icon="Lock"
              type="password"
              placeholder="Please type your password AGAIN"
          ></el-input>
        </el-form-item>

        <!-- Area -->
        <el-form-item label="Area">
          <el-select v-model="vendor.hkarea" placeholder="please select your area">
            <el-option label="Hong Kong Island" value="HKI"/>
            <el-option label="Kow Loon" value="KL"/>
            <el-option label="New Territories" value="NT"/>
          </el-select>
        </el-form-item>

        <!-- District -->
        <el-form-item label="District">
          <el-select v-model="vendor.hkdistrict" placeholder="please select your District">
            <el-option v-for="each in optionValue" :key="each.value" :label="each.label" :value="each.value"/>
          </el-select>
        </el-form-item>

        <el-form-item label="Address">
          <el-input
              :prefix-icon="Location"
              placeholder="Please type your Address"
              v-model="vendor.address"
          ></el-input>
        </el-form-item>

        <el-form-item>
          <el-button class="button" type="primary" auto-insert-space
          >Register
          </el-button
          >
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>

</template>

<style scoped>

</style>
