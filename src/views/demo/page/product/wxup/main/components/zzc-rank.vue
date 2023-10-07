<template>
  <div class="zzc-rank">
    <div class="zzc-rank__header">
      <span>营业部日均总资产排行榜(前5)(本年)</span>
      <span class="rank_unit">单位：元</span>
    </div>

    <div class="zzc-rank__container">
      <ul class="zzc-rank__list">
        <li>
          <span style="background-color: #eac56e">1</span>
          <span>上海XX路B营业部</span>
          <span>2,359,292,861</span>
        </li>
        <li>
          <span style="background-color: #aecbd2">2</span>
          <span>上海XX路A营业部</span>
          <span>1,899,408,870</span>
        </li>
        <li>
          <span style="background-color: #dac0b0">3</span>
          <span>上海XX路X营业部</span>
          <span>1,776,399,406</span>
        </li>
        <li>
          <span>4</span>
          <span>成都XX路A营业部</span>
          <span>1,723,124,930</span>
        </li>
        <li>
          <span>5</span>
          <span>上海XX路Y营业部</span>
          <span>1,668,532,841</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
</script>

<style lang="less" scoped>
.zzc-rank {
  &__header {
    display: flex;
    align-items: center;
    height: 33px;
    font-size: 15px;
    font-weight: bold;
    padding: 6px 8px 6px 8px;
    background-color: #fdedeb;
    border-top: 4px solid #f9cdc8;
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
