<template>
  <div class="wBox">
    <div class="bodyTop">
      <div class="title"> <div class="wenzi">搜索条件</div></div>
      <div class="search">
        <div class="top">
          <div class="three">
            <span>&nbsp;&nbsp;&nbsp;&nbsp;日期: &nbsp;&nbsp;</span>
            <el-date-picker v-model="timeLineVal" type="daterange" range-separator="至" start-placeholder="开始时间"
              end-placeholder="结束时间"  :disabled-date="disabledDate" />
          </div>
          <div class="three">
            <span>&nbsp;&nbsp;账户简称: &nbsp;&nbsp;&nbsp;</span>
            <el-input v-model="jianCheng" style="width: 6.4vw"> </el-input>

          </div>
          <div class="three">
            <span>&nbsp;&nbsp;归属BU: &nbsp;&nbsp;&nbsp;</span>
            <el-input v-model="guiShu" style="width: 6.4vw"> </el-input>
          </div>
          <div class="four">
            <span>&nbsp;&nbsp;预计回款金额: &nbsp;&nbsp;&nbsp;</span>
            <el-input v-model="yuJi1" style="width: 6.4vw"> </el-input>
            &nbsp;一&nbsp;
            <el-input v-model="yuJi2" style="width: 6.4vw"> </el-input>

          </div>

        </div>
        <div class="bottom">
          <div class="three">
            <span>&nbsp;&nbsp;&nbsp;&nbsp;一级业务: &nbsp;&nbsp;&nbsp;</span>
            <el-input v-model="yijiYW" style="width: 6.4vw"> </el-input>
          </div>
          <div class="three">
            <span>&nbsp;&nbsp;二级业务: &nbsp;&nbsp;&nbsp;</span>
            <el-input v-model="erjiYW" style="width: 6.4vw"> </el-input>
          </div>
          <div class="three">
            <span>&nbsp;&nbsp;&nbsp;&nbsp;体系: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <el-input v-model="tiXi" style="width: 6.4vw;"></el-input>
          </div>
          <div class="four">
            <span>&nbsp;&nbsp;部门: &nbsp;&nbsp;&nbsp;</span>
            <el-input v-model="buMen" style="width: 6.4vw"> </el-input>
          </div>
        </div>
      </div>

      <div class="button">
        
      <el-button type="primary" class="btn" @click="getData">查询&nbsp;
      </el-button>
      <el-button type="primary" class="btn" @click="toExcel">导出&nbsp;
      </el-button>
      </div>

    </div>
    <div class="bodyBottom">
      <div class="title2"> <span class="wenzi">查询结果</span></div>

      <el-table v-if="tableData.length != 0" :data="tableData" border class="table">
        <el-table-column align="center" prop="日期" label="日期" width="200" />
        <el-table-column align="center" prop="账户简称" label="账户简称" width="200" />
        <el-table-column align="center" prop="归属BU" label="归属BU" width="200" />
        <el-table-column align="center" prop="一级业务" label="一级业务" width="200" />
        <el-table-column align="center" prop="二级业务" label="二级业务" width="200" />
        <el-table-column align="center" prop="体系" label="体系" width="200" />
        <el-table-column align="center" prop="部门" label="部门" width="200" />
        <el-table-column align="center" prop="预计回款金额" label="预计回款金额" />
      </el-table>
      <div v-if="tableData.length == 0" class="table">
        <span class="zanwu">暂无数据</span>
      </div>
      <el-pagination class="fenye" v-model:current-page="currentPage" v-model:page-size="pageSize" :disabled="disabled"
        :background="background" layout="total,,sizes, prev, pager, next , jumper" :total=total
        @size-change="handleSizeChange" @current-change="handleCurrentChange" />


    </div>
  </div>
</template>

<script setup lang="ts">

import { exportExcel } from "../../excelConfig"

let total: any = ref(100);
const currentPage: any = ref(1)
const pageSize = ref(10)
const background = ref(true)
const disabled = ref(false)
const handleSizeChange = (e: any) => {
  pageSize.value = e;
  pageSize.value = e;
  getData();
};
const handleCurrentChange = (e: any) => {
  currentPage.value = e;
  currentPage.value = e;
  getData();
};

let timeLineVal: any = ref([]);
let jianCheng: any = ref()
let guiShu: any = ref()
let yuJi1: any = ref()
let yuJi2: any = ref()
let yijiYW: any = ref()
let erjiYW: any = ref()
let tiXi: any = ref()
let buMen: any = ref()

const tableData = [
  {
    日期: '2024-06-18',
    账户简称: '北京北新桥工行',
    归属BU: '11',
    一级业务: '22',
    二级业务: '33',
    体系: '我的',
    部门: 'ss',
    预计回款金额: '6000.00',
  },
  {
    日期: '2024-06-18',
    账户简称: '北京北新桥工行',
    归属BU: '11',
    一级业务: '22',
    二级业务: '33',
    体系: '我的',
    部门: 'ss',
    预计回款金额: '6000.00',
  },
  {
    日期: '2024-06-18',
    账户简称: '北京北新桥工行',
    归属BU: '11',
    一级业务: '22',
    二级业务: '33',
    体系: '我的',
    部门: 'ss',
    预计回款金额: '6000.00',
  },
];
let toExcel = () => {// console.log('toExcel');
  exportExcel('预计回款表', tableData);

};
const disabledDate = (time: Date) => {
  const currentTime = new Date();
  // 禁用大于当前时间的日期
  return time.getTime() > currentTime.getTime();
}



let geiTime = () => {
  timeLineVal.value[0] = localStorage.getItem('mouthFirstDay');
  timeLineVal.value[1] = localStorage.getItem('now');
}
let changeTime = (a:any, b:any) => {
  // new Date() 构造函数会创建一个新的 Date 对象，并且默认初始化为当前的日期和时间。如果你不传递任何参数，new Date() 会返回当前的日期和时间。
  //如果传递了参数，如一个日期字符串、一个时间戳或年、月、日等值，new Date() 会根据这些输入初始化 Date 对象对应的日期和时间
  const date1 = new Date(a);
  const year1 = date1.getFullYear();
  const month1 = (date1.getMonth() + 1).toString().padStart(2, "0");
  const day1 = date1.getDate().toString().padStart(2, "0");

  const date2 = new Date(b);
  const year2 = date2.getFullYear();
  const month2 = (date2.getMonth() + 1).toString().padStart(2, "0");
  const day2 = date2.getDate().toString().padStart(2, "0");
  // console.log(a,b,'ab');
  timeLineVal.value[0] = `${year1}-${month1}-${day1}`;
  timeLineVal.value[1] = `${year2}-${month2}-${day2}`;
}
let getData = async () => {
  await changeTime(timeLineVal.value[0], timeLineVal.value[1]);
  // 调接口

};

onMounted(() => {
  geiTime();
  getData();

});

onUnmounted(() => { });
</script>

<style lang="less" scoped>


/deep/.el-date-editor {
  --el-date-editor-daterange-width: 185px;
}

/deep/.el-input__icon {
  display: none;
}

.wBox {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 0.8vw;
}

.bodyTop {
  width: 98.8%;
  height: 24vh;
  background-color: #fff;
  margin-top: 10px;
  box-shadow: 0 0px 12px 0px #d9d9d9;
  display: flex;
  align-items: center;
  flex-direction: column;

  .title {
    flex: 1;
    width: 100%;
    .wenzi {
      letter-spacing: 1px;
      line-height: 4vh;
      width: 6vw;
      height: 4vh;
      font-size: 1.1vw;
      font-weight: bold;
      color: #fff;
      background-color: #6AB4E5;
      border-radius: 5px;
      text-align: center;
      position: relative;
      top: 1vh;
      left: 1vw;
    }
  }

  .search {

    width: 80%;
    flex: 2;
    // background-color: blue;
    // height: 14vh;
    // background-color: red;
    position: relative;
    left: -10%;
    // left: -5vw;
    // top: 2vh;
    display: flex;
    flex-direction: column;

    .top {
      flex: 1;
      display: flex;
      flex-direction: row;
      top: 2vh;
      position: relative;

      .three {
        flex: 1;

      }

      .four {
        flex: 1.5;
      }
    }

    .bottom {
      flex: 1;
      display: flex;
      flex-direction: row;
      top: 1vh;
      box-sizing: border-box;
      position: relative;

      .three {
        flex: 1;
      }

      .four {
        flex: 1.5;
      }
    }
  }

  .button {
    width: 100%;
    flex: 0.8;
    // background-color: aqua;
    // height: 4vh;
    .btn{
      margin-top: 0.2vw;
      margin-left: 2vw;
    }
    .btn :first-child{
      margin-left: 0vw;
    }
  }
}

.bodyBottom {
  width: 98.8%;
  flex: auto;
  height: 0;
  position: relative;
  margin-top: 10px;
  margin-bottom: 10px;
  background-color: #fff;
  box-shadow: 0 0px 16px 0px #d9d9d9;
  box-sizing: border-box;
  padding: 15px;
}



.title2 {
  position: relative;
  width: 6vw;
  height: 4vh;
  font-size: 1.1vw;
  font-weight: bold;
  color: #fff;
  background-color: #6AB4E5;
  border-radius: 5px;
  text-align: center;
  left: 0.1vw;
  top: 0vh;

  .wenzi {
    letter-spacing: 1px;
    line-height: 4vh;
  }
}

.table {
  width: 98%;
  height: 48vh;
  // background-color: #6AB4E5;
  margin-top: 1vh;

  .zanwu {
    position: relative;
    left: 35vw;
    top: 3vh;
    font-size: 2vw;
    letter-spacing: 2px;
    color: rgba(128, 128, 128, 0.6);
    /* 使用 RGBA 表示灰色，最后一个值 0.6 表示透明度 */
    font-weight: bold;
  }
}
.fenye {
  position: fixed;
  // left: 65vw;
  right: 2vw;
  bottom: 3vh;
}
/deep/.el-table {
  // --el-table-border-color: rgba(156, 136, 136,0.5);
  // --el-table-border: 1px solid rgba(156, 136, 136,0.5);
  // --el-table-text-color: #21448b;
  // --el-table-header-text-color: #4168b7;
}
</style>
