<script setup>
import {
  Document,
  Menu as IconMenu,
  Setting,
} from '@element-plus/icons-vue'
import {ref} from "vue";
import router from "@/router/index.js";


const checked1 = ref(true)
const checked2 = ref(true)
const checked3 = ref(true)
const onChange1 = status => {
  checked1.value = status
}

const onChange2 = status => {
  checked2.value = status
}

const onChange3 = status => {
  checked3.value = status
}
const handleOpen = (key, keyPath) => {
  console.log(key, keyPath)
}
const handleClose = (key, keyPath) => {
  console.log(key, keyPath)
}

const exit = () => {
  router.push('/')
}
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-aside class="leftMenu">
        <el-row>
          <el-col :span="24">
            <el-menu
                active-text-color="#ffd04b"
                background-color="#232323"
                class="el-menu-vertical"
                :default-active="$route.path"
                text-color="#fff"
                @open="handleOpen"
                @close="handleClose"
                router
            >
              <h3 style="color: #fff;text-align: center">Vendor</h3>
              <el-menu-item class="item" index="/goods">
                <el-icon>
                  <document/>
                </el-icon>
                <span>Goods List</span>
              </el-menu-item>
              <el-menu-item class="item" index="/vendors">
                <el-icon>
                  <icon-menu/>
                </el-icon>
                <span>All vendors</span>
              </el-menu-item>
              <el-menu-item class="item" index="/introduce">
                <el-icon>
                  <document/>
                </el-icon>
                <span>New vendor</span>
              </el-menu-item>
              <el-menu-item class="item" index="/manage">
                <el-icon>
                  <setting/>
                </el-icon>
                <span>Manage goods</span>
              </el-menu-item>
            </el-menu>
          </el-col>
        </el-row>
      </el-aside>
      <el-container>
        <el-header v-if="$route.path !== '/manage'" height="100px">
          <div class="search" v-if="$route.path === '/goods' || $route.path === '/vendors'">
            <el-input style="width: 400px" placeholder="Please input your search" size="large"/>
          </div>
          <div class="tag" v-if="$route.path === '/goods'">
            <el-check-tag :checked="checked1" type="primary" @change="onChange1">
              Tag 1
            </el-check-tag>
            <el-check-tag :checked="checked2" type="success" @change="onChange2">
              Tag 2
            </el-check-tag>
            <el-check-tag :checked="checked3" type="danger" @change="onChange3">
              Tag 3
            </el-check-tag>
          </div>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
        <el-footer>
          <div class="foot">
            <el-pagination background layout="prev, pager, next" :total="1000"
                           v-if="$route.path === '/goods' || $route.path === '/vendors' || $route.path === '/manage'"/>
            <el-button type="primary" @click="exit">Exit</el-button>
          </div>
        </el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<style scoped>
.leftMenu {
  width: 400px;
  height: 100vh;
  font-weight: 400;
  font-size: 25px;
}

.leftMenu .el-menu-vertical {
  height: 100vh;
}

.leftMenu .item {
  width: 400px;
  margin: 10px auto;
  font-size: 17px;
}

.search {
  display: flex;
  width: 100%;
  height: 50%;
  margin: 10px 0;
  align-items: center;
  justify-content: space-between;
}

.tag {
  width: 400px;
  display: flex;
  justify-content: start;
}
.foot{
  width: 100%;
  padding: 0 30px;
  display: flex;
  justify-content: space-between;
}
</style>
