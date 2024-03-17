<script setup>
import eachVendor from '@/components/eachVendor.vue'
</script>

<template>
  <div class="vendor">
    <each-vendor></each-vendor>
    <each-vendor></each-vendor>
    <each-vendor></each-vendor>
    <each-vendor></each-vendor>
    <each-vendor></each-vendor>
  </div>
</template>

<style scoped>
.vendor{
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}
</style>
