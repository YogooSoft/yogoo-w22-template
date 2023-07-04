<template>
  <page-wrapper title="表单示例" content="">
    <collapse-container
      class="cl-mb-10"
      title="典型表单"
      :can-expan="true"
      help-message=""
    >
      <div class="form_container">
        <el-form :model="form1" label-width="120px">
          <el-form-item label="Activity name">
            <el-input v-model="form1.name" />
          </el-form-item>
          <el-form-item label="Activity zone">
            <el-select
              v-model="form1.region"
              placeholder="please select your zone"
            >
              <el-option label="Zone one" value="shanghai" />
              <el-option label="Zone two" value="beijing" />
            </el-select>
          </el-form-item>
          <el-form-item label="Activity time">
            <el-col :span="11">
              <el-date-picker
                v-model="form1.date1"
                type="date"
                placeholder="Pick a date"
                style="width: 100%"
              />
            </el-col>
            <el-col :span="2" class="text-center">
              <span class="text-gray-500">-</span>
            </el-col>
            <el-col :span="11">
              <el-time-picker
                v-model="form1.date2"
                placeholder="Pick a time"
                style="width: 100%"
              />
            </el-col>
          </el-form-item>
          <el-form-item label="Instant delivery">
            <el-switch v-model="form1.delivery" />
          </el-form-item>
          <el-form-item label="Activity type">
            <el-checkbox-group v-model="form1.type">
              <el-checkbox label="Online activities" name="type" />
              <el-checkbox label="Promotion activities" name="type" />
              <el-checkbox label="Offline activities" name="type" />
              <el-checkbox label="Simple brand exposure" name="type" />
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="Resources">
            <el-radio-group v-model="form1.resource">
              <el-radio label="Sponsor" />
              <el-radio label="Venue" />
            </el-radio-group>
          </el-form-item>
          <el-form-item label="Activity form">
            <el-input v-model="form1.desc" type="textarea" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">Create</el-button>
            <el-button>Cancel</el-button>
          </el-form-item>
        </el-form>
      </div>
    </collapse-container>
    <collapse-container
      class="cl-mb-10"
      title="行内表单"
      :can-expan="true"
      help-message="当垂直方向空间受限且表单较简单时，可以在一行内放置表单。"
    >
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="Approved by">
          <el-input v-model="formInline.user" placeholder="Approved by" />
        </el-form-item>
        <el-form-item label="Activity zone">
          <el-select v-model="formInline.region" placeholder="Activity zone">
            <el-option label="Zone one" value="shanghai" />
            <el-option label="Zone two" value="beijing" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">Query</el-button>
        </el-form-item>
      </el-form>
    </collapse-container>
    <collapse-container
      class="cl-mb-10"
      title="对齐方式"
      :can-expan="true"
      help-message=""
    >
      <el-radio-group v-model="labelPosition" label="label position">
        <el-radio-button label="left">Left</el-radio-button>
        <el-radio-button label="right">Right</el-radio-button>
        <el-radio-button label="top">Top</el-radio-button>
      </el-radio-group>
      <div style="margin: 20px" />
      <el-form
        :label-position="labelPosition"
        label-width="100px"
        :model="formLabelAlign"
        style="max-width: 460px"
      >
        <el-form-item label="Name">
          <el-input v-model="formLabelAlign.name" />
        </el-form-item>
        <el-form-item label="Activity zone">
          <el-input v-model="formLabelAlign.region" />
        </el-form-item>
        <el-form-item label="Activity form">
          <el-input v-model="formLabelAlign.type" />
        </el-form-item>
      </el-form>
    </collapse-container>
    <collapse-container
      class="cl-mb-10"
      title="表单校验"
      :can-expan="true"
      help-message="Form 组件允许你验证用户的输入是否符合规范，来帮助你找到和纠正错误。"
    >
      <div class="form_container">
        <el-form
          ref="ruleFormRef"
          :model="ruleForm"
          :rules="rules"
          label-width="120px"
          class="demo-ruleForm"
          :size="formSize"
          status-icon
        >
          <el-form-item label="Activity name" prop="name">
            <el-input v-model="ruleForm.name" />
          </el-form-item>
          <el-form-item label="Activity zone" prop="region">
            <el-select v-model="ruleForm.region" placeholder="Activity zone">
              <el-option label="Zone one" value="shanghai" />
              <el-option label="Zone two" value="beijing" />
            </el-select>
          </el-form-item>
          <el-form-item label="Activity count" prop="count">
            <el-select-v2
              v-model="ruleForm.count"
              placeholder="Activity count"
              :options="options"
            />
          </el-form-item>
          <el-form-item label="Activity time" required>
            <el-col :span="11">
              <el-form-item prop="date1">
                <el-date-picker
                  v-model="ruleForm.date1"
                  type="date"
                  label="Pick a date"
                  placeholder="Pick a date"
                  style="width: 100%"
                />
              </el-form-item>
            </el-col>
            <el-col class="text-center" :span="2">
              <span class="text-gray-500">-</span>
            </el-col>
            <el-col :span="11">
              <el-form-item prop="date2">
                <el-time-picker
                  v-model="ruleForm.date2"
                  label="Pick a time"
                  placeholder="Pick a time"
                  style="width: 100%"
                />
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item label="Instant delivery" prop="delivery">
            <el-switch v-model="ruleForm.delivery" />
          </el-form-item>
          <el-form-item label="Activity type" prop="type">
            <el-checkbox-group v-model="ruleForm.type">
              <el-checkbox label="Online activities" name="type" />
              <el-checkbox label="Promotion activities" name="type" />
              <el-checkbox label="Offline activities" name="type" />
              <el-checkbox label="Simple brand exposure" name="type" />
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="Resources" prop="resource">
            <el-radio-group v-model="ruleForm.resource">
              <el-radio label="Sponsorship" />
              <el-radio label="Venue" />
            </el-radio-group>
          </el-form-item>
          <el-form-item label="Activity form" prop="desc">
            <el-input v-model="ruleForm.desc" type="textarea" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm(ruleFormRef)">
              Create
            </el-button>
            <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
          </el-form-item>
        </el-form>
      </div>
    </collapse-container>
    <collapse-container
      class="cl-mb-10"
      title="自定义校验规则"
      :can-expan="true"
      help-message="这个例子中展示了如何使用自定义验证规则来完成密码的二次验证。"
    >
      <div class="form_container">
        <el-form
          ref="ruleFormRef"
          :model="ruleForm1"
          status-icon
          :rules="rules1"
          label-width="120px"
          class="demo-ruleForm"
        >
          <el-form-item label="Password" prop="pass">
            <el-input
              v-model="ruleForm1.pass"
              type="password"
              autocomplete="off"
            />
          </el-form-item>
          <el-form-item label="Confirm" prop="checkPass">
            <el-input
              v-model="ruleForm1.checkPass"
              type="password"
              autocomplete="off"
            />
          </el-form-item>
          <el-form-item label="Age" prop="age">
            <el-input v-model.number="ruleForm1.age" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm1(ruleFormRef)"
              >Submit</el-button
            >
            <el-button @click="resetForm1(ruleFormRef)">Reset</el-button>
          </el-form-item>
        </el-form>
      </div>
    </collapse-container>
    <collapse-container
      class="cl-mb-10"
      title="添加/删除表单项"
      :can-expan="true"
      help-message="除了一次通过表单组件上的所有验证规则外. 您也可以动态地通过验证规则或删除单个表单字段的规则。"
    >
      <div class="form_container">
        <el-form
          ref="formRef"
          :model="dynamicValidateForm"
          label-width="120px"
          class="demo-dynamic"
        >
          <el-form-item
            prop="email"
            label="Email"
            :rules="[
              {
                required: true,
                message: 'Please input email address',
                trigger: 'blur',
              },
              {
                type: 'email',
                message: 'Please input correct email address',
                trigger: ['blur', 'change'],
              },
            ]"
          >
            <el-input v-model="dynamicValidateForm.email" />
          </el-form-item>
          <el-form-item
            v-for="(domain, index) in dynamicValidateForm.domains"
            :key="domain.key"
            :label="'Domain' + index"
            :prop="'domains.' + index + '.value'"
            :rules="{
              required: true,
              message: 'domain can not be null',
              trigger: 'blur',
            }"
          >
            <el-input v-model="domain.value" style="margin-bottom: 5px" />
            <el-button
              size="small"
              class="mt-2"
              @click.prevent="removeDomain(domain)"
              >Delete</el-button
            >
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm(formRef)"
              >Submit</el-button
            >
            <el-button @click="addDomain">New domain</el-button>
            <el-button @click="resetForm2(formRef)">Reset</el-button>
          </el-form-item>
        </el-form>
      </div>
    </collapse-container>
    <collapse-container
      class="cl-mb-10"
      title="数字类型验证"
      :can-expan="true"
      help-message="数字类型的验证需要在 v-model 处加上 .number 的修饰符，这是 Vue 自身提供的用于将绑定值转化为 number 类型的修饰符。"
    >
      <div class="form_container">
        <el-form
          ref="formRef"
          :model="numberValidateForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item
            label="age"
            prop="age"
            :rules="[
              { required: true, message: 'age is required' },
              { type: 'number', message: 'age must be a number' },
            ]"
          >
            <el-input
              v-model.number="numberValidateForm.age"
              type="text"
              autocomplete="off"
            />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm3(formRef)"
              >Submit</el-button
            >
            <el-button @click="resetForm3(formRef)">Reset</el-button>
          </el-form-item>
        </el-form>
      </div>
    </collapse-container>
    <collapse-container
      class="cl-mb-10"
      title="尺寸控制"
      :can-expan="true"
      help-message="表单中的所有子组件都继承了该表单的 size 属性。 同样，form-item 也有一个 size 属性。"
    >
      <div class="form_container">
        <div>
          <el-radio-group
            v-model="size"
            label="size control"
            style="margin-right: 14px"
          >
            <el-radio-button label="large">large</el-radio-button>
            <el-radio-button label="default">default</el-radio-button>
            <el-radio-button label="small">small</el-radio-button>
          </el-radio-group>

          <el-radio-group v-model="labelPosition4" label="position control">
            <el-radio-button label="left">Left</el-radio-button>
            <el-radio-button label="right">Right</el-radio-button>
            <el-radio-button label="top">Top</el-radio-button>
          </el-radio-group>
        </div>
        <br />
        <el-form
          ref="form"
          :model="sizeForm"
          label-width="auto"
          :label-position="labelPosition4"
          :size="size"
        >
          <el-form-item label="Activity name">
            <el-input v-model="sizeForm.name" />
          </el-form-item>
          <el-form-item label="Activity zone">
            <el-select
              v-model="sizeForm.region"
              placeholder="please select your zone"
            >
              <el-option label="Zone one" value="shanghai" />
              <el-option label="Zone two" value="beijing" />
            </el-select>
          </el-form-item>
          <el-form-item label="Activity time">
            <el-col :span="11">
              <el-date-picker
                v-model="sizeForm.date1"
                type="date"
                label="Pick a date"
                placeholder="Pick a date"
                style="width: 100%"
              />
            </el-col>
            <el-col class="text-center" :span="1" style="margin: 0 0.5rem"
              >-</el-col
            >
            <el-col :span="11">
              <el-time-picker
                v-model="sizeForm.date2"
                label="Pick a time"
                placeholder="Pick a time"
                style="width: 100%"
              />
            </el-col>
          </el-form-item>
          <el-form-item label="Activity type">
            <el-checkbox-group v-model="sizeForm.type">
              <el-checkbox-button label="Online activities" name="type" />
              <el-checkbox-button label="Promotion activities" name="type" />
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="Resources">
            <el-radio-group v-model="sizeForm.resource">
              <el-radio border label="Sponsor" />
              <el-radio border label="Venue" />
            </el-radio-group>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit4">Create</el-button>
            <el-button>Cancel</el-button>
          </el-form-item>
        </el-form>
      </div>
    </collapse-container>
    <collapse-container
      class="cl-mb-10"
      title="无障碍"
      :can-expan="true"
      help-message="当在 el-form-item 内只有一个输入框（或相关的控制部件，如选择或复选框），表单项的标签将自动附加在那个输入框上。"
    >
      <div class="form_container">
        <el-form
          label-position="left"
          label-width="150px"
          style="max-width: 460px"
        >
          <el-space fill>
            <!-- <el-alert title="标签 ‘全名’ 自动附加到输入上。" type="info" show-icon /> -->
            <el-alert type="info" show-icon :closable="false">
              标签 "全名" 自动附加到输入上。
            </el-alert>
            <el-form-item label="Full Name">
              <el-input v-model="formAccessibility.fullName" />
            </el-form-item>
          </el-space>
          <el-space fill>
            <el-alert type="info" show-icon :closable="false">
              <p>
                "您的信息" 作为输入组的标签。
                <br />
                您必须在单个输入上指定标签。占位符不能是使用“标签”属性的替代品。
              </p>
            </el-alert>
            <el-form-item label="Your Information">
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-input
                    v-model="formAccessibility.firstName"
                    label="First Name"
                    placeholder="First Name"
                  />
                </el-col>
                <el-col :span="12">
                  <el-input
                    v-model="formAccessibility.lastName"
                    label="Last Name"
                    placeholder="Last Name"
                  />
                </el-col>
              </el-row>
            </el-form-item>
          </el-space>
        </el-form>
      </div>
    </collapse-container>
  </page-wrapper>
</template>

<script lang="ts">
import { defineComponent, computed, ref, reactive } from "vue";
import { PageWrapper } from "@/components/Page";
import { CollapseContainer } from "@/components/Container/index";
import { ElMessage } from "element-plus";
import type { FormInstance, FormRules } from "element-plus";

interface DomainItem {
  key: number;
  value: string;
}

export default defineComponent({
  name: "basicForm",
  components: { CollapseContainer, PageWrapper },

  setup(props) {
    // do not use same name with ref
    const form1 = reactive({
      name: "",
      region: "",
      date1: "",
      date2: "",
      delivery: false,
      type: [],
      resource: "",
      desc: "",
    });

    const labelPosition = ref("right");
    const formLabelAlign = reactive({
      name: "",
      region: "",
      type: "",
    });

    const onSubmit = () => {
      // console.log("submit!");
      ElMessage({
        type: "info",
        message: "submit",
      });
    };

    const formInline = reactive({
      user: "",
      region: "",
    });

    const formSize = ref("default");
    const ruleFormRef = ref<FormInstance>();
    const ruleForm = reactive({
      name: "Hello",
      region: "",
      count: "",
      date1: "",
      date2: "",
      delivery: false,
      type: [],
      resource: "",
      desc: "",
    });

    const rules = reactive<FormRules>({
      name: [
        {
          required: true,
          message: "Please input Activity name",
          trigger: "blur",
        },
        { min: 3, max: 5, message: "Length should be 3 to 5", trigger: "blur" },
      ],
      region: [
        {
          required: true,
          message: "Please select Activity zone",
          trigger: "change",
        },
      ],
      count: [
        {
          required: true,
          message: "Please select Activity count",
          trigger: "change",
        },
      ],
      date1: [
        {
          type: "date",
          required: true,
          message: "Please pick a date",
          trigger: "change",
        },
      ],
      date2: [
        {
          type: "date",
          required: true,
          message: "Please pick a time",
          trigger: "change",
        },
      ],
      type: [
        {
          type: "array",
          required: true,
          message: "Please select at least one activity type",
          trigger: "change",
        },
      ],
      resource: [
        {
          required: true,
          message: "Please select activity resource",
          trigger: "change",
        },
      ],
      desc: [
        {
          required: true,
          message: "Please input activity form",
          trigger: "blur",
        },
      ],
    });

    const submitForm = async (formEl: FormInstance | undefined) => {
      if (!formEl) return;
      await formEl.validate((valid, fields) => {
        if (valid) {
          console.log("submit!");
        } else {
          console.log("error submit!", fields);
        }
      });
    };

    const resetForm = (formEl: FormInstance | undefined) => {
      if (!formEl) return;
      formEl.resetFields();
    };

    const options = Array.from({ length: 10000 }).map((_, idx) => ({
      value: `${idx + 1}`,
      label: `${idx + 1}`,
    }));

    //自定义校验规则
    // const ruleFormRef = ref<FormInstance>()

    const checkAge = (rule: any, value: any, callback: any) => {
      if (!value) {
        return callback(new Error("Please input the age"));
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error("Please input digits"));
        } else {
          if (value < 18) {
            callback(new Error("Age must be greater than 18"));
          } else {
            callback();
          }
        }
      }, 1000);
    };

    const validatePass = (rule: any, value: any, callback: any) => {
      if (value === "") {
        callback(new Error("Please input the password"));
      } else {
        if (ruleForm1.checkPass !== "") {
          if (!ruleFormRef.value) return;
          ruleFormRef.value.validateField("checkPass", () => null);
        }
        callback();
      }
    };
    const validatePass2 = (rule: any, value: any, callback: any) => {
      if (value === "") {
        callback(new Error("Please input the password again"));
      } else if (value !== ruleForm1.pass) {
        callback(new Error("Two inputs don't match!"));
      } else {
        callback();
      }
    };

    const ruleForm1 = reactive({
      pass: "",
      checkPass: "",
      age: "",
    });

    const rules1 = reactive({
      pass: [{ validator: validatePass, trigger: "blur" }],
      checkPass: [{ validator: validatePass2, trigger: "blur" }],
      age: [{ validator: checkAge, trigger: "blur" }],
    });

    const submitForm1 = (formEl: FormInstance | undefined) => {
      if (!formEl) return;
      formEl.validate((valid) => {
        if (valid) {
          console.log("submit!");
        } else {
          console.log("error submit!");
          return false;
        }
      });
    };

    const resetForm1 = (formEl: FormInstance | undefined) => {
      if (!formEl) return;
      formEl.resetFields();
    };

    //添加/删除表单项
    const formRef = ref<FormInstance>();
    const dynamicValidateForm = reactive<{
      domains: DomainItem[];
      email: string;
    }>({
      domains: [
        {
          key: 1,
          value: "",
        },
      ],
      email: "",
    });

    const removeDomain = (item: DomainItem) => {
      const index = dynamicValidateForm.domains.indexOf(item);
      if (index !== -1) {
        dynamicValidateForm.domains.splice(index, 1);
      }
    };

    const addDomain = () => {
      dynamicValidateForm.domains.push({
        key: Date.now(),
        value: "",
      });
    };

    const submitForm2 = (formEl: FormInstance | undefined) => {
      if (!formEl) return;
      formEl.validate((valid) => {
        if (valid) {
          console.log("submit!");
        } else {
          console.log("error submit!");
          return false;
        }
      });
    };

    const resetForm2 = (formEl: FormInstance | undefined) => {
      if (!formEl) return;
      formEl.resetFields();
    };

    //数据类型验证
    // const formRef = ref<FormInstance>()

    const numberValidateForm = reactive({
      age: "",
    });

    const submitForm3 = (formEl: FormInstance | undefined) => {
      if (!formEl) return;
      formEl.validate((valid) => {
        if (valid) {
          console.log("submit!");
        } else {
          console.log("error submit!");
          return false;
        }
      });
    };

    const resetForm3 = (formEl: FormInstance | undefined) => {
      if (!formEl) return;
      formEl.resetFields();
    };

    //尺寸控制
    const size = ref("default");
    const labelPosition4 = ref("right");

    const sizeForm = reactive({
      name: "",
      region: "",
      date1: "",
      date2: "",
      delivery: false,
      type: [],
      resource: "",
      desc: "",
    });

    function onSubmit4() {
      console.log("submit!");
    }

    //无障碍

    const formAccessibility = reactive({
      fullName: "",
      firstName: "",
      lastName: "",
    });

    return {
      form1,
      onSubmit,
      formInline,
      labelPosition,
      formLabelAlign,
      formSize,
      ruleFormRef,
      ruleForm,
      rules,
      submitForm,
      resetForm,
      options,
      checkAge,
      validatePass,
      validatePass2,
      ruleForm1,
      rules1,
      submitForm1,
      resetForm1,
      formRef,
      dynamicValidateForm,
      removeDomain,
      addDomain,
      submitForm2,
      resetForm2,
      submitForm3,
      resetForm3,
      numberValidateForm,
      size,
      labelPosition4,
      sizeForm,
      onSubmit4,
      formAccessibility,
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
// .el-alert {
//   margin-bottom: 10px;
// }
.form_container {
  width: 600px;
}
</style>
