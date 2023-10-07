<template>
  <div class="left-content-info">
    <div class="title_box">
      <span class="title_box_left">联系我们</span>

      <el-link class="title_box_right" type="primary">展开</el-link>
    </div>
    <div class="content_box">
      <span class="title_box_left">在线沟通</span>
      <span>在线沟通，高效便捷</span>
      <el-button class="content_box_right_button" size="small" type="primary"
        >在线咨询</el-button
      >
    </div>
    <div class="content_box">
      <span class="title_box_left">客服热线</span>
      <span>统一客服热线:021-53099152</span>
      <br /><br />
      <span style="margin-left: 90px">客户识别号码:886868</span>
    </div>
    <div class="content_box">
      <span class="title_box_left">私募宝宝</span>
      <span>私募热线电话:021-53099152</span>
      <br /><br />
      <span style="margin-left: 90px">本周接入口令: 8168</span>
    </div>
  </div>

  <div class="left-content-info">
    <div class="title_box">
      <span class="title_box_left">常用菜单</span>
      <el-link class="title_box_right" type="primary">设置</el-link>
      <el-link class="title_box_right" style="margin-right: 10px" type="primary"
        >一键打开</el-link
      >
    </div>
    <div class="content_box">
      <el-button class="menu_button" size="small" type="primary">
        产品信息及邮箱...</el-button
      >
      <el-button class="menu_button" size="small" type="primary">
        增值税涉税信息...</el-button
      >
      <el-button class="menu_button" size="small" type="primary">
        产品开户及账户...</el-button
      >
      <el-button class="menu_button" size="small" type="primary"
        >产品发行与备案</el-button
      >

      <el-button class="menu_button" size="small" type="primary"
        >合同回收查询</el-button
      >
      <el-button class="menu_button" size="small" type="primary"
        >估值表发送</el-button
      >
      <el-button class="menu_button" size="small" type="primary"
        >指令跟踪待办</el-button
      >
      <el-button class="menu_button" size="small" type="primary"
        >资产负债表</el-button
      >
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="less" scoped>
.menu_button {
  margin: 10px;
}
.left-content-info {
  border-bottom: 10px solid #f2f4f6;
}
.title_box_right {
  float: right;
  margin-top: 5px;
}
.title_box_left_num {
  background-color: #f56c6c;
  font-size: 17px;
  color: white;
  padding: 3px;
  margin-left: -12px;
}
.title_box_left {
  font-size: 17px;
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
.content_box_right_button {
  float: right;
}
</style>
