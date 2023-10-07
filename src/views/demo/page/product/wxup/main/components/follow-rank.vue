<template>
  <div class="follow-rank">
    <div class="follow-rank__header">
      <span>公众号关注数排行榜</span>
    </div>

    <div class="follow-rank__container">
      <ul class="follow-rank__list">
        <li>
          <span style="background-color: #eac56e">1</span>
          <span>数据头等舱</span>
          <span>129651</span>
        </li>
        <li>
          <span style="background-color: #aecbd2">2</span>
          <span>数据头等舱B2</span>
          <span>89716</span>
        </li>
        <li>
          <span style="background-color: #dac0b0">3</span>
          <span>数据头等舱A1</span>
          <span>74159</span>
        </li>
        <li>
          <span>4</span>
          <span>数据头等舱C1</span>
          <span>71148</span>
        </li>
        <li>
          <span>5</span>
          <span>数据头等舱A3</span>
          <span>61148</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
</script>

<style lang="less" scoped>
.follow-rank {
  &__header {
    display: flex;
    align-items: center;
    height: 33px;
    font-size: 15px;
    font-weight: bold;
    padding: 6px 8px 6px 8px;
    background-color: #fff4e5;
    border-top: 4px solid #ffe2b7;
    color: #606266;
  }
  .rank_unit {
    position: absolute;
    right: 16px;
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
    height: 217px;
    color: #606266;

    li {
      display: flex;
      align-items: center;
      height: 38px;
      list-style: none;
      font-size: 13px;
      cursor: pointer;

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
</style>
