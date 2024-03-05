<template>
  <page-wrapper title="货币输入" content="">
    <collapse-container
      class="cl-mb-10"
      title="基础用法"
      :can-expan="false"
      help-message="基础用法"
    >
      <div class="demo-input-size">
        <div class="input-box">原始数值: {{ num1 }}</div>
      </div>
      <div class="demo-input-size">
        <div class="input-box-bottom">
          <CurrencyInput
            v-model="num1"
            :options="{
              locale: 'zh-ZH',
              currency: 'CNY', //必填项。ISO 4217 货币代码，例如：'USD'、'EUR'
              precision: 2, //精度
              currencyDisplay: 'symbol', //如何以货币格式显示货币，可传'symbol','narrowSymbol','code','name','hidden'
            }"
          />
        </div>
      </div>
    </collapse-container>
    <collapse-container
      class="cl-mb-10"
      title="地区、货币类型、 货币显示格式"
      :can-expan="false"
      help-message="地区、货币类型、 货币显示格式"
    >
      <div class="content">
        <div class="fix">
          <span class="lable">地区</span>
          <el-select style="width: 100px" v-model="currencyConfig.locale">
            <el-option
              v-for="item in currencyConfig.locale_arr"
              :key="item"
              :label="item"
              :value="item"
            ></el-option>
          </el-select>

          <span class="lable" style="margin-left: 10px">货币类型</span>
          <el-select
            v-model="currencyConfig.type"
            filterable
            placeholder="货币类型"
            style="margin-right: 10px; width: 130px"
          >
            <el-option
              v-for="item in currencyConfig.type_arr"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
          <span class="lable" style="margin-left: 10px">货币显示格式</span>
          <el-select
            v-model="currencyConfig.format"
            filterable
            placeholder="货币显示格式"
            style="margin-right: 10px; width: 130px"
          >
            <el-option
              v-for="item in currencyConfig.format_arr"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
        </div>
      </div>

      <div class="demo-input-size">
        <div class="input-box">
          原始数值: {{ num2 }} {{ currencyConfig.locale }}
        </div>
      </div>
      <div class="demo-input-size">
        <div class="input-box-bottom">
          <CurrencyInput
            v-model="num2"
            :options="{
              locale: currencyConfig.locale,
              currency: currencyConfig.type, //必填项。ISO 4217 货币代码，例如：'USD'、'EUR'
              precision: 2, //精度
              currencyDisplay: currencyConfig.format, //显示货币，可传'symbol','narrowSymbol','code','name','hidden'
              hideGroupingSeparatorOnFocus: true, //是否鼠标聚焦时隐藏分隔符
            }"
          />
        </div>
      </div>
    </collapse-container>
    <collapse-container
      class="cl-mb-10"
      title="分隔符"
      :can-expan="false"
      help-message="分隔符"
    >
      <div class="demo-input-size">
        <div class="input-box">使用分隔符</div>
        <div class="input-box">取消分隔符</div>
        <div class="input-box">聚焦时显示分隔符</div>
      </div>
      <div class="demo-input-size">
        <div class="input-box-bottom">
          <CurrencyInput
            v-model="num3"
            :options="{
              locale: 'zh-ZH',
              currency: 'CNY', //必填项。ISO 4217 货币代码，例如：'USD'、'EUR'
              precision: 2, //精度
              currencyDisplay: 'symbol', //如何以货币格式显示货币，可传'symbol','narrowSymbol','code','name','hidden'
              useGrouping: true, // 使用分隔符
            }"
          />
        </div>
        <div class="input-box-bottom">
          <CurrencyInput
            v-model="num3"
            :options="{
              locale: 'zh-ZH',
              currency: 'CNY', //必填项。ISO 4217 货币代码，例如：'USD'、'EUR'
              precision: 2, //精度
              currencyDisplay: 'symbol', //如何以货币格式显示货币，可传'symbol','narrowSymbol','code','name','hidden'
              useGrouping: false, // 取消分隔符
            }"
          />
        </div>
        <div class="input-box-bottom">
          <CurrencyInput
            v-model="num3"
            :options="{
              locale: 'zh-ZH',
              currency: 'CNY', //必填项。ISO 4217 货币代码，例如：'USD'、'EUR'
              precision: 2, //精度
              currencyDisplay: 'symbol', //如何以货币格式显示货币，可传'symbol','narrowSymbol','code','name','hidden'
              useGrouping: true, // 使用分隔符
              hideGroupingSeparatorOnFocus: false, //聚焦显示分隔符
            }"
          />
        </div>
      </div>
    </collapse-container>
    <collapse-container
      class="cl-mb-10"
      title="数值区间"
      :can-expan="false"
      help-message="数值区间"
    >
      <div class="demo-input-size">
        <div class="input-box">数值区间：1~100</div>
        :
      </div>
      <div class="demo-input-size">
        <div class="input-box-bottom">
          <CurrencyInput
            v-model="num4"
            :options="{
              locale: 'zh-ZH',
              currency: 'CNY', //必填项。ISO 4217 货币代码，例如：'USD'、'EUR'
              valueRange: {
                min: 1,
                max: 100,
              },
            }"
          />
        </div>
      </div>
    </collapse-container>
    <collapse-container
      class="cl-mb-10"
      title="小数点位数限制"
      :can-expan="false"
      help-message="分隔符"
    >
      <div class="demo-input-size">
        <div class="input-box">固定位数限制(2位)</div>
        <div class="input-box">区间位数限制(2~4位)</div>
      </div>
      <div class="demo-input-size">
        <div class="input-box-bottom">
          <CurrencyInput
            v-model="num5"
            :options="{
              locale: 'zh-ZH',
              currency: 'CNY', //必填项。ISO 4217 货币代码，例如：'USD'、'EUR'
              precision: 2, //精度
            }"
          />
        </div>
        <div class="input-box-bottom">
          <CurrencyInput
            v-model="num5"
            :options="{
              locale: 'zh-ZH',
              currency: 'CNY', //必填项。ISO 4217 货币代码，例如：'USD'、'EUR'
              precision: {
                min: 2,
                max: 4,
              }, //精度
            }"
          />
        </div>
      </div>
    </collapse-container>
  </page-wrapper>
</template>

<script lang="ts" setup>
import { defineComponent, computed, ref, reactive } from "vue";
import { PageWrapper } from "@/components/Page";
import { CollapseContainer } from "@/components/Container/index";
// import CurrencyInput from "./CurrencyInput.vue";
import { CurrencyInput } from "@/components/Currency";

const num1 = ref(1234.1);
const num2 = ref(1234.2);
const num3 = ref(12345678.2);
const num4 = ref(1);
const num5 = ref(123.456789);

//货币输入配置配置
const currencyConfig = reactive({
  locale: "zh-ZH", //区域
  locale_arr: [
    "zh-ZH",
    "de-CH",
    "en-US",
    "de-DE",
    "en-IN",
    "nl-NL",
    "sv-S",
    "fr-FR",
    "es-ES",
    "pt-PT",
    "pt-BR",
    "ja-JP",
    "ar-SA",
    "fa-IR",
    "bg-BG",
  ],
  type: "CNY", //类型
  type_arr: [
    "CNY",
    "EUR",
    "USD",
    "JPY",
    "GBP",
    "BRL",
    "INR",
    "JPY",
    "SAR",
    "IRR",
    "BGN",
  ],
  format: "name", //格式
  format_arr: ["symbol", "narrowSymbol", "code", "name", "hidden"],
});

// export default {
//   components: { CurrencyInput },
//   data() {
//     return {
//       value: 1234,
//     };
//   },
// };
</script>

<style lang="less" scoped>
.lable {
  // height: inherit;
  display: flex;
  align-items: center;
  margin-right: 10px;
}
.fix {
  display: flex;
  width: 100%;
  margin-bottom: 10px;
  // height: 689px;
  justify-content: baseline;
}
.cl-mb-10 {
  margin-bottom: 10px;
}

.mx-4 {
  margin-right: 10px;
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
