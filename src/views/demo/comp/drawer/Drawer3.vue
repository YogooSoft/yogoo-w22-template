<template>
  <yui-drawer
    v-bind="$attrs"
    @register="register"
    title="演示打开抽屉并传递数据"
    width="40%"
    @close="onClose"
  >
    <template #default>
      <collapse-container
        class="cl-mb-10"
        :show-title="false"
        :can-expan="false"
        help-message="抽屉组件使用示例"
      >
        <yui-form
          :field-list="formData.fieldList"
          :field-form="formData.fieldForm"
          @change="change"
        />
      </collapse-container>
    </template>
    <template #footer>
      <div class="drawer-footer">
        <el-button type="primary" @click="ok">确定</el-button>
        <el-button @click="closeDrawer">关闭</el-button>
      </div>
    </template>
  </yui-drawer>
</template>
<script lang="ts">
import { defineComponent, ref, reactive } from "vue";
import { CollapseContainer } from "@/components/Container/index";
import { YuiDrawer, useDrawerInner } from "@/components/Drawer";
import { YuiForm } from "@/components/Form/index";
import { FormSchema } from "./data";

export default defineComponent({
  components: { YuiDrawer, CollapseContainer, YuiForm },
  setup() {
    const [register, { closeDrawer }] = useDrawerInner();
    const formData = reactive(FormSchema);
    const lines = ref(75);
    // let timer = new Date().getTime();
    
    function ok() {
        console.log("-------------Form----------------",formData.fieldForm);
    }

    function onClose() {
        // 关闭抽屉时手动重置表单数据
        console.log("-------------手动重置表单数据----------1------");
    }
    

    function change(item: any, index: any, event: any) {
      console.log("-------------change----------1------", item);
      // console.log("-------------change-----------2-----",index);
      // console.log("-------------change-----------3-----",formData.fieldForm[item.field]);
    }

    return { register, closeDrawer, lines, FormSchema, formData, change, ok,onClose };
  },
});
</script>

<style lang="less" scoped>
.cl-mb-10 {
  margin-bottom: 10px;
}

.drawer-footer {
  width: 100%;
  right: 10px;
  display: flex;
  justify-content: flex-end;
  position: absolute;
  bottom: 10px;
}
</style>
