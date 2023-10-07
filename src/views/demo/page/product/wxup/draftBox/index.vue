<template>
  <div class="view-home">
    <div v-if="show_type === '0'" style="margin-bottom: 10px">
      <span>公众号选择：</span>
      <el-select
        v-model="value1"
        collapse-tags
        collapse-tags-tooltip
        placeholder="选择公众号"
        style="width: 150px"
        @change="GetWxupArticleDataFun"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>

      <el-button
        style="margin-left: 10px; margin-bottom: 2px"
        :icon="Search"
        type="primary"
        @click="GetWxupArticleDataFun"
        >查询</el-button
      >

      <el-button
        style="margin-left: 10px; margin-bottom: 2px"
        :icon="CirclePlus"
        type="primary"
        @click="article_create"
        >添加图文</el-button
      >
    </div>
    <div v-if="show_type === '1'" style="margin-bottom: 10px">
      <el-button
        style="margin-left: 10px; margin-bottom: 2px"
        :icon="ArrowLeftBold"
        type="primary"
        @click="GetWxupArticleDataFun"
        >返回</el-button
      >

      <el-input
        v-model="value2"
        placeholder="请输入OA流程号"
        style="width: 150px; margin-left: 10px"
      />

      <span class="wechat_name">{{ value1 }}</span>
    </div>
  </div>

  <div v-masonry class="container" v-if="show_type === '0'">
    <div
      v-masonry-tile
      v-for="(item, index) in articles"
      class="art_list"
      :key="index"
    >
      <div class="art_main">
        <img style="width: 250px" :src="item['cover_img']" alt="" />
        <a
          class="art_title"
          :title="item.title"
          href="http://www.baidu.com"
          target="_blank"
          >{{ item.title }}</a
        >
      </div>

      <div class="art_other" v-for="(item_other, index) in item.article_other">
        <a
          class="art_other_title"
          :title="item_other.title"
          href="http://www.baidu.com"
          >{{ item_other.title }}</a
        >
        <img
          style="width: 48px !important; height: 48px !important"
          :src="item_other['cover_img']"
          alt=""
        />
      </div>

      <div class="status">
        <span>更新于{{ item.update_time }}</span>
        <el-icon class="edit" @click="wechat_update(item)">
          <Edit />
        </el-icon>
        <el-icon class="Position" @click="card_detail(item)" title="推送">
          <Position />
        </el-icon>
        <el-icon class="delete" @click="wechat_del">
          <delete />
        </el-icon>
      </div>
    </div>
  </div>
  <!-- <article-list v-if="show_type === '0'" ref="ArticleListRef"></article-list>-->
  <div v-show="show_type === '1'">
    <article-create
      ref="ArticleCreateRef"
      :article_data="article_data"
      @getValue="getArticleCreateValue"
    ></article-create>
  </div>
</template>

<script lang="ts" setup>
import { Ref, ref, reactive } from "vue";
import {
  Search,
  Plus,
  CirclePlus,
  Edit,
  ArrowLeftBold,
  Notebook,
} from "@element-plus/icons-vue";

import { messageBox } from "@/hooks/web/useMessageBox";
import { message } from "@/hooks/web/useMessage";
import { GetWxupArticleData } from "@/api/wxupData";
import { onMounted } from "vue";
import ArticleList from "./components/article-list.vue";
import ArticleCreate from "./components/article-create.vue";

/*顶部筛选区域*/
let show_type = ref("0"); // 0文章列表页 1新建文章页

/*文章列表页面*/
const ArticleListRef = ref();
const ArticleCreateRef = ref();

let articles = ref([]);
let article_data = ref();
const value1 = ref("数据头等舱");
const value2 = ref("");
const options = [
  {
    value: "全部",
    label: "全部",
  },
  {
    value: "数据头等舱",
    label: "数据头等舱",
  },
  {
    value: "数据头等舱A1",
    label: "数据头等舱A1",
  },
  {
    value: "数据头等舱B1",
    label: "数据头等舱B1",
  },
  {
    value: "数据头等舱C1",
    label: "数据头等舱C1",
  },
];

function wechat_del() {
  messageBox
    .confirm("您确认要删除吗？", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "info",
    })
    .then(() => {
      message.success("删除成功");
    });
}

function GetWxupArticleDataFun() {
  show_type.value = "0";
  GetWxupArticleData("userid").then((res: any) => {
    if (res.meta.code == "0") {
      articles.value = res.data.data;

      console.log("======", articles);
    }
  });
}

/*新建文章页面*/

function article_create() {
  show_type.value = "1";
  ArticleCreateRef.value.articles_create_data("");
}

function wechat_update(item) {
  show_type.value = "1";
  console.log("==item==", item);
  article_data.value = item;
  var art_data = {
    title: "【1】行到水穷处 坐看云起时",
    auther: "小悦",
    cover_img_src: article_data.value["cover_img"],
    contents: "Hello W22！",
    remark: "备注",
    article_url: "www.baidu.com",
    LY_status: "否",
    LY_set: "",
  };

  ArticleCreateRef.value.articles_create_data(art_data);
}

const getArticleCreateValue = (value) => {
  show_type.value = "0";
};

onMounted(() => {
  GetWxupArticleDataFun();
});
</script>

<style lang="less" scoped>
.wechat_name {
  margin-right: 10px;
  line-height: 34px;
  float: right;
}
.art_main {
  position: relative;
}
.art_other_title {
  display: block;
  width: 70%;
  line-height: 50px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding: 0px;
  color: #303133;
}
.art_other {
  display: flex;
  padding: 5px 10px 0 0;
  height: 60px;
  justify-content: space-around;
  border-bottom: 1px solid #e6e6e6;
}
.art_title {
  display: block;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 2px;
  // padding: 0 10px;
  width: 100%;
  height: 30px;
  line-height: 30px;
  color: #fff;
  background: rgba(0, 0, 0, 0.5);
  white-space: nowrap; /*设置不换行*/
  overflow: hidden; /*设置隐藏*/
  text-overflow: ellipsis; /*设置隐藏部分为省略号*/
}

.status {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid var(--el-border-color-lighter);
  height: 40px;
  padding-left: 5px;
  font-size: 12px;
  color: #909399;

  .el-icon {
    font-size: 32px;
    cursor: pointer;
    // margin-left: 10px;
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
      color: var(--el-color-danger);
    }

    &.edit {
      color: var(--el-color-info);
    }
  }
}
.art_list {
  margin: 10px;
  border-radius: 5px;
  width: 250px;
  box-shadow: 0px 0px 10px 0px rgba(4, 0, 0, 0.1);
  background-color: white;
  color: #606266;
}

.view-home {
  color: #606266;
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
      height: 50px;
      padding: 0 20px;

      .label {
        font-size: 12px;
      }

      .value {
        font-size: 18px;
        font-weight: bold;
        margin-left: 10px;
      }
    }

    &__container {
      padding: 0 20px;
      height: 50px;
    }

    &__footer {
      display: flex;
      align-items: center;
      height: 50px;
      border-top: 1px solid #f7f7f7;
      font-size: 12px;
      margin: 0 5px;
      padding: 0 15px;
      box-sizing: border-box;

      .label {
        margin-right: 10px;
      }

      .value {
        font-size: 13px;
      }
    }
  }
}
</style>
