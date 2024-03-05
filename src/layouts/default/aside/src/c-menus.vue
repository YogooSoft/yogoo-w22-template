<template>
  <!-- 通过判断 isCollapse 状态，菜单缩进模式下 添加 el-scrollbar 滚动条组件  -->
  <el-scrollbar v-if="isCollapse">
    <div style="max-height: 600px">
      <template v-for="(item, index) in menus">
        <!-- 因为有子集和无子集渲染html标签不一样，所以要分为两种情况
      情况一：有子集的情况：                         -->
        <el-sub-menu
          v-if="item.children.length"
          :index="item.path"
          :key="key"
          popper-append-to-body="false"
        >
          <template #title>
            <el-icon
              v-if="
                item.meta.icon != undefined &&
                item.meta.icon != null &&
                item.meta.icon.length > 0
              "
              ><component :is="item.meta.icon"></component
            ></el-icon>
            <span>{{ item.meta.title }}</span>
          </template>
          <c-menu :menus="item.children"></c-menu>
        </el-sub-menu>
        <!-- 情况二：没子集的情况 -->
        <el-menu-item v-else :index="item.path">
          <el-icon
            v-if="
              item.meta.icon != undefined &&
              item.meta.icon != null &&
              item.meta.icon.length > 0
            "
            ><component :is="item.meta.icon"></component
          ></el-icon>
          <span>{{ item.meta.title }}</span>
        </el-menu-item>
      </template>
    </div>
  </el-scrollbar>
  <div v-else="isCollapse">
    <template v-for="(item, index) in menus">
      <!-- 因为有子集和无子集渲染html标签不一样，所以要分为两种情况
      情况一：有子集的情况：                         -->
      <el-sub-menu v-if="item.children.length" :index="item.path" :key="key">
        <template #title>
          <el-icon
            v-if="
              item.meta.icon != undefined &&
              item.meta.icon != null &&
              item.meta.icon.length > 0
            "
            ><component :is="item.meta.icon"></component
          ></el-icon>
          <span>{{ item.meta.title }}</span>
        </template>
        <c-menu :menus="item.children"></c-menu>
      </el-sub-menu>
      <!-- 情况二：没子集的情况 -->
      <el-menu-item v-else :index="item.path">
        <el-icon
          v-if="
            item.meta.icon != undefined &&
            item.meta.icon != null &&
            item.meta.icon.length > 0
          "
          ><component :is="item.meta.icon"></component
        ></el-icon>
        <span
          >{{ item.meta.title
          }}<el-badge
            v-if="item.speck_menu == true"
            is-dot
            class="menu_title_speck"
          >
          </el-badge>
          <el-badge
            v-if="item.new_menu == true"
            :value="'new'"
            class="menu_title_new"
          >
          </el-badge>
        </span>
      </el-menu-item>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useRouter } from "vue-router";
import { useRootSetting } from "@/hooks/setting/useRootSetting";

export default defineComponent({
  name: "cMenu",
  props: {
    menus: {
      type: Object,
      require: true,
      default: () => {},
    },
    key: {
      type: String,
      require: true,
      default: "",
    },
  },
  setup(props) {
    const router = useRouter();

    const clickMenu = (menu: any) => {
      // console.log("-----press-------",menu);
      router.push({
        path: menu.path,
        // name: menu.name,
      });
    };

    // //没有子菜单
    // const noChildren = () => {
    //   return props.menus.filter((item: any) => !item.children);
    // };

    // //有子菜单
    // const hasChildren = () => {
    //   return props.menus.filter((item: any) => item.children);
    // };

    const { getIsCollapse } = useRootSetting();
    //const isCollapse = getIsCollapse.value;

    const isCollapse = computed(() => {
      return getIsCollapse.value;
    });

    return { clickMenu, isCollapse };
  },
});
</script>
<style lang="less" scoped>
//717
.el-menu--collapse span,
.el-menu--collapse {
  height: 0;
  width: 0;
  overflow: hidden;
  visibility: hidden;
  display: none;
  // display: inline-block;
}

.el-menu-item.is-active {
  // background-color: rgba(64, 158, 255, 1) !important;
  background-color: #4165d7 !important;
}
// .secondSubmenu.el-submenu__title {
//   background-color: rgba(255, 255, 255, 0.1) !important;
// }
.menu_title_speck {
  top: -22px;
}
.menu_title_new {
  top: -22px;
}
</style>
