<template>
  <page-wrapper title="描述列表示例" content="">
    <collapse-container
      class="cl-mb-10"
      title="描述列表示例"
      :can-expan="true"
      help-message="列表形式展示多个字段。"
    >
      <el-descriptions title="User Info">
        <el-descriptions-item label="Username"
          >kooriookami</el-descriptions-item
        >
        <el-descriptions-item label="Telephone"
          >18100000000</el-descriptions-item
        >
        <el-descriptions-item label="Place">Suzhou</el-descriptions-item>
        <el-descriptions-item label="Remarks">
          <el-tag size="small">School</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="Address"
          >No.1188, Wuzhong Avenue, Wuzhong District, Suzhou, Jiangsu
          Province</el-descriptions-item
        >
      </el-descriptions>
    </collapse-container>
    <collapse-container
      class="cl-mb-10"
      title="不同尺寸"
      :can-expan="true"
      help-message=""
    >
      <el-radio-group v-model="size">
        <el-radio label="large">Large</el-radio>
        <el-radio>Default</el-radio>
        <el-radio label="small">Small</el-radio>
      </el-radio-group>

      <el-descriptions
        class="margin-top"
        title="With border"
        :column="3"
        :size="size"
        border
      >
        <template #extra>
          <el-button type="primary">Operation</el-button>
        </template>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              <el-icon :style="iconStyle">
                <user />
              </el-icon>
              Username
            </div>
          </template>
          kooriookami
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              <el-icon :style="iconStyle">
                <iphone />
              </el-icon>
              Telephone
            </div>
          </template>
          18100000000
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              <el-icon :style="iconStyle">
                <location />
              </el-icon>
              Place
            </div>
          </template>
          Suzhou
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              <el-icon :style="iconStyle">
                <tickets />
              </el-icon>
              Remarks
            </div>
          </template>
          <el-tag size="small">School</el-tag>
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              <el-icon :style="iconStyle">
                <office-building />
              </el-icon>
              Address
            </div>
          </template>
          No.1188, Wuzhong Avenue, Wuzhong District, Suzhou, Jiangsu Province
        </el-descriptions-item>
      </el-descriptions>

      <el-descriptions
        class="margin-top"
        title="Without border"
        :column="3"
        :size="size"
        :style="blockMargin"
      >
        <template #extra>
          <el-button type="primary">Operation</el-button>
        </template>
        <el-descriptions-item label="Username"
          >kooriookami</el-descriptions-item
        >
        <el-descriptions-item label="Telephone"
          >18100000000</el-descriptions-item
        >
        <el-descriptions-item label="Place">Suzhou</el-descriptions-item>
        <el-descriptions-item label="Remarks">
          <el-tag size="small">School</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="Address"
          >No.1188, Wuzhong Avenue, Wuzhong District, Suzhou, Jiangsu Province
        </el-descriptions-item>
      </el-descriptions>
    </collapse-container>
    <collapse-container
      class="cl-mb-10"
      title="垂直列表"
      :can-expan="true"
      help-message=""
    >
      <el-radio-group v-model="size">
        <el-radio label="large">Large</el-radio>
        <el-radio>Default</el-radio>
        <el-radio label="small">Small</el-radio>
      </el-radio-group>

      <el-descriptions
        title="Vertical list with border"
        direction="vertical"
        :column="4"
        :size="size"
        border
      >
        <el-descriptions-item label="Username"
          >kooriookami</el-descriptions-item
        >
        <el-descriptions-item label="Telephone"
          >18100000000</el-descriptions-item
        >
        <el-descriptions-item label="Place" :span="2"
          >Suzhou</el-descriptions-item
        >
        <el-descriptions-item label="Remarks">
          <el-tag size="small">School</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="Address"
          >No.1188, Wuzhong Avenue, Wuzhong District, Suzhou, Jiangsu Province
        </el-descriptions-item>
      </el-descriptions>

      <el-descriptions
        title="Vertical list without border"
        :column="4"
        :size="size"
        direction="vertical"
        :style="blockMargin"
      >
        <el-descriptions-item label="Username"
          >kooriookami</el-descriptions-item
        >
        <el-descriptions-item label="Telephone"
          >18100000000</el-descriptions-item
        >
        <el-descriptions-item label="Place" :span="2"
          >Suzhou</el-descriptions-item
        >
        <el-descriptions-item label="Remarks">
          <el-tag size="small">School</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="Address"
          >No.1188, Wuzhong Avenue, Wuzhong District, Suzhou, Jiangsu Province
        </el-descriptions-item>
      </el-descriptions>
    </collapse-container>
    <collapse-container
      class="cl-mb-10"
      title="自定义样式"
      :can-expan="true"
      help-message=""
    >
      <el-descriptions title="Customized style list" :column="3" border>
        <el-descriptions-item
          label="Username"
          label-align="right"
          align="center"
          label-class-name="my-label"
          class-name="my-content"
          width="150px"
          >kooriookami</el-descriptions-item
        >
        <el-descriptions-item
          label="Telephone"
          label-align="right"
          align="center"
          >18100000000</el-descriptions-item
        >
        <el-descriptions-item label="Place" label-align="right" align="center"
          >Suzhou</el-descriptions-item
        >
        <el-descriptions-item
          label="Remarks"
          label-align="right"
          align="center"
        >
          <el-tag size="small">School</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="Address" label-align="right" align="center"
          >No.1188, Wuzhong Avenue, Wuzhong District, Suzhou, Jiangsu
          Province</el-descriptions-item
        >
      </el-descriptions>
    </collapse-container>
  </page-wrapper>
</template>

<script lang="ts">
import { defineComponent, computed, ref,WritableComputedRef  } from "vue";
import { PageWrapper } from "@/components/Page";
import { CollapseContainer } from "@/components/Container/index";
import { ElDescriptions, ElDescriptionsItem, ElTag } from "element-plus";
import {
  Iphone,
  Location,
  OfficeBuilding,
  Tickets,
  User,
} from "@element-plus/icons-vue";


export default defineComponent({
  name: "descriptions",
  components: { CollapseContainer, PageWrapper,ElDescriptions,ElDescriptionsItem },

  setup(props) {
    const size = ref("small");

    const iconStyle = computed(() => {
      const marginMap = {
        large: "6px",
        default: "5px",
        small: "4px",
      };
      return {
        marginRight: marginMap[size.value] || marginMap.default,
      };
    });
    const blockMargin = computed(() => {
      const marginMap = {
        large: "28px",
        default: "26px",
        small: "24px",
      };
      return {
        marginTop: marginMap[size.value] || marginMap.default,
      };
    });

    return { size, iconStyle, blockMargin };
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

.el-descriptions {
  margin-top: 20px;
}
.cell-item {
  display: flex;
  align-items: center;
}
.margin-top {
  margin-top: 20px;
}

</style>
