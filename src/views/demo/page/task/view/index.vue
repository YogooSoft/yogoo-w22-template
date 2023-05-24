<template>
  <page-wrapper title="" content="">
    <div class="task-list" :class="{ 'is-mini': browser.isMini }">
      <div class="list">
        <div v-for="(item, index) in list" :key="index" class="item" @click="">
          <p class="name">{{ item.name }}</p>
          <p class="row">
            <span>执行服务</span>
            <span>{{ item.service }}</span>
          </p>
          <p class="row">
            <span>定时规则</span>
            <span>{{
              item.taskType == 1 ? `间隔${item.every}秒执行` : item.cron
            }}</span>
          </p>

          <div class="status">
            <template v-if="item.status">
              <el-tag disable-transitions effect="dark" type="success"
                >进行中</el-tag
              >

              <el-icon class="pause" @click.stop="">
                <video-pause />
              </el-icon>
            </template>

            <template v-else>
              <el-tag disable-transitions effect="dark" type="danger"
                >已停止</el-tag
              >
              <el-icon class="play" @click.stop="">
                <video-play />
              </el-icon>
            </template>
            <div style="width: 300px;"></div>
            <el-icon class="log" @click.stop="">
              <tickets />
            </el-icon>
            <el-icon class="delete" @click.stop="">
              <delete />
            </el-icon>
          </div>
        </div>
      </div>
    </div>
  </page-wrapper>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { PageWrapper } from "@/components/Page";
import { useBrowser } from "@/hooks/web/useBrower";

export default defineComponent({
  name: "taskView",
  components: { PageWrapper },
  setup(props) {
    const { browser } = useBrowser();

    let list = [
      {
        id: 2,
        createTime: "2021-03-10 14:25:53",
        updateTime: "2023-02-14 16:48:09",
        jobId: null,
        repeatConf: '{"jobId":2,"pattern":"0/5 * * * * ? ","count":1}',
        name: "cron任务，5秒执行一次",
        cron: "0/5 * * * * ? ",
        limit: null,
        every: null,
        remark: null,
        status: 0,
        startDate: null,
        endDate: null,
        data: null,
        service: "taskDemoService.test()",
        type: 1,
        nextRunTime: null,
        taskType: 0,
      },
      {
        id: 1,
        createTime: "2021-03-10 14:25:13",
        updateTime: "2023-02-14 15:53:00",
        jobId: null,
        repeatConf: '{"every":2000,"jobId":1,"count":1}',
        name: "每秒执行,总共5次",
        cron: null,
        limit: null,
        every: 2000,
        remark: null,
        status: 0,
        startDate: null,
        endDate: null,
        data: null,
        service: "taskDemoService.test()",
        type: 1,
        nextRunTime: null,
        taskType: 1,
      },
    ];

    // console.log("--------browser.isMini--------",browser.isMini);

    return { list,browser };
  },
});
</script>
<style lang="less" scoped>
.task-list {
  height: 100%;
  background-color: var(--el-bg-color-page);

  .list {
    display: flex;
    flex-wrap: wrap;
    padding: 10px 10px 0 10px;
    box-sizing: border-box;
    background-color: inherit;

    .item {
      border:1px solid var(--el-border-color-lighter); 
      background-color: var(--el-bg-color);
      padding: 10px 10px 0 10px;
      border-radius: 4px;
      margin: 0 10px 10px 0;
      height: 180px;
      width: 300px;
      cursor: pointer;
      box-sizing: border-box;

      .name {
        font-size: 15px;
        font-weight: bold;
        margin-bottom: 10px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }

      .row {
        margin-bottom: 10px;
        height: 40px;

        span {
          display: block;

          &:nth-child(1) {
            font-size: 12px;
            margin-bottom: 5px;
            color: var(--el-color-info);
          }

          &:nth-child(2) {
            font-size: 14px;
          }
        }
      }

      .status {
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-top: 1px solid var(--el-border-color-lighter);
        height: 40px;

        .el-icon {
          font-size: 32px;
          cursor: pointer;
          margin-left: 10px;
          padding: 5px;
          border-radius: 3px;

          &:hover {
            background-color: var(--el-border-color-lighter);
          }

          &.play {
            color: var(--el-color-primary);
          }

          &.pause {
            color: var(--el-color-danger);
          }

          &.log {
            color: var(--el-color-info);
          }

          &.delete {
            color: var(--el-color-danger);
          }
        }
      }

      &:hover {
        background-color: var(--el-fill-color-lighter);
      }

      &.is-add {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        color: var(--el-color-info);

        .el-icon {
          font-size: 30px;
        }

        p {
          font-size: 13px;
          margin: 20px 0;
        }
      }
    }
  }

  &.is-mini {
    .item {
      width: 100%;
      margin: 0 0 15px 0;
    }
  }
}
</style>
