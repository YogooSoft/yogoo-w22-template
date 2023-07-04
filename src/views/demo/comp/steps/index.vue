<template>
  <page-wrapper title="步骤条示例" content="">
    <collapse-container
      class="cl-mb-10"
      title="步骤条示例"
      :can-expan="true"
      help-message="引导用户按照流程完成任务的分步导航条， 可根据实际应用场景设定步骤，步骤不得少于 2 步。"
    >
      <div class="flex-1">
        <el-steps :active="active" finish-status="success">
          <el-step title="Step 1" />
          <el-step title="Step 2" />
          <el-step title="Step 3" />
        </el-steps>

        <el-button style="margin-top: 12px" @click="next">下一步</el-button>
        <el-button style="margin-top: 12px" @click="previous">返回上步</el-button>
        
      </div>
    </collapse-container>
    <collapse-container
      class="cl-mb-10"
      title="含状态的步骤条"
      :can-expan="true"
      help-message="每一步骤显示出该步骤的状态。"
    >
      <el-steps :space="200" :active="1" finish-status="success">
        <el-step title="Done" />
        <el-step title="Processing" />
        <el-step title="Step 3" />
      </el-steps>
    </collapse-container>
    <collapse-container
      class="cl-mb-10"
      title="居中的步骤条"
      :can-expan="true"
      help-message=""
    >
      <el-steps :active="2" align-center>
        <el-step title="Step 1" description="Some description" />
        <el-step title="Step 2" description="Some description" />
        <el-step title="Step 3" description="Some description" />
        <el-step title="Step 4" description="Some description" />
      </el-steps>
    </collapse-container>
    <collapse-container
      class="cl-mb-10"
      title="带描述的步骤栏"
      :can-expan="true"
      help-message=""
    >
      <el-steps :active="1">
        <el-step title="Step 1" description="Some description" />
        <el-step title="Step 2" description="Some description" />
        <el-step title="Step 3" description="Some description" />
      </el-steps>
    </collapse-container>
    <collapse-container
      class="cl-mb-10"
      title="带图标的步骤条"
      :can-expan="true"
      help-message=""
    >
      <el-steps :active="1">
        <el-step title="Step 1" :icon="Edit" />
        <el-step title="Step 2" :icon="Upload" />
        <el-step title="Step 3" :icon="Picture" />
      </el-steps>
    </collapse-container>
    <collapse-container
      class="cl-mb-10"
      title="简洁风格的步骤条"
      :can-expan="true"
      help-message=""
    >
      <el-steps :space="200" :active="1" simple>
        <el-step title="Step 1" :icon="Edit" />
        <el-step title="Step 2" :icon="UploadFilled" />
        <el-step title="Step 3" :icon="Picture" />
      </el-steps>

      <el-steps
        :active="1"
        finish-status="success"
        simple
        style="margin-top: 20px"
      >
        <el-step title="Step 1" />
        <el-step title="Step 2" />
        <el-step title="Step 3" />
      </el-steps>
    </collapse-container>
    <collapse-container
      class="cl-mb-10"
      title="垂直的步骤条"
      :can-expan="true"
      help-message=""
    >
      <div style="height: 300px">
        <el-steps direction="vertical" :active="1">
          <el-step title="Step 1" />
          <el-step title="Step 2" />
          <el-step title="Step 3" />
        </el-steps>
      </div>
    </collapse-container>
  </page-wrapper>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from "vue";
import { PageWrapper } from "@/components/Page";
import { CollapseContainer } from "@/components/Container/index";
import { Edit, Picture, Upload, UploadFilled } from "@element-plus/icons-vue";

export default defineComponent({
  name: "steps",
  components: { CollapseContainer, PageWrapper },

  setup(props) {
    const active = ref(0);

    const next = () => {
      if (active.value++ > 2) active.value = 0;
    };

    const previous = () => {
      if (active.value-- > 2 || active.value <= 0) active.value = 0;
    }

    return {
      active,
      next,
      Edit,
      Picture,
      Upload,
      UploadFilled,
      previous
    };
  },
});
</script>

<style lang="less" scoped>
.flex-1 {
  flex: 1;
  margin-top: 10px;
}
.flex-2 {
  margin-bottom: 10px;
}

.cl-mb-10 {
  margin-bottom: 10px;
}
.cl-mb-10-top {
  margin-top: 10px;
}
.el-alert {
  margin-bottom: 10px;
}
</style>
