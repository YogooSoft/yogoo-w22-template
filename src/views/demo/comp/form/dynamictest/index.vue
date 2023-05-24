<template>
    <page-wrapper title="导出示例" content="根据JSON格式的数据进行导出">
      <div class="form_container">
        <div style="display: flex">
          <div style="flex: 2">
            <el-row :gutter="10">
              <el-col :span="16"
                ><div class="grid-content ep-bg-purple"
              /></el-col>
              <el-col :span="8"><div class="grid-content ep-bg-purple" /></el-col>
              
            </el-row>
            <el-row :gutter="10">
              <el-col :span="8"><div class="grid-content ep-bg-purple" /></el-col>
              <el-col :span="8"><div class="grid-content ep-bg-purple" /></el-col>
              <el-col :span="4"><div class="grid-content ep-bg-purple" /></el-col>
              <el-col :span="4"><div class="grid-content ep-bg-purple" /></el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col :span="4"><div class="grid-content ep-bg-purple" /></el-col>
              <el-col :span="16"
                ><div class="grid-content ep-bg-purple"
              /></el-col>
              <el-col :span="4"><div class="grid-content ep-bg-purple" /></el-col>
            </el-row>
          </div>
        </div>
      </div>
    </page-wrapper>
  </template>
  
  <script lang="ts">
  import { defineComponent, computed, ref, reactive } from "vue";
  import { PageWrapper } from "@/components/Page";
  import { CollapseContainer } from "@/components/Container/index";
  // import Form from "@/components/Form/src/BasicForm.vue";
  import { YuiForm } from "@/components/Form/index";
  
  export default defineComponent({
    name: "DynamicForm",
    components: { CollapseContainer, PageWrapper, YuiForm },
  
    setup(props) {
      const formData = reactive({
        fieldForm: { name: "ES meetup" },
        fieldList: [
          {
            field: "name",
            name: "活动名称",
            mold: "Input",
            formType: "text",
            // 检验唯一性
            isNull: 1,
          },
          {
            field: "region",
            name: "活动区域",
            mold: "Select",
            formType: "select",
            setting: [
              {
                label: "区域一",
                value: 0,
              },
              {
                label: "区域二",
                value: 1,
              },
            ],
          },
          {
            field: "date",
            name: "活动区域",
            mold: "Date",
            formType: "datetime",
          },
          {
            field: "deliver",
            name: "即时配送",
            mold: "Select",
            formType: "switch",
          },
          {
            field: "type",
            name: "活动性质",
            mold: "Select",
            formType: "checkbox-group",
            setting: [
              {
                label: "美食/餐厅线上活动",
              },
              {
                label: "地推活动",
              },
              {
                label: "线下主题活动",
              },
              {
                label: "单纯品牌曝光",
              },
            ],
          },
          {
            field: "resource",
            name: "资源",
            mold: "Select",
            formType: "radio-group",
            setting: [
              {
                label: "线上品牌商赞助",
                value: 0,
              },
              {
                label: "线下场地免费",
                value: 1,
              },
            ],
          },
          {
            field: "desc",
            name: "活动形式",
            mold: "Input",
            formType: "textarea",
            rows: 3,
          },
        ],
      });
  
      function close() {
        console.log("-------------Form----------------", formData.fieldForm);
      }
  
      function change(item: any, index: any, event: any) {
        // console.log("-------------change----------1------",item);
        // console.log("-------------change-----------2-----",index);
        // console.log("-------------change-----------3-----",formData.fieldForm[item.field]);
      }
  
      return {
        formData,
        change,
        close,
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
    width: 100%;
  }
  
  .el-row {
    margin-bottom: 20px;
  }
  .el-row:last-child {
    margin-bottom: 0;
  }
  .el-col {
    border-radius: 4px;
  }
  
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .ep-bg-purple {
    background-color: bisque;
  }
  </style>
  