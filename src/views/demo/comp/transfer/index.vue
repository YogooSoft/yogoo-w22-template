<template>
  <page-wrapper title="穿梭框示例" content="">
    <collapse-container
      class="cl-mb-10"
      title="穿梭框示例"
      :can-expan="true"
      help-message=""
    >
      <el-transfer v-model="value" :data="data" />
    </collapse-container>
    <collapse-container
      class="cl-mb-10"
      title="可搜索过滤"
      :can-expan="true"
      help-message="在数据很多的情况下，可以对数据进行搜索和过滤。"
    >
      <el-transfer
        v-model="value1"
        filterable
        :filter-method="filterMethod"
        filter-placeholder="State Abbreviations"
        :data="data1"
      />
    </collapse-container>
    <collapse-container
      class="cl-mb-10"
      title="自定义"
      :can-expan="true"
      help-message="可以对列表标题文案、按钮文案、数据项的渲染函数、列表底部的勾选状态文案、列表底部的内容区等进行自定义。"
    >
      <p style="text-align: center; margin: 10px 0 20px">
        Customize data items using render-content
      </p>
      <div style="text-align: center">
        <el-transfer
          v-model="leftValue"
          style="text-align: left; display: inline-block"
          filterable
          :left-default-checked="[2, 3]"
          :right-default-checked="[1]"
          :render-content="renderFunc1"
          :titles="['Source', 'Target']"
          :button-texts="['To left', 'To right']"
          :format="{
            noChecked: '${total}',
            hasChecked: '${checked}/${total}',
          }"
          :data="data"
          @change="handleChange"
        >
          <template #left-footer>
            <el-button class="transfer-footer" size="small"
              >Operation</el-button
            >
          </template>
          <template #right-footer>
            <el-button class="transfer-footer" size="small"
              >Operation</el-button
            >
          </template>
        </el-transfer>
      </div>
      <el-divider />
      <p style="text-align: center; margin: 10px 0 20px">
        Customize data items using scoped slot
      </p>
      <div style="text-align: center">
        <el-transfer
          v-model="rightValue"
          style="text-align: left; display: inline-block"
          filterable
          :left-default-checked="[2, 3]"
          :right-default-checked="[1]"
          :titles="['Source', 'Target']"
          :button-texts="['To left', 'To right']"
          :format="{
            noChecked: '${total}',
            hasChecked: '${checked}/${total}',
          }"
          :data="data"
          @change="handleChange"
        >
          <template #default="{ option }">
            <span>{{ option.key }} - {{ option.label }}</span>
          </template>
          <template #left-footer>
            <el-button class="transfer-footer" size="small"
              >Operation</el-button
            >
          </template>
          <template #right-footer>
            <el-button class="transfer-footer" size="small"
              >Operation</el-button
            >
          </template>
        </el-transfer>
      </div>
    </collapse-container>
    <collapse-container
      class="cl-mb-10"
      title="数据项属性别名"
      :can-expan="true"
      help-message="默认情况下，Transfer 仅能识别数据项中的 key、label 和 disabled 字段。 如果你的数据的字段名不同，可以使用 props 属性为它们设置别名。"
    >
      <el-transfer
        v-model="value4"
        :props="{
          key: 'value',
          label: 'desc',
        }"
        :data="data4"
      />
    </collapse-container>
  </page-wrapper>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from "vue";
import { PageWrapper } from "@/components/Page";
import { CollapseContainer } from "@/components/Container/index";
import type { VNode, VNodeProps } from "vue";

interface Option {
  key: number;
  label: string;
  disabled: boolean;
}

interface Option1 {
  key: number;
  label: string;
  initial: string;
}

interface Option2 {
  value: number;
  desc: string;
  disabled: boolean;
}

export default defineComponent({
  name: "transfer",
  components: { CollapseContainer, PageWrapper },

  setup(props) {
    const generateData = () => {
      const data: Option[] = [];
      for (let i = 1; i <= 15; i++) {
        data.push({
          key: i,
          label: `Option ${i}`,
          disabled: i % 4 === 0,
        });
      }
      return data;
    };

    const data = ref<Option[]>(generateData());
    const value = ref([]);

    const generateData1 = () => {
      const data: Option1[] = [];
      const states = [
        "California",
        "Illinois",
        "Maryland",
        "Texas",
        "Florida",
        "Colorado",
        "Connecticut ",
      ];
      const initials = ["CA", "IL", "MD", "TX", "FL", "CO", "CT"];
      states.forEach((city, index) => {
        data.push({
          label: city,
          key: index,
          initial: initials[index],
        });
      });
      return data;
    };

    const generateData2 = () => {
      const data: Option2[] = [];
      for (let i = 1; i <= 15; i++) {
        data.push({
          value: i,
          desc: `Option ${i}`,
          disabled: i % 4 === 0,
        });
      }
      return data;
    };

    const data1 = ref<Option1[]>(generateData1());
    const value1 = ref([]);

    const filterMethod = (query, item) => {
      return item.initial.toLowerCase().includes(query.toLowerCase());
    };

    const data3 = ref(generateData());
    const rightValue = ref([1]);
    const leftValue = ref([1]);

    const renderFunc1 = (
      h: (type: string, props: VNodeProps | null, children?: string) => VNode,
      option: Option
    ) => {
      return h("span", null, option.label);
    };

    const handleChange = (
      value: number | string,
      direction: "left" | "right",
      movedKeys: string[] | number[]
    ) => {
      console.log(value, direction, movedKeys);
    };

    const data4 = ref<Option2[]>(generateData2());
    const value4 = ref([]);

    return {
      data,
      value,
      data1,
      value1,
      data3,
      data4,
      value4,
      rightValue,
      leftValue,
      filterMethod,
      handleChange,
      renderFunc1,
    };
  },
});
</script>

<style lang="less" scoped>
.cl-mb-10 {
  margin-bottom: 10px;
}
.transfer-footer {
  margin-left: 15px;
  padding: 6px 5px;
}
</style>
