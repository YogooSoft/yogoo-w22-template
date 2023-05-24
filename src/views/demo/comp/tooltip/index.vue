<template>
  <page-wrapper
    title="气泡文字提示示例"
    content="常用于展示鼠标 hover 时的提示信息"
  >
    <collapse-container
      class="cl-mb-10"
      title="基础用法"
      :can-expan="true"
      help-message="在这里我们提供 9 种不同方向的展示方式，可以通过以下完整示例来理解，选择你要的效果。"
    >
      <div class="tooltip-base-box">
        <div class="row center">
          <el-tooltip
            class="box-item"
            effect="dark"
            content="Top Left prompts info"
            placement="top-start"
          >
            <el-button>top-start</el-button>
          </el-tooltip>
          <el-tooltip
            class="box-item"
            effect="dark"
            content="Top Center prompts info"
            placement="top"
          >
            <el-button>top</el-button>
          </el-tooltip>
          <el-tooltip
            class="box-item"
            effect="dark"
            content="Top Right prompts info"
            placement="top-end"
          >
            <el-button>top-end</el-button>
          </el-tooltip>
        </div>
        <div class="row">
          <el-tooltip
            class="box-item"
            effect="dark"
            content="Left Top prompts info"
            placement="left-start"
          >
            <el-button>left-start</el-button>
          </el-tooltip>
          <el-tooltip
            class="box-item"
            effect="dark"
            content="Right Top prompts info"
            placement="right-start"
          >
            <el-button>right-start</el-button>
          </el-tooltip>
        </div>
        <div class="row">
          <el-tooltip
            class="box-item"
            effect="dark"
            content="Left Center prompts info"
            placement="left"
          >
            <el-button class="mt-3 mb-3">left</el-button>
          </el-tooltip>
          <el-tooltip
            class="box-item"
            effect="dark"
            content="Right Center prompts info"
            placement="right"
          >
            <el-button>right</el-button>
          </el-tooltip>
        </div>
        <div class="row">
          <el-tooltip
            class="box-item"
            effect="dark"
            content="Left Bottom prompts info"
            placement="left-end"
          >
            <el-button>left-end</el-button>
          </el-tooltip>
          <el-tooltip
            class="box-item"
            effect="dark"
            content="Right Bottom prompts info"
            placement="right-end"
          >
            <el-button>right-end</el-button>
          </el-tooltip>
        </div>
        <div class="row center">
          <el-tooltip
            class="box-item"
            effect="dark"
            content="Bottom Left prompts info"
            placement="bottom-start"
          >
            <el-button>bottom-start</el-button>
          </el-tooltip>
          <el-tooltip
            class="box-item"
            effect="dark"
            content="Bottom Center prompts info"
            placement="bottom"
          >
            <el-button>bottom</el-button>
          </el-tooltip>
          <el-tooltip
            class="box-item"
            effect="dark"
            content="Bottom Right prompts info"
            placement="bottom-end"
          >
            <el-button>bottom-end</el-button>
          </el-tooltip>
        </div>
      </div>
    </collapse-container>
    <collapse-container
      class="cl-mb-10"
      title="主题"
      :can-expan="true"
      help-message=""
    >
      <el-tooltip content="Top center" placement="top">
        <el-button>Dark</el-button>
      </el-tooltip>
      <el-tooltip content="Bottom center" placement="bottom" effect="light">
        <el-button>Light</el-button>
      </el-tooltip>

      <el-tooltip content="Bottom center" effect="customized">
        <el-button>Customized theme</el-button>
      </el-tooltip>
    </collapse-container>
    <collapse-container
      class="cl-mb-10"
      title="更多内容的文字提示"
      :can-expan="true"
      help-message="展示多行文本或者是设置文本内容的格式"
    >
      <el-tooltip placement="top">
        <template #content> multiple lines<br />second line </template>
        <el-button>Top center</el-button>
      </el-tooltip>
    </collapse-container>
    <collapse-container
      class="cl-mb-10"
      title="高级扩展"
      :can-expan="true"
      help-message="展示多行文本或者是设置文本内容的格式"
    >
      <el-tooltip
        :disabled="disabled"
        content="click to close tooltip function"
        placement="bottom"
        effect="light"
      >
        <el-button @click="disabled = !disabled"
          >click to {{ disabled ? "active" : "close" }} tooltip
          function</el-button
        >
      </el-tooltip>
    </collapse-container>
    <collapse-container
      class="cl-mb-10"
      title="显示 HTML 内容"
      :can-expan="true"
      help-message=""
    >
      <el-tooltip
        content="<span>The content can be <strong>HTML</strong></span>"
        raw-content
      >
        <el-button>hover me</el-button>
      </el-tooltip>
    </collapse-container>
    <collapse-container
      class="cl-mb-10"
      title="虚拟触发"
      :can-expan="true"
      help-message=""
    >
      <el-tooltip
        v-model:visible="visible"
        content="Bottom center"
        placement="bottom"
        effect="light"
        trigger="click"
        virtual-triggering
        :virtual-ref="triggerRef"
      />
      <el-button @click="visible = !visible">test</el-button>
    </collapse-container>
    <collapse-container
      class="cl-mb-10"
      title="单例模式"
      :can-expan="true"
      help-message="Tooltip 可以作为单例，也就是是说你可以同时有多个触发同一个 tooltip 的触发元素，这个功能是在 虚拟触发 的基础上开发的。"
    >
      <div>
        <el-button
          v-for="i in 3"
          :key="i"
          @mouseover="(e) => (buttonRef = e.currentTarget)"
          @click="visible1 = !visible1"
          >Click to open tooltip</el-button
        >
      </div>

      <el-tooltip
        ref="tooltipRef"
        v-model:visible1="visible1"
        :popper-options="{
          modifiers: [
            {
              name: 'computeStyles',
              options: {
                adaptive: false,
                enabled: false,
              },
            },
          ],
        }"
        :virtual-ref="buttonRef"
        virtual-triggering
        trigger="click"
        popper-class="singleton-tooltip"
      >
        <template #content>
          <span> Some content </span>
        </template>
      </el-tooltip>
    </collapse-container>
    <collapse-container
      class="cl-mb-10"
      title="受控模式"
      :can-expan="true"
      help-message=""
    >
      <el-tooltip :visible2="visible2">
        <template #content>
          <span>Content</span>
        </template>
        <el-button @mouseenter="visible2 = true" @mouseleave="visible2 = false">
          Hover me
        </el-button>
      </el-tooltip>
    </collapse-container>
    <collapse-container
      class="cl-mb-10"
      title="自定义动画"
      :can-expan="true"
      help-message="Tooltip 可以自定义动画，你可以根据需要自行设置所需的动画方法。"
    >
      <el-tooltip content="I am an el-tooltip">
        <el-button>trigger me</el-button>
      </el-tooltip>
    </collapse-container>
  </page-wrapper>
</template>

<script lang="ts">
import { defineComponent, computed, ref, onMounted } from "vue";
import { PageWrapper } from "@/components/Page";
import { CollapseContainer } from "@/components/Container/index";

export default defineComponent({
  name: "tooltip",
  components: { CollapseContainer, PageWrapper },

  setup(props) {
    const disabled = ref(false);

    const visible = ref(false);
    const visible1 = ref(false);
    const visible2 = ref(false);
    const triggerRef = ref({
      getBoundingClientRect() {
        return position.value;
      },
    });

    const position = ref({
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
    });

    onMounted(() => {
      document.addEventListener("mousemove", (e) => {
        position.value = DOMRect.fromRect({
          width: 0,
          height: 0,
          x: e.clientX,
          y: e.clientY,
        });
      });
    });

    const buttonRef = ref();
    const tooltipRef = ref();

    return {
      disabled,
      visible,
      visible1,
      visible2,
      triggerRef,
      onMounted,
      buttonRef,
      tooltipRef,
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
.el-alert {
  margin-bottom: 10px;
}

.tooltip-base-box {
  width: 600px;
}
.tooltip-base-box .row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
}
.tooltip-base-box .center {
  justify-content: center;
}
.tooltip-base-box .box-item {
  width: 110px;
  margin-top: 10px;
}

.el-popper.is-customized {
  /* Set padding to ensure the height is 32px */
  padding: 6px 12px;
  background: linear-gradient(90deg, rgb(159, 229, 151), rgb(204, 229, 129));
}
.el-popper.is-customized .el-popper__arrow::before {
  background: linear-gradient(45deg, #b2e68d, #bce689);
  right: 0;
}

// .el-popper.is-customized {
//   /* Set padding to ensure the height is 32px */
//   padding: 6px 12px;
//   background: linear-gradient(90deg, rgb(159, 229, 151), rgb(204, 229, 129));

//   & .el-popper__arrow::before {
//     background: linear-gradient(45deg, #b2e68d, #bce689);
//     right: 0;
//   }
// }


.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter,
.expand-fade-leave-active {
  margin-left: 20px;
  opacity: 0;
}

.singleton-tooltip {
  transition: transform 0.3s var(--el-transition-function-fast-bezier);
}
</style>
