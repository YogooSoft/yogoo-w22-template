<template>
  <page-wrapper title="分页示例" content="当数据量过多时，使用分页分解数据。">
    <collapse-container
      class="cl-mb-10"
      title="基础用法"
      :can-expan="true"
      help-message=""
    >
      <el-alert
        title="设置layout，表示需要显示的内容，用逗号分隔，布局元素会依次显示。 prev表示上一页，next为下一页，pager表示页码列表，除此以外还提供了jumper和total，size和特殊的布局符号->，->后的元素会靠右显示，jumper表示跳页元素，total表示总条目数，size用于设置每页显示的页码数量。"
        type="info"
        style="margin-bottom: 10px"
        show-icon
        :closable="false"
      />
      <div class="example-pagination-block">
        <div class="example-demonstration">当只有几页时</div>
        <el-pagination layout="prev, pager, next" :total="50" />
      </div>
      <div class="example-pagination-block">
        <div class="example-demonstration">当超过 7 页时</div>
        <el-pagination layout="prev, pager, next" :total="1000" />
      </div>
    </collapse-container>
    <collapse-container
      class="cl-mb-10"
      title="设置最大页码按钮数"
      :can-expan="true"
      help-message="默认情况下，当总页数超过 7 页时，Pagination 会折叠多余的页码按钮。 通过 pager-count 属性可以设置最大页码按钮数。"
    >
      <el-pagination
        :page-size="20"
        :pager-count="11"
        layout="prev, pager, next"
        :total="1000"
      />
    </collapse-container>
    <collapse-container
      class="cl-mb-10"
      title="带有背景色的分页"
      :can-expan="true"
      help-message="设置background属性可以为分页按钮添加背景色。"
    >
    <el-pagination background layout="prev, pager, next" :total="1000" />
  </collapse-container>
    <collapse-container
      class="cl-mb-10"
      title="小型分页"
      :can-expan="true"
      help-message="在空间有限的情况下，可以使用简单的小型分页。"
    >
    <el-pagination small layout="prev, pager, next" :total="50" />
  <el-pagination
    small
    background
    layout="prev, pager, next"
    :total="50"
    class="mt-4"
  />
  </collapse-container>
    <collapse-container
      class="cl-mb-10"
      title="当只有一页时隐藏分页"
      :can-expan="true"
      help-message="当只有一页时，通过设置 hide-on-single-page 属性来隐藏分页。"
    >
    <div>
    <el-switch v-model="value" />
    <el-divider  />
    <el-pagination
      :hide-on-single-page="value"
      :total="5"
      layout="prev, pager, next"
    />
  </div>
  </collapse-container>
    <collapse-container
      class="cl-mb-10"
      title="附加功能"
      :can-expan="true"
      help-message="根据场景需要，可以添加其他功能模块。"
    >
      <div class="demo-pagination-box">
        <div>
          <el-radio-group v-model="small">
            <el-radio-button :label="false">default</el-radio-button>
            <el-radio-button :label="true">small</el-radio-button>
          </el-radio-group>
        </div>
        <div style="margin-left: 16px">
          background:
          <el-switch v-model="background" />
        </div>
        <div style="margin-left: 16px">
          disabled: <el-switch v-model="disabled" />
        </div>
      </div>
      <el-divider />
      <div class="demo-pagination-block">
        <div class="demonstration">Total item count</div>
        <el-pagination
          v-model:current-page="currentPage1"
          :page-size="100"
          :small="small"
          :disabled="disabled"
          :background="background"
          layout="total, prev, pager, next"
          :total="1000"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
      <div class="demo-pagination-block">
        <div class="demonstration">Change page size</div>
        <el-pagination
          v-model:current-page="currentPage2"
          v-model:page-size="pageSize2"
          :page-sizes="[100, 200, 300, 400]"
          :small="small"
          :disabled="disabled"
          :background="background"
          layout="sizes, prev, pager, next"
          :total="1000"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
      <div class="demo-pagination-block">
        <div class="demonstration">Jump to</div>
        <el-pagination
          v-model:current-page="currentPage3"
          v-model:page-size="pageSize3"
          :small="small"
          :disabled="disabled"
          :background="background"
          layout="prev, pager, next, jumper"
          :total="1000"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
      <div class="demo-pagination-block">
        <div class="demonstration">All combined</div>
        <el-pagination
          v-model:current-page="currentPage4"
          v-model:page-size="pageSize4"
          :page-sizes="[100, 200, 300, 400]"
          :small="small"
          :disabled="disabled"
          :background="background"
          layout="total, sizes, prev, pager, next, jumper"
          :total="400"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </collapse-container>
  </page-wrapper>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from "vue";
import { PageWrapper } from "@/components/Page";
import { CollapseContainer } from "@/components/Container/index";

export default defineComponent({
  name: "pagination",
  components: { CollapseContainer, PageWrapper },

  setup(props) {
    const value = ref(false)
    const currentPage1 = ref(5);
    const currentPage2 = ref(5);
    const currentPage3 = ref(5);
    const currentPage4 = ref(4);
    const pageSize2 = ref(100);
    const pageSize3 = ref(100);
    const pageSize4 = ref(100);
    const small = ref(false);
    const background = ref(false);
    const disabled = ref(false);

    const handleSizeChange = (val: number) => {
      console.log(`${val} items per page`);
    };
    const handleCurrentChange = (val: number) => {
      console.log(`current page: ${val}`);
    };
    return {
      value,
      currentPage1,
      currentPage2,
      currentPage3,
      currentPage4,
      pageSize2,
      pageSize3,
      pageSize4,
      small,
      background,
      disabled,
      handleSizeChange,
      handleCurrentChange,
    };
  },
});
</script>

<style lang="less" scoped>
.cl-mb-10 {
  margin-bottom: 10px;
}

.example-pagination-block + .example-pagination-block {
  margin-top: 10px;
}
.example-pagination-block .example-demonstration {
  margin-bottom: 16px;
}

.demo-pagination-block + .demo-pagination-block {
  margin-top: 10px;
}
.demo-pagination-block .demonstration {
  margin-bottom: 16px;
}

.demo-pagination-box {
  display: flex;
}
</style>
