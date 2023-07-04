<template>
  <page-wrapper title="选择器示例" content="">
    <collapse-container
      class="cl-mb-10"
      title="选择器示例"
      :can-expan="true"
      help-message="当选项过多时，使用下拉菜单展示并选择内容。"
    >
      <div class="demo-select-size">
        <div class="select-box">Large</div>
        <div class="select-box">Default</div>
        <div class="select-box">Small</div>
      </div>
      <div class="demo-select-size">
        <el-select
          v-model="value"
          class="select-box"
          placeholder="Select"
          size="large"
          style="margin-right: 10px"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <el-select
          v-model="value"
          class="select-box"
          placeholder="Select"
          style="margin-right: 10px"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <el-select
          v-model="value"
          class="select-box"
          placeholder="Select"
          size="small"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
    </collapse-container>
    <collapse-container
      class="cl-mb-10"
      title="有禁用选项"
      :can-expan="true"
      help-message="在 el-option 中，设定 disabled 值为 true，即可禁用该选项"
    >
      <el-select v-model="value" placeholder="Select">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
          :disabled="item.disabled"
        />
      </el-select>
    </collapse-container>
    <collapse-container
      class="cl-mb-10"
      title="禁用状态"
      :can-expan="true"
      help-message=""
    >
      <el-select v-model="value" disabled placeholder="Select">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </collapse-container>
    <collapse-container
      class="cl-mb-10"
      title="可清空单选"
      :can-expan="true"
      help-message=""
    >
      <el-select v-model="value" clearable placeholder="Select">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </collapse-container>
    <collapse-container
      class="cl-mb-10"
      title="基础多选"
      :can-expan="true"
      help-message=""
    >
      <div class="demo-select-size">
        <div class="select-box">default</div>
        <div class="select-box">use collapse-tags</div>
        <div class="select-box">use collapse-tags-tooltip</div>
      </div>
      <div class="demo-select-size">
        <div class="select-box">
          <el-select
            v-model="value1"
            multiple
            placeholder="Select"
            style="width: 240px"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <div class="select-box">
          <el-select
            v-model="value3"
            multiple
            collapse-tags
            collapse-tags-tooltip
            placeholder="Select"
            style="width: 240px"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <div class="select-box">
          <el-select
            v-model="value3"
            multiple
            collapse-tags
            collapse-tags-tooltip
            placeholder="Select"
            style="width: 240px"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
      </div>
    </collapse-container>
    <collapse-container
      class="cl-mb-10"
      title="自定义模板"
      :can-expan="true"
      help-message=""
    >
      <el-select v-model="value" placeholder="Select">
        <el-option
          v-for="item in cities"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
          <span style="float: left">{{ item.label }}</span>
          <span
            style="
              float: right;
              color: var(--el-text-color-secondary);
              font-size: 13px;
            "
            >{{ item.value }}</span
          >
        </el-option>
      </el-select>
    </collapse-container>
    <collapse-container
      class="cl-mb-10"
      title="将选项进行分组"
      :can-expan="true"
      help-message=""
    >
      <el-select v-model="value" placeholder="Select">
        <el-option-group
          v-for="group in options1"
          :key="group.label"
          :label="group.label"
        >
          <el-option
            v-for="item in group.options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-option-group>
      </el-select>
    </collapse-container>
    <collapse-container
      class="cl-mb-10"
      title="筛选选项"
      :can-expan="true"
      help-message=""
    >
      <el-select v-model="value" filterable placeholder="Select">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </collapse-container>
    <collapse-container
      class="cl-mb-10"
      title="远程搜索"
      :can-expan="true"
      help-message="输入关键字以从远程服务器中查找数据。"
    >
      <div class="demo-select-size">
        <div class="select-box">default</div>
        <div class="select-box">use remote-show-suffix</div>
      </div>
      <div class="demo-select-size">
        <div class="select-box">
          <el-select
            v-model="value4"
            multiple
            filterable
            remote
            reserve-keyword
            placeholder="Please enter a keyword"
            :remote-method="remoteMethod"
            :loading="loading"
          >
            <el-option
              v-for="item in options2"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <div class="select-box">
          <el-select
            v-model="value4"
            multiple
            filterable
            remote
            reserve-keyword
            placeholder="Please enter a keyword"
            remote-show-suffix
            :remote-method="remoteMethod"
            :loading="loading"
          >
            <el-option
              v-for="item in options2"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
      </div>
    </collapse-container>
    <collapse-container
      class="cl-mb-10"
      title="创建新的选项"
      :can-expan="true"
      help-message="创建并选中未包含在初始选项中的条目。"
    >
      <el-select
        v-model="value"
        multiple
        filterable
        allow-create
        default-first-option
        :reserve-keyword="false"
        placeholder="Choose tags for your article"
      >
        <el-option
          v-for="item in options3"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </collapse-container>
  </page-wrapper>
</template>

<script lang="ts">
import { defineComponent, computed, ref, onMounted } from "vue";
import { PageWrapper } from "@/components/Page";
import { CollapseContainer } from "@/components/Container/index";

export default defineComponent({
  name: "select",
  components: { CollapseContainer, PageWrapper },

  setup(props) {
    const value = ref("");
    const value1 = ref("");
    const value2 = ref("");
    const value3 = ref("");

    const options = [
      {
        value: "Option1",
        label: "Option1",
      },
      {
        value: "Option2",
        label: "Option2",
        disabled: true,
      },
      {
        value: "Option3",
        label: "Option3",
      },
      {
        value: "Option4",
        label: "Option4",
      },
      {
        value: "Option5",
        label: "Option5",
      },
    ];

    const options1 = [
      {
        label: "Popular cities",
        options: [
          {
            value: "Shanghai",
            label: "Shanghai",
          },
          {
            value: "Beijing",
            label: "Beijing",
          },
        ],
      },
      {
        label: "City name",
        options: [
          {
            value: "Chengdu",
            label: "Chengdu",
          },
          {
            value: "Shenzhen",
            label: "Shenzhen",
          },
          {
            value: "Guangzhou",
            label: "Guangzhou",
          },
          {
            value: "Dalian",
            label: "Dalian",
          },
        ],
      },
    ];

    const cities = [
      {
        value: "Beijing",
        label: "Beijing",
      },
      {
        value: "Shanghai",
        label: "Shanghai",
      },
      {
        value: "Nanjing",
        label: "Nanjing",
      },
      {
        value: "Chengdu",
        label: "Chengdu",
      },
      {
        value: "Shenzhen",
        label: "Shenzhen",
      },
      {
        value: "Guangzhou",
        label: "Guangzhou",
      },
    ];

    interface ListItem {
      value: string;
      label: string;
    }

    const list = ref<ListItem[]>([]);
    const options2 = ref<ListItem[]>([]);
    const value4 = ref<string[]>([]);
    const loading = ref(false);

    onMounted(() => {
      list.value = states.map((item) => {
        return { value: `value:${item}`, label: `label:${item}` };
      });
    });

    const remoteMethod = (query: string) => {
      if (query) {
        loading.value = true;
        setTimeout(() => {
          loading.value = false;
          options2.value = list.value.filter((item) => {
            return item.label.toLowerCase().includes(query.toLowerCase());
          });
        }, 200);
      } else {
        options2.value = [];
      }
    };

    const states = [
      "Alabama",
      "Alaska",
      "Arizona",
      "Arkansas",
      "California",
      "Colorado",
      "Connecticut",
      "Delaware",
      "Florida",
      "Georgia",
      "Hawaii",
      "Idaho",
      "Illinois",
      "Indiana",
      "Iowa",
      "Kansas",
      "Kentucky",
      "Louisiana",
      "Maine",
      "Maryland",
      "Massachusetts",
      "Michigan",
      "Minnesota",
      "Mississippi",
      "Missouri",
      "Montana",
      "Nebraska",
      "Nevada",
      "New Hampshire",
      "New Jersey",
      "New Mexico",
      "New York",
      "North Carolina",
      "North Dakota",
      "Ohio",
      "Oklahoma",
      "Oregon",
      "Pennsylvania",
      "Rhode Island",
      "South Carolina",
      "South Dakota",
      "Tennessee",
      "Texas",
      "Utah",
      "Vermont",
      "Virginia",
      "Washington",
      "West Virginia",
      "Wisconsin",
      "Wyoming",
    ];

    const options3 = [
      {
        value: "HTML",
        label: "HTML",
      },
      {
        value: "CSS",
        label: "CSS",
      },
      {
        value: "JavaScript",
        label: "JavaScript",
      },
    ];

    return {
      value,
      value1,
      value2,
      value3,
      value4,
      options,
      options1,
      options2,
      options3,
      cities,
      list,
      loading,
      remoteMethod,
    };
  },
});
</script>

<style lang="less" scoped>
.cl-mb-10 {
  margin-bottom: 10px;
}

.demo-select-size {
  display: flex;
  /* 自动换行 */
  flex-wrap: wrap;
  // border: 1px solid #000;
  // margin: 0px;
  .select-box {
    width: 240px;
    margin: 0px 10px 10px 0px;
  }

  .select-box-bottom {
    width: 240px;
    margin: 0px 10px 0px 0px;
  }
}
</style>
