<template>
  <div class="menus_box" v-if="drawer === true">
    <el-affix :offset="60" style="float: right; margin-right: 30px">
      <el-icon style="font-size: 24px" @click="get_router_click()"
        ><Close
      /></el-icon>
      <!-- <el-button type="primary" @click="drawer = false">关闭菜单</el-button> -->
    </el-affix>

    <!-- {{ drawer }} -->
    <div class="menus_box_content">
      <div class="menus_box_top">
        <span class="menus_box_top_title">全部菜单</span>&nbsp;&nbsp;
        <span class="menus_box_top_notes"
          >(灰色代表还未开通该菜单，如需开通请联系贵司管理员开通)</span
        >
        <el-switch
          class="menus_box_top_switch"
          v-model="show_no_limit"
          active-text="展示无权限菜单"
          @change="show_no_limit_change('html')"
        >
        </el-switch>
      </div>
      <el-input
        class="el_input"
        v-model="input"
        placeholder="菜单搜索"
        @change="menu_search('html')"
      />

      <el-divider border-style="dashed"></el-divider>

      <!-- 双融业务全景【瀑布流】 -->
      <div
        class="menus_box_level_1"
        v-for="(item_base, index) in menu_list_show"
      >
        <div class="menus_box_level_1_title">
          <span class="menus_box_level_1_title_name">{{ item_base.name }}</span>
        </div>
        <el-divider border-style="dashed"></el-divider>
        <div v-masonry :key="new Date().getTime()" class="container">
          <div
            v-masonry-tile
            v-for="(item, index) in item_base.children"
            class="menu_list"
            :key="index"
            :style="{ width: item.width }"
          >
            <!-- 菜单块儿 -->
            <span v-if="item.children.length == 0" class="menu_title_level_1">
              <el-link
                class="menu_title_level_1_link_limit_status_false"
                v-if="item.limit_status == false"
                :underline="false"
                disabled
                >{{ item.name }}
                <el-badge
                  v-if="item.new_menu == true"
                  :value="'new'"
                  class="menu_title_new"
                >
                </el-badge>

                <el-badge
                  v-if="item.count_menu == true"
                  :value="994"
                  class="menu_title_count"
                >
                </el-badge>

                <el-badge
                  is-dot
                  v-if="item.speck_menu == true"
                  class="menu_title_speck"
                >
                </el-badge>
              </el-link>
              <el-link
                class="menu_title_level_1_link_limit_status_true"
                @click="handleNodeClick(item)"
                v-if="item.limit_status != false"
                :underline="false"
                >{{ item.name }}
                <el-badge
                  v-if="item.new_menu == true"
                  :value="'new'"
                  class="menu_title_new"
                >
                </el-badge>

                <el-badge
                  v-if="item.count_menu == true"
                  :value="994"
                  class="menu_title_count"
                >
                </el-badge>

                <el-badge
                  is-dot
                  v-if="item.speck_menu == true"
                  class="menu_title_speck"
                >
                </el-badge>
              </el-link>
            </span>
            <span v-else class="menu_title_level_1_has_children">{{
              item.name
            }}</span>

            <div class="menu_name_box" :style="{ maxHeight: item.maxHeight }">
              <div
                class="menu_name_box_title"
                :class="{ menu_name_have_children: item_c.arrange == 'hx' }"
                v-for="(item_c, index_c) in item.children"
              >
                <div v-if="item_c.children.length == 0">
                  <el-link
                    class="menu_name_box_title_limit_status_flase_link"
                    v-if="item_c.limit_status == false"
                    :underline="false"
                    disabled
                    >{{ item_c.name }}
                    <!-- <span class="menu_title_new" v-if="item_c.new_menu == true"
                      >new</span
                    > -->
                    <el-badge
                      v-if="item_c.new_menu == true"
                      :value="'new'"
                      class="menu_title_new"
                    >
                    </el-badge>

                    <el-badge
                      v-if="item_c.count_menu == true"
                      :value="994"
                      class="menu_title_count"
                    >
                    </el-badge>

                    <el-badge
                      is-dot
                      v-if="item_c.speck_menu == true"
                      class="menu_title_speck"
                    >
                    </el-badge>
                  </el-link>
                  <el-link
                    class="menu_name_box_title_limit_status_true_link"
                    @click="handleNodeClick(item_c)"
                    v-if="item_c.limit_status != false"
                    :underline="false"
                    >{{ item_c.name }}

                    <el-badge
                      v-if="item_c.new_menu == true"
                      :value="'new'"
                      class="menu_title_new"
                    >
                    </el-badge>

                    <el-badge
                      v-if="item_c.count_menu == true"
                      :value="994"
                      class="menu_title_count"
                    >
                    </el-badge>

                    <el-badge
                      is-dot
                      v-if="item_c.speck_menu == true"
                      class="menu_title_speck"
                    >
                    </el-badge>
                  </el-link>
                </div>
                <div class="menu_name_box_title_has_children" v-else>
                  <span class="menu_name_box_title_has_children_name"
                    >·{{ item_c.name }}</span
                  >

                  <span v-for="(item_c2, index_c2) in item_c.children">
                    <el-link
                      v-if="
                        item_c2.limit_status == false && show_no_limit == true
                      "
                      :underline="false"
                      disabled
                      class="menu_name_box_title_has_children_name_limit_status_false_link"
                      >{{ item_c2.name }}
                      <el-badge
                        v-if="item_c2.new_menu == true"
                        :value="'new'"
                        class="menu_title_new"
                      >
                      </el-badge>

                      <el-badge
                        v-if="item_c2.count_menu == true"
                        :value="994"
                        class="menu_title_count"
                      >
                      </el-badge>

                      <el-badge
                        is-dot
                        v-if="item_c2.speck_menu == true"
                        class="menu_title_speck"
                      >
                      </el-badge>
                    </el-link>
                    <el-link
                      class="menu_name_box_title_has_children_name_limit_status_true_link"
                      @click="handleNodeClick(item_c2)"
                      v-if="item_c2.limit_status != false"
                      :underline="false"
                      >{{ item_c2.name }}
                      <el-badge
                        v-if="item_c2.new_menu == true"
                        :value="'new'"
                        class="menu_title_new"
                      >
                      </el-badge>

                      <el-badge
                        v-if="item_c2.count_menu == true"
                        :value="994"
                        class="menu_title_count"
                      >
                      </el-badge>

                      <el-badge
                        is-dot
                        v-if="item_c2.speck_menu == true"
                        class="menu_title_speck"
                      >
                      </el-badge>
                    </el-link>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, unref, defineProps, watch } from "vue";
import { useRouter } from "vue-router";
import { useRootSetting } from "@/hooks/setting/useRootSetting";
import type { Menu } from "@/router/types";
import { cloneDeep } from "lodash-es";

export default defineComponent({
  name: "topMenusBox",
  props: {
    key_num: {
      type: Number,
      require: true,
      default: "",
    },
  },
  setup(props, context) {
    // console.log("=key_c==", props.key_num);
    const drawer = ref(true);
    const router = useRouter();
    const menu_list: any = ref([]);
    const show_no_limit = ref(true);
    const input = ref("");
    let menu_list_show = ref();
    const { getUserMenu } = useRootSetting();
    // console.log("=getUserMenu==", getUserMenu);
    let list = [];

    // key_num = 9999 打开的是我的业务全景，其他值为模块菜单index
    if (props.key_num === 9999) {
      list = getUserMenu.value;
      menu_list_show.value = cloneDeep(list);
      menu_list.value = cloneDeep(list);
    } else {
      list = getUserMenu.value[props.key_num];
      menu_list_show.value = [cloneDeep(list)];
      menu_list.value = [cloneDeep(list)];
    }

    // console.log("=list==", list);
    // console.log("== menu_list_show.value111=", menu_list_show.value);
    // console.log("== menu_list.value111=", menu_list.value);

    // 显示无权限菜单按钮变动
    const show_no_limit_change = (call_type) => {
      if (call_type === "script") {
        menu_list_show.value = JSON.parse(JSON.stringify(menu_list_show.value));
      } else {
        menu_list_show.value = JSON.parse(JSON.stringify(menu_list.value));
      }
      if (show_no_limit.value == false) {
        // console.log(call_type);
        menus_no_limit_del(menu_list_show.value);
        // console.log("==re=", menu_list_show.value);
      }
      if (input.value !== "" && call_type !== "script") {
        menu_search("script");
      }
    };

    // 过滤无权限菜单
    function menus_no_limit_del(obj) {
      let obj_value = obj;
      var i = 0;
      for (let key in obj_value) {
        // console.log("==key==", key);
        let value = obj_value[i];
        // console.log("==value==", value);

        if (value.limit_status == false) {
          // console.log("===del===", obj_value[i], i);
          // delete obj_value[key];
          obj_value.splice(i, 1);
        } else {
          i = i + 1;
          if (value.children.length > 0) {
            menus_no_limit_del(value.children);
          } else {
            console.log(value);
          }
        }
      }
    }

    function transform(c: string) {
      const code: string[] = [
        "$",
        "(",
        ")",
        "*",
        "+",
        ".",
        "[",
        "]",
        "?",
        "\\",
        "^",
        "{",
        "}",
        "|",
      ];
      return code.includes(c) ? `\\${c}` : c;
    }

    function createSearchReg(key: string) {
      const keys = [...key].map((item) => transform(item));
      const str = ["", ...keys, ""].join(".*");
      return new RegExp(str);
    }

    // 菜单查询
    const menu_search = (call_type) => {
      let menu_list_use = [] as any;
      if (call_type === "script") {
        menu_list_use.value = menu_list_show.value;
        // console.log("===menu_list_use1=", menu_list_use.value);
      } else if (call_type === "html" && show_no_limit.value == false) {
        menu_list_use.value = menu_list_show.value;
        // console.log("===menu_list_use1.1=", menu_list_use.value);
      } else {
        menu_list_use.value = menu_list.value;
      }
      // console.log("===call_type=", call_type);
      // console.log("===key_words=", input.value);
      // console.log("===menu_list_use2=", menu_list_use.value);
      // menus_search(menu_list_show.value, input.value);

      if (input.value !== "") {
        // menu_list_show.value = menus_search(menu_list.value, input.value);
        const reg = createSearchReg(unref(input.value));

        menu_list_show.value = handlerSearchResult(menu_list_use.value, reg);
      } else {
        menu_list_show.value = JSON.parse(JSON.stringify(menu_list.value));
      }
      // console.log("===menu_list_show=", menu_list_show.value);

      if (show_no_limit.value == false && call_type !== "script") {
        show_no_limit_change("script");
      }
    };

    // 菜单结构定义
    interface SearchResult {
      name: string;
      path: string;
      children: any;
      icon?: string;
      new_menu?: boolean;
      limit_status?: boolean;
      width?: string;
      maxHeight?: string;
    }
    // 查询菜单
    function handlerSearchResult(filterMenu, reg: RegExp, parent?: Menu) {
      const ret: SearchResult[] = [];
      filterMenu.forEach((item) => {
        const {
          name,
          path,
          icon,
          children,
          hideMenu,
          meta,
          new_menu,
          limit_status,
          width,
          maxHeight,
        } = item;
        if (reg.test(name)) {
          ret.push({
            name: name,
            path,
            children: children,
            icon,
            new_menu,
            limit_status,
            width,
            maxHeight,
          });
        } else if (Array.isArray(children) && children.length) {
          const ret_children: SearchResult[] = [];
          ret_children.push(...handlerSearchResult(children, reg, item));

          if (ret_children.length > 0) {
            ret.push({
              name: name,
              path,
              children: ret_children,
              icon,
              new_menu,
              limit_status,
              width,
              maxHeight,
            });
          }
        }
      });
      return ret;
    }

    // 菜单点击
    function handleNodeClick(data) {
      // console.log(data);
      router.push({ path: data.path });
      drawer.value = false;
      get_router_click();
    }

    // 菜单点击触发关闭菜单弹窗
    function get_router_click() {
      drawer.value = false;
      context.emit("get_router_click", false);
    }

    return {
      router,
      drawer,
      show_no_limit,
      input,
      menu_list,
      menu_list_show,
      show_no_limit_change,
      menu_search,
      handleNodeClick,
      get_router_click,
    };
  },
});
</script>
<style lang="less" scoped>
.menus_box {
  width: 100%;
  background-color: #fff;
  height: 80%;
  z-index: 8;
  position: fixed;
  top: 45px;
  overflow: scroll;
  box-shadow: 0 9px 24px 9px rgba(0, 0, 0, 0.15);
}
.menus_box_content {
  width: 80%;
  height: 100%;
  padding: 10px;
  margin: 0 auto;
  padding-top: 20px;
}
.menu_name_have_children {
  display: inline-block !important;
  float: left;
  margin-right: 10px;
}
.menus_box_top_title {
  font-size: 16px;
  font-weight: 600;
  color: #222222;
}
.menus_box_top_notes {
  font-size: 12px;
  color: #999999;
}
.menus_box_top_switch {
  float: right;
}
.menus_box_level_1 {
  margin-top: 60px;
  width: 100%;
}
.menus_box_level_1_title_name {
  font-size: 16px;
  font-weight: 600;
  color: #222222;
}
.menu_title_level_1 {
  display: inline-block;
  width: 90%;
  color: #222222;
}
.menu_title_level_1_link_limit_status_false {
  display: block;
  padding: 10px 10px 10px 0;
  font-size: 14px;
  color: #b2b2b2;
}

.menu_title_level_1_link_limit_status_true {
  display: block;
  padding: 10px 10px 10px 0;
  font-size: 14px;
  color: #222222;
}

.menu_title_level_1_has_children {
  display: block;
  background-color: #e7f8fe;
  width: 90%;
  font-weight: 600;
  color: #222222;
  margin: 10px 10px 10px 0;
}
.menu_name_box {
  display: inline-flex;
  flex-direction: column;
  flex-wrap: wrap;
}
.menu_name_box_title {
  display: block;
  font-size: 14px;
  color: #222222;
}
.menu_name_box_title_limit_status_flase_link {
  display: block;
  padding: 10px 10px 10px 0;
  font-size: 14px;
  color: #b2b2b2;
}
.menu_name_box_title_limit_status_true_link {
  display: block;
  padding: 10px 10px 10px 0;
  font-size: 14px;
  color: #222222;
}
.menu_name_box_title_has_children {
  float: left;
  margin-right: 20px;
}
.menu_name_box_title_has_children_name {
  font-size: 14px;
  color: #999999;
  padding: 10px 10px 10px 0;
  display: block;
}
.menu_name_box_title_has_children_name_limit_status_false_link {
  display: block;
  padding: 10px 10px 10px 0;
  font-size: 14px;
  color: #b2b2b2;
}
.menu_name_box_title_has_children_name_limit_status_true_link {
  display: block;
  padding: 10px 10px 10px 0;
  font-size: 14px;
  color: #222222;
}
.menu_list {
  min-width: 120px;
}
// .menu_title_new {
//   height: 14px;
//   padding-left: 3px;
//   padding-right: 4px;
// }

// .menu_title_speck {
//   margin-left: -1px;
//   margin-top: -10px;
//   width: 7px;
//   height: 7px;
//   border-radius: 10px;
//   background-color: #f56c6c;
// }

// .menu_title_count {
//   border: 1px solid #f56c6c;
//   color: #f56c6c;
//   margin-left: 10px;
//   font-size: 12px;
//   padding-left: 1px;
//   padding-right: 1px;
//   border-radius: 3px;

//   // margin-left: 5px;
//   // height: 14px;
//   // border-radius: 3px;
//   // color: white;

//   // background-color: #f56c6c;
// }
:deep(.menu_title_new .el-badge__content) {
  height: 14px;
  padding-left: 3px;
  padding-right: 4px;
}
:deep(.menu_title_count .el-badge__content) {
  height: 14px;
  padding-left: 3px;
  padding-right: 4px;
}
</style>
