<template>
    <div id="all1">
        <div @click="tiaozhuan" class="xq">
            <img src="../../assets/菜单.png" alt="" style="width: 15px;height: 18px;position: relative;top: 3px;" />
            <span style="margin-left: 2px;">详情</span>
        </div>
        <div class="title">

            &nbsp {{ props.title }} &nbsp

            <!-- <div class="ball"></div> -->
        </div>
        <div class="select">
            <span>支出日期: </span>
            <el-date-picker v-model="timeLineVal" type="daterange" range-separator="至" start-placeholder="开始时间"
                end-placeholder="结束时间" :disabled-date="disabledDate" />

            <el-radio-group v-model="radio">
                <el-radio :value="1">归属体系</el-radio>
                <el-radio :value="2">归属部门</el-radio>

            </el-radio-group>
            <el-button type="primary" @click="getData">查询</el-button>
        </div>

        <div class="chart" ref="midEcharts6"></div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, reactive } from "vue";
import * as echarts from "echarts";
import { useRouter } from 'vue-router';

const props = defineProps(["title",]);


const disabledDate = (time: Date) => {
    const currentTime = new Date();

    // 禁用大于当前时间的日期
    return time.getTime() > currentTime.getTime();
}
let timeLineVal: any = ref([]);

let geiTime = () => {
    timeLineVal.value[0] = localStorage.getItem('now');
    timeLineVal.value[1] = localStorage.getItem('now');
}
const router = useRouter();
let tiaozhuan = () => {
    
    if(props.title=='预计支出金额部门统计')
    router.push('/biao3'); // 
    if(props.title=='预计回款金额部门统计')
    router.push('/biao4'); // 
    if(props.title=='实际支出金额部门统计')
    router.push('/biao5'); // 
    if(props.title=='实际回款金额部门统计')
    router.push('/biao6'); // 
}
const radio = ref(1)
let myChart: any = null;
let first = true;
let midEcharts6: any = ref(null);
let state: any;

let echartX: any = ref(['消息类', '语音类', "证件/码号业务", "其他业务"]);
// console.log(echartX.value);

let echarty: any = ref([100, 200, 300, 400, 500, 600, 700]);
let initEcharts = () => {
    for (let i = 0; i < 7; i++)
        // {
        //     let value = generateRecentDates()[i].slice(5, 11);
        //     let lines = value.match(/.{1,5}/g);
        //     let add = lines.join("\n");
        //     echartX.value.push(add);
        // }
        if (first) {
            myChart = echarts.init(midEcharts6.value as any);
        }
    first = false;

    state = reactive({
        option: {
            tooltip: {
                trigger: "axis",
                textStyle: {
                    fontSize: 10,
                },
                axisPointer: {
                    type: "line",
                    label: {
                        backgroundColor: "#111339",
                    },
                },

            },
            color: ["#19a3df"],
            grid: {
                left: "4%",
                right: "6%",
                bottom: "5%",
                top: "5%",
                containLabel: true,
            },
            yAxis: [
                {
                    type: "category",
                    boundaryGap: true,
                    splitLine: {
                        show: true,
                        lineStyle: {
                            width: 2, // 设置分隔线的宽度为2像素
                            // color:"red",
                            
                        }
                    },
                    data: echartX,
                    axisLabel: {
                        color: "black",
                        // opacity: 0.8,
                        fontSize: 10,
                        formatter: function (value: string) {
                            return value.split("\n").join("\n");
                        },
                    },

                    axisTick: { show: false },
                },
            ],
            xAxis: [
                {
                    // max: 500, min: 0,
                    type: "value",
                    splitLine: {
                        show: false,
                    },
                    // boundaryGap: [0, 0.01],
                    axisLabel: {
                        show: true,
                        color: "black",
                        // opacity: 0.8,
                        fontSize: 10, // 设置字体大小为 12px

                    },
                    axisLine: {
                        show: true,
                        onZero: true, // 在零点显示轴线
                        lineStyle: {},
                    },
                    
                },
            ],
            //   backgroundColor: 'lightblue', //整个图的背景颜色
            series: [
                {
                    type: "bar",
                    label: {
                        show: true,
                        position: 'right', // 可以选择在上方 'top' 或者右侧 'right'
                        formatter: '{c}', // 显示数据值
                        fontSize: 14,
                        fontWeight: 'bold',
                        fontFamily: 'Arial'
                    },
                    name: "金额",
                    barWidth: '40%', // 设置柱状图的宽度为整个类目宽度的 60%
                    barCategoryGap: '0%', // 设置柱状图之间的间距为类目宽度的 20%

                    smooth: false,
                    data: echarty,
                    
                },
            ],
        },
    });

    state.option && myChart.setOption(state.option);
    window.addEventListener("resize", function () {
        myChart.resize();
    });
};

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
    timeLineVal.value[0] = `${year1}-${month1}-${day1}`;
    timeLineVal.value[1] = `${year2}-${month2}-${day2}`;
}
let getData = () => {

    changeTime(timeLineVal.value[0], timeLineVal.value[1]);
   


    initEcharts();

};

onMounted(() => {
    geiTime();
    getData();

});

onUnmounted(() => {
    myChart?.dispose();
});
</script>

<style setup lang="less" scoped>
.xq {
    position: absolute;
    font-size: 15px;
    font-weight: bold;
    letter-spacing: 1px;
    cursor: pointer;
}

.xq:hover::before {
    content: '查看详情';
    position: absolute;
    top: 25px;
    /* 根据需要调整位置 */
    left: 0;
    width: 55px;
    background-color: #fff;
    /* 可选：背景色 */
    padding: 5px;
    /* 可选：内边距 */
    border: 1px solid #ccc;
    /* 可选：边框 */
    border-radius: 4px;
    /* 可选：边框圆角 */
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
    /* 可选：阴影 */
    font-size: 12px;
    /* 可选：字体大小 */
    color: #333;
    /* 可选：字体颜色 */
}

/deep/.el-date-editor {
    --el-date-editor-daterange-width: 9.5vw;
    // --el-date-editor-daterange-height: 185px;
}

/deep/.el-input__icon {
    display: none;
}

#all1 {
    box-sizing: border-box;
    width: 98%;
    // top: 1%;
    // left: 1%;
    margin: auto;
    height: 98%;
    position: relative;
    border: 2px solid rgb(184, 172, 172);
}

.title {
    color: black;
    font-size: 2.2vh;
    font-weight: bold;
    position: relative;
    height: 3vh;
    left: 3.3vw;
    width: 12vw;
    top: 8px;
    letter-spacing: 1px;
    border: 2px solid #4080D4;
    border-radius: 10px;

    .ball {
        width: 0.8rem;
        height: 0.8rem;
        border-radius: 50%;
        background-color: black;
        position: absolute;
        top: 0.4rem;
        left: 0.4rem;
    }
}

.select {

    position: absolute;
    top: 6.5vh;
    font-size: 0.7vw;
    left: 1vw;
}

.chart {
    height: 20vh;
    width: 100%;
    position: relative;
    top: 10.5vh;
}

.el-button {
    color: white;
    // width: 50px;
    // height: 30px;
    // position: relative;
    position: absolute;
    top: 0vh;
    
    left: 13vw;
    margin-left: 1vw;
    padding: 0px 8px;
}
.el-radio{
    margin-right: 10px
}
</style>