<template>
  <page-wrapper title="多选框示例" content="">
    <collapse-container
      class="cl-mb-10"
      title="多选框示例"
      :can-expan="false"
      help-message="示例"
    >
      <div class="demo-checkbox-box">
        <div class="checkbox-box">
          <div>Large</div>
          <el-checkbox v-model="checked1" label="Option 1" size="large" />
          <el-checkbox v-model="checked2" label="Option 2" size="large" />
        </div>
        <div class="checkbox-box">
          <div>Default</div>
          <el-checkbox v-model="checked3" label="Option 1" />
          <el-checkbox v-model="checked4" label="Option 2" />
        </div>
        <div class="checkbox-box">
          <div>Small</div>
          <el-checkbox v-model="checked5" label="Option 1" size="small" />
          <el-checkbox v-model="checked6" label="Option 2" size="small" />
        </div>
        <div class="checkbox-box">
          <div>Disabled</div>
          <el-checkbox
            v-model="checked5"
            label="Option 1"
            size="small"
            disabled
          />
          <el-checkbox
            v-model="checked6"
            label="Option 2"
            size="small"
            disabled
          />
        </div>
      </div>
    </collapse-container>
    <collapse-container
      class="cl-mb-10"
      title="多选框组"
      :can-expan="false"
      help-message=""
    >
      <el-checkbox-group v-model="checkList">
        <el-checkbox label="Option A" />
        <el-checkbox label="Option B" />
        <el-checkbox label="Option C" />
        <el-checkbox label="disabled" disabled />
        <el-checkbox label="selected and disabled" disabled />
      </el-checkbox-group>
    </collapse-container>
    <collapse-container
      class="cl-mb-10"
      title="中间状态"
      :can-expan="false"
      help-message=""
    >
      <el-checkbox
        v-model="checkAll"
        :indeterminate="isIndeterminate"
        @change="handleCheckAllChange"
        >Check all</el-checkbox
      >
      <el-checkbox-group
        v-model="checkedCities"
        @change="handleCheckedCitiesChange"
      >
        <el-checkbox v-for="city in cities" :key="city" :label="city">{{
          city
        }}</el-checkbox>
      </el-checkbox-group>
    </collapse-container>
    <collapse-container
      class="cl-mb-10"
      title="可选项目数量的限制"
      :can-expan="false"
      help-message=""
    >
      <el-checkbox-group v-model="checkedCities" :min="1" :max="2">
        <el-checkbox v-for="city in cities" :key="city" :label="city">{{
          city
        }}</el-checkbox>
      </el-checkbox-group>
    </collapse-container>
    <collapse-container
      class="cl-mb-10"
      title="按钮样式"
      :can-expan="false"
      help-message=""
    >
      <div>
        <div style="margin: 0 0 10px">Large</div>
        <el-checkbox-group v-model="checkboxGroup1" size="large">
          <el-checkbox-button v-for="city in cities" :key="city" :label="city">
            {{ city }}
          </el-checkbox-button>
        </el-checkbox-group>
      </div>
      <div class="demo-button-style">
        <div style="margin: 0 0 10px">Default</div>
        <el-checkbox-group v-model="checkboxGroup2">
          <el-checkbox-button
            v-for="city in cities"
            :key="city"
            :label="city"
            >{{ city }}</el-checkbox-button
          >
        </el-checkbox-group>
      </div>
      <div class="demo-button-style">
        <div style="margin: 0 0 10px">Small</div>
        <el-checkbox-group v-model="checkboxGroup3" size="small">
          <el-checkbox-button
            v-for="city in cities"
            :key="city"
            :label="city"
            :disabled="city === 'Beijing'"
            >{{ city }}</el-checkbox-button
          >
        </el-checkbox-group>
      </div>
      <div class="demo-button-style">
        <div style="margin: 0 0 10px">Disabled</div>
        <el-checkbox-group v-model="checkboxGroup4" size="small" disabled>
          <el-checkbox-button
            v-for="city in cities"
            :key="city"
            :label="city"
            >{{ city }}</el-checkbox-button
          >
        </el-checkbox-group>
      </div>
    </collapse-container>
    <collapse-container
      class="cl-mb-10"
      title="带有边框"
      :can-expan="false"
      help-message=""
    >
      <div class="demo-checkbox-box">
        <div class="checkbox-box">
          <div style="margin: 0 0 10px">Large</div>
          <el-checkbox v-model="checked1" label="Option1" size="large" border />
          <el-checkbox v-model="checked2" label="Option2" size="large" border />
        </div>
        <div class="checkbox-box">
          <div style="margin: 0 0 10px">Default</div>
          <el-checkbox v-model="checked3" label="Option1" border />
          <el-checkbox v-model="checked4" label="Option2" border />
        </div>
        <div class="checkbox-box">
          <div style="margin: 0 0 10px">Small</div>
          <el-checkbox-group v-model="checkboxGroup1" size="small">
            <el-checkbox label="Option1" border />
            <el-checkbox label="Option2" border />
          </el-checkbox-group>
        </div>
        <div class="checkbox-box">
          <div style="margin: 0 0 10px">Disabled</div>
          <el-checkbox-group v-model="checkboxGroup1" size="small">
            <el-checkbox label="Option1" border disabled />
            <el-checkbox label="Option2" border disabled />
          </el-checkbox-group>
        </div>
      </div>
    </collapse-container>
  </page-wrapper>
</template>

<script lang="ts">
import { defineComponent, computed, ref, unref } from "vue";
import { PageWrapper } from "@/components/Page";
import { CollapseContainer } from "@/components/Container/index";
import { MoreFilled } from "@element-plus/icons-vue";

export default defineComponent({
  name: "demo_Timeline",
  components: {
    PageWrapper,
    CollapseContainer,
  },

  setup() {
    const checked1 = ref(true);
    const checked2 = ref(false);
    const checked3 = ref(false);
    const checked4 = ref(false);
    const checked5 = ref(false);
    const checked6 = ref(false);

    const checkboxGroup1 = ref(["Shanghai"]);
    const checkboxGroup2 = ref(["Shanghai"]);
    const checkboxGroup3 = ref(["Shanghai"]);
    const checkboxGroup4 = ref(["Shanghai"]);

    const checkList = ref(["selected and disabled", "Option A"]);
    const checkAll = ref(false);
    const isIndeterminate = ref(true);
    const checkedCities = ref(["Shanghai", "Beijing"]);
    const cities = ["Shanghai", "Beijing", "Guangzhou", "Shenzhen"];

    const handleCheckAllChange = (val: boolean) => {
      checkedCities.value = val ? cities : [];
      isIndeterminate.value = false;
    };
    const handleCheckedCitiesChange = (value: string[]) => {
      const checkedCount = value.length;
      checkAll.value = checkedCount === cities.length;
      isIndeterminate.value = checkedCount > 0 && checkedCount < cities.length;
    };

    return {
      checked1,
      checked2,
      checked3,
      checked4,
      checked5,
      checked6,
      checkList,
      checkAll,
      isIndeterminate,
      checkedCities,
      cities,
      handleCheckAllChange,
      handleCheckedCitiesChange,
      checkboxGroup1,
      checkboxGroup2,
      checkboxGroup3,
      checkboxGroup4,
    };
  },
});
</script>

<style lang="less" scoped>
.cl-mb-10 {
  margin-bottom: 10px;
}

.demo-button-style {
  margin-top: 10px;
}

.demo-checkbox-box {
  display: flex;
  /* 自动换行 */
  flex-wrap: wrap;
  // border: 1px solid #000;
  // margin: 0px;
  .checkbox-box {
    width: 240px;
    margin: 0px 10px 0px 0px;
  }
  .checkbox-box-bottom {
    width: 240px;
    margin: 0px 10px 0px 0px;
  }
}
</style>
