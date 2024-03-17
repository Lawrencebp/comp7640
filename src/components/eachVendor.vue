<script setup>

</script>

<template>
    <el-card style="width: 480px">
      <template #header>
        <div class="card-header">
          <span>Vendor 1</span>
        </div>
      </template>
      <p v-for="o in 4" :key="o" class="text item">{{ 'Product ' + o }}</p>
      <template #footer>Footer content</template>
    </el-card>
</template>

<style scoped>
</style>
