<template>
  <el-alert title="主页面>>>二级路由页面01>>>三级路由页面01" style="margin-bottom: 10px"  type="info" :closable="false" />
<!--  <div style="font-size: 16px;margin-bottom: 10px;font-weight: bold">主页面>>>二级路由页面01>>>三级路由页面01</div>-->
  <collapse-container
    class="cl-mb-10"
    title="主页面的查询条件[json]"
    :can-expan="false"
    help-message=""
  >
    <textarea name="" cols="100" rows="5"> {{parentData}} </textarea>
  </collapse-container>
  <collapse-container
    class="cl-mb-10"
    title="三级子菜单数据"
    :can-expan="false"
    help-message=""
  >
    <div class="demo-input-size">
      <div class="input-box">数据值1</div>
      <div class="input-box">数据值2</div>
    </div>
    <div class="demo-input-size">
      <div class="input-box-bottom">
        <el-input
          v-model="psnTableInfo.value1"
          placeholder="输入数据值1"
          style="width: 200px"
        />
      </div>
      <div class="input-box-bottom">
        <el-input
          v-model="psnTableInfo.value2"
          placeholder="输入数据值2"
          style="width: 200px"
          clearable
        />
      </div>

    </div>
  </collapse-container>

</template>


<script lang="ts">
  import {defineComponent, computed, ref} from 'vue';
  import {PageWrapper} from "@/components/Page";
  import {CollapseContainer} from "@/components/Container/index";
  import {Search} from "@element-plus/icons-vue";

  export default defineComponent({
     components: {
      PageWrapper,
      CollapseContainer,
      Search,
    },
    // 父级传至子级的变量 searchVal teamInfoBK,props中的值 <template>中可直接使用，<script>中使用需要转存data()
    props: ['searchVal', 'teamInfoBK'],


    data() {

      return {
        // 保存父级传至子级的变量 searchVal，teamInfoBK
        // 父级筛选条件变量值
        parentData: this.searchVal,
        // 父级传回的回写变量值
        teamInfoBKData: this.teamInfoBK,
        // 当前页面变量值
        psnTableInfo: {
          value1: "",
          value2: "",

        },

      };
    },


    methods: {},
    mounted() {
      try {
        // 如果有回写信息，则psnTableInfo赋值为teamInfoBKData，没有则使用默认值
        if (this.teamInfoBKData['c1']['cc1']) {
          this.psnTableInfo = this.teamInfoBKData['c1']['cc1']
        }

      } catch (e) {
        console.log(e)
      }
    },

    watch: {
      psnTableInfo: {
        handler(newValue, oldValue) {

          this.$emit('getTeamInfo', newValue)

        },
        deep: true,
      }

    },


  });
</script>
<style lang="less" scoped>
  textarea{
    border: 1px solid #DCDFE6;
    border-radius: 5px;
  }
  textarea:hover {
    border: 1px solid #A8ABB2;
  }
  textarea:focus-within {
    border: 1px solid #409EFF;
    outline:unset;
  }
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