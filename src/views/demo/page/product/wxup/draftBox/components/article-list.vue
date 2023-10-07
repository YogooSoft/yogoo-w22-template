<template>
  <div v-masonry class="container">
    <div
      v-masonry-tile
      v-for="(item, index) in articles"
      class="art_list"
      :key="index"
    >
      <div class="art_main" style="position: relative">
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
</template>

<script lang="ts" setup>
import { Ref, ref, reactive } from "vue";
import { Search, Plus, CirclePlus, Edit } from "@element-plus/icons-vue";
import { messageBox } from "@/hooks/web/useMessageBox";
import { message } from "@/hooks/web/useMessage";

let articles = ref([]);

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

function wechat_update(item) {}

function articles_list_show(data) {
  articles.value = data;
}

// 暴露方法
defineExpose({
  articles_list_show,
});
</script>

<style lang="less" scoped>
.container {
  background-color: #fff;
}
.art_other_title {
  display: block;
  width: 70%;
  line-height: 50px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding: 0px;
}
.art_other {
  display: flex;
  padding: 10px 10px 0 0;
  height: 70px;
  justify-content: space-around;
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
      color: var(--el-color-success);
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
</style>
