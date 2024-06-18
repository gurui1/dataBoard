<template>
  <div id="all" ref="wBoxRef">
    <div class="top">
      <span class="title">财务数据分析看板</span>
      <div class="twoBtn">
        <div class="one" @click="dialogVisible1 = true">操作日志</div>
        <el-dialog v-model="dialogVisible1" width="800" height="1000">
          This is dialog content.
        </el-dialog>
        <div class="two" @click="tuiSong">推送至移动端</div>

        <el-dialog v-model="dialogVisible2" :show-close="false" class="dialog">
          <div class="dialog-title">
            <span class="wenzi"> 推送设置</span>
            <el-icon class="button" @click="close2">
              <Close />
            </el-icon>
          </div>
          <div class="dialog-body">
            <div >
              <div class="dialog-body-one">
                <span class="label">接收人 : </span>
                <!-- <input type="text"> -->

                <el-select-v2 v-model="selectED" filterable :options="options" placeholder="请选择" style="width: 320px"
                  multiple />
              </div>
              <div class="dialog-body-two">
                <span class="label">移动端图片 : </span>
                <div v-if="imageUrl" @dblclick="showPng">
                  <!-- <img> 元素负责显示捕获到的PNG格式图像。它的 src 属性被设置为 imageUrl，这是一个包含PNG图像数据的URL，通过这种方式展示在用户界面上。 -->
                  <img class="png" :src="imageUrl" alt="Captured Image">
                </div>
                <div v-if="showModal" class="modal">
                  <div class="modal-content">
                    <span class="close" @click="closePng">&times;</span>
                    <!-- <a> 元素使用了 href 属性，将 imageUrl 设置为其值。这个链接允许用户点击下载捕获的图像。
                      通过设置 download 属性为 "账单.png"，浏览器会提示用户下载文件，文件名为“数据看板.png”。 -->
                    <a class="Download" :href="imageUrl" download="数据看板.png">下载</a>
                    <img :src="imageUrl" alt="Captured Image">

                  </div>
                </div>
              </div>
              <div class="dialog-body-three">
                <div class="one1" @click="faSong">确定发送</div>
                <div class="two1" @click="close2">取消</div>
              </div>
            </div>
            <!-- <div v-if="a == 2">
              <div class="dialog-body-four">推送成功</div>
              <div class="dialog-body-five">
                <div class="one1" @click="close2">确认</div>
              </div>
            </div>
            <div v-if="a == 3">
              <div class="dialog-body-six">推送失败，请联系系统管理员排查</div>
              <div class="dialog-body-five">
                <div class="one1" @click="close2">确认</div>
              </div>
            </div> -->
          </div>
        </el-dialog>
      </div>
    </div>

    <div class="mid">
      <div class="left">
        <pieEcharts1 :title="'期初余额'"></pieEcharts1>
      </div>
      <div class="right">
        <pieEcharts2 :title="'预计期末余额'"></pieEcharts2>
      </div>

    </div>
    <div class="other">
      <div class="left">
        <other :title="'今日预计支出金额'"></other>
      </div>
      <div class="right">
        <other :title="'今日预计回款金额'"></other>
      </div>
    </div>
    <div class="mid">
      <div class="left">
        <div class="one">
          <lineEcharts1 :title="'预计支出金额部门统计'"></lineEcharts1>
        </div>
        <div class="one">
          <lineEcharts2 :title="'预计支出金额业务统计'"></lineEcharts2>
        </div>

      </div>
      <div class="right">
        <div class="one">
          <lineEcharts1 :title="'预计回款金额部门统计'"></lineEcharts1>
        </div>
        <div class="one">
          <lineEcharts2 :title="'预计回款金额业务统计'"></lineEcharts2>
        </div>
      </div>

    </div>
    <div class="mid">
      <div class="left">
        <lineEchartsL :title="'金额趋势'"></lineEchartsL>
      </div>


    </div>
    <div class="mid" style="margin-top: 5px ;">
      <div class="left">
        <div class="one">
          <lineEcharts1 :title="'实际支出金额部门统计'"></lineEcharts1>
        </div>
        <div class="one">
          <lineEcharts2 :title="'实际支出金额业务统计'"></lineEcharts2>
        </div>

      </div>
      <div class="right">
        <div class="one">
          <lineEcharts1 :title="'实际回款金额部门统计'"></lineEcharts1>
        </div>
        <div class="one">
          <lineEcharts2 :title="'实际回款金额业务统计'"></lineEcharts2>
        </div>
      </div>

    </div>

  </div>

</template>
<script setup lang="ts">
import pieEcharts1 from "../components/echarts/pieEcharts1.vue"
import pieEcharts2 from "../components/echarts/pieEcharts2.vue"
import lineEchartsL from "./echarts/lineEchartsL.vue"
import lineEcharts1 from "./echarts/lineEcharts1.vue"
import lineEcharts2 from "./echarts/lineEcharts2.vue"
import other from "../components/other.vue"
import html2canvas from 'html2canvas';
let dialogVisible1 = ref(false)
let dialogVisible2 = ref(false)


let faSong = () => {
  dialogVisible2.value=false;
  let joker: any = ref(false);
  if (joker.value == true) {
    ElMessage({
      message: '推送成功.',
      type: 'success',
    })
  } else {
      ElMessage.error('推送失败，请联系系统管理员排查.')
  }
}
let close2 = () => {
  dialogVisible2.value = false
}
const initials = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二', '十三', '十四', '十五', '十六', '十七', '十八', '十九', '二十']

const selectED = ref([])
const options = Array.from({ length: 20 }).map((_, idx) => ({
  value: idx + 1,
  label: initials[idx]
}))
watchEffect(() => {
  // Print the current value of selectED whenever it changes
  console.log(selectED.value);
  const selectedValues = selectED.value;
});





const imageUrl: any = ref(null);
const showModal: any = ref(false);
const wBoxRef: any = ref(null);

const captureAndDisplay = () => {
  const element = wBoxRef.value;

  if (element) {
    // 使用 html2canvas 库，将指定的HTML元素转换为一个canvas对象。这个库能够将DOM元素呈现为canvas
    html2canvas(element).then((canvas) => {
      // canvas.toDataURL("image/png") 将canvas对象转换为一个包含PNG格式图像数据的base64编码的数据URL
      const imgData = canvas.toDataURL("image/png");
      imageUrl.value = imgData;
    });
  }
};

let tuiSong = () => {

  dialogVisible2.value = true
  captureAndDisplay()
};
const showPng = () => {
  showModal.value = true;

};
const closePng = () => {
  showModal.value = false;
};

onMounted(() => {
  //点击推送后 在弹窗里显示

});
</script>

<style setup lang="less" scoped>
@import './dialog.css';



#all {
  // background-color: aqua;
  width: 74vw;
  height: 160vh;

  display: flex;
  flex-direction: column;


}

.top {
  flex: 1;
  // background-color: rgb(231, 222, 222);

  .title {
    position: relative;
    // 将元素的中心点移动到其父元素的中心位置 根据元素本身的宽度和高度的一半来移动元素，使其相对于其父元素居中。
    transform: translate(-50%, -50%);
    left: 50%;
    top: 50%;
    font-size: 30px;
    font-weight: bold;
    color: #000;
    letter-spacing: 10px;
    display: inline-block;
  }
}

.mid {
  flex: 5;
  // background-color: rgb(184, 219, 184);
  display: flex;
  flex-direction: row;

  .left {
    flex: 1.2;
    // background-color: red;
    display: flex;

    .one {
      flex: 1;
      //  border: 2px solid rgb(184, 172, 172);
    }

  }

  .right {
    flex: 1.2;
    display: flex;
    margin-left: 2px;

    .one {
      flex: 1;
      //  border: 2px solid rgb(184, 172, 172);

    }

    // background-color: aliceblue;
  }




}

.other {
  flex: 1.5;
  // background-color: rgb(184, 219, 184);
  display: flex;
  flex-direction: row;

  .left {
    flex: 1;
  }

  .right {
    flex: 1;
  }
}

.bottom {
  flex: 12;
  // background-color: rgb(178, 178, 201);
  display: flex;
  flex-direction: column;

  .every {
    flex: 1;
    // background-color: #000;
    display: flex;
    flex-direction: row;

    .one {
      flex: 1.1;
      // background-color: aliceblue
    }

    .two {
      flex: 1;
      // background-color: rgba(124, 15, 15, 0.541);
    }
  }

}

.twoBtn {
  position: relative;
  width: 13vw;
  // top: 13vh;
  // right: 5vw;
  height: 5vh;
  left: 60vw;
  display: inline-block;
  // background-color: red;
  display: flex;
  font-size: 0.7vw;
  letter-spacing: 1px;
  text-align: center;
  line-height: 5vh;

  /* 垂直居中 */
  .one {
    flex: 1;
    background-color: #95F204;
    box-sizing: border-box;
    border: 1px rgb(235, 228, 228) solid;
    border-radius: 15px;
    cursor: pointer;
    // padding: 0.5vw;
    color: black;
    font-weight: bold;


  }

  .two {
    flex: 1;
    background-color: #81D3F8;
    box-sizing: border-box;
    border: 1px rgb(235, 228, 228) solid;
    border-radius: 15px;
    cursor: pointer;
    margin-left: 1vw;

    color: white;

    font-weight: bold;

  }



}
</style>