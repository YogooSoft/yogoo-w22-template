<template>
  <page-wrapper title="动态列【后端控制】" content="">
    <collapse-container
      class="cl-mb-10"
      title="动态列【后端控制】"
      :can-expan="true"
      help-message="动态列【后端控制】"
    >
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column
          v-for="(item, index) in dynamicColumnsData"
          :key="index"
          :prop="item.prop"
          :width="item.width"
          :label="item.label"
        >
        </el-table-column>
      </el-table>
    </collapse-container>
    <collapse-container
      class="cl-mb-10"
      title="动态列【前端控制】"
      :can-expan="true"
      help-message="动态列【前端控制】"
    >
      <el-container>
        <el-aside width="13rem" v-show="asideShow">
          <div class="asideShowAll">
            <div class="asideIcon" @click="asideShow = false">
              <img
                src="@/assets/aside/left-circle.png"
                alt=""
                style="height: 17px;!important;"
              />
            </div>
            <div>
              <div class="title">Selected fields</div>
              <div
                v-for="(fields, i) in selected__fields"
                :key="i"
                :id="i + '1'"
                class="listStyle"
                style="display: block"
                @click="removeColumn(i)"
              >
                {{ i }}
              </div>
              <div
                v-for="(fields, i) in available_fields"
                :key="i"
                :id="i + '1'"
                class="listStyle"
                style="display: none"
                @mousemove="showBtn('btn' + i + '1')"
                @mouseleave="unshowBtn('btn' + i + '1')"
              >
                <span>{{ fields.label }}</span>
                <el-button
                  size="min"
                  :id="'btn' + i + '1'"
                  @click="removeColumn(fields.prop)"
                  style="display: none"
                  >Remove
                </el-button>
              </div>
            </div>
            <div>
              <div class="title">Available fields</div>
              <div
                v-for="(fields, i) in available_fields"
                :key="i"
                :id="i"
                class="listStyle"
                @mousemove="showBtn('btn' + i)"
                @mouseleave="unshowBtn('btn' + i)"
              >
                <el-tooltip
                  :content="i"
                  placement="top"
                  class="item"
                  effect="dark"
                  ><span>{{ fields.label }}</span></el-tooltip
                >
                <el-button
                  type="primary"
                  size="min"
                  :id="'btn' + i"
                  @click="addColumn(i, fields)"
                  style="display: none"
                  >Add
                </el-button>
              </div>
            </div>
          </div>
        </el-aside>
        <el-aside width="2.5rem" v-show="!asideShow">
          <div class="asideShowAll">
            <div class="asideIcon">
              <img
                src="@/assets/aside/right-circle.png"
                alt=""
                style="height: 17px;!important;"
                @click="asideShow = true"
              />
            </div>
          </div>
        </el-aside>
        <el-main>
          <div>
            <el-table
              ref="table"
              :data="tableData2"
              style="width: 100%"
              :cell-style="{ padding: '0.2125rem 0' }"
              :header-cell-style="{ color: '#303133', fontWeight: 400 }"
              infinite-scroll-distance="500"
              infinite-scroll-disabled="disabled"
              border
            >
              <!--展开行-->
              <el-table-column type="expand" width="0">
                <template #default="props">
                  {{ props.row }}
                </template>
              </el-table-column>

              <!--常显示的列 -->

              <el-table-column
                v-for="col in cols"
                :key="col"
                :prop="col.prop"
                :label="col.label"
                :width="col.width"
                width="160"
              >
              </el-table-column>

              <!-- 遍历增加的列 -->
              <el-table-column
                v-for="col in colsAdd"
                :key="col"
                :prop="col.prop"
                :label="col.label"
                :width="col.width"
              >
                <!-- 给遍历的列追加移除的icon -->
                <template #header>
                  <div
                    class="removeIcon"
                    @mousemove="showBtn(col.prop + 'btn')"
                    @mouseleave="unshowBtn(col.prop + 'btn')"
                  >
                    <span>{{ col.label }}</span>
                    <img
                      src="@/assets/aside/round-close.png"
                      alt=""
                      @click="removeColumn(col.prop)"
                      :id="col.prop + 'btn'"
                      style="display: none"
                    />
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-main>
      </el-container>
    </collapse-container>
  </page-wrapper>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from "vue";
import { PageWrapper } from "@/components/Page";
import { CollapseContainer } from "@/components/Container/index";

export default defineComponent({
  name: "table-dynamicColumns",
  components: { CollapseContainer, PageWrapper },

  data() {
    return {
      Text: "",
      currentIndex: null,
      selected__fields: {},
      available_fields: {
        name: {
          prop: "name",
          label: "姓名",
        },
        address: {
          prop: "address",
          label: "地址",
        },
      },
      asideShow: true, //侧边栏展示
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
      ],
      dynamicColumnsData: [
        {
          prop: "date",
          label: "日期",
          width: "150",
        },
        {
          prop: "name",
          label: "姓名",
          width: "100",
        },
        {
          prop: "address",
          label: "地址",
          width: "300",
        },
      ],
      tableData2: [
        {
          id: 1,
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          id: 2,
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
        },
        {
          id: 3,
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
        },
        {
          id: 4,
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
      ],
      cols: [
        {
          prop: "date",
          label: "日期",
          width: "150",
        },
      ],
      colsAdd: [] as any[], //遍历增加的列，默认显示_source
    };
  },

  methods: {
    //显示添加按钮
    showBtn(i) {
      document.getElementById(i)!.style.display = "block";
    },
    //鼠标移开不显示按钮
    unshowBtn(i) {
      document.getElementById(i)!.style.display = "none";
    },

    //增加列
    addColumn(i, fields) {
      console.log(fields);
      this.colsAdd.push({ prop: fields.prop, label: fields.label });
      document.getElementById(i)!.style.display = "none";
      document.getElementById(i + "1")!.style.display = "block";
    },
    //移除列
    removeColumn(i) {
      for (let j = 0; j < this.colsAdd.length; j++) {
        if (this.colsAdd[j]["prop"] == i) {
          this.colsAdd.splice(j, 1);
          if (document.getElementById(i)) {
            document.getElementById(i)!.style.display = "block";
          }
          document.getElementById(i + "1")!.style.display = "none";
        }
      }
    },
  },

  setup(props) {
    return {};
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

.listStyle {
  height: 2rem;
  line-height: 2rem;
  align-items: center;
  justify-content: space-between;
  font-size: 0.9rem;
  color: rgba(48, 49, 51, 1);
  margin-bottom: 0.375rem;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  text-overflow: ellipsis;
}

.listStyle > .el-button {
  position: absolute;
  top: 0;
  right: 0.1rem;
}

.title {
  font-size: 1rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

.asideIcon {
  position: absolute;
  display: flex;
  cursor: pointer;
  top: 0;
  right: 1rem;
  padding: 0.25rem;
}

.el-alert {
  margin-bottom: 10px;
}

.asideShow {
  position: relative;
}

.asideShow:hover {
  cursor: pointer;
}

.asideShowAll {
  position: relative;
}

:deep(.el-table__row .cell) {
  max-height: 100px;
}

.el-container {
  height: calc(100vh - 5.5rem);
}

.el-main {
  padding: 0 !important;
}

.removeIcon {
  display: flex;
  vertical-align: middle;
  align-items: center;
}

.removeIcon img {
  width: 1em;
  height: 1em;
  cursor: pointer;
}
</style>
