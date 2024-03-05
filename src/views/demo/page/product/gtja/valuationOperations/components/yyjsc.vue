<template>
  <div class="yyjsc-info">
    <div class="title_box">
      <span class="title_box_span">运营驾驶舱</span>

      <el-button
        v-if="check_button == '产品概况'"
        class="top_line_button"
        size="small"
        type="primary"
        @click="button_check('产品概况')"
        >产品概况</el-button
      >
      <el-button
        v-else
        class="top_line_button"
        size="small"
        @click="button_check('产品概况')"
        >产品概况</el-button
      >

      <el-button
        v-if="check_button == 'T交易'"
        class="top_line_button"
        size="small"
        type="primary"
        @click="button_check('T交易')"
        >T交易</el-button
      >
      <el-button
        v-else
        class="top_line_button"
        size="small"
        @click="button_check('T交易')"
        >T交易</el-button
      >

      <el-button
        v-if="check_button == '估值进度'"
        class="top_line_button"
        size="small"
        type="primary"
        @click="button_check('估值进度')"
        >估值进度</el-button
      >
      <el-button
        v-else
        class="top_line_button"
        size="small"
        @click="button_check('估值进度')"
        >估值进度</el-button
      >

      <el-button
        v-if="check_button == '信息披露'"
        class="top_line_button"
        size="small"
        type="primary"
        @click="button_check('信息披露')"
        >信息披露</el-button
      >
      <el-button
        v-else
        class="top_line_button"
        size="small"
        @click="button_check('信息披露')"
        >信息披露</el-button
      >

      <el-button
        v-if="check_button == '划款指令'"
        class="top_line_button"
        size="small"
        type="primary"
        @click="button_check('划款指令')"
        >划款指令</el-button
      >
      <el-button
        v-else
        class="top_line_button"
        size="small"
        @click="button_check('划款指令')"
        >划款指令</el-button
      >

      <el-icon :size="20" style="float: right">
        <Operation />
      </el-icon>
    </div>
    <div class="content_box" v-if="check_button == '产品概况'">
      <div class="status_box" style="border: 1px solid #409eff">
        <div class="status_box_title">
          <sapn class="status_box_content">待上线：</sapn>
          <span class="status_box_content" style="color: #409eff">1</span>
        </div>
        <div>
          <span style="color: #818485; font-size: 12px">已募集：</span>
          <span style="color: #f7c56e; font-size: 12px">0.00</span>&nbsp;
          <span style="color: #818485; font-size: 12px">元</span>
        </div>
      </div>
      <div class="status_box" style="border: 1px solid #67c23a">
        <div class="status_box_title">
          <sapn class="status_box_content">运作中：</sapn>
          <span class="status_box_content" style="color: #67c23a">1</span>
        </div>
        <div>
          <span style="color: #818485; font-size: 12px">存续规模：</span>
          <span style="color: #f7c56e; font-size: 12px">200.40</span>&nbsp;
          <span style="color: #818485; font-size: 12px">元</span>
        </div>
      </div>
      <div class="status_box" style="border: 1px solid #e6a23c">
        <div class="status_box_title">
          <sapn class="status_box_content" style="">清盘中：</sapn>
          <span class="status_box_content" style="color: #e6a23c">0</span>
        </div>
        <div>
          <span></span>
          <span></span>&nbsp;
          <span></span>
        </div>
      </div>
      <div class="status_box" style="border: 1px solid #909399">
        <div class="status_box_title">
          <sapn class="status_box_content">已清盘：</sapn>
          <span class="status_box_content" style="color: #909399">0</span>
        </div>
        <div>
          <span></span>
          <span></span>&nbsp;
          <span></span>
        </div>
      </div>
      <el-divider />
      <span style="font-size: 14px">产品名称：</span>
      <el-select
        v-model="value1"
        collapse-tags
        collapse-tags-tooltip
        placeholder="选择产品"
        style="width: 400px"
      >
        <el-option
          v-for="item in options1"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-steps
        :active="active"
        align-center
        finish-status="success"
        style="margin-top: 10px"
      >
        <el-step title="产品准备" />
        <el-step title="产品募集" />
        <el-step title="成立备案" />
        <el-step title="产品运作" />
        <el-step title="产品清算" />
      </el-steps>
      <el-divider />
      <div
        class="menu_box"
        style="border: 1px solid #dcdfe6; padding: 10px; text-align: left"
      >
        <div class="menu_box_1">
          <!-- <div class="t_right"></div> -->
          <span class="menu_box_title"> 账户服务</span>

          <el-button class="menu_box_button" size="small" type="primary"
            >账户流水查询</el-button
          >
          <el-button class="menu_box_button" size="small" type="primary"
            >账户余额查询</el-button
          >
          <el-button class="menu_box_button" size="small" type="primary"
            >证券户开户</el-button
          >
          <el-button class="menu_box_button" size="small" type="primary"
            >三方挂接</el-button
          >
          <el-button class="menu_box_button" size="small" type="primary"
            >产品账户管理</el-button
          >
        </div>
        <div class="menu_box_2">
          <!-- <div class="t_right"></div> -->
          <span class="menu_box_title"> 估值服务</span>

          <el-button class="menu_box_button" size="small" type="primary"
            >估值表</el-button
          >
          <el-button class="menu_box_button" size="small" type="primary"
            >净值查询</el-button
          >
          <el-button class="menu_box_button" size="small" type="primary"
            >资产负债表</el-button
          >
          <el-button class="menu_box_button" size="small" type="primary"
            >利润表</el-button
          >
          <el-button class="menu_box_button" size="small" type="primary"
            >净资产变动表</el-button
          >
          <el-button class="menu_box_button" size="small" type="primary"
            >场外投资管理</el-button
          >
        </div>
      </div>
    </div>
    <div class="content_box" v-if="check_button == 'T交易'">
      <div
        class="ld_box"
        style="border: 1px solid #409eff; border-left: 3px solid #409eff"
      >
        <div style="margin-bottom: 5px; margin-top: 10px">
          <sapn style="font-size: 14px; font-weight: bold">募集户未录单</sapn>
        </div>
        <div style="margin-top: 10px">
          <span style="color: #409eff; font-size: 12px; font-weight: bold"
            >0.00</span
          >&nbsp;
          <span style="color: #818485; font-size: 12px">万元</span>
        </div>
        <el-icon
          ><Right
            style="
              position: absolute;
              color: #409eff;
              left: 258px;
              bottom: 18px;
              font-size: 22px;
            "
        /></el-icon>
      </div>

      <div
        class="ld_box"
        style="border: 1px solid #67c23a; border-left: 3px solid #67c23a"
      >
        <div style="margin-bottom: 5px; margin-top: 10px">
          <sapn style="font-size: 14px; font-weight: bold">募集户未录单</sapn>
        </div>
        <div style="margin-top: 10px">
          <span style="color: #409eff; font-size: 12px; font-weight: bold"
            >0个</span
          >&nbsp;
          <span style="color: #818485; font-size: 12px">产品</span>
        </div>
        <el-icon
          ><Right
            style="
              position: absolute;
              color: #67c23a;
              left: 258px;
              bottom: 18px;
              font-size: 22px;
            "
        /></el-icon>
      </div>

      <div style="margin-top: 20px; margin-bottom: 10px">2023年09月22日</div>

      <div style="text-align: center">
        <div class="chart_box" style="width: 314px; height: 250px">
          <category-ratio />
        </div>
        <div
          class="chart_box"
          style="margin-left: 10px; width: 314px; height: 250px"
        >
          <category-ratio2 />
        </div>
      </div>

      <div id="TAc1" width="400" height="300" class="canvas"></div>
    </div>
    <div class="content_box" v-if="check_button == '估值进度'">
      <span>进度日期</span>&nbsp;&nbsp;&nbsp;&nbsp;
      <el-date-picker v-model="value4" type="date" style="width: 140px" />
      <br />
      <br />
      <div style="text-align: center">
        <div class="chart_box" style="height: 289px; width: 48%">
          <span class="chart_box_gz_span"
            >估值表确认完成率<span style="color: #909399"
              >(2023年09月21日)</span
            ></span
          >
          <el-progress
            class="chart_box_gz_progress"
            type="circle"
            stroke-width="20"
            :percentage="100"
          />

          <div>
            <el-progress
              class="chart_box_gz_progress_min"
              type="circle"
              stroke-width="10"
              :percentage="100"
              :width="60"
            />
          </div>
          <span class="chart_box_gz_progress_min_span">2023年09月20日</span>

          <!-- <gz-ratio /> -->
        </div>
        <div
          class="chart_box"
          style="margin-left: 10px; border: unset; height: 289px; width: 48%"
        >
          <div
            class="jd_box"
            style="
              display: inline-block;
              float: left;
              padding: 20px 20px 20px 10px;
              width: 100%;
              border: 1px solid #e6e8ee;
            "
          >
            <span style="float: left">必处理估值待办未完成</span>
            <span style="float: right; margin-left: 10px">条</span>
            <span style="color: #409eff; float: right; font-weight: bold"
              >0</span
            >
          </div>

          <div class="jd_box">
            <span style="float: left">估值材料准备中</span><br />
            <el-progress :percentage="0" />
          </div>
          <div class="jd_box">
            <span style="float: left">估值财务处理中</span><br />
            <el-progress :percentage="0" />
          </div>
          <div class="jd_box">
            <span style="float: left">估值对账中</span><br />
            <el-progress :percentage="0" />
          </div>
          <div class="jd_box">
            <span style="float: left">估值已确认</span><br />
            <el-progress :percentage="100" />
          </div>
        </div>
      </div>

      <div id="TAc1" width="400" height="300" class="canvas"></div>
    </div>

    <div class="content_box" v-if="check_button == '信息披露'">
      <div class="xxpl_box">
        <el-icon :size="50" style="color: #999999; margin-bottom: 10px"
          ><Box
        /></el-icon>
        <br />
        <span>暂无数据</span>
      </div>
    </div>

    <div class="content_box" v-if="check_button == '划款指令'">
      <span>要求划款日期</span>&nbsp;&nbsp;&nbsp;&nbsp;
      <el-date-picker
        v-model="value5"
        type="daterange"
        start-placeholder="开始日期"
        end-placeholder="截止日期"
        :default-value="[new Date(2023, 9, 1), new Date(2023, 10, 1)]"
      />
      &nbsp;&nbsp;&nbsp;&nbsp;
      <div class="re_box" style="display: inline-block">
        <el-icon
          color="#409EFF"
          style="
            font-size: 14px;
            float: left;
            margin-top: -2px;
            margin-right: 5px;
          "
          ><Refresh
        /></el-icon>
        <!-- <el-link style="margin-right: 10px" type="primary">刷新一下</el-link> -->
        <span>刷新一下</span>&nbsp;&nbsp;&nbsp;&nbsp;
      </div>

      <br />
      <div class="zl_box">
        <div
          class="zl_title"
          style="
            border-bottom: 1px solid #dcdfe6;
            height: 35px;
            padding: 0 10px 0 10px;
            line-height: 35px;
          "
        >
          <span style="float: left">待提交指令数</span>
          <span style="float: right">0 笔</span>
        </div>

        <div class="zl_content_line">
          <span style="float: left">网下新股快捷指令</span>
          <span style="float: right">0 笔</span>
        </div>
        <div class="zl_content_line">
          <span style="float: left">TA指令</span>
          <span style="float: right">0 笔</span>
        </div>
        <div class="zl_content_line">
          <span style="float: left">半自动扣费指令</span>
          <span style="float: right">0 笔</span>
        </div>
      </div>

      <div
        class="zl_box"
        style="width: 250px; border: 1px solid #dcdfe6; display: inline-block"
      >
        <div class="zl_title">
          <span style="float: left">未完成指今教</span>
          <span style="float: right">0 笔</span>
        </div>

        <div class="zl_content_line">
          <span style="float: left">管理人处理中(待复核/待审核)</span>
          <span style="float: right">0 笔</span>
        </div>
        <div class="zl_content_line">
          <span style="float: left">管理人处理中(追加附件)</span>
          <span style="float: right">0 笔</span>
        </div>
        <div class="zl_content_line">
          <span style="float: left">管理人处理中(指令已挂起)</span>
          <span style="float: right">0 笔</span>
        </div>
      </div>

      <div class="zl_box">
        <div class="zl_title">
          <span style="float: left">已完成指令数</span>
          <span style="float: right">0 笔</span>
        </div>

        <div class="zl_content_line">
          <span style="float: left">划款成功</span>
          <span style="float: right">0 笔</span>
        </div>
        <div class="zl_content_line">
          <span style="float: left">指令已撤销</span>
          <span style="float: right">0 笔</span>
        </div>
      </div>

      <br />
      <div
        class="zl_box"
        style="
          height: 200px;
          width: 670px;
          border: 1px solid #dcdfe6;
          display: inline-block;
        "
      >
        <div class="zl_title">
          <span style="float: left">指令分布图</span>
        </div>
        <div style="width: 40%; float: left; margin-top: 31px">
          <el-progress
            type="circle"
            stroke-width="10"
            :percentage="100"
            :width="80"
            style="margin-bottom: 10px"
          />
          <br />
          <span>指令完成进度</span>
        </div>

        <div
          style="
            width: 60%;
            height: 143px;
            border-left: 1px solid #dcdfe6;
            float: right;
            margin-top: 10px;
            margin-bottom: 10px;
          "
        >
          <hk-ratio />
        </div>
      </div>

      <el-divider />

      <div id="TAc1" width="400" height="300" class="canvas"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRootSetting } from "@/hooks/setting/useRootSetting";
import { reactive, ref, onMounted, watch } from "vue";
import * as echarts from "echarts";
const active = ref(3);
const { getIsCollapse } = useRootSetting();
import { GetDWJZEchartsData } from "@/api/gtjaData";
import CategoryRatio from "./category-ratio.vue";
import CategoryRatio2 from "./category-ratio2.vue";

import HkRatio from "./hk-ratio.vue";

import { ElDescriptions, ElDescriptionsItem, ElTag } from "element-plus";

let check_button = ref("产品概况");
let value1 = ref(1);
let value4 = ref("");
let value5 = ref("");
let options1 = ref([
  {
    value: 0,
    label: "YGD001_悦宏吉庆有余1号私募证券投资基金",
  },
  {
    value: 1,
    label: "SZD813_悦宏吉庆有余2号私募证券投资基金",
  },
  {
    value: 2,
    label: "YGD001_悦宏吉庆有余3号私募证券投资基金",
  },
]);
const echartData = reactive({
  pop: {
    xData: [],
    series1: [],
    series2: [],
    series3: [],
  },
});
function button_check(name) {
  check_button.value = name;
}

function chartsBtn() {
  GetDWJZEchartsData("userid").then((res: any) => {
    res = res.data.data;
    echartData["pop"]["xData"] = res.dates;
    echartData["pop"]["series1"] = res.int_list;
    var chartDom = document.getElementById("dc3") as HTMLDivElement;
    chartDom.removeAttribute("_echarts_instance_");
    let myChart = echarts.init(chartDom) as any;
    // myChart = echarts.init(chartDom);

    //图表自适应屏幕
    setTimeout(function () {
      window.addEventListener("resize", function () {
        myChart.resize();
      });
    }, 500);
  });
}
watch(getIsCollapse, (newQuestion, oldQuestion) => {
  setTimeout(() => {
    chartsBtn();
  }, 300);
});
onMounted(() => {
  // chartsBtn();
});
</script>

<style lang="less" scoped>
.zl_title {
  border-bottom: 1px solid #dcdfe6;
  height: 35px;
  padding: 0 10px 0 10px;
  line-height: 35px;
}
.chart_box_gz_progress_min_span {
  font-weight: bold;
  float: left;
  margin-top: 262px;
  margin-left: -289px;
}
.chart_box_gz_progress_min {
  float: left;
  margin-top: 190px;
  margin-left: -268px;
}
.chart_box_gz_progress {
  float: left;
  margin-top: 60px;
  margin-left: -28px;
}
.chart_box_gz_span {
  font-weight: bold;
  float: left;
  margin-top: 10px;
  margin-left: 10px;
}
.status_box_content {
  font-size: 14px;
  font-weight: bold;
}
.status_box_title {
  margin-bottom: 5px;
}
.title_box_span {
  font-size: 16px;
  font-weight: bold;
  display: inline-block;
  float: left;
  margin-top: 4px;
  margin-right: 20px;
}
.zl_box {
  height: 140px;
  width: 200px;
  border: 1px solid #dcdfe6;
  display: inline-block;
  margin: 10px 10px 10px 0;
}
.zl_content_line {
  height: 30px;
  padding: 0 10px 0 10px;
  line-height: 30px;
  color: #909399;
}
.jd_box {
  margin-bottom: 10px;
  display: inline-block;
  float: left;
  padding: 10px;
  width: 100%;
  border: 1px solid #e6e8ee;
}
.chart_box2 {
  width: 200px;
  height: 80px;
  text-align: center;
  border: 1px solid #e6e8ee;
  display: inline-block;
}
.chart_box {
  width: 500px;
  height: 350px;
  text-align: center;
  border: 1px solid #e6e8ee;
  display: inline-block;
}
.content_box {
  width: 100%;
  padding: 15px;
  text-align: center;
}
.menu_box_title {
  margin-top: 6px;
  margin-left: 6px;
  padding-left: 5px;

  width: 100px;
  height: 18px;

  border-top: 4px solid transparent;
  border-bottom: 4px solid transparent;
  border-left: 5px solid #409eff;
  display: inline-block;
  // float: left;
  // margin-top: 3px;
}
.menu_box_button {
  // float: left;
}
.t_right {
  width: 0;
  height: 16px;

  border-top: 4px solid transparent;
  border-bottom: 4px solid transparent;
  border-left: 5px solid;
  display: inline-block;
  // float: left;
  margin-top: 3px;
}
.ld_box {
  display: inline-block;
  width: 310px;
  height: 80px;

  border-radius: 2px;
  padding: 10px;
  margin-right: 10px;
  text-align: left;
}
.status_box {
  display: inline-block;
  width: 150px;
  height: 55px;
  border: 1px solid #409eff;
  border-radius: 2px;
  padding: 10px;
  margin-right: 10px;
}
.title_box {
  background-color: white;
  padding: 15px;
  border-bottom: 1px solid #ebeef5;
}

.yyjsc-info {
  &__cop {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 38px;

    li {
      display: flex;
      list-style: none;
      flex: 1;
      color: #606266;

      .fall,
      .rise {
        display: flex;
        align-items: center;
        margin-left: 10px;
      }

      .fall {
        color: #13ae7c;
      }

      .rise {
        color: #f21e37;
      }
    }
  }
}
.top_line_button {
  font-size: 14px;
}
</style>
