<template>
  <div class="table_div">
    <el-table
      :style="style"
      :data="rowData"
      :class="[table_size,summaryCellStyleClass]"
      :header-cell-style="header_cell_style"
      :cell-style="cell_style"
      :height="height"
      :max-height="max_height"
      :border="border"
      :stripe="stripe"
      v-loading="load_staus"
      :show-summary="show_summary"
      :highlight-current-row="highlight_current_row"

      :row-class-name="row_class_name_func"
      :span-method="span_method_func"
      :summary-method="summary_method"
      :lazy="lazy"
      :load="load"
      :tree-props="tree_props"
      :row-key="row_key"
      :default-expand-all="default_expand_all"
      @current-change="handleCurrentChange"
      @selection-change="handleSelectionChange"
      @sort-change="sort_change"
    >
      <template v-for="item in headerData">
        <slot v-if="item.slot" :name="item.slot"></slot>
        <table-column
          v-else-if="item.children && item.children.length"
          :key="item.id"
          :coloumn-header="item"
        ></table-column>
        <el-table-column
          v-else
          :key="item.id"
          :label="item.label"
          :prop="item.prop"
          :width="item.width"
          :fixed="item.fixed"
          :type="item.type"
          :sortable="item.sortable"
        >
        </el-table-column>
      </template>
    </el-table>
  </div>
<!--            :small="controlAtrr.pageObj['small']"-->
  <div class="controlAtrrBox" v-if="controlAtrr">
    <div class="page_div" v-if="controlAtrr.pageObj"  :style="pageDivStyle()">
      <div class="page_block" ref="page_block_position" :style="pageBlockStyle()">
        <el-config-provider :locale="locale">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChangePage"
            :background="controlAtrr.pageObj['background']"

            :small="page_size()"
            :hide-on-single-page="controlAtrr.pageObj['hide_on_single_page']"
            :current-page="controlAtrr.pageObj['pageData']['page']"
            :pager-count="controlAtrr.pageObj['pager_count']"
            :page-sizes="controlAtrr.pageObj['page_sizes']"
            :page-size="controlAtrr.pageObj['pageData']['size']"
            :layout="controlAtrr.pageObj['layout']"
            :total="controlAtrr.pageObj['total']"
          >
          </el-pagination>
        </el-config-provider>

      </div>

    </div>
  </div>


</template>

<script>
  import TableColumn from "./components/TableColumn.vue";
  import {defineComponent, computed, ref} from "vue";
  // 引入yuiTable大小样式
  import {
    yuiTableClass,
  } from '@/enums/tableEnum';

  export default defineComponent({
    name: "Table",
    props: {
      // 表样式
      style: {
        type: String,
        default: null
      },
      // 表尾合计行样式
      summary_cell_style: {
        type: String,
        default: null
      },
      // 列头单元格样式
      header_cell_style: {
        type: String,
        default: null
      },
      // 单元格样式
      cell_style: {
        type: String,
        default: null
      },
      // 懒加载函数
      load: {
        type: Function,
        default: null
      },
      // 分页区域位置控制 暂弃
      page_block_position: {
        type: String,
        default: null
      },
      // 表格大小控制
      table_size: {
        type: String,
        default: null
      },
      // 渲染树形数据时，必须要指定 row-key
      row_key: {
        type: String,
        default: null
      },
      // 高度
      height: {
        type: String,
        default: null
      },
      // 最大高度
      max_height: {
        type: String,
        default: null
      },
      // 树形结构默认展开 true false
      default_expand_all: false,
      // 表格边框 true false
      border: false,
      // 是否为斑马纹 true false
      stripe: false,
      // 是否显示加载 true false
      load_staus: false,
      // 是否在表尾显示合计行 true false
      show_summary: false,
      // 单选后是否高亮当前行 true false
      highlight_current_row: false,
      // 是否懒加载 true false
      lazy: false,
      // 行的 className 的回调方法，也可以使用字符串为所有行设置一个固定的 className。
      row_class_name: {
        type: Function,
        default: null
      },
      // 合并行或列的计算方法
      span_method: {
        type: Function,
        default: null
      },
      // 尾行合计方法
      summary_method: {
        type: Function,
        default: null
      },
      // 渲染嵌套数据的配置选项
      tree_props: {},
      // 表格行数据
      rowData: {
        type: Array,
        required: true,
      },
      // 表格列头数据
      headerData: {
        type: Array,
        required: true,
        default: null
      },
      // 控制类属性
      controlAtrr: {
        // 分页控制
        pageObj: {
          type: Object,
          default: null
        },
      },
    },
    data() {
      return {
        // 分页区域样式控制：左
        pageLeft: "",
        // 分页区域样式控制：右
        pageRight: "",
        // 分页区域样式控制：高度
        pageDivHeight: "52px",
        // table合计尾行样式控制：className
        summaryCellStyleClass: "summary_cell_style_center",
      }
    },
    components: {
      // 子列头组件
      TableColumn,
    },
    methods: {
      // 根据table样式大小匹配分页样式的大小，默认使用controlAtrr中配置的大小
      page_size(){
        // table大小为Small、ExtraSmall时，分页区域高度为42px,分页组件small=true
        // table大小为Large、Medium、无设置时，分页区域高度为52px,分页组件small=false
        if([yuiTableClass.Small, yuiTableClass.ExtraSmall].includes(this.table_size )){
          this.pageDivHeight='42px';
          return true
        }
        else if([yuiTableClass.Large, yuiTableClass.Medium].includes(this.table_size )){
          this.pageDivHeight='52px';
          return false
        }
        else{
          this.pageDivHeight='52px';
          return false
        }
      },

      // 懒加载方法调用
      load(tree, treeNode, resolve) {
        this.load(tree, treeNode, resolve);
      },

      // 行的 className 的回调方法调用
      row_class_name_func({row, rowIndex}) {
        if (this.row_class_name) {
          return this.row_class_name({row, rowIndex});
        }
      },

      // 单行数据选择变动，方法触发
      handleCurrentChange(val) {
        this.$emit('current-change', val);
      },

      // 多行数据选择变动，方法触发
      handleSelectionChange(val) {
        this.$emit('selection-change', val);
      },

      // 排序自定义方法触发
      sort_change(column) {
        this.$emit('sort-change', column);
      },

      // 合并行或列的计算方法触发
      span_method_func({row, column, rowIndex, columnIndex}) {
        if (this.span_method) {
          return this.span_method({row, column, rowIndex, columnIndex});
        }
      },

      // 分页-条数变化
      handleSizeChange(e) {
        this.controlAtrr.pageObj.pageData.size = e;
        this.controlAtrr.pageObj.pageData.page = 1;
        this.$emit('handleSizeChange', e);
      },
      // 分页-页码变化
      handleCurrentChangePage(e) {
        this.controlAtrr.pageObj.pageData.page = e;
        this.$emit('handleCurrentChange', e);
      },

      // 分页组件位置控制
      pageBlockStyle() {
        return {
          height: '30px',
          position: 'absolute',
          top: '10px',
          right: this.pageRight,
          left: this.pageLeft,
          'border-radius': '3px'
        }
      },

      // 分页区域样式控制
      pageDivStyle() {
        return {
           'background-color': '#fff',
          color: '#303133',
          'margin-bottom': '16px',
          'margin-top': '16px',
          height:this.pageDivHeight,
          position: 'relative'
        }
      },


    },
    watch: {
      // 侦听变量是否发生变化
      controlAtrr: {
        handler(newValue, oldValue) {
          // 控制类项目处理
          if (this.controlAtrr) {
            // 分页区域位置控制
            if (this.controlAtrr.pageObj) {
              // 居右
              if (this.controlAtrr.pageObj.position == 'right') {
                this.pageLeft = 'unset';
                this.pageRight = '10px';
              }
              // 居左边
              else if (this.controlAtrr.pageObj.position == 'left') {
                this.pageLeft = '10px';
                this.pageRight = 'unset';
              }
              // 默认居左
              else {
                this.pageLeft = 'unset';
                this.pageRight = '10px';
              }
            }
          }

        },
        deep: true
      },

    },

    mounted() {
      // 表尾合计行样式
      if (this.summary_cell_style) {
        if (this.summary_cell_style == "center") {
          this.summaryCellStyleClass = "summary_cell_style_center"
        }
        if (this.summary_cell_style == "left") {
          this.summaryCellStyleClass = "summary_cell_style_left"
        }
        if (this.summary_cell_style == "right") {
          this.summaryCellStyleClass = "summary_cell_style_right"
        }

      }
    }
  });
</script>

<style lang="less" scoped>
  :deep( .summary_cell_style_center .el-table__footer td) {
    text-align: center;
  }

  :deep( .summary_cell_style_left .el-table__footer td) {
    text-align: left;
  }

  :deep( .summary_cell_style_right .el-table__footer td) {
    text-align: right;
  }

</style>

