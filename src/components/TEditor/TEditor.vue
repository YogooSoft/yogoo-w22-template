<template>
  <editor
    v-model="myValue"
    :init="init"
    :disabled="disabled"
    :id="tinymceId"
  ></editor>
</template>

<script setup lang="ts">
//JS部分
//在js中引入所需的主题和组件
import tinymce from "tinymce/tinymce";
// import "tinymce/skins/content/default/content.css";
import Editor from "@tinymce/tinymce-vue";
import "tinymce/themes/silver";
import "tinymce/themes/silver/theme";
//引入编辑器图标icon，不引入则不显示对应图标
import "tinymce/icons/default";
// 这里是个坑 一定要引入
import "tinymce/models/dom";
import axios from "axios";
//在TinyMce.vue中接着引入相关插件
import "tinymce/icons/default/icons";
// 插入上传图片插件
import "tinymce/plugins/image";
// 插入表格插件
import "tinymce/plugins/table";
// 列表插件
import "tinymce/plugins/lists";
// 字数统计插件
import "tinymce/plugins/wordcount";
// 源码
import "tinymce/plugins/code";
//全屏
// import "tinymce/plugins/fullscreen"
import "tinymce/plugins/autoresize";

//接下来定义编辑器所需要的插件数据
import { reactive, ref } from "vue";
import { onMounted, defineEmits, watch } from "@vue/runtime-core";

// import { updateImg } from '@/api/order/order'
const emits = defineEmits(["getContent"]);
//这里我选择将数据定义在props里面，方便在不同的页面也可以配置出不同的编辑器，当然也可以直接在组件中直接定义
const props = defineProps({
  value: {
    type: String,
    default: () => {
      return "";
    },
  },
  // 控制
  min_height: {
    type: Number,
    default: 300,
  },
  max_height: {
    type: Number,
    default: 900,
  },
  height: {
    type: Number,
    default: 500,
  },
  baseUrl: {
    type: String,
    default: "",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  menubar: {
    type: Boolean,
    default: false,
  },
  //必填
  plugins: {
    type: [String, Array],
    default: "image lists  table autoresize ",
  },
  //必填
  toolbar: {
    type: [String, Array],
    default:
      "codesample bold  italic underline fontsize fontfamily alignleft aligncenter alignright alignjustify | undo redo  |formatselect | fontselect | fontsizeselect | forecolor backcolor | bullist numlist outdent indent | lists link table code | removeformat | image | ",
  },
});
//用于接收外部传递进来的富文本
const myValue = ref(props.value);
const tinymceId = ref(
  "vue-tinymce-" + +new Date() + ((Math.random() * 1000).toFixed(0) + "")
);
//定义一个对象 init初始化
const init = reactive({
  //富文本编辑器的id,
  selector: "#" + tinymceId.value,
  // 语言包的路径，具体路径看自己的项目，文档后面附上中文js文件
  language_url: "tinymce/langs/zh-Hans.js",
  //语言
  language: "zh-Hans",
  // skin路径，具体路径看自己的项目
  skin_url: "tinymce/skins/ui/oxide",
  //编辑器高度 使用自动高度控制，该配置项无效
  // height: props.height,
  //是否禁用“Powered by TinyMCE”
  branding: false,
  //顶部菜单栏显示
  menubar: props.menubar,
  //图片上传时去除宽高属性
  image_dimensions: false,
  //这里的数据是在props里面就定义好了的
  plugins: props.plugins,
  //这里的数据是在props里面就定义好了的
  toolbar: props.toolbar,
  min_height: props.min_height,
  max_height: props.max_height,
  font_family_formats:
    "微软雅黑=Microsoft YaHei,Helvetica Neue,PingFang SC,sans-serif;苹果苹方=PingFang SC,Microsoft YaHei,sans-serif;宋体=simsun,serif;仿宋体=FangSong,serif;黑体=SimHei,sans-serif;Arial=arial,helvetica,sans-serif;Arial Black=arial black,avant garde;Book Antiqua=book antiqua,palatino;", //字体
  //文字大小
  font_size_formats: "11px 12px 14px 16px 18px 24px 36px 48px 64px 72px",
  // 黏贴内容时，保留样式
  // paste_webkit_styles: "all",
  // 官方建议改值设置为空，否则tab表格生成有bug
  nonbreaking_force_tab: false,

  //分别对应三个类型文件的上传：link插件，image和axupimgs插件，media插件。想屏蔽某个插件的上传就去掉对应的参数
  file_picker_types: "file image  media",
  //最下方的元素路径和字数统计那一栏是否显示
  statusbar: false,
  // 关闭推广按钮
  promotion: false,
  //以css文件方式自定义可编辑区域的css样式，css文件需自己创建并引入
  // content_css: "/tinymce/skins/content/default/content.css",

  images_upload_handler: (blobInfo, progress) =>
    new Promise((resolve, reject) => {
      // 图片的上传地址
      var uploadApi = "";
      if (blobInfo.blob().size / 1024 / 1024 > 2) {
        reject({ message: "上传失败，图片大小请控制在 2M 以内", remove: true });
        return;
      } else {
        let params = new FormData();
        params.append("file", blobInfo.blob());
        let config = {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        };

        /* 图片上传接口调用 实际使用时打开
      axios
        .post(`${uploadApi}/uploadimg`, params, config)
        .then((res) => {
          if (res.data.code == 200) {
            resolve(res.data.msg); //上传成功，在成功函数里填入图片路径
          } else {
            if (res.data.msg) {
              reject("上传失败信息");
            } else {
              reject("上传失败");
            }
          }
        })
        .catch(() => {
          reject("上传出错，服务器开小差了呢");
        });*/

        // success("http://www.yogoo.net/dist/img/icon/logoTwo.gif");

        // message.success("上传成功！");
        resolve("http://www.yogoo.net/dist/img/icon/logoTwo.gif");
        reject("上传服务器失败");
        // reject("上传成功");
        return;
      }
    }),

  // 文件上传
  // file_picker_callback: (callback, value, meta) => {
  //   // Provide file and text for the link dialog
  //   if (meta.filetype == "file") {
  //     callback("mypage.html", { text: "My text" });
  //   }

  //   // Provide image and alt text for the image dialog
  //   if (meta.filetype == "image") {
  //     callback("myimage.jpg", { alt: "My alt text" });
  //   }

  //   // Provide alternative source and posted for the media dialog
  //   if (meta.filetype == "media") {
  //     callback("movie.mp4", { source2: "alt.ogg", poster: "image.jpg" });
  //   }
  // },
});

//监听外部传递进来的的数据变化
watch(
  () => props.value,
  () => {
    myValue.value = props.value;
    emits("getContent", myValue.value);
  }
);
//监听富文本中的数据变化
watch(
  () => myValue.value,
  () => {
    emits("getContent", myValue.value);
  }
);
//在onMounted中初始化编辑器
onMounted(() => {
  tinymce.init({});
});
</script>
