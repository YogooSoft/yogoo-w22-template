<template>
  <el-backtop
    target=".el-main"
    :right="100"
    :bottom="100"
    :visibility-height="500"
  ></el-backtop>

  <el-backtop target=".el-main" :bottom="100">
    <div
      style="
        height: 100%;
        width: 100%;
        background-color: var(--el-bg-color-overlay);
        box-shadow: 0 0 6px rgba(0, 0, 0, 0.12);
        text-align: center;
        line-height: 40px;
        color: #1989fa;
      "
    >
      UP
    </div>
  </el-backtop>

  <page-wrapper title="导出示例" content="根据JSON格式的数据进行导出">
    <collapse-container
      class="cl-mb-10"
      title="基础用法"
      :can-expan="false"
      help-message="基础用法"
    >
      <div class="top-1">
        <el-alert
          title="滑动页面即可看到右下方的按钮。按钮为默认按钮图标，滚动高度到达500时显示返回顶部图标"
          type="info"
          show-icon
        />
        <br />
        <span>
          <table class="demo-typo-size">
            <tbody>
              <tr>
                <td width="150px">参数</td>
                <td width="250px">说明</td>
                <td width="150px">类型</td>
                <td width="300px">默认值</td>
              </tr>
              <tr>
                <td>target</td>
                <td>触发滚动的对象</td>
                <td>string</td>
                <td>需指定滚动区域的class或id</td>
              </tr>
              <tr>
                <td>visibility-height</td>
                <td>滚动高度达到此参数值才出现</td>
                <td>number</td>
                <td>200</td>
              </tr>
              <tr>
                <td>right</td>
                <td>控制其显示位置, 距离页面右边距</td>
                <td>number</td>
                <td>40</td>
              </tr>
              <tr>
                <td>bottom</td>
                <td>控制其显示位置, 距离页面底部距离</td>
                <td>number</td>
                <td>40</td>
              </tr>
            </tbody>
          </table>
        </span>
      </div>
    </collapse-container>
    <collapse-container
      class="cl-mb-10"
      title="自定义显示内容"
      :can-expan="false"
      help-message="自定义显示内容。"
    >
      <div class="top-2">
        <el-alert
          title="显示区域被固定为 40px * 40px 的区域, 其中的内容可支持自定义。"
          type="info"
          show-icon
        />
        <br />
        <span>
          <table class="demo-typo-size">
            <tbody>
              <tr>
                <td width="150px">参数</td>
                <td width="250px">说明</td>
                <td width="150px">类型</td>
                <td width="300px">默认值</td>
              </tr>
              <tr>
                <td>target</td>
                <td>触发滚动的对象</td>
                <td>string</td>
                <td>需指定滚动区域的class或id</td>
              </tr>
              <tr>
                <td>visibility-height</td>
                <td>滚动高度达到此参数值才出现</td>
                <td>number</td>
                <td>200</td>
              </tr>
              <tr>
                <td>right</td>
                <td>控制其显示位置, 距离页面右边距</td>
                <td>number</td>
                <td>40</td>
              </tr>
              <tr>
                <td>bottom</td>
                <td>控制其显示位置, 距离页面底部距离</td>
                <td>number</td>
                <td>40</td>
              </tr>
            </tbody>
          </table>
        </span>
      </div>
    </collapse-container>

    <collapse-container
      class="cl-mb-10"
      title="请向下滑动,查看返回顶部效果"
      :can-expan="false"
      help-message=""
    >
      <div class="top-3">
        <!--        <el-icon :size="100" color="#1989fa">-->
        <!--          <Bottom/>-->
        <!--        </el-icon>-->
        <!--        <br>-->

        <yui-table
          :style="{ width: '100%' }"
          :rowData="
            rowData.length > 0
              ? rowData.slice(
                  (controlAtrr['pageObj']['pageData']['page'] - 1) *
                    controlAtrr['pageObj']['pageData']['size'],
                  controlAtrr['pageObj']['pageData']['page'] *
                    controlAtrr['pageObj']['pageData']['size']
                )
              : ''
          "
          :headerData="headerData"
          :controlAtrr="controlAtrr"
          :header_cell_style="{ 'text-align': 'center' }"
          :cell_style="{ 'text-align': 'center' }"
          :load_staus="load_staus"
          :table_size="elTableClass"
          :border="true"
          :stripe="true"
          @handleSizeChange="handleSizeChangeT1"
          @handleCurrentChange="handleCurrentChangePageT1"
        >
          <template #age>
            <el-table-column
              prop="age"
              label="年龄"
              sortable="age_num"
              width="100"
            >
              <template #default="scope">
                <span slot-scope="scope">{{ scope.row["age"] }}</span>
              </template>
            </el-table-column>
          </template>
        </yui-table>
      </div>
    </collapse-container>
  </page-wrapper>
</template>

<script lang="ts">
import { defineComponent, computed, ref, unref, toRefs, reactive } from "vue";
import { PageWrapper } from "@/components/Page";
import { CollapseContainer } from "@/components/Container/index";
import { useCssVar } from "@vueuse/core";

// 引入yui-table组件
import { YuiTable } from "@/components/Table/index";
// 引入yui-table大小样式组件
import { yuiTableClass } from "@/enums/tableEnum";

import { GetTableData } from "@/api/tableData";

export default defineComponent({
  name: "demoBasic",
  components: { CollapseContainer, PageWrapper, YuiTable },

  data() {
    return {
      // 是否显示加载状态 true/false
      load_staus: false,
      // 是否显示加载状态 true/false
      elTableClass: yuiTableClass.ExtraSmall,
      // 控制类组件属性
      controlAtrr: {},
      //行数据属性
      rowData: [],
      //表头属性
      headerData: [],
    };
  },
  methods: {
    // 表1 分页
    // 页码变化
    handleCurrentChangePageT1(e) {
      // 接收页码变化 及后续操作
      console.log("点击页码：", e);
      this.controlAtrr["pageObj"]["pageData"]["page"] = e;
    },
    // 条数变化
    handleSizeChangeT1(e) {
      // 接收条数变化 及后续操作
      console.log("选择页大小：", e);
      this.controlAtrr["pageObj"]["pageData"]["size"] = e;
    },
  },

  mounted() {
    // 控制显示table加载中动效
    this.load_staus = true;

    // 获取表1数据
    GetTableData("userid").then((res: any) => {
      if (res.meta.code == "0") {
        this.rowData = res.data.rowData;
        this.headerData = res.data.headerData;
        this.controlAtrr = res.data.controlAtrr;
        this.controlAtrr["pageObj"]["pageData"]["size"] = 50;
        // 控制关闭table加载中动效
        this.load_staus = false;
        //
      }
    });
  },

  setup(props) {},
});
</script>

<style lang="less" scoped>
.cl-mb-10 {
  margin-bottom: 10px;
}

.cl-mb-10-top {
  margin-top: 10px;
}

.grid-content {
  border-radius: 4px;
  min-height: 26px;
  background-color: red;
}

.demo-typo-size td {
  padding: 5px 0;
}
</style>
