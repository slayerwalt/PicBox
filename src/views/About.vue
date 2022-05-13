<script setup lang="ts">
import { ref } from 'vue'
</script>

<template>
  <div class="about-wrapper">
    <div class="title-1">关于</div>
    <div class="content">
      CS176 现代前端应用开发实践<br>
      大作业：图片上传管理工具PicBox<br>
      刘凡嘉 学号：520021910751<br>
      仓库地址：<a target="_blank" href="https://github.com/Suvanka/PicBox">https://github.com/Suvanka/PicBox</a>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.about-wrapper {
  max-width: 400px;
  margin: 70px auto;
  padding: 50px;
  color: var(--text-color);
  .content {
    margin-top: 20px;
    color: var(--text-color);
    line-height: 30px;
    a {
      color: var(--primary-color);
      text-decoration: underline;
    }
  }
}
</style>
