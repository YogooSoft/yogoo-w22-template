<script lang="tsx">
import { defineComponent, ref, unref, computed } from "vue";
import AppSearchModal from "./AppSearchModal.vue";
import SvgIcon from "@/components/SvgIcon/index.vue";

export default defineComponent({
  name: "appSearch",
  components: { AppSearchModal, SvgIcon },
  props: {
    menus: { type: String[""], default: [] },
  },
  setup(props, { slots, emit }) {
    const showModal = ref(false);

    function changeModal(show: boolean) {
      showModal.value = show;      
    }

    return () => {
      return (
        <div onClick={changeModal.bind(null, true)}>
          <svg-icon
            class="svg-button"
            icon-name="search"
            element-icons={true}
          />
          <AppSearchModal
            onClose={changeModal.bind(null, false)}
            visible={unref(showModal)}

          />
        </div>
      );
    };
  },
});
</script>
