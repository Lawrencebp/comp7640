<script setup>
import eachGood from '@/components/eachGood.vue'
</script>

<template>
  <each-good>
    <template #number>
      <el-input-number size="small" />
    </template>
  </each-good>
  <each-good>
    <template #number>
      <el-input-number size="small" />
    </template>
  </each-good>
  <each-good>
    <template #number>
      <el-input-number size="small" />
    </template>
  </each-good>
  <each-good>
    <template #number>
      <el-input-number size="small" />
    </template>
  </each-good>

  <div class="submit">
    <el-button type="primary" round>Pay</el-button>
  </div>
</template>

<style scoped>
.submit{
  display: flex;
  justify-content: end;
}
</style>
