<template>
  <div class="read-rank">
    <div class="read-rank__header">
      <span>推文数据排行榜</span>
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
          <span class="rank_title" style="float: left; margin-left: 90px"
            >标题</span
          >
          <span class="rank_title" style="float: left; margin-left: 270px"
            >阅读</span
          >
          <span class="rank_title" style="float: left; margin-left: 52px"
            >在看</span
          >
          <span class="rank_title" style="float: left; margin-left: 58px"
            >点赞</span
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
          <span>《行到水穷处，坐看云起时》</span>
          <span>9651</span>
          <span>25</span>
          <span>119</span>
        </li>
        <li>
          <span style="background-color: #aecbd2">2</span>
          <span
            >数据头等舱
            <div style="color: #b8babd">Datafirst114</div>
          </span>
          <span>《中国30股市30年的走势回顾》</span>
          <span>8121</span>
          <span>19</span>
          <span>45</span>
        </li>
        <li>
          <span style="background-color: #dac0b0">3</span>
          <span
            >悦高软件
            <div style="color: #b8babd">yogoo_soft</div>
          </span>
          <span>《悦高十年，感恩相伴》</span>
          <span>6521</span>
          <span>32</span>
          <span>23</span>
        </li>
        <li>
          <span>4</span>
          <span
            >悦高软件
            <div style="color: #b8babd">yogoo_soft</div>
          </span>
          <span>《证券大佬都在收藏的一张图，太惊艳了！》</span>
          <span>5314</span>
          <span>8</span>
          <span>56</span>
        </li>
        <li>
          <span>5</span>
          <span
            >悦高软件
            <div style="color: #b8babd">yogoo_soft</div>
          </span>
          <span>《动机至善，私信了无》</span>
          <span>3654</span>
          <span>8</span>
          <span>56</span>
        </li>
      </ul>
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
          // flex: 1;
          margin: 0 10px;
          letter-spacing: 0.5px;
          color: #606266;
          // overflow: hidden;
          // text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          // -webkit-line-clamp: 1;
          width: 100px;
        }
        &:nth-child(3) {
          // flex: 1;
          margin: 0 10px;
          letter-spacing: 0.5px;
          color: #606266;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
          width: 280px;
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
