<template>
  <div class="cust-info">
    <div class="card">
      <div class="card__header">
        <span class="label">用户概况</span>
      </div>

      <div class="card__container">
        <ul class="cust-info__cop">
          <li>
            <span>累计关注数</span>
          </li>

          <li>
            <span>累计取关数</span>
          </li>
        </ul>
        <ul class="cust-info__cop">
          <li>
            <span class="info_num">687468</span>

            <div class="rise">
              <i class="el-icon-bottom-right"></i>
              <span class="info_corner_desc">昨日</span>
              <span class="info_corner_num">+86</span>
            </div>
          </li>

          <li>
            <span class="info_num">3216</span>

            <div class="rise">
              <i class="el-icon-top-right"></i>
              <span class="info_corner_desc">昨日</span>
              <span class="info_corner_num">+12</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="less" scoped>
.view-home {
  .card {
    background-color: #fff;
    border-radius: 5px;
    margin-bottom: 15px;
    font-size: 12px;
    letter-spacing: 0.5px;
    color: #606266;

    &__header {
      display: flex;
      align-items: center;
      height: 32px;
      padding: 6px 8px 6px 8px;
      font-weight: bold;

      .label {
        font-size: 15px;
      }

      .value {
        font-size: 18px;
        font-weight: bold;
        margin-left: 10px;
      }
    }

    &__container {
      padding: 0 20px;
      height: 80px;
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

.cust-info {
  &__cop {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 38px;

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
    .info_corner_desc {
      margin-bottom: 10px;
      margin-left: -5px;
      color: #dbddde;
    }
    .info_corner_num {
      margin-bottom: 10px;
    }
  }
}
</style>
