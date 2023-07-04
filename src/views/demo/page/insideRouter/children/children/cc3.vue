<template>
  <el-alert title="主页面>>>二级路由页面03>>>三级路由页面03" style="margin-bottom: 10px"  type="info" :closable="false" />
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

    props: ['searchVal', 'teamInfoBK'],


    data() {

      return {
        parentData: this.searchVal,
        teamInfoBKData: this.teamInfoBK,
        psnTableInfo: {
          value1: "",
          value2: "",

        },

      };
    },


    methods: {},
    mounted() {
      try {
        if (this.teamInfoBKData['c3']['cc3']) {
          this.psnTableInfo = this.teamInfoBKData['c3']['cc3']
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
