<script setup>

</script>

<template>
  <div class="bone">
    <ul class="eachWindow">
      <li>
        <slot></slot>
        Vendor name
      </li>
      <li>
        <img src="@/assets/demo.jpg" alt="..."/>
      </li>
      <li>
        iphone15
      </li>
      <li class="tag">
        <el-tag type="primary">Tag 1</el-tag>
        <el-tag type="primary">Tag 2</el-tag>
        <el-tag type="primary">Tag 3</el-tag>
      </li>
      <li>
        $100
      </li>
      <li>
        <slot name="number"></slot>
      </li>
    </ul>
  </div>
</template>

<style scoped>


.bone {
  width: 100%;
  height: 120px;
  padding: 0 100px;
  background-color: rgb(242,242,242);
  border-radius: 10px;
  margin-bottom: 40px;
}

.bone .eachWindow {
  height: 120px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.bone .eachWindow li {
  height: 120px;
  display: flex;
  align-items: center;
}

.tag {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}

.eachWindow img {
  width: 100px;
  height: 80px;
}
</style>
