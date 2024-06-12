<template>
  <div class="wBox">
    <div class="bodyTop">
      111
    </div>
  </div>
</template>

<script setup lang="ts">
// import { useMain } from "../store/home";
// import router from "@/routes";
onMounted(() => {});
onUnmounted(() => {});

</script>

<style lang="less" scoped>
.wBox {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.bodyTop {
  position: absolute;
  width: 98.8%;
  height: 97%;
  background-color: #fff;
  margin-top: 10px;
  box-shadow: 0 0px 12px 0px #d9d9d9;
}

.chaju {
  background-color: rgb(255, 190, 190);
  height: 30%;
}
</style>
