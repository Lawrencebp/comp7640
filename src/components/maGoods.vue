<script setup>
import {ref, watch} from "vue";
import {ArrowDown} from "@element-plus/icons-vue";

const emit = defineEmits(['modifyName', 'modifyPrice', 'modifyInventory', 'modifyTag','modifyImg'])
const prop = defineProps({
  imgUrl: {
    type: String,
    required: false
  },
  inventory: {
    type: Number,
    required: false
  },
  listedPrice: {
    type: Number,
    required: false
  },
  productId: {
    type: Number,
    required: false
  },
  tags: {
    type: String,
    required: false
  },
  productName: {
    type: String,
    required: false
  }

})
const tagList = ref([])
const price = ref(prop.listedPrice)
const needChangeInventTory = ref(prop.inventory)
const changeProductName = ref(prop.productName)
const imgurl = ref(prop.imgUrl)

const handleImgSuccess = (response) => {
  emit('modifyImg',{productId: prop.productId,value:"http://" + response.data})
}
const sendModifyProductName = value => {
  emit('modifyName', {productId: prop.productId, value})
}

const sendModifyPrice = value => {
  emit('modifyPrice', {productId: prop.productId, value})
}

const sendModifyInventory = value => {
  emit('modifyInventory', {productId: prop.productId, value})
}

watch(() => prop.productName, newValue => {
  changeProductName.value = newValue
})

watch(() => prop.listedPrice, newValue => {
  price.value = newValue
})

watch(() => prop.inventory, newValue => {
  needChangeInventTory.value = newValue
})

watch(() => prop.imgUrl, newValue => {
  imgurl.value = newValue
})

watch(tagList, value => {
  emit('modifyTag', {productId: prop.productId, value})
})

</script>

<template>
  <div class="bone">
    <ul class="eachWindow">
      <li style="display: flex;flex-direction: column;justify-content: space-around">
        <img :src="imgurl" alt="..."/>
        <div>
          <el-upload
              class="upload-demo"
              action="http://111.230.95.185/api/file/upload"
              :show-file-list="false"
              :on-success="handleImgSuccess"
          >
            <el-button type="primary" size="small">upload</el-button>
          </el-upload>
        </div>
      </li>
      <li>
        <el-input @input="sendModifyProductName" v-model="changeProductName"
                  placeholder="Change product name" type="textarea" maxlength="20" style="width: 240px"
                  show-word-limit autosize
        />
      </li>
      <li class="tag">
        <el-dropdown :hide-on-click="false" size="large">
          <el-button type="primary">
            Change Tag List
            <el-icon class="el-icon--right">
              <arrow-down/>
            </el-icon>
          </el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-checkbox-group v-model="tagList" :max="3">
                <el-dropdown-item>
                  <el-checkbox label="Digital" value="Digital" size="large"/>
                </el-dropdown-item>
                <el-dropdown-item>
                  <el-checkbox label="Food" value="Food" size="large"/>
                </el-dropdown-item>
                <el-dropdown-item>
                  <el-checkbox label="Electric" value="Electric" size="large"/>
                </el-dropdown-item>
                <el-dropdown-item>
                  <el-checkbox label="Phone" value="Phone" size="large"/>
                </el-dropdown-item>
                <el-dropdown-item>
                  <el-checkbox label="Book" value="Book" size="large"/>
                </el-dropdown-item>
                <el-dropdown-item>
                  <el-checkbox label="Make up" value="Makeup" size="large"/>
                </el-dropdown-item>
                <el-dropdown-item>
                  <el-checkbox label="Decoration" value="Decoration" size="large"/>
                </el-dropdown-item>
                <el-dropdown-item>
                  <el-checkbox label="Painting" value="Painting" size="large"/>
                </el-dropdown-item>
              </el-checkbox-group>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </li>
      <li style="display: flex;flex-direction: column;justify-content: center">
        <span>Price</span>
        <el-input-number size="small" v-model="price" @change="sendModifyPrice" style="width: 120px" placeholder="Modify price"/>
      </li>
      <li style="display: flex;flex-direction: column;justify-content: center">
        <span>Inventory</span>
        <el-input-number @change="sendModifyInventory" v-model="needChangeInventTory" style="width: 200px" :min="1"
                         size="large" placeholder="Modify Inventory"/>
      </li>
      <li>
        <slot name="button" :productId="productId"></slot>
      </li>
    </ul>

  </div>
</template>

<style scoped>


.bone {
  width: 100%;
  height: 130px;
  padding: 0 100px;
  background-color: rgb(242, 242, 242);
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


.eachWindow img {
  width: 80px;
  height: 80px;
}

.example-showcase .el-dropdown + .el-dropdown {
  margin-left: 15px;
}

.example-showcase .el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
}
</style>
