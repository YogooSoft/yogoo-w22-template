<template>
  <page-wrapper title="输入框示例" content="根据JSON格式的数据进行导出">
    <collapse-container
      class="cl-mb-10"
      title="输入框示例"
      :can-expan="false"
      help-message="输入框示例"
    >
      <div class="demo-input-size">
        <div class="input-box">基础用法</div>
        <div class="input-box">一键清空</div>
        <div class="input-box">禁用状态</div>
      </div>
      <div class="demo-input-size">
        <div class="input-box-bottom">
          <el-input
            v-model="input"
            placeholder="Please input"
            style="width: 200px"
          />
        </div>
        <div class="input-box-bottom">
          <el-input
            v-model="input"
            placeholder="Please input"
            style="width: 200px"
            clearable
          />
        </div>
        <div class="input-box-bottom">
          <el-input
            v-model="input"
            disabled
            placeholder="Please input"
            style="width: 200px"
          />
        </div>
      </div>
    </collapse-container>
    <collapse-container
      class="cl-mb-10"
      title="密码输入框"
      :can-expan="false"
      help-message=""
    >
      <el-input
        v-model="input"
        type="password"
        placeholder="Please input password"
        style="width: 400px"
        show-password
      />
    </collapse-container>
    <collapse-container
      class="cl-mb-10"
      title="格式化"
      :can-expan="false"
      help-message=""
    >
      <!--  处理正则不生效问题 -->
      <div class="demo-input-size">
        <div class="input-box">方式1:oninput</div>
        <div class="input-box">方式2:@input methods</div>
        <div class="input-box">方式3:@input setup()</div>
        <div class="input-box">金额格式化</div>
      </div>
      <div class="demo-input-size">
        <el-input
          v-model="inputFormat1"
          placeholder="小数点后保留二位"
          oninput="value=value.replace( /^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3')"
          class="input-box"
        />
        <el-input
          v-model="inputFormat2"
          @input="formatNum2"
          placeholder="Please input"
          class="input-box"
        ></el-input>

        <el-input
          v-model="inputFormat3.value"
          @input="formatNum3"
          placeholder="Please input"
          class="input-box"
        ></el-input>
        <el-input
          v-model="inputFormat4.value"
          @input="formatNum4"
          placeholder="金额格式化"
          class="input-box"
        />
      </div>
    </collapse-container>
    <collapse-container
      class="cl-mb-10"
      title="尺寸"
      :can-expan="false"
      help-message=""
    >
      <div class="demo-input-size">
        <div class="input-box">Large</div>
        <div class="input-box">Default</div>
        <div class="input-box">Small</div>
      </div>
      <div class="demo-input-size">
        <el-input
          v-model="input1"
          class="input-box"
          size="large"
          placeholder="Please Input"
        />
        <el-input
          v-model="input2"
          class="input-box"
          placeholder="Please Input"
        />
        <el-input
          v-model="input3"
          class="input-box"
          size="small"
          placeholder="Please Input"
        />
      </div>
      <div class="demo-input-size">
        <el-input
          v-model="input1"
          class="input-box"
          size="large"
          placeholder="Please Input"
          :suffix-icon="Search"
        />
        <el-input
          v-model="input2"
          class="input-box"
          placeholder="Please Input"
          :suffix-icon="Search"
        />
        <el-input
          v-model="input3"
          class="input-box"
          size="small"
          placeholder="Please Input"
          :suffix-icon="Search"
        />
      </div>
      <div class="demo-input-size">
        <el-input
          v-model="input1"
          class="input-box-bottom"
          size="large"
          placeholder="Please Input"
          :prefix-icon="Search"
        />
        <el-input
          v-model="input2"
          class="input-box-bottom"
          placeholder="Please Input"
          :prefix-icon="Search"
        />
        <el-input
          v-model="input3"
          class="input-box-bottom"
          size="small"
          placeholder="Please Input"
          :prefix-icon="Search"
        />
      </div>
    </collapse-container>
    <collapse-container
      class="cl-mb-10"
      title="复合型输入框"
      :can-expan="false"
      help-message=""
    >
      <div>
        <el-input
          v-model="input1"
          placeholder="Please input"
          style="width: 600px"
        >
          <template #prepend>Http://</template>
        </el-input>
      </div>
      <div class="mt-4">
        <el-input
          v-model="input2"
          placeholder="Please input"
          style="width: 600px"
        >
          <template #append>.com</template>
        </el-input>
      </div>
      <div class="mt-4">
        <el-input
          v-model="input3"
          placeholder="Please input"
          class="input-with-select"
          style="width: 600px"
        >
          <template #prepend>
            <el-select
              v-model="select"
              placeholder="Select"
              style="width: 115px"
            >
              <el-option label="Restaurant" value="1" />
              <el-option label="Order No." value="2" />
              <el-option label="Tel" value="3" />
            </el-select>
          </template>
          <template #append>
            <el-button :icon="Search" />
          </template>
        </el-input>
      </div>
      <div class="mt-4">
        <el-input
          v-model="input3"
          placeholder="Please input"
          class="input-with-select"
          style="width: 600px"
        >
          <template #prepend>
            <el-button :icon="Search" />
          </template>
          <template #append>
            <el-select
              v-model="select"
              placeholder="Select"
              style="width: 115px"
            >
              <el-option label="Restaurant" value="1" />
              <el-option label="Order No." value="2" />
              <el-option label="Tel" value="3" />
            </el-select>
          </template>
        </el-input>
      </div>
    </collapse-container>
    <collapse-container
      class="cl-mb-10"
      title="文本域"
      :can-expan="false"
      help-message=""
    >
      <el-input
        v-model="textarea"
        :rows="2"
        type="textarea"
        placeholder="Please input"
        style="width: 800px"
      />
    </collapse-container>
    <collapse-container
      class="cl-mb-10"
      title="自适应文本域"
      :can-expan="false"
      help-message=""
    >
      <el-input
        v-model="textarea1"
        autosize
        type="textarea"
        placeholder="Please input"
        style="width: 800px"
      />
      <div style="margin: 10px 0" />
      <el-input
        v-model="textarea2"
        :autosize="{ minRows: 2, maxRows: 4 }"
        type="textarea"
        placeholder="Please input"
        style="width: 800px"
      />
    </collapse-container>
    <collapse-container
      class="cl-mb-10"
      title="输入长度限制"
      :can-expan="false"
      help-message=""
    >
      <el-input
        v-model="text"
        maxlength="10"
        placeholder="Please input"
        show-word-limit
        type="text"
        style="width: 800px"
      />
      <div style="margin: 10px 0" />
      <el-input
        v-model="textarea"
        maxlength="30"
        placeholder="Please input"
        show-word-limit
        type="textarea"
        style="width: 800px"
      />
    </collapse-container>
  </page-wrapper>
</template>

<script lang="ts">
import { defineComponent, computed, ref, reactive } from "vue";
import { PageWrapper } from "@/components/Page";
import { CollapseContainer } from "@/components/Container/index";
import { Search } from "@element-plus/icons-vue";

export default defineComponent({
  name: "demo_Input",
  components: {
    PageWrapper,
    CollapseContainer,
    Search,
  },
  data() {
    return {
      inputFormat2: "",
    };
  },
  methods: {
    // 处理正则不生效问题
    formatNum2(val) {
      // console.log("-------formatNum--------", val);
      let temp = val.toString();
      // temp = temp.replace(/。/g, ".");
      // temp = temp.replace(/[^\d.]/g, ""); //清除"数字"和"."以外的字符
      // temp = temp.replace(/^\./g, ""); //验证第一个字符是数字
      // temp = temp.replace(/\.{2,}/g, ""); //只保留第一个, 清除多余的
      // temp = temp.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
      temp = temp.replace(/^(\-)*(\d+)\.(\d\d).*$/, "$1$2.$3"); //只能输入两个小数

      this.inputFormat2 = temp;
    },
  },

  setup() {
    const input = ref("");
    const input1 = ref("");
    const input2 = ref("");
    const input3 = ref("");
    const select = ref("");
    const textarea = ref("");
    const textarea1 = ref("");
    const textarea2 = ref("");
    const text = ref("");
    let inputFormat1 = ref("");
    const num = ref("");
    // 处理正则不生效问题 使用reactive方式定义变量
    let inputFormat3 = reactive({ value: "", value2: "" });
    let inputFormat4 = reactive({ value: "", value2: "" });

    function formatNum3(val) {
      // console.log("-------formatNum--------", val);
      let temp = val.toString();
      // temp = temp.replace(/。/g, ".");
      // temp = temp.replace(/[^\d.]/g, ""); //清除"数字"和"."以外的字符
      // temp = temp.replace(/^\./g, ""); //验证第一个字符是数字
      // temp = temp.replace(/\.{2,}/g, ""); //只保留第一个, 清除多余的
      // temp = temp.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
      temp = temp.replace(/^(\-)*(\d+)\.(\d\d).*$/, "$1$2.$3"); //只能输入两个小数

      // temp = temp.replaceAll("1", ",");
      inputFormat3.value = temp;
    }

    function formatNum4(val) {
      // console.log("-------formatNum--------", val);
      let temp = val.toString();
      temp = temp.replace(/\$\s?|(,*)/g, "");
      temp = `$ ${temp}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

      // temp = temp.replaceAll("1", ",");
      inputFormat4.value = temp;
    }

    return {
      input,
      input1,
      input2,
      input3,
      select,
      Search,
      textarea,
      textarea1,
      textarea2,
      text,
      inputFormat1,
      inputFormat3,
      inputFormat4,
      num,
      formatNum3,
      formatNum4,
    };
  },
});
</script>

<style lang="less" scoped>
.input-with-select .el-input-group__prepend {
  background-color: var(--el-fill-color-blank);
}

.cl-mb-10 {
  margin-bottom: 10px;
}

.mt-4 {
  margin-top: 10px;
}

.demo-input-size {
  display: flex;
  /* 自动换行 */
  flex-wrap: wrap;

  // border: 1px solid #000;
  // margin: 0px;
  .input-box {
    width: 240px;
    margin: 0px 10px 10px 0px;
  }

  .input-box-bottom {
    width: 240px;
    margin: 0px 10px 0px 0px;
  }
}
</style>
