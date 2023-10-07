<template>
  <div class="cust-info">
    <div class="card">
      <div class="card__header">
        <span class="label">公众号概况</span>
      </div>

      <div class="card__container">
        <ul class="cust-info__cop">
          <li>
            <span>总数</span>
          </li>

          <li>
            <span>服务号</span>
          </li>
          <li>
            <span>订阅号</span>
          </li>
          <li>
            <span>凭证异常数</span>
          </li>
          <li>
            <span>认证异常数</span>
          </li>
          <li>
            <span>认证即将过期数</span>
          </li>
        </ul>
        <ul class="cust-info__cop">
          <li>
            <span class="info_num">132</span>
          </li>

          <li>
            <span class="info_num">81</span>
          </li>
          <li>
            <span class="info_num">51</span>
          </li>
          <li>
            <span class="info_num" style="color: #f21e37">16</span>
          </li>
          <li>
            <span class="info_num" style="color: #f21e37">2</span>
          </li>
          <li>
            <span class="info_num" style="color: #e7a442">36</span>
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
