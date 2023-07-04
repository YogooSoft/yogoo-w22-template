<script lang="tsx">
import { defineComponent, computed, ref, unref, VNode, createVNode } from "vue";
import { ElDescriptions, ElDescriptionsItem, ElTag } from "element-plus";

const props = {
  title: { type: String, default: "" },
  column: { type: Number, default: 3 },
  data: { type: Object, default: () => [] },
  border: { type: Boolean, default: true },
  size: {type: String, default:""}
};

export default defineComponent({
  name: "Description",
  props,
  components: { ElDescriptions, ElDescriptionsItem, ElTag },
  setup(props, { slots, emit }) {
    // const size = ref('small');

    return () => (
      <el-descriptions
        title={props.title}
        column={props.column}
        size={props.size}
        border={true}
      >
        {props.data.map((item, index) => (
          <el-descriptions-item
            align={item.align || ""}
            label-align={item.labelAlign || ""}
            label={item.label}
            span={item.span || ""}
            class-name={item.className || ""}
            label-class-name={item.labelClassName || ""}
            width={item.width || ""}
            min-width={item.minWidth || ""}
          >
            {unref(item.field)}
          </el-descriptions-item>
        ))}
      </el-descriptions>
    );
  },
});
</script>
