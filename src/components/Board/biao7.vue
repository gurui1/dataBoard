el-date-picker<template>
  <div class="wBox">
    <div class="bodyTop">
      <div class="title"> <span class="wenzi">搜索条件</span></div>
      <div class="search">
        <div class="top">
          <div class="three">
            <span>&nbsp;&nbsp;日期: </span>
            <el-date-picker v-model="timeLineVal" type="daterange" range-separator="至" start-placeholder="开始时间"
              end-placeholder="结束时间" :disabled-date="disabledDate" />
          </div>
          <div class="three">
            <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;账户简称: &nbsp;&nbsp;&nbsp;</span>
            <el-input v-model="jianCheng" style="width: 6.4vw"> </el-input>

          </div>
          <div class="three">
            <span>&nbsp;&nbsp;归属BU: &nbsp;&nbsp;&nbsp;</span>
            <el-input v-model="guiShu" style="width: 6.4vw"> </el-input>
          </div>
          <div class="four">
            <span>&nbsp;&nbsp;预计支出: &nbsp;&nbsp;&nbsp;</span>
            <el-input v-model="zhiChu[0]" style="width: 6.4vw"> </el-input>
            &nbsp;一&nbsp;
            <el-input v-model="zhiChu[1]" style="width: 6.4vw"> </el-input>

          </div>
          <div class="four">
            <span>&nbsp;&nbsp;预计回款: &nbsp;&nbsp;&nbsp;</span>
            <el-input v-model="huiKuan[0]" style="width: 6.4vw"> </el-input>
            &nbsp;一&nbsp;
            <el-input v-model="huiKuan[1]" style="width: 6.4vw"> </el-input>

          </div>

        </div>
        <div class="bottom">
          <div class="three">
            <span>&nbsp;&nbsp;一级业务: &nbsp;&nbsp;&nbsp;</span>
            <el-input v-model="yijiYW" style="width: 6.4vw"> </el-input>
          </div>
          <div class="three">
            <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;二级业务: &nbsp;&nbsp;&nbsp;</span>
            <el-input v-model="erjiYW" style="width: 6.4vw"> </el-input>
          </div>
          <div class="three">
            <span>&nbsp;&nbsp;&nbsp;&nbsp;体系: &nbsp;&nbsp;&nbsp;</span>
            <el-input v-model="tiXi" style="width: 6.4vw;margin-left: 15px;"></el-input>
          </div>
          <div class="four">
            <span>&nbsp;&nbsp;&nbsp;&nbsp;部门: &nbsp;&nbsp;&nbsp;</span>
            <el-input v-model="buMen" style="width: 6.4vw"> </el-input>
          </div>
          <div class="four">

          </div>
        </div>
      </div>
      <el-button type="success" class="btn1" @click="dengji">登记&nbsp;
      </el-button>
      <el-button type="primary" class="btn2" @click="getData">查询&nbsp;
      </el-button>
      <el-button type="primary" class="btn3" @click="toExcel">导出&nbsp;
      </el-button>

      <el-dialog v-model="dialogValue" class="dialog" :show-close="false">
        <div class="dialog-title">
          <span class="wenzi">登记信息</span>
          <el-icon class="button" @click="close">
            <Close />
          </el-icon>
        </div>
        <div class="dialog-body">
          <div class="every">
            <div class="one">
              <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;日期: &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;</span>
              <el-input v-model="dialogData.日期" style="width: 6.4vw"> </el-input>
            </div>
            <div class="one">
              <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;账户简称: &nbsp;&nbsp;&nbsp;</span>
              <el-input v-model="dialogData.账户简称" style="width: 6.4vw"> </el-input>
            </div>
          </div>
          <div class="every">
            <div class="one">
              <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;体系: &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;</span>
              <el-input v-model="dialogData.体系" style="width: 6.4vw"> </el-input>
            </div>
            <div class="one">
              <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;部门: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span>
              <el-input v-model="dialogData.部门" style="width: 6.4vw"> </el-input>
            </div>
          </div>
          <div class="every">
            <div class="one">
              <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;归属BU: &nbsp;&nbsp;&nbsp; &nbsp;</span>
              <el-input v-model="dialogData.归属BU" style="width: 6.4vw"> </el-input>
            </div>
            <div class="one">
              <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;一级业务: &nbsp;&nbsp;&nbsp;</span>
              <el-input v-model="dialogData.一级业务" style="width: 6.4vw"> </el-input>
            </div>
          </div>
          <div class="every">
            <div class="one">
              <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;二级业务: &nbsp;&nbsp;&nbsp;</span>
              <el-input v-model="dialogData.二级业务" style="width: 6.4vw"> </el-input>
            </div>
            <div class="one">
              <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;预计支出: &nbsp;&nbsp;&nbsp;</span>
              <el-input v-model="dialogData.预计支出" style="width: 6.4vw"> </el-input>
            </div>
          </div>
          <div class="every">
            <div class="one">
              <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;预计回款: &nbsp;&nbsp;&nbsp;</span>
              <el-input v-model="dialogData.预计回款" style="width: 6.4vw"> </el-input>
            </div>
            <div class="one">
              <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;备注:
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
              <el-input v-model="dialogData.备注" style="width: 6.4vw"> </el-input>
            </div>
          </div>
          <div class="other">
            <div class="other-btn1" @click="tijiao"> <span class="text">确认提交</span> </div>
            <div class="other-btn2" @click="close"><span class="text">取消</span></div>
          </div>
        </div>

      </el-dialog>

    </div>
    <div class="bodyBottom">
      <div class="title2"> <span class="wenzi">查询结果</span></div>

      <el-table v-if="tableData.length != 0" :data="tableData" border class="table">
        <el-table-column align="center" prop="日期" label="日期" width="155" />
        <el-table-column align="center" prop="账户简称" label="账户简称" width="155" />
        <el-table-column align="center" prop="体系" label="体系" width="155" />
        <el-table-column align="center" prop="部门" label="部门" width="155" />
        <el-table-column align="center" prop="归属BU" label="归属BU" width="155" />
        <el-table-column align="center" prop="一级业务" label="一级业务" width="155" />
        <el-table-column align="center" prop="二级业务" label="二级业务" width="155" />
        <el-table-column align="center" prop="预计支出" label="预计支出" width="155" />
        <el-table-column align="center" prop="预计回款" label="预计回款" width="155" />
        <el-table-column align="center" prop="备注" label="备注" />
      </el-table>
      <div v-if="tableData.length == 0" class="table">
        <span class="zanwu">暂无数据</span>
      </div>


    </div>
  </div>
</template>

<script setup lang="ts">

import { exportExcel } from "../../excelConfig"
let timeLineVal: any = ref([]);
let jianCheng: any = ref()
let guiShu: any = ref()
let zhiChu: any = ref([])
let huiKuan: any = ref([])
let yijiYW: any = ref()
let erjiYW: any = ref()
let tiXi: any = ref()
let buMen: any = ref()

let dialogValue: any = ref(false)
let dialogData: any = reactive(
  {
    日期: '',
    账户简称:'',
    体系:'',
    部门:'',
    归属BU:'',
    一级业务:'',
    二级业务:'',
    预计支出:'',
    预计回款:'',
    备注:''
  }
      
)



const tableData = [
  {
    日期: '2024-06-18',
    账户简称: '北京北新桥工行',
    体系: '我的',
    部门: 'ss',
    归属BU: '11',
    一级业务: '22',
    二级业务: '33',
    预计支出: '6000.00',
    预计回款: '6000.00',
    备注: 'gg',
  },
  {
    日期: '2024-06-18',
    账户简称: '北京北新桥工行',
    体系: '我的',
    部门: 'ss',
    归属BU: '11',
    一级业务: '22',
    二级业务: '33',
    预计支出: '6000.00',
    预计回款: '6000.00',
    备注: 'gg',
  },
  {
    日期: '2024-06-18',
    账户简称: '北京北新桥工行',
    体系: '我的',
    部门: 'ss',
    归属BU: '11',
    一级业务: '22',
    二级业务: '33',
    预计支出: '6000.00',
    预计回款: '6000.00',
    备注: 'gg',
  },
];

const disabledDate = (time: Date) => {
  const currentTime = new Date();
  // 禁用大于当前时间的日期
  return time.getTime() > currentTime.getTime();
}
// 转成 excel
let toExcel = () => {// console.log('toExcel');
  exportExcel('系统外预计支出表', tableData);
};
// 登记
let dengji = () => {
  dialogValue.value = true;
};
//关闭弹窗
let close = () => {
  dialogValue.value = false;
}
// 提交
let tijiao=()=>{
 
  console.log(dialogData,'dialogData');
  // 先调接口 提交成功后 清空 加个异步 等待接口返回值
  let joker: any = ref(true);
  if (joker.value == true) {
    ElMessage({
      message: '提交成功',
      type: 'success',
    })
    
  } else {
      ElMessage.error('提交失败')
  }
  dialogValue.value = false;
  for (let key in dialogData) {
      dialogData[key] = ''; // 或者根据需要设置为适当的初始值
    }
   
}
// 进来之后第一时间获取时间
let geiTime = () => {
  timeLineVal.value[0] = localStorage.getItem('mouthFirstDay');
  timeLineVal.value[1] = localStorage.getItem('now');
}
// 修改时间格式
let changeTime = (a: any, b: any) => {
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
// 查询 获取数据
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
  --el-date-editor-daterange-width: 9.5vw;
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

  .search {
    width: 100%;
    height: 14vh;
    // background-color: red;
    position: relative;
    left: -5vw;
    top: 2vh;
    display: flex;
    flex-direction: column;

    .top {
      flex: 1;
      display: flex;
      flex-direction: row;

      .three {
        flex: 1;
      }

      .four {
        flex: 1.5;
      }
    }

    .bottom {
      flex: 1.3;
      display: flex;
      flex-direction: row;

      .three {
        flex: 1;
      }

      .four {
        flex: 1.5;
      }
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

.title {
  position: relative;
  width: 6vw;
  height: 4vh;
  font-size: 1.1vw;
  font-weight: bold;
  color: #fff;
  background-color: #6AB4E5;
  border-radius: 5px;
  text-align: center;
  left: 1vw;
  top: -9vh;

  .wenzi {
    letter-spacing: 1px;
    line-height: 4vh;
  }
}

.btn1 {
  position: absolute;
  left: 15vw;
  top: 30vh;
  // margin-left: 5px;
}

.btn2 {
  position: absolute;
  left: 20vw;
  top: 30vh;
  // margin-left: 5px;
}

.btn3 {
  position: absolute;
  left: 25.5vw;
  top: 30vh;
  // margin-left: 5px;
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
  // height: auto;
  // background-color: #6AB4E5;
  margin-top: 3vh;

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

/deep/.el-table {
  --el-table-border-color: rgba(156, 136, 136, 0.5);
  --el-table-border: 1px solid rgba(156, 136, 136, 0.5);
  // --el-table-text-color: #21448b;
  // --el-table-header-text-color: #4168b7;
}

/deep/.dialog {
  background-color: white;
  width: 30vw;
  height: 64vh;
  border-radius: 10px 10px 0 0;
  padding: 0 !important;

  /* // height: 1000px; */
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
      left: 1vw;
      letter-spacing: 2px;
    }

    .button {
      position: relative;
      font-size: 2vw;
      left: 21vw;
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
    height: 58vh;
    // background-color: yellow;
    margin-top: 0vh;
    display: flex;
    flex-direction: column;

    .every {
      flex: 1;
      display: flex;
      flex-direction: row;

      .one {
        flex: 1;
      }
    }

    .other {
      flex: 0.8;

      font-size: 0.7vw;
        letter-spacing: 1px;
        text-align: center;
        line-height: 4vh;
        color: white;

      .other-btn1 {
        width: 5vw;
        height: 4vh;
        background-color: red;
        border-radius: 5px;
        position: relative;
        left: 8vw;
        cursor: pointer;
        top: -2vh;
        .text {
        margin-top: 0.5vh !important;
      }
      }

      .other-btn2 {
        width: 5vw;
        height: 4vh;
        background-color: #81D3F8;
        border-radius: 5px;
        position: relative;
        cursor: pointer;
        left: 16vw;
        top: -6vh;
        .text {
        margin-top: 0.5vh !important;
      }
      }

      
    }
  }
}
</style>
