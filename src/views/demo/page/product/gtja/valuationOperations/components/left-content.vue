<template>
  <div class="left-content-info">
    <div class="title_box">
      <span class="title_box_left">待办事项</span>
      <span class="title_box_left_num">3</span>
      <el-link class="title_box_right" type="primary">查看更多</el-link>
    </div>
    <div class="content_box">
      <span class="content_box_left">转账划款</span>
      <span class="content_box_right_num">1</span>
    </div>
    <div class="content_box">
      <span class="content_box_left">信披备案</span>
      <span class="content_box_right_num">1</span>
    </div>
    <div class="content_box">
      <span class="content_box_left">其他待办</span>
      <span class="content_box_right_num">1</span>
    </div>
  </div>

  <div class="left-content-info">
    <div class="title_box">
      <span class="title_box_left">消息通知</span>
      <el-link class="title_box_right" type="primary">查看更多</el-link>
    </div>
    <div class="content_box">
      <span class="content_box_left"
        >港股通投资标的默认估值方案的通知
        <span
          style="
            background-color: #f56c6c;
            color: white;
            border-radius: 3px;
            padding: 2px;
            font-size: 12px;
          "
          >NEW</span
        >
      </span>
    </div>
    <div class="content_box">
      <span class="content_box_left">《估值·与君偕行》调查问卷</span>
    </div>
    <div class="content_box">
      <span class="content_box_left">经纪商下调经手费及佣金的特别提示</span>
    </div>
    <div class="content_box">
      <span class="content_box_left"
        >关于小规模纳税人增值税减免政策延期相关事宜的通知</span
      >
    </div>
    <div class="content_box">
      <span class="content_box_left"
        >关于私募基金2023年第二季度信息披露定期报告与备案更新数据编制的时间安排计划</span
      >
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="less" scoped>
.left-content-info {
  border-bottom: 10px solid #f2f4f6;
}
.title_box_right {
  float: right;
  margin-top: 5px;
}
.title_box_left_num {
  background-color: #f56c6c;
  font-size: 16px;
  color: white;
  padding: 3px;
  margin-left: -12px;
}
.title_box_left {
  font-size: 16px;
  font-weight: bold;
  display: inline-block;
  margin-top: 4px;
  margin-right: 20px;
}
.title_box {
  background-color: white;
  padding: 15px;
  border-bottom: 1px solid #ebeef5;
}

.content_box {
  background-color: white;
  padding: 15px;
  border-bottom: 1px solid #ebeef5;
}
.content_box_left {
  font-size: 14px;
  display: inline-block;
  margin-top: 4px;
  margin-right: 20px;
}
.content_box_right_num {
  float: right;
  margin-top: 5px;
  color: #f56c6c;
}
</style>
