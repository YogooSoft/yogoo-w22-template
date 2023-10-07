<template>
  <div class="read-rank">
    <div class="read-rank__header">
      <span>公众号数据排行榜</span>
    </div>

    <div class="read-rank__title">
      <ul>
        <li
          style="
            height: 35px;
            background-color: #f6f8fb;
            text-align: center;
            line-height: 35px;
            color: #606266;
          "
        >
          <span class="rank_title" style="float: left; margin-left: 30px"
            >公众号</span
          >
          <span class="rank_title" style="float: left; margin-left: 98px"
            >关注数</span
          >
          <span class="rank_title" style="float: left; margin-left: 94px"
            >资金账号绑定</span
          >
          <span class="rank_title" style="float: left; margin-left: 55px"
            >推文</span
          >
          <span class="rank_title" style="float: left; margin-left: 108px"
            >浏览量</span
          >
        </li>
      </ul>
    </div>

    <div class="read-rank__container">
      <ul class="read-rank__list">
        <li>
          <span style="background-color: #eac56e">1</span>
          <span
            >悦高软件
            <div style="color: #b8babd">yogoo_soft</div>
          </span>
          <span>129651</span>
          <span>115849</span>
          <span>25</span>
          <span>9651</span>
        </li>
        <li>
          <span style="background-color: #aecbd2">2</span>
          <span
            >数据头等舱
            <div style="color: #b8babd">Datafirst114</div>
          </span>
          <span>89716</span>
          <span>56894</span>
          <span>19</span>
          <span>8121</span>
        </li>
        <li>
          <span style="background-color: #dac0b0">3</span>
          <span
            >悦宏资产
            <div style="color: #b8babd">yuehong168</div>
          </span>
          <span>74159</span>
          <span>45287</span>
          <span>32</span>
          <span>6521</span>
        </li>
        <li>
          <span>4</span>
          <span
            >悦元科技
            <div style="color: #b8babd">yueyuan_tech</div>
          </span>
          <span>71148</span>
          <span>58967</span>
          <span>18</span>
          <span>5314</span>
        </li>
        <li>
          <span>5</span>
          <span
            >悦宝金服
            <div style="color: #b8babd">yuebao_fin</div>
          </span>
          <span>61148</span>
          <span>35689</span>
          <span>34</span>
          <span>3654</span>
        </li>
      </ul>
      <!-- 
      <ul class="read-rank__list">
        <li>
          <span style="background-color: #eac56e">1</span>
          <span>悦高软件</span>
          <span>129651</span>
          <span>115849</span>
          <span>25</span>
          <span>9651</span>
        </li>
        <li>
          <span style="background-color: #aecbd2">2</span>
          <span>数据头等舱</span>
          <span>167119</span>
        </li>
        <li>
          <span style="background-color: #dac0b0">3</span>
          <span>数据头等舱B1</span>
          <span>117639</span>
        </li>
        <li>
          <span>4</span>
          <span>数据头等舱C2</span>
          <span>107429</span>
        </li>
        <li>
          <span>5</span>
          <span>数据头等舱B2</span>
          <span>101419</span>
        </li>
      </ul> -->
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
</script>

<style lang="less" scoped>
.read-rank {
  &__header {
    display: flex;
    align-items: center;
    height: 33px;
    font-size: 15px;
    font-weight: bold;
    padding: 6px 8px 6px 8px;
    background-color: #e5f4f3;
    border-top: 4px solid #b7e1de;
    color: #606266;
    .rank_unit {
      position: absolute;
      right: 16px;
    }
  }

  &__container {
    padding: 0 8px 0 8px;
  }

  &__filter {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 40px;

    ul {
      display: flex;
      align-items: center;
      margin-right: 20px;
      flex: 1;
      max-width: 220px;

      li {
        list-style: none;
        font-size: 14px;
        cursor: pointer;
        color: #d8d8d8;
        white-space: nowrap;
        margin-right: 10px;
        flex: 1;

        &.active {
          color: #000;
        }

        &:not(.active):hover {
          color: #999;
        }
      }
    }

    :deep(.el-date-editor) {
      width: 150px;
    }
  }

  &__list {
    height: 304px;
    color: #606266;

    li {
      display: flex;
      align-items: center;
      height: 50px;
      list-style: none;
      font-size: 13px;
      cursor: pointer;
      margin-top: 10px;
      margin-bottom: 10px;

      span {
        &:first-child {
          display: inline-block;
          height: 14px;
          width: 14px;
          border-radius: 14px;
          text-align: center;
          line-height: 14px;
          font-size: 12px;
        }

        &:nth-child(2) {
          flex: 1;
          margin: 0 10px;
          letter-spacing: 0.5px;
          color: #606266;
          // overflow: hidden;
          // text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          // -webkit-line-clamp: 1;
        }
        &:nth-child(3) {
          flex: 1;
          margin: 0 10px;
          letter-spacing: 0.5px;
          color: #606266;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
        }
        &:nth-child(4) {
          flex: 1;
          margin: 0 10px;
          letter-spacing: 0.5px;
          color: #606266;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
        }
        &:nth-child(5) {
          flex: 1;
          margin: 0 10px;
          letter-spacing: 0.5px;
          color: #606266;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
        }
        &:nth-child(6) {
          flex: 1;
          margin: 0 10px;
          letter-spacing: 0.5px;
          color: #606266;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
        }
      }

      &:nth-last-child(n + 3) {
        span {
          &:first-child {
            background-color: #000;
            color: #fff;
          }
        }
      }

      &:hover {
        span:nth-child(2) {
          text-decoration: underline;
        }
      }
    }
  }
}
.rank_title {
}
</style>
