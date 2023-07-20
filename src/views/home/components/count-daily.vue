<template>
  <div class="count-daily view-home">
    <div class="card">
      <div class="card__header">
        <span class="label">15920</span>
        <span class="value">次</span>
      </div>

      <div class="card__container">
        <ul class="count-daily__cop">
          <li>
            <span>环比</span>

            <div class="fall">
              <i class="el-icon-bottom-right"></i>
              <span>-4%</span>
            </div>
          </li>

          <li>
            <span>同比</span>

            <div class="rise">
              <i class="el-icon-top-right"></i>
              <span>+3%</span>
            </div>
          </li>
        </ul>
      </div>

      <div class="card__footer">
        <span class="label">2023-07-07~2023-07-17</span>
        <span class="value">今日</span>
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
    color: var(--el-text-color-regular);

    &__header {
      display: flex;
      //align-items: center;
      align-items: flex-end;
      height: 30px;
      padding: 0 0px;

      .label {
        font-size: 22px;
        // font-weight: bold;
        // margin-left: 10px;
      }

      .value {
        display: flex;
        align-items: flex-end;
        //align-items: baseline;
        font-size: 12px;
        margin-bottom: 2px;
      }
    }

    &__container {
      padding: 0 0px;
      height: 30px;
    }

    &__footer {
      display: flex;
      align-items: center;
      height: 30px;
      border-top: 1px solid #f7f7f7;
      font-size: 12px;
      margin: 0 0px;
      padding: 0 0px;
      box-sizing: border-box;

      .label {
        margin-right: 10px;
        color: #d8d8d8;
      }

      .value {
        font-size: 13px;
      }
    }
  }
}

.count-daily {
  &__cop {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 30px;

    li {
      display: flex;
      list-style: none;
      flex: 1;
      color: #d8d8d8;

      .fall,
      .rise {
        display: flex;
        align-items: center;
        margin-left: 0px;
      }

      .fall {
        color: #13ae7c;
      }

      .rise {
        color: #f21e37;
      }
    }
  }
}
</style>
