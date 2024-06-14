<template>
  <div id="all">
    <div class="top">
      <span class="title">财务数据分析看板</span>
      <div class="twoBtn">
        <div class="one" @click="dialogVisible1 = true">操作日志</div>
        <el-dialog v-model="dialogVisible1" width="800" height="1000">
          This is dialog content.
        </el-dialog>
        <div class="two" @click="dialogVisible2 = true">推送至移动端</div>

        <el-dialog v-model="dialogVisible2" :show-close="false" class="dialog">
          <div class="dialog-title">
            <span class="wenzi"> 推送设置</span>
            <el-icon class="button" @click="close2">
              <Close />
            </el-icon>
          </div>
          <div class="dialog-body">
            <div v-if="a == 1">

              <div class="dialog-body-one">
                <span>接收人 : </span>
                <!-- <input type="text"> -->
              </div>
              <div class="dialog-body-two">
                <span>移动端图片 : </span>
                <!-- <input type="text"> -->
              </div>
              <div class="dialog-body-three">
                <div class="one1">确定发送</div>
                <div class="two1" @click="close2">取消</div>
              </div>
            </div>
            <div v-if="a == 2">
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
            </div>


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
let dialogVisible1 = ref(false)
let dialogVisible2 = ref(false)
let a: any = ref(3)
let close2 = () => {
  dialogVisible2.value = false
}
</script>

<style setup lang="less" scoped>
/deep/.el-dialog__title {
  padding: none !important;
}

/deep/.dialog {
  background-color: white;
  width: 30vw;
  height: 30vh;
  border-radius: 10px 10px 0 0;
  padding: 0 !important;

  // height: 1000px;
  .dialog-title {
    width: 30vw;
    height: 6vh;
    border-radius: 10px 10px 0 0;
    background-color: #81D3F8;
    position: relative;
    top: -2vh;
    color: white;
    font-size: 2.8vh;

    .wenzi {
      position: relative;
      left: -10vw;
    }

    .button {
      position: relative;
      font-size: 2vw;
      left: 10vw;
      top: 1vh;
      cursor: pointer;
      color: #92969d;
    }

    .button:hover {
      color: aqua;
      /* 设置鼠标移入时的颜色为蓝色 */
    }

  }

  .dialog-body {
    width: 30vw;
    height: 25vh;
    // background-color: green;
    position: relative;
    top: -2vh;

    .dialog-body-three {
      position: relative;
      width: 10vw;
      top: 8vh;
      left: 10vw;
      display: inline-block;
      display: flex;
      font-size: 0.7vw;
      letter-spacing: 1px;
      text-align: center;
      line-height: 4vh;
      color: white;

      .one1 {
        flex: 1;
        background-color: #D9001B;
        box-sizing: border-box;
        border: 1px rgb(235, 228, 228) solid;
        border-radius: 5px;
        cursor: pointer;
        font-weight: bold;
      }

      .two1 {
        flex: 1;
        background-color: #81D3F8;
        border: 1px rgb(235, 228, 228) solid;
        border-radius: 5px;
        cursor: pointer;
        margin-left: 2vw;
        font-weight: bold;
      }
    }

    .dialog-body-four {
      position: relative;
      width: 8vw;
      top: 6vh;
      left: 10.5vw;
      font-size: 1vw;
      letter-spacing: 1px;
      text-align: center;
      line-height: 5vh;
      color: white;
      background-color: #81D3F8;
      box-sizing: border-box;
      border: 1px rgb(235, 228, 228) solid;
      border-radius: 5px;
      cursor: pointer;
      font-weight: bold;


    }

    .dialog-body-five {
      position: relative;
      width: 5vw;
      top: 12vh;
      left: 12vw;
      display: inline-block;
      display: flex;
      font-size: 0.7vw;
      letter-spacing: 1px;
      text-align: center;
      line-height: 4vh;
      color: white;

      .one1 {
        flex: 1;
        background-color: #D9001B;
        box-sizing: border-box;
        border: 1px rgb(235, 228, 228) solid;
        border-radius: 5px;
        cursor: pointer;
        font-weight: bold;
      }

    }
    .dialog-body-six {
      position: relative;
      width: 16vw;
      top: 6vh;
      left: 6.5vw;

      font-size: 1vw;
      letter-spacing: 1px;
      text-align: center;
      line-height: 5vh;
      color: white;
      background-color: #D9001B;
      box-sizing: border-box;
      border: 1px rgb(235, 228, 228) solid;
      border-radius: 5px;
      cursor: pointer;
      font-weight: bold;


    }
  }
}




#all {
  // background-color: aqua;
  width: 85%;
  height: 160vh;
  // height: 0;
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