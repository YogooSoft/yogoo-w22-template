<template>
  <page-wrapper title="导出示例" content="根据JSON格式的数据进行导出">
    <div class="form_container">
      <yui-form :field-list="formData.fieldList" :field-form="formData.fieldForm"  @change="change" />
      <el-button type="primary" @click="close()">确定</el-button>
    </div>
  </page-wrapper>
</template>

<script lang="ts">
import { defineComponent, computed, ref, reactive } from "vue";
import { PageWrapper } from "@/components/Page";
import { CollapseContainer } from "@/components/Container/index";
// import Form from "@/components/Form/src/BasicForm.vue";
import { YuiForm } from "@/components/Form/index";
import { FormSchema } from './data';

export default defineComponent({
  name: "basicForm",
  components: { CollapseContainer, PageWrapper, YuiForm },
  setup(props) {

    const formData = reactive(FormSchema);

    function close() {
      console.log("-------------Form----------------",formData.fieldForm);
    }

    function change(item:any , index:any , event:any ) {
      // console.log("-------------change----------1------",item);
      // console.log("-------------change-----------2-----",index);
      // console.log("-------------change-----------3-----",formData.fieldForm[item.field]);
    }

    return {
      formData,
      change,
      close
    };
  },
});
</script>

<style lang="less" scoped>
.flex-1 {
  flex: 1;
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
.form_container {
  width: 400px;
}
</style>
