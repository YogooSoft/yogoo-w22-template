<template>
  <page-wrapper
    title="菜单内路由示例"
    content="实现菜单内路由，以及父级页面和多级子页面之间的数据实时传递"
  >
    <collapse-container
      class="cl-mb-10"
      title="菜单内路由示例"
      :can-expan="false"
      help-message="实现菜单内路由，以及父级页面和多级子页面之间的数据实时传递"
    >
      <el-alert
        title="主页面"
        style="margin-bottom: 10px"
        type="success"
        :closable="false"
      />
      <div class="demo-input-size">
        <div class="input-box">检索条件1</div>
        <div class="input-box">检索条件2</div>
      </div>
      <div class="demo-input-size">
        <div class="input-box-bottom">
          <el-input
            v-model="searchVal.value1"
            placeholder="输入检索条件1"
            style="width: 200px"
          />
        </div>
        <div class="input-box-bottom">
          <el-input
            v-model="searchVal.value2"
            placeholder="输入检索条件2"
            style="width: 200px"
            clearable
          />
        </div>
      </div>
    </collapse-container>

    <collapse-container
      class="cl-mb-10"
      title="子页面数据值回显[json]"
      :can-expan="false"
      help-message=""
    >
      <textarea name="" cols="100" rows="5"> {{ psnTableData }} </textarea>
    </collapse-container>

    <collapse-container
      class="cl-mb-10"
      title="子路由选项卡"
      :can-expan="false"
      help-message=""
    >
      <el-tabs
        ref="form"
        :model="form"
        v-model="activeName"
        @tab-click="handleClick"
      >
        <el-tab-pane label="选项卡1" name="first" style="height: 100%">
          <!--
      name：与路由json中的name相匹配；使路由匹配到当前<router-view>
      :searchVal： 查询条件变量值，向子菜单传值   形式：:xxxxx='value'
      :teamInfoBK：回写数据变量值，用于实现，页面路由切换时，页面内数据不消失，向子菜单传值   形式：:xxxxx='value'
      @getTeamInfo:提供给子菜单调用的函数，用于子菜单向父菜单传值 形式：@XXXX='func'
      -->
          <router-view
            class="rv1"
            name="children_01"
            :searchVal="searchVal"
            @getTeamInfo="teamInfo"
            :teamInfoBK="teamInfoBK"
          >
          </router-view>
        </el-tab-pane>
        <el-tab-pane label="选项卡2" name="second">
          <router-view
            class="rv2"
            name="children_02"
            :searchVal="searchVal"
            @getTeamInfoC2="teamInfoC2"
            :teamInfoBK="teamInfoBK"
          ></router-view>
        </el-tab-pane>
        <el-tab-pane label="选项卡3" name="third">
          <router-view
            class="rv3"
            name="children_03"
            :searchVal="searchVal"
            @getTeamInfoC3="teamInfoC3"
            :teamInfoBK="teamInfoBK"
          ></router-view>
        </el-tab-pane>
      </el-tabs>
    </collapse-container>
  </page-wrapper>
</template>
<script lang="ts">
import { defineComponent, computed, ref } from "vue";
import { PageWrapper } from "@/components/Page";
import { CollapseContainer } from "@/components/Container/index";
import { Search } from "@element-plus/icons-vue";

export default defineComponent({
  name: "insideRouter",
  components: {
    PageWrapper,
    CollapseContainer,
    Search,
  },
  data() {
    return {
      tag_list: new Array<any>(), // 权限列表
      activeName: "first",
      // 查询条件数据
      searchVal: {
        value1: "",
        value2: "",
      },
      // 子菜单数据字典
      psnTableData: {},
      // 子菜单数据回写字典
      teamInfoBK: {},
    };
  },
  methods: {
    // 配置各选项卡跳转路由
    handleClick(tab, event) {
      if (tab.paneName === "first") {
        // 选项卡1
        this.$router.push("/page/insideRouter/c1/index");
      }
      if (tab.paneName === "second") {
        // 选项卡2
        this.$router.push("/page/insideRouter/c2/index");
      }
      if (tab.paneName === "third") {
        // 选项卡3
        this.$router.push("/page/insideRouter/c3/index");
      }
    },
    // 获取子路由菜单数据c1
    teamInfo(value) {
      this.psnTableData["c1"] = value;
      this.teamInfoBK["c1"] = value;
    },
    // 获取子路由菜单数据c2
    teamInfoC2(value) {
      this.psnTableData["c2"] = value;
      this.teamInfoBK["c2"] = value;
    },
    // 获取子路由菜单数据c3
    teamInfoC3(value) {
      this.psnTableData["c3"] = value;
      this.teamInfoBK["c3"] = value;
    },
  },
  mounted() {
    // 页面刷新时，根据当前的路由判断重新加载后停留在哪个tab
    // 获取当前浏览器地址
    var str_url_now = window.location.href.toString();
    // 获取当前url路径
    const str_path_now = str_url_now.split("#", 2);
    // 跳转当前路径
    if (str_path_now[1] === "/page/insideRouter/c1/index") {
      this.activeName = "first";
    }
    if (str_path_now[1] === "/page/insideRouter/c2/index") {
      // first second third
      this.activeName = "second";
    }
    if (str_path_now[1] === "/page/insideRouter/c3/index") {
      // first second third
      this.activeName = "third";
    }
    // 无匹配 进入第一个tab页
    else {
      this.activeName = "first";
      this.$router.push("/page/insideRouter/c1/index");
    }
  },
});
</script>

<style lang="less" scoped>
textarea {
  border: 1px solid #dcdfe6;
  border-radius: 5px;
}
textarea:hover {
  border: 1px solid #a8abb2;
}
textarea:focus-within {
  border: 1px solid #409eff;
  outline: unset;
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
