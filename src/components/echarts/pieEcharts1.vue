<template>
    <div id="all1">
        <div class="title">
            <span class="wenzi">
                &nbsp&nbsp &nbsp {{ props.title }} &nbsp
            </span>
            <div class="circle">
                <div class="ball"></div>
            </div>
        </div>
        <div class="select">
            <span>支出日期: </span>
            <el-date-picker v-model="timeLineVal" type="daterange" range-separator="至" start-placeholder="开始时间"
                end-placeholder="结束时间" :size='small' :disabled-date="disabledDate" />
                <!-- <label for="single-date">选择日期：</label> -->
                <!-- <input type="date" v-model="timeLineVal[0]" name="single-date">
                一
                <input type="date" v-model="timeLineVal[1]" > -->

                 &nbsp; <el-button type="primary" @click="getData">查询</el-button>


        </div>
        <div class="middle" @click="tiaozhuan">
            <p >期初余额</p>
            <div style="margin: 5px 10px">{{ tot }}万</div>
        </div>
        <div class="chart" ref="midEcharts6"></div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, reactive } from "vue";
import * as echarts from "echarts";
import { useRouter } from 'vue-router';
const props = defineProps(["title",]);
// import { title } from "process";
//   import { getData2 } from "../../api/diTan/api";
const disabledDate = (time: Date) => {
    const currentTime = new Date();

    // 禁用大于当前时间的日期
    return time.getTime() > currentTime.getTime();
}
let timeLineVal: any = ref([]);
const router = useRouter();
let tiaozhuan = () => {
    router.push('/biao1'); // 
}

let geiTime = () => {
    timeLineVal.value[0] = localStorage.getItem('now');
    timeLineVal.value[1] = localStorage.getItem('now');
}

// let small:any=ref('small')

let myChart: any = null;
let first = true;
let midEcharts6: any = ref(null);
let state: any;

// let echartX: any = ref([]);
// let echarty: any = ref([]);
let data1: any = ref(9000000);
let data2: any = ref(6000000);
let data3: any = ref(4500000);
let data4: any = ref(4500000);
let data5: any = ref(3000000);
let data6: any = ref(3000000);
// let total: any = 0;


var datas = [
    { value: data1.value, name: "集微中行" },
    { value: data2.value, name: "触悟农行" },
    { value: data3.value, name: "百悟北新桥工行" },
    { value: data4.value, name: "三生万数工行" },
    { value: data5.value, name: "思空光大" },
    { value: data6.value, name: "其他" },
];

let tot: any = ref(0);
let initEcharts = () => {
    tot.value=0;
    for (let i = 0; i < datas.length; i++) {
        tot.value += (datas[i].value / 10000);
    }
    // console.log(tot.value, 's');

    if (first) {
        myChart = echarts.init(midEcharts6.value as any);
    }
    first = false;

    state = reactive({
        option: {
            // title: {
            //     text: "{name|" + "期初金额" + "}",
            //     subtext: "{val|" + tot.value + '万' + "}",
            //     top: "39%",
            //     left: "26%",
            //     textStyle: {
            //         rich: {
            //             name: {
            //                 fontSize: 15,
            //                 color: "#464646",
            //                 padding: [10, 10, 10, -8],
            //                 fontWeight: "bold",
            //                 fontStyle: "italic",
            //                 fontFamily: "sans-serif",
            //                 textBorderColor: "rgba(16, 239, 239, 1)",
            //                 textBorderWidth: 1,
            //                 textBorderType: "solid",
            //                 // lineHeight: 26,
            //             },
                        
            //         }

            //     },
            //     subtextStyle: {
            //         rich: {
            //             val: {
            //                 fontSize: 13,
            //                 // fontWeight: "lighter",
            //                 color: "#464646",
            //                 padding: [10, 0, 10, 0],
            //                 fontWeight: "bold",
            //                 fontStyle: "italic",
            //                 fontFamily: "sans-serif",
            //                 textBorderColor: "rgba(16, 239, 239, 1)",
            //                 textBorderWidth: 1,
            //                 textBorderType: "solid",
            //                 lineHeight: 26,
            //             },
            //         }
            //     },
            //     // textAlign: "center"
            // },
            tooltip: {
                trigger: "item",
                // formatter: "{b} ",
            },

            legend: {
                itemWidth: 12, // 设置图例图标的宽度
                itemHeight: 12, // 设置图例图标的高度
                icon: "block",
                orient: "vertical",
                left: "50%",
                top: "10%",
                // formatter: "{b} ",
                padding: [0, 0, 10, 0],
                itemGap: 20, // 设置图例项之间的间距为 20 像素
                // 设置图例之间的上下左右间隔为 10 像素

                inactiveColor: "rgba(0, 0, 0, 0.5)",
                // 修改取消选中状态的字体颜色
                textStyle: {
                    rich: {
                        name: {
                            verticalAlign: 'right',
                            align: 'left',
                            width: 105,
                            fontSize: 12,
                            color: '#000000'
                        },
                        value: {
                            align: 'left',
                            width: 65,
                            fontSize: 12,
                            color: '#000000'
                        },
                        count: {
                            align: 'left',
                            width: 20,
                            fontSize: 12,
                            color: '#000000'
                        }
                    },
                    color: '#54bef9'
                },

                // data: datas.map((item) => item.name),
                formatter: function (name: string) {
                    var total = 0;
                    var tarValue;
                    for (var i = 0; i < datas.length; i++) {
                        total += datas[i].value;
                        if (name === datas[i].name) {
                            tarValue = datas[i].value;
                        }
                    }
                    var p = ((tarValue / total) * 100).toFixed(2);
                    return (
                        '{name| ' +
                        name +
                        '}  ' +
                        '{value| ' +
                        p +
                        '%} ' +
                        '{count| ' +
                        tarValue.toLocaleString()+
                        '}'
                    );
                }
            },
            // 图表颜色配置项
            color: ["#81D3F8", "#80FFFF", "#CAF982", "#FFFF80", "#FACD91", "#EC808D"],

            series: [
                {
                    type: "pie",
                    radius: ["45%", "95%"], //内半径 外半径
                    center: ["30%", "52%"],
                    // avoidLabelOverlap: false,
                    label: {
                        show: true,
                        position: "inside", // 设置标签位置为外部
                        formatter: "{d}%",
                        textStyle: {
                            fontSize: 12,
                            fontFamily: "Arial", // 设置字体样式
                            color: "black", // 设置字体颜色
                            // fontStyle: "italic", // 设置字体风格，比如斜体
                            fontWeight: "bold", // 设置字体粗细
                        },

                        // 设置标签显示内容为数据项的 name 值
                    },
                    emphasis: {
                        label: {
                            // 高亮时 中间的文字
                            show: true,
                            fontSize: 15,
                            fontWeight: "bold",
                        },
                    },
                    labelLine: {
                        show: true,
                    },
                    itemStyle: {
                        borderColor: 'white', // 扇形边框颜色，即白色分隔线
                        borderWidth: 1 // 扇形边框宽度
                    },

                    data: [
                        { value: data1.value, name: "集微中行" },
                        { value: data2.value, name: "触悟农行" },
                        { value: data3.value, name: "百悟北新桥工行" },
                        { value: data4.value, name: "三生万数工行" },
                        { value: data5.value, name: "思空光大" },
                        { value: data6.value, name: "其他" },
                    ],

                },
            ],
        },
    });
    

    state.option && myChart.setOption(state.option);
    window.addEventListener("resize", function () {
        myChart.resize();
    });
    // myChart.on('click', function(params:any) {
    //     console.log(params,'1111');
        
   
    // });


   
};

let changeTime = (a, b) => {
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
let getData = () => {
    // console.log(timeLineVal.value[0],'ws');
    changeTime(timeLineVal.value[0], timeLineVal.value[1]);
    console.log(timeLineVal.value[0], timeLineVal.value[1], '555');


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
.middle{
    position: absolute;
    left:24%;
    top: 52.5%;
    z-index: 100;
    width: 5vw;
    // background-color: aqua;
    height: 5.5vh;
    font-weight:bold;
    letter-spacing: 1px;
    font-size: 0.8vw;
    font-family: sans-serif;
    font-style: italic;
    cursor: pointer;
    p{
        margin: 5px 7px;
        // margin-top: 10px;
        box-sizing: border-box;
        
    }
 
}
.middle:hover::before {
    content: '查看详情';
    position: absolute;
    top: 45px;
    /* 根据需要调整位置 */
    left: 10px;
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
    --el-date-editor-daterange-width: 185px;
}
/deep/.el-input__icon{
    display: none;
}

#all1 {
    box-sizing: border-box;
    width: 99%;
    // top: 1%;
    // left: 1%;
    margin: auto;
    height: 98%;
    position: relative;
    border: 2px solid rgb(184, 172, 172);
}

.title {
    color: black;
    // font-size: 1.5vh;
    font-size: 18px;
    font-weight: bold;
    position: relative;
    display: inline-block;
    height: 1.5rem;

    top: 5px;
    // left: 8px;
    // 文字间距
    letter-spacing: 1px;
    border-right: 2px solid #4080D4;
    /* 右侧边框 */
    border-top: 2px solid #4080D4;
    /* 上方边框 */
    border-bottom: 2px solid #4080D4;
    //   border: 1px solid #4080D4;
    border-top-right-radius: 10px;
    /* 设置右上角为10像素的圆角 */
    border-bottom-right-radius: 10px;

    /* 设置右下角为10像素的圆角 */
    // padding-bottom: 3px;
    .wenzi {

        position: relative;
        // top: 0.1rem;

    }


    .ball {
        width: 0.8rem;
        height: 0.8rem;
        border-radius: 50%;
        background-color: black;
        position: absolute;
        top: 0.4rem;
        left: 0.4rem;
        box-shadow: #4080D4;
        // margin: 2px;
        // border: 2px red solid;
    }
}


.chart {
    height: 25vh;
    width: 100%;
    position: relative;
    // top: 1vh;
}



.select {
    position: relative;
    left: 8vw;
    top: -20px;
    font-size: 0.8vw;
    // background-color: red;
    width: 25vw;
    height: 4vh;

}

.el-button {
    color: white;
    // width: 50px;
    // height: 30px;
    // position: relative;
    position: absolute;
    top: -0.1vh;
    
    left: 15vw;
    // margin-left: 1vw;
    padding: 0px 8px;
}
</style>