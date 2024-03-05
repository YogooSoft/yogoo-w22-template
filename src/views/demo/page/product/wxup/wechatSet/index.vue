<template>
  <page-wrapper title="" content="">
    <div style="margin-bottom: 10px">
      <span>公众号名称：</span>

      <el-input
        v-model="value1"
        placeholder="公众号名称"
        style="width: 120px"
      />
      &nbsp;&nbsp;&nbsp;&nbsp;
      <span>公众号类型：</span>
      <el-select
        v-model="value2"
        collapse-tags
        collapse-tags-tooltip
        placeholder="选择公众号类型"
        style="width: 150px"
      >
        <el-option
          v-for="item in options1"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>

      &nbsp;&nbsp;&nbsp;&nbsp;
      <span>公众号状态：</span>
      <el-select
        v-model="value3"
        collapse-tags
        collapse-tags-tooltip
        placeholder="选择状态"
        style="width: 120px"
      >
        <el-option
          v-for="item in options2"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>

      <el-button
        class="top_line_button"
        :icon="CirclePlus"
        type="primary"
        @click="openTargetModal(1)"
        >添加</el-button
      >
      <el-button
        v-if="show_type"
        class="top_line_button"
        :icon="Edit"
        type="primary"
        @click="send()"
        >修改</el-button
      >
      <el-button
        v-if="show_type"
        class="top_line_button"
        :icon="SetUp"
        type="primary"
        @click="sendStatus"
        >设置状态</el-button
      >
      <el-button
        class="top_line_button"
        :icon="Search"
        type="primary"
        @click="GetWxupWechatListDataFun"
        >查询</el-button
      >
      <el-switch
        v-model="show_type"
        class="mb-2"
        style="float: right"
        active-text="列表模式"
        inactive-text="卡片模式"
      />
    </div>

    <!-- 列表模式 -->
    <yui-table
      v-if="show_type"
      :load_staus="load_staus"
      :border="true"
      :table_size="elTableClass"
      :rowData="
        tableData.length > 0
          ? tableData.slice(
              (controlAtrr['pageObj']['pageData']['page'] - 1) *
                controlAtrr['pageObj']['pageData']['size'],
              controlAtrr['pageObj']['pageData']['page'] *
                controlAtrr['pageObj']['pageData']['size']
            )
          : ''
      "
      :headerData="headerData"
      :controlAtrr="controlAtrr"
      :highlight_current_row="true"
      style="width: 100%"
      @current-change="handleCurrentChange"
    >
      <template #status_zh>
        <el-table-column
          prop="status_zh"
          label="状态"
          width="100"
          align="center"
        >
          <template #default="scope">
            <el-tag
              v-if="scope.row['status_zh'] == '删除'"
              key="删除"
              type="danger"
              effect="dark"
            >
              删除
            </el-tag>
            <el-tag
              v-if="scope.row['status_zh'] == '停止'"
              key="停止"
              type="warning"
              effect="dark"
            >
              停止
            </el-tag>
            <el-tag
              v-if="scope.row['status_zh'] == '启动'"
              key="启动"
              type=""
              effect="dark"
            >
              启动
            </el-tag>
            <!-- 
          <span
            class="row_span"
            style="background: #f66d6d"
            slot-scope="scope"
            >{{ scope.row["status_zh"] }}</span
          > -->
            <!-- <span
            class="row_span"
            v-if="scope.row['status_zh'] == '停止'"
            style="background: #f39c12"
            slot-scope="scope"
            >{{ scope.row["status_zh"] }}</span
          > -->
            <!-- <span
            class="row_span"
            v-if="scope.row['status_zh'] == '启动'"
            style="background: #409eff"
            slot-scope="scope"
            >{{ scope.row["status_zh"] }}</span
          > -->
          </template>
        </el-table-column>
      </template>

      <template #access_token_status_zh>
        <el-table-column
          prop="access_token_status_zh"
          label="凭证状态"
          width="150"
          align="center"
        >
          <template #default="scope">
            <el-tag
              v-if="scope.row['access_token_status_zh'] == '已失效'"
              key="已失效"
              type="danger"
              effect="dark"
            >
              已失效
            </el-tag>

            <el-tag
              v-if="scope.row['access_token_status_zh'] == '即将失效'"
              key="即将失效"
              type="warning"
              effect="dark"
            >
              即将失效
            </el-tag>

            <el-tag
              v-if="scope.row['access_token_status_zh'] == '正常'"
              key="正常"
              type=""
              effect="dark"
            >
              正常
            </el-tag>

            <!-- 
          <span
            class="row_span"
            v-if="scope.row['access_token_status_zh'] == '已失效'"
            style="background: #f66d6d"
            slot-scope="scope"
            >{{ scope.row["access_token_status_zh"] }}</span
          >
          <span
            class="row_span"
            v-if="scope.row['access_token_status_zh'] == '即将失效'"
            style="background: #f39c12"
            slot-scope="scope"
            >{{ scope.row["access_token_status_zh"] }}</span
          >
          <span
            class="row_span"
            v-if="scope.row['access_token_status_zh'] == '正常'"
            style="background: #409eff"
            slot-scope="scope"
            >{{ scope.row["access_token_status_zh"] }}</span
          > -->
          </template>
        </el-table-column>
      </template>

      <template #wechat_status_zh>
        <el-table-column
          prop="wechat_status_zh"
          label="认证状态"
          width="150"
          align="center"
        >
          <template #default="scope">
            <el-tag
              v-if="scope.row['wechat_status_zh'] == '过期'"
              key="过期"
              type="danger"
              effect="dark"
            >
              过期
            </el-tag>

            <el-tag
              v-if="scope.row['wechat_status_zh'] == '即将过期'"
              key="即将过期"
              type="warning"
              effect="dark"
            >
              即将过期
            </el-tag>

            <el-tag
              v-if="scope.row['wechat_status_zh'] == '正常'"
              key="正常"
              type=""
              effect="dark"
            >
              正常
            </el-tag>

            <!-- 
          <span
            class="row_span"
            v-if="scope.row['wechat_status_zh'] == '过期'"
            style="background: #f66d6d"
            slot-scope="scope"
            >{{ scope.row["wechat_status_zh"] }}</span
          >
          <span
            class="row_span"
            v-if="scope.row['wechat_status_zh'] == '即将过期'"
            style="background: #f39c12"
            slot-scope="scope"
            >{{ scope.row["wechat_status_zh"] }}</span
          >
          <span
            class="row_span"
            v-if="scope.row['wechat_status_zh'] == '正常'"
            style="background: #409eff"
            slot-scope="scope"
            >{{ scope.row["wechat_status_zh"] }}</span
          > -->
          </template>
        </el-table-column>
      </template>
    </yui-table>

    <div
      class="task-list"
      :class="{ 'is-mini': browser.isMini }"
      v-if="show_type === false"
    >
      <div class="list">
        <div
          v-for="(item, index) in tableData"
          :key="index"
          class="item"
          @click=""
        >
          <p class="name">
            {{ item.name }}[{{ item.type_zh }}]
            <el-tag
              v-if="item.status_zh == '删除'"
              key="xxxxx"
              type="danger"
              class="mx-1"
              effect="dark"
            >
              {{ item.status_zh }}
            </el-tag>
            <!-- <span
            class="row_span"
           
            style="background: #f66d6d; float: right"
            >{{ item.status_zh }}</span
          >-->

            <el-tag
              v-if="item.status_zh == '停止'"
              key="xxxxx"
              type="warning"
              class="mx-1"
              effect="dark"
            >
              {{ item.status_zh }}
            </el-tag>

            <el-tag
              v-if="item.status_zh == '启动'"
              key="xxxxx"
              type=""
              class="mx-1"
              effect="dark"
            >
              {{ item.status_zh }}
            </el-tag>

            <!-- <span
            class="row_span"
            v-if="item.status_zh == '停止'"
            style="background: #f39c12; float: right"
            >{{ item.status_zh }}</span
          >
          <span
            class="row_span"
            v-if="item.status_zh == '启动'"
            style="background: #409eff; float: right"
            >{{ item.status_zh }}</span
          > -->
          </p>

          <ul class="cop">
            <li>
              <span>微信账号：{{ item.account }}</span>
            </li>
          </ul>
          <ul class="cop">
            <li>
              <span>凭证状态：{{ item.access_token_status_zh }}</span>
            </li>

            <li>
              <span>认证状态：{{ item.wechat_status_zh }}</span>
            </li>
          </ul>

          <div class="status">
            <el-icon class="edit" @click="card_edit(item)">
              <Edit />
            </el-icon>
            <!-- 
          <el-tag
            disable-transitions
            effect="dark"
            type="success"
            @click="card_edit(item)"
            >编辑1</el-tag
          > -->
            <template v-if="item.status_zh == '启动'">
              <el-icon class="pause" @click="wechat_stop" title="点击停止">
                <video-pause />
              </el-icon>
            </template>

            <template v-if="item.status_zh == '停止'">
              <el-icon class="play" @click="wechat_run" title="点击启动">
                <video-play />
              </el-icon>
            </template>
            <div style="width: 300px"></div>
            <el-icon class="log" @click="card_detail(item)" title="详情">
              <tickets />
            </el-icon>
            <el-icon class="delete" @click="wechat_del">
              <delete />
            </el-icon>
          </div>
        </div>
      </div>
    </div>

    <component
      :is="currentModal"
      v-model:visible="modalVisible"
      :wechatUpdateData="wechatUpdateData"
    />
    <WeChatAddForm @register="register1" />
    <WeChatUpdateForm @register="register2" />
    <WeChatDetailForm @register="register3" />
    <WeChatStatusForm @register="register4" />
  </page-wrapper>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from "vue";
import { PageWrapper } from "@/components/Page";
import { CollapseContainer } from "@/components/Container/index";
import { yuiTableClass } from "@/enums/tableEnum";
// 引入YuiTable
import { YuiTable } from "@/components/Table/index";

import { GetWxupWechatListData } from "@/api/wxupData";

import FileSaver from "file-saver";
import * as XLSX from "xlsx";
import { exportExcel } from "@/utils/helper/exportHelper";
import { ElMessage } from "element-plus";

import {
  Check,
  Delete,
  Edit,
  Message,
  Search,
  Star,
  Share,
  SetUp,
  CirclePlus,
} from "@element-plus/icons-vue";

import {
  shallowRef,
  ComponentOptions,
  nextTick,
  unref,
  toRefs,
  reactive,
} from "vue";

import { YuiWindowWrapper } from "@/components/Windows/index";
import { useModal } from "@/components/Windows/";
import WeChatAddForm from "./components/WeChatAddForm.vue";
import WeChatUpdateForm from "./components/WeChatUpdateForm.vue";
import WeChatDetailForm from "./components/WeChatDetailForm.vue";
import WeChatStatusForm from "./components/WeChatStatusForm.vue";

import { useModalInner } from "@/components/Windows";
import { useBrowser } from "@/hooks/web/useBrower";
import { messageBox } from "@/hooks/web/useMessageBox";
import { message } from "@/hooks/web/useMessage";

export default defineComponent({
  name: "demoDialog",
  components: {
    CollapseContainer,
    PageWrapper,
    YuiWindowWrapper,
    WeChatAddForm,
    WeChatUpdateForm,
    WeChatDetailForm,
    WeChatStatusForm,
    YuiTable,
  },
  data() {
    return {
      options1: [
        {
          value: 0,
          label: "全部",
        },
        {
          value: 1,
          label: "服务号",
        },
        {
          value: 2,
          label: "订阅号",
        },
      ],
      options2: [
        {
          value: 0,
          label: "全部",
        },
        {
          value: 1,
          label: "启动",
        },
        {
          value: 2,
          label: "停止",
        },
        {
          value: 3,
          label: "删除",
        },
      ],

      value1: "",
      value2: "",
      value3: "",
      show_type: true,
      value1_2: "",
      value2_2: "",
      value3_2: "",
      value4_2: "",
      elTableClass: "tableLineMedium",
      load_staus: false,
      radio2: "加载完成",
      radio: "中(默认)",
      tableData: [],
      headerData: [],
      controlAtrr: {},
      wechatAddForm: {},
      wechatAddFormVisible: false,

      // 无限滚动 样式
      count: 100,
      loading: false,
    };
  },
  methods: {
    // 启动微信
    wechat_run() {
      messageBox
        .confirm("您确认要启用吗？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "info",
        })
        .then(() => {
          message.success("启用成功");
        });
    },
    // 停止微信
    wechat_stop() {
      messageBox
        .confirm("您确认要关闭吗？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "info",
        })
        .then(() => {
          message.success("关闭成功");
        });
    },

    // 删除微信
    wechat_del() {
      messageBox
        .confirm("您确认要删除吗？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "info",
        })
        .then(() => {
          message.success("删除成功");
        });
    },
    change_loading() {
      if (this.radio2 == "加载中") {
        this.load_staus = true;
      } else if (this.radio2 == "加载完成") {
        this.load_staus = false;
      }
    },

    GetWxupWechatListDataFun() {
      GetWxupWechatListData("userid").then((res: any) => {
        if (res.meta.code == "0") {
          this.tableData = res.data.tableData;
          this.headerData = res.data.headerData;
          this.controlAtrr = res.data.controlAtrr;
          this.load_staus = false;

          console.log(this.tableData);
          console.log(this.headerData);
          console.log(this.controlAtrr);
        }
      });
    },
  },
  created() {},
  mounted() {
    this.load_staus = true;
    this.GetWxupWechatListDataFun();
  },

  setup(props) {
    const [register1, { openModal: openModal1 }] = useModal();
    const [register2, { openModal: openWeChatUpdateForm }] = useModal();
    const [register3, { openModal: openWeChatDetailForm }] = useModal();
    const [register4, { openModal: openWeChatStatusForm }] = useModal();

    const currentModal = shallowRef<Nullable<ComponentOptions>>(null);
    const modalVisible = ref<Boolean>(false);
    const wechatUpdateData = ref<any>(null);
    function send() {
      if (wechatUpdateData.value) {
        openWeChatUpdateForm(true, wechatUpdateData.value);
      } else {
        message.warning("请选择要编辑的公众号！");
      }
    }
    function senddetail() {
      openWeChatDetailForm(true, wechatUpdateData.value);
    }
    function sendStatus() {
      if (wechatUpdateData.value) {
        openWeChatStatusForm(true, wechatUpdateData.value);
      } else {
        message.warning("请选择要设置的公众号！");
      }
    }

    const handleCurrentChange = (val: undefined) => {
      console.log("===", val);
      wechatUpdateData.value = val;
      console.log("===2", wechatUpdateData.value);
    };

    function openTargetModal(index) {
      switch (index) {
        case 1:
          currentModal.value = WeChatAddForm;
          break;
        default:
          currentModal.value = WeChatAddForm;
          break;
      }
      nextTick(() => {
        // `useModal` not working with dynamic component
        // passing data through `userData` prop
        // open the target modal
        modalVisible.value = true;

        // console.log("-----userData.value-------", userData.value);
      });
    }

    function close() {
      console.log("-------------close----------------");
    }

    // 卡片列表
    const { browser } = useBrowser();

    let list = [
      {
        id: 2,
        createTime: "2021-03-10 14:25:53",
        updateTime: "2023-02-14 16:48:09",
        jobId: null,
        repeatConf: '{"jobId":2,"pattern":"0/5 * * * * ? ","count":1}',
        name: "cron任务，5秒执行一次",
        cron: "0/5 * * * * ? ",
        limit: null,
        every: null,
        remark: null,
        status: 0,
        startDate: null,
        endDate: null,
        data: null,
        service: "taskDemoService.test()",
        type: 1,
        nextRunTime: null,
        taskType: 0,
      },
      {
        id: 1,
        createTime: "2021-03-10 14:25:13",
        updateTime: "2023-02-14 15:53:00",
        jobId: null,
        repeatConf: '{"every":2000,"jobId":1,"count":1}',
        name: "每秒执行,总共5次",
        cron: null,
        limit: null,
        every: 2000,
        remark: null,
        status: 0,
        startDate: null,
        endDate: null,
        data: null,
        service: "taskDemoService.test()",
        type: 1,
        nextRunTime: null,
        taskType: 1,
      },
    ];

    function card_edit(item) {
      wechatUpdateData.value = item;
      send();
    }
    function card_detail(item) {
      wechatUpdateData.value = item;
      senddetail();
    }

    return {
      open,
      close,
      register1,
      register2,
      register3,
      register4,

      openModal1,
      currentModal,
      modalVisible,
      wechatUpdateData,
      openTargetModal,
      send,
      senddetail,
      sendStatus,
      card_edit,
      card_detail,

      Check,
      Delete,
      Edit,
      Message,
      Search,
      Star,
      Share,
      SetUp,

      CirclePlus,
      handleCurrentChange,

      list,
      browser,
    };
  },
});
</script>

<style lang="less" scoped>
.top_line_button {
  margin-left: 10px;
  margin-bottom: 2px;
}
.flex-1 {
  flex: 1;
}
.flex-2 {
  margin-bottom: 10px;
}

.cl-mb-10 {
  margin-bottom: 10px;
}
.cl-mb-10-top {
  margin-top: 10px;
}
.el-alert {
  margin-bottom: 10px;
}

.icon-size-menu {
  font-size: 16px;
  padding: 0px 10px;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
}

.tools {
  float: right;
  display: flex;
  border: none;
}
.flex-1 {
  flex: 1;
}

.flex-2 {
  margin-bottom: 10px;
}

.cl-mb-10 {
  margin-bottom: 10px;
}

.cl-mb-10-top {
  margin-top: 10px;
}

.el-alert {
  margin-bottom: 10px;
}
.row_span {
  color: #fff;
  display: inline-block;
  min-width: 40px;
  border-radius: 4px;
  text-align: center;
  padding-left: 5px;
  padding-right: 5px;
}
.mx-1 {
  float: right;
}

.flex-1 {
  flex: 1;
}
.flex-2 {
  margin-bottom: 10px;
}

.cl-mb-10 {
  margin-bottom: 10px;
}
.cl-mb-10-top {
  margin-top: 10px;
}
.el-alert {
  margin-bottom: 10px;
}

.infinite-list {
  height: 100%;
  padding: 0;
  margin: 0;
  list-style: none;
}
.infinite-list .infinite-list-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  background: var(--el-color-primary-light-9);
  margin: 10px;
  color: var(--el-color-primary);
}
.infinite-list .infinite-list-item + .list-item {
  margin-top: 10px;
}

.infinite-list-wrapper {
  height: 90%;
  text-align: center;
}
.infinite-list-wrapper .list {
  padding: 0;
  margin: 0;
  list-style: none;
}

.infinite-list-wrapper .list-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  background: var(--el-color-danger-light-9);
  color: var(--el-color-danger);
}
.infinite-list-wrapper .list-item + .list-item {
  margin-top: 10px;
}

.view-home {
  .card {
    background-color: #fff;
    border-radius: 5px;
    margin-bottom: 15px;
    font-size: 12px;
    letter-spacing: 0.5px;
    color: #000;

    &__header {
      display: flex;
      align-items: center;
      height: 30px;
      padding: 0 0px;

      .label {
        font-size: 12px;
      }

      .value {
        font-size: 18px;
        font-weight: bold;
        margin-left: 10px;
      }
    }
  }
}

.box-card {
  width: 220px;
  margin: 0px 10px 10px 0px;
  display: inline-block;
  float: left;
}

.task-list {
  height: 100%;
  background-color: var(--el-bg-color-page);
  .cop {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 38px;
  }
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
  .info_num {
    font-size: 24px;
    margin-bottom: 18px;
  }
  .info_unit {
    margin-bottom: 10px;
    margin-left: -5px;
    color: #818485;
  }

  .info_corner_desc {
    margin-bottom: 10px;
    margin-left: -5px;
    color: #dbddde;
  }
  .info_corner_num {
    margin-bottom: 10px;
  }

  .list {
    display: flex;
    flex-wrap: wrap;
    padding: 10px 10px 0 10px;
    box-sizing: border-box;
    background-color: inherit;

    .item {
      border: 1px solid var(--el-border-color-lighter);
      background-color: var(--el-bg-color);
      padding: 10px 10px 0 10px;
      border-radius: 4px;
      margin: 0 10px 10px 0;
      height: 163px;
      width: 300px;
      cursor: pointer;
      box-sizing: border-box;

      .name {
        font-size: 15px;
        font-weight: bold;
        margin-bottom: 10px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        line-height: 24px;
      }

      .row {
        margin-bottom: 10px;
        height: 40px;

        span {
          display: block;

          &:nth-child(1) {
            font-size: 12px;
            margin-bottom: 5px;
            color: var(--el-color-info);
          }

          &:nth-child(2) {
            font-size: 14px;
          }
        }
      }

      .status {
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-top: 1px solid var(--el-border-color-lighter);
        height: 40px;

        .el-icon {
          font-size: 32px;
          cursor: pointer;
          margin-left: 10px;
          padding: 5px;
          border-radius: 3px;

          &:hover {
            background-color: var(--el-border-color-lighter);
          }

          &.play {
            color: var(--el-color-primary);
          }

          &.pause {
            color: var(--el-color-danger);
          }

          &.log {
            color: var(--el-color-info);
          }

          &.delete {
            color: var(--el-color-info);
          }
        }
      }

      &:hover {
        background-color: var(--el-fill-color-lighter);
      }

      &.is-add {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        color: var(--el-color-info);

        .el-icon {
          font-size: 30px;
        }

        p {
          font-size: 13px;
          margin: 20px 0;
        }
      }
    }
  }

  &.is-mini {
    .item {
      width: 100%;
      margin: 0 0 15px 0;
    }
  }
}
.edit {
  margin-left: -6px !important;
}
.cop li span {
  color: #909399 !important;
}
</style>
