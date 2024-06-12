<script setup lang="ts">
import router from "@/routes";
import { useMain } from "@/store/home.ts";
import menuConfig from "./views/menu.json";
const route = new (useRoute as any)();
watch(
  () => route.path,
  () => {
    routerChange(route.path.slice(1))
  }
);
const routerChange=(path:any)=>{
  let xx= menuConfig.urlParse[path]
  if(xx){
    handleSelect(xx)
  }
}

const handleSelect = (key: string) => {
  useMain().cebianName = key;
  let sign = true;
  useMain().editableTabs.forEach((item) => {
    // console.log(item.name);
    if (item.name == key) {
      sign = false;
    }
  });
  if (sign) {
    useMain().editableTabs.push({ title: key.split("|")[1], name: key });
  }
  router.replace("/" + key.split("|")[0]);
};

</script>

<template>
  <div><router-view></router-view></div>
</template>

<style lang="less">
.spanCs {
  position: absolute;
  top: 0;
  left: 0;
  width: 0;
  height: 0;
  // background-color: #916968;
  background-color: #586e80;
  /* 鼠标居中 */
  transform: translate(-50%, -50%);
  /* 圆的形式展开 */
  border-radius: 50%;
}

/* 鼠标进入 login 时的动画 */
@keyframes in {
  0% {
    width: 0;
    height: 0;
  }

  100% {
    width: 1200px;
    height: 1200px;
  }
}

/* 鼠标离开 login 时的动画 */
@keyframes out {
  0% {
    width: 1200px;
    height: 1200px;
  }

  100% {
    width: 0;
    height: 0;
  }
}

.paopao {
    position: absolute;
    z-index: 0;
    bottom: 0;
    color:aqua;
    border-radius: 50%;
    /* 径向渐变 */
    background: radial-gradient(circle at 72% 28%, #fff 3px, #ff7edf 8%, #5b5b5b, #aad7f9 100%);
    /* 泡泡内阴影 */
    box-shadow: inset 0 0 6px #fff,
        inset 3px 0 6px #eaf5fc,
        inset 2px -2px 10px #efcde6,
        inset 0 0 60px #f9f6de,
        0 0 20px #fff;
    /* 动画 */
    animation: myMove 4s linear infinite;
}

@keyframes myMove {
    0% {
        transform: translateY(0%);
        opacity: 1;
    }

    50% {
        transform: translate(10%, -1000%);
    }

    75% {
        transform: translate(-20%, -1200%);
    }

    99% {
        opacity: .9;
    }

    100% {
        transform: translateY(-1800%) scale(1.5);
        opacity: 0;
    }
}
</style>
