<template>
  <div class="about">
    <h1>This is an about page, title:{{ title }},version:{{ version }}</h1>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed } from "vue";
import { useTodoStore } from "@/store/modules/todo";

export default defineComponent({
  name: "LockModal",
  components: {},
  setup() {
    const todo = useTodoStore();
    const title = computed(() => todo.title);
    const version = computed(() => todo.version);

    return {
      title,
      version,
    };
  },
});
</script>
