<template>
  <div class="balance-info">
    <div class="card">
      <div class="card__header">
        <span class="label">经营情况</span>
        <!-- <span class="value">￥15920</span> -->
      </div>

      <div class="card__container">
        <ul class="balance-info__cop">
          <li>
            <span>昨日公司余额</span>
          </li>

          <li>
            <span>昨日市场余额</span>
          </li>
          <li>
            <span>昨日总资产</span>
          </li>
          <li>
            <span>昨日利息收入</span>
          </li>
        </ul>
        <ul class="balance-info__cop">
          <li>
            <span class="info_num">157.98</span>

            <div class="rise">
              <i class="el-icon-bottom-right"></i>
              <span class="info_unit">亿元</span>
            </div>
          </li>

          <li>
            <span class="info_num">17842.06</span>

            <div class="rise">
              <i class="el-icon-top-right"></i>
              <span class="info_unit">亿元</span>
            </div>
          </li>
          <li>
            <span class="info_num">503.62</span>

            <div class="rise">
              <i class="el-icon-top-right"></i>
              <span class="info_unit">亿元</span>
            </div>
          </li>
          <li>
            <span class="info_num">315.35</span>

            <div class="rise">
              <i class="el-icon-top-right"></i>
              <span class="info_unit">万元</span>
            </div>
          </li>
        </ul>

        <ul class="balance-info__cop">
          <li>
            <span>本年公司日均余额</span>
          </li>

          <li>
            <span>本年市场日均余额</span>
          </li>
          <li>
            <span>本年日均总资产</span>
          </li>
          <li>
            <span>本年利息收入</span>
          </li>
        </ul>
        <ul class="balance-info__cop">
          <li>
            <span class="info_num">158.64</span>

            <div class="rise">
              <i class="el-icon-bottom-right"></i>
              <span class="info_unit">亿元</span>
            </div>
          </li>

          <li>
            <span class="info_num">16815.64</span>

            <div class="rise">
              <i class="el-icon-top-right"></i>
              <span class="info_unit">亿元</span>
            </div>
          </li>
          <li>
            <span class="info_num">479.90</span>

            <div class="rise">
              <i class="el-icon-top-right"></i>
              <span class="info_unit">亿元</span>
            </div>
          </li>
          <li>
            <span class="info_num">56183.34</span>

            <div class="rise">
              <i class="el-icon-top-right"></i>
              <span class="info_unit">万元</span>
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
      height: 150px;
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

.balance-info {
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
    .info_unit {
      margin-bottom: 10px;
      margin-left: -5px;
      color: #818485;
    }
  }
}
</style>
