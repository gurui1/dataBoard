<template>
  <div class="wBox">
    <div class="bodyTop">
      <div class="title">
        <div class="wenzi">搜索条件</div>
      </div>
      <div class="search">
        <div class="one">
          <span> &nbsp;&nbsp; &nbsp;&nbsp; 账户简称: &nbsp;&nbsp; </span>
          <el-input v-model="jianCheng" style="width: 6.4vw"></el-input>
        </div>
        <div class="one">
          <span> 账户类别: &nbsp; </span>
          <el-input v-model="leiBie" style="width: 6.4vw"></el-input>
        </div>

        <div class="other">
          <span> 银行余额: &nbsp; </span>
          <el-input v-model="yuE1" style="width: 6.4vw"></el-input> &nbsp;
          一 &nbsp;
          <el-input v-model="yuE2" style="width: 6.4vw"></el-input>
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

      <el-table v-if="tableData.length != 0" :data="tableData" border class="table"
        :row-style="{ fontSize: '14px', height: '30px', padding: '10px' }">
        <el-table-column align="center" prop="账户名称" label="账户名称" width="220" />
        <el-table-column align="center" prop="账户简称" label="账户简称" width="220" />
        <el-table-column align="center" prop="账户类别" label="账户类别" width="220" />
        <el-table-column align="center" prop="期初余额" label="银行余额" width="220">
          <template #header>
            <span>银行余额&nbsp;</span>
            <span>(银行余额)</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="理财" label="理财" width="220" />
        <el-table-column align="center" prop="贷款" label="贷款" width="220" />
        <el-table-column align="center" prop="合计" label="合计" />
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

let jianCheng: any = ref()
let leiBie: any = ref()
let yuE1: any = ref()
let yuE2: any = ref()


const tableData = [
  {
    账户名称: '北京百悟科技有限公司',
    账户简称: '北京北新桥工行',
    账户类别: '基本户',
    期初余额: '100010.00',
    理财: '1000.00',
    贷款: '5000.00',
    合计: '6000.00',
  },
  {
    账户名称: '北京百悟科技有限公司',
    账户简称: '北京北新桥工行',
    账户类别: '基本户',
    期初余额: '100010.00',
    理财: '1000.00',
    贷款: '5000.00',
    合计: '6000.00',
  },
  {
    账户名称: '北京百悟科技有限公司',
    账户简称: '北京北新桥工行',
    账户类别: '基本户',
    期初余额: '100010.00',
    理财: '1000.00',
    贷款: '5000.00',
    合计: '6000.00',
  },
];



let getData = () => {
  console.log('getData');

};
let toExcel = () => {
  console.log('toExcel');
  exportExcel('银行余额表', tableData);

};


onMounted(() => {
  getData();
});
onUnmounted(() => { });
</script>

<style lang="less" scoped>
.wBox {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.bodyTop {
  width: 98.8%;
  height: 20vh;
  background-color: #fff;
  margin-top: 10px;
  box-shadow: 0 0px 12px 0px #d9d9d9;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 0.8vw;

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
    flex: 1;
    width: 60%;
    position: relative;
    left: -20%;
    // background-color: #6AB4E5;
    display: flex;
    box-sizing: border-box;
    margin-top: 2vh;
    .one {
      flex: 1;
    }

    .other {
      flex: 1.5;
    }
  }

  .button {
    width: 100%;
    flex: 0.8;
    // background-color: aqua;

    // height: 4vh;
    .btn {
      margin-top: 0.2vw;
      margin-left: 2vw;
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
  height:52vh;
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
  // --el-table-border-color: rgba(156, 136, 136, 0.5);
  // --el-table-border: 1px solid rgba(156, 136, 136, 0.5);
  // --el-table-text-color: #21448b;
  // --el-table-header-text-color: #4168b7;
}
</style>
