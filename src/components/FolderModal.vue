<script setup lang="ts">
import { Alert } from '../util/alert'
import axios from '../axios/http'
import { ref } from 'vue'
import { LButton, LInput, LFormItem } from '../components/base'
import { GithubConfig } from '../model/github_config.model'

let github_config: GithubConfig = JSON.parse(
  localStorage.getItem('github_config') as any
)

const props = defineProps({ isOpen: Boolean })
const emit = defineEmits([
  'close',
  'updateFolderList',
])

let forderName = ref('')
let loading = ref(false)

const AddForder = () => {
  if (!github_config?.repoId) {
    Alert({
      type: 'danger',
      text: '请前往设置，完成配置信息',
    })
    return
  }
  loading.value = true
  axios
    .put({
      url: `/repos/${github_config.owner}/${github_config.repoPath}/contents/${forderName.value}/init`,
      data: {
        message: 'add a forder',
        content: '5q2k5paH5Lu255So5LqO5Yib5bu65paH5Lu25aS5',
      },
    })
    .then((res: any) => {
      loading.value = false
      Alert({
        type: 'success',
        text: '创建成功！',
      })
      forderName.value = ''
      emit('close')
      emit('updateFolderList')
    })
    .catch(() => {
      loading.value = false
    })
}
</script>

<template>
  <div class="folder-modal" :class="{ isOpen: props.isOpen }">
    <l-form-item title="新建文件夹">
      <l-input v-model="forderName" placeholder="输入文件夹名称"></l-input>
    </l-form-item>
    <div class="form-item btn-box">
      <l-button @click="AddForder()" type="primary" :loading="loading">
        确认
      </l-button>
      <l-button @click="emit('close')" type="danger">取消</l-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.folder-modal {
  position: absolute;
  left: -var(--border-width);
  bottom: 40px;
  z-index: 9;
  width: 200px;
  height: 170px;
  background: var(--background-2);
  opacity: 1;
  padding: 7px;
  box-sizing: border-box;
  border-top: var(--border-width) var(--border-color) solid;
  transition: all 0.25s;
}
.isOpen {
  bottom: 200px;
  opacity: 1;
}

.form-item {
  margin-bottom: 6px;
}
.form-item:first-child {
  margin-top: 10px;
}
.btn-box {
  display: flex;
  .button:first-child {
    margin-right: 6px;
  }
}
</style>