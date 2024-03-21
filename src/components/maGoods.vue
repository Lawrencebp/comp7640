<script setup>

</script>

<template>
  <div class="bone">
    <ul class="eachWindow">
      <li>
        <el-checkbox  label="Available" size="large" />
      </li>
      <li>
        <img src="@/assets/demo.jpg" alt="..."/>
      </li>
      <li>
        <el-input style="width: 200px" placeholder="Change product name" />
      </li>
      <li class="tag">
        <el-input style="width: 100px" placeholder="Modify tag1" />
        <el-input style="width: 100px" placeholder="Modify tag1" />
        <el-input style="width: 100px" placeholder="Modify tag1" />
      </li>
      <li>
        <el-input style="width: 100px" placeholder="Modify price" />
      </li>
      <li>
        <el-input-number style="width: 200px"  :min="1"  size="large"  placeholder="Modify Inventory"/>
      </li>
    </ul>

  </div>
</template>

<style scoped>


.bone {
  width: 100%;
  height: 130px;
  padding: 0 100px;
  background-color: rgb(242,242,242);
  border-radius: 10px;
  margin-bottom: 40px;
}

.bone .eachWindow {
  height: 130px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.bone .eachWindow li {
  height: 130px;
  display: flex;
  align-items: center;
}

.tag {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}

.eachWindow img {
  width: 80px;
  height: 80px;
}
</style>
