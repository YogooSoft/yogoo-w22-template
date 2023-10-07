<template>
  <div class="container">
    <div class="left_box">
      <div class="centet_show">
        <div class="centerbox contents" @click="art_chose(-1)">
          <img
            :src="articles[0]['cover_img_src']"
            v-if="articles[0]['cover_img_src']"
          />
          <img src="@/assets/images/eee.png" v-else />
          <div class="sm_title mead_title">{{ articles[0]["title"] }}</div>
        </div>
        <div
          class="centerbox cont_item active"
          v-for="(item, index) in articles.slice(1, articles.length)"
          @click="art_chose(index)"
        >
          <div class="cont_Tit mead_title">{{ item["title"] }}</div>
          <div class="cont_Img" v-if="item['cover_img_src']">
            <img :src="item['cover_img_src']" />
          </div>
          <div class="cont_Img" v-else>
            <img src="@/assets/images/eee.png" />
          </div>
          <!-- v-if="item['del_show']" -->
          <div class="cont_btns">
            <el-button
              type="danger"
              :icon="Delete"
              circle
              @click="del_art(index + 1)"
            />
          </div>
        </div>

        <div class="newadd" @click="newadd">＋ 新建消息</div>
      </div>
    </div>
    <div class="right_box">
      <el-input
        v-model="articles[art_now_index]['title']"
        class="art_input"
        placeholder="请输入正文标题"
      />

      <el-input
        v-model="articles[art_now_index]['auther']"
        class="art_input"
        style="margin-bottom: 10px"
        placeholder="请输入作者"
      />

      <TEditor
        ref="editor"
        v-model="articles[art_now_index]['contents']"
        @getContent="getContent"
        :menubar="false"
        :min_height="350"
        :max_height="800"
      />

      <div class="fenbmian">
        <div class="fen_title">封面和摘要</div>
        <div class="img_box">
          <div class="left_add">
            <img
              :src="articles[art_now_index]['cover_img_src']"
              v-if="articles[art_now_index]['cover_img_src']"
            />
            <img src="@/assets/images/add.png" v-else />
            <div class="left_shbox">
              <div
                class="selet_item"
                @click="
                  open_article_covers(articles[art_now_index], art_now_index)
                "
                style="border-right: 1px solid #fff"
              >
                素材库选择
              </div>
              <div class="selet_item" @click="">
                <el-upload class="avatar-uploader" :show-file-list="false"
                  >本地上传
                </el-upload>
              </div>
            </div>
          </div>

          <div class="right_add">
            <el-input
              class="textarea"
              v-model="articles[art_now_index]['remark']"
              :rows="4"
              type="textarea"
              placeholder="选填，摘要会在订阅号消息、转发链接等文章外的场景显露，帮助读者快速了解内容，如不填写则默认抓取正文前54字"
            />
            <!-- 
            <textarea
              name=""
              cols="30"
              rows="10"
              id="zhaiy"
              placeholder="选填，摘要会在订阅号消息、转发链接等文章外的场景显露，帮助读者快速了解内容，如不填写则默认抓取正文前54字"
            ></textarea> -->
          </div>
        </div>
        <!-- <div class="fen_title">原创声明</div> -->

        <div
          class="fen_title"
          @click="open_article_ly(articles[art_now_index], art_now_index)"
          style="cursor: pointer"
        >
          留言 > <span>{{ articles[art_now_index]["LY_set"] }}</span>
        </div>
        <div
          class="fen_title"
          @click="open_article_url(articles[art_now_index], art_now_index)"
          style="cursor: pointer"
        >
          原文链接 >
          <span class="url_span">{{
            articles[art_now_index]["article_url"]
          }}</span>
        </div>

        <div class="foot_btns">
          <div class="right_btns">
            <el-button type="primary" @click="article_save">保存</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <component
    :is="currentModal"
    v-model:visible="modalVisible"
    :articleUrlData="articleUrlData"
  />
  <ArticleUrl @register="register_art_url" @getValue="getArticleUrlValue" />
  <ArticleLY @register="register_art_ly" @getValue="getArticleLyValue" />
  <ArticleCovers
    @register="register_art_covers"
    @getValue="getArticleCoversValue"
  />
</template>

<script lang="ts" setup>
import {
  Ref,
  ref,
  reactive,
  onMounted,
  shallowRef,
  ComponentOptions,
} from "vue";
import {
  Search,
  Plus,
  CirclePlus,
  Edit,
  Delete,
} from "@element-plus/icons-vue";
import { messageBox } from "@/hooks/web/useMessageBox";
import { message } from "@/hooks/web/useMessage";
import TEditor from "@/components/TEditor/TEditor.vue";
import ArticleUrl from "./article-url.vue";
import ArticleLY from "./article-ly.vue";
import ArticleCovers from "./article-covers.vue";
import { useModal } from "@/components/Windows/";

const art_title = ref("");
const art_auther = ref("");
let articles = ref([
  {
    title: "",
    auther: "",
    cover_img_src: "",
    contents: "",
    remark: "",
    article_url: "",
    LY_status: "",
    LY_set: "",
  },
]);

function articles_create_data(data) {
  if (data) {
    // var art_data = {
    //   title: "",
    //   auther: "",
    //   cover_img_src: "",
    //   contents: "",
    //   remark: "",
    //   article_url: "",
    //   LY_status: "否",
    //   LY_set: "",
    // };
    articles.value = [data];
    art_now_index.value = 0;
    console.log("===articles===", articles);
  } else {
    art_now_index.value = 0;
    var art_data = {
      title: "",
      auther: "",
      cover_img_src: "",
      contents: "",
      remark: "",
      article_url: "",
      LY_status: "否",
      LY_set: "",
    };
    articles.value = [art_data];
  }
}

/* 富文本 */
const props = defineProps({
  article_data: {},
});

const formState = reactive({ contents: "" });
const getContent = (v: string) => {
  formState.contents = v;
};
let art_now_index = ref(0); // 当前的文章index 用于标记当前操作的文章

/* 文章链接 */
const [register_art_url, { openModal: openarticleUrlUpdateForm }] = useModal();
const currentModal = shallowRef<Nullable<ComponentOptions>>(null);
const modalVisible = ref<Boolean>(false);
const articleUrlData = ref<any>(null);
function open_article_url(data, art_now_index) {
  const update_data = reactive({
    data: data,
    art_now_index: art_now_index,
  });
  openarticleUrlUpdateForm(true, update_data);
}
const getArticleUrlValue = (value) => {
  // sonMessage.value = value;
  // rticleRuleForm["article_url"] = data.data.article_url;
  // ArticleRuleForm["art_now_index"] = data.art_now_index;

  articles.value[art_now_index.value]["article_url"] = value.article_url;
};

/* 留言 */
const [register_art_ly, { openModal: openarticleLyUpdateForm }] = useModal();
const articleLyData = ref<any>(null);
function open_article_ly(data, art_now_index) {
  const update_ly_data = reactive({
    data: data,
    art_now_index: art_now_index,
  });
  openarticleLyUpdateForm(true, update_ly_data);
}
const getArticleLyValue = (value) => {
  articles.value[art_now_index.value]["LY_status"] = value.LY_status;
  articles.value[art_now_index.value]["LY_set"] = value.LY_set;
};

/* 素材 */
const [register_art_covers, { openModal: openarticleCoversUpdateForm }] =
  useModal();
function open_article_covers(data, art_now_index) {
  const update_covers_data = reactive({
    data: data,
    art_now_index: art_now_index,
  });
  openarticleCoversUpdateForm(true, update_covers_data);
}
const getArticleCoversValue = (value) => {
  articles.value[art_now_index.value]["cover_img_src"] = value.cover_img_src;
};

/*保存 */
function article_save() {
  messageBox
    .confirm("您确认要保存草稿吗？", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "info",
    })
    .then(() => {
      message.success("保存成功");
      transValue();
    });
}

// 使用defineEmits注册一个自定义事件
const emit = defineEmits(["getValue"]);
// 点击事件触发emit，去调用我们注册的自定义事件getValue,并传递value参数至父组件
const transValue = () => {
  emit("getValue", "");
};

/* 左侧显示区域 */
function newadd() {
  var art_data = {
    title: "",
    auther: "",
    cover_img_src: "",
    contents: "",
    remark: "",
    article_url: "",
    LY_status: "否",
    LY_set: "",
  };
  articles.value.push(art_data);
  art_now_index.value = articles.value.length - 1;
  // alert(art_now_index.value);
}
function art_chose(index) {
  art_now_index.value = index + 1;
}
function del_art(index) {
  articles.value.splice(index, 1);
  art_now_index.value = 0;
}
onMounted(() => {
  console.log("===", props.article_data);
});

// 暴露方法
defineExpose({
  articles_create_data,
});
</script>

<style lang="less" scoped>
.fen_title {
  font-size: 14px;
  line-height: 20px;
  margin: 20px 0;
}
.container {
  background-color: #fff;
  height: auto;
  display: inline-flex;
  width: 100%;
}
.left_box {
  display: inline-block;
  width: 380px;
  padding-right: 40px;
  border-right: 1px solid #cccccc;
  margin-left: 10px;
  margin-top: 10px;
}
.right_box {
  display: inline-block;
  width: 900px;
  padding-left: 20px;
  padding-top: 5px;
  .art_input {
    width: 100%;
    border-bottom: 1px solid #d8dce5;
  }
}
.contents {
  position: relative;
  overflow: hidden;
  border: 1px solid #e7e7eb;
  background-color: #eee;
  color: #666;
  height: 1px;
  width: 100%;
  padding: 0 !important;
  height: 160px;
}
.centerbox:hover {
  border: 0.1px solid #07c160 !important;
}

.left_box .cont_item {
  position: relative;
  display: flex;
  width: 100%;
  height: 72px;
  box-sizing: border-box;
  justify-content: space-around;
  padding: 10px;
  border: 1px solid #ccc;
  border-top: none;

  box-sizing: border-box;
}
.left_box .cont_item .cont_Tit {
  line-height: 58px;
  color: #303133;
  width: 70%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.cont_item .cont_Img {
  line-height: 50px;
  width: 42px;
  height: 42px;
}
.cont_Img img {
  width: 100%;
  height: 100%;
  background: #eee;
}
.left_box .cont_item .cont_btns {
  display: none;
  position: absolute;
  right: -38px;
  /* top: 18px; */
  width: 36px;

  text-align: center;
  z-index: 9;

  line-height: 50px;
}
.left_box .cont_item .cont_btns i {
  padding: 10px;
  cursor: pointer;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0px 0px 10px 0px rgba(4, 0, 0, 0.1);
}
.cont_item:hover .cont_btns {
  display: block;
}
.left_box .newadd {
  padding: 10px;
  background: #fff;
  height: 72px;
  text-align: center;
  cursor: pointer;
  line-height: 52px;
  color: #9a9a9a;
  border: 1px solid #e7e7eb;
}

:deep(.el-input__wrapper) {
  border: none !important;
  box-shadow: none !important;
}
:deep(.el-input__inner) {
  border: none !important;
  box-shadow: none !important;
}

.fenbmian .fen_title {
  font-size: 14px;
  line-height: 20px;
  margin: 20px 0;
}
.fenbmian .yuanwL {
  margin-left: 30px;
  font-size: 12px;
  color: #ccc;
}
.fenbmian .img_box {
  display: flex;
}
.fenbmian .img_box .left_add {
  position: relative;
  width: 211.5px;
  height: 90px;
  background: #fff;
  text-align: center;
  line-height: 90px;
  font-size: 50px;
  margin-right: 10px;
  cursor: pointer;
  border: 1px solid #ccc;
}

.fenbmian .img_box .left_add input {
  position: absolute;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  z-index: 999;
}

.fenbmian .img_box .left_add img {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  border: none;
}

.fenbmian .img_box .right_add {
  width: 400px;
  height: 90px;
}

:deep(.el-textarea__inner) {
  height: 90px;
}

.fenbmian .foot_btns {
  margin: 20px 0 0;
  border-top: 1px solid #ccc;
  display: flex;
  padding: 20px 0 20px 0;
  background: #fff;
}

.fenbmian .foot_btns .left_nums {
  width: 130px;
}

.selet_item {
  width: 50%;
  height: 30px;
  text-align: center;
  cursor: pointer;
  color: #fff;
  line-height: 30px;
  font-size: 12px;
  background: rgba(0, 0, 0, 0.3);
}
.left_shbox {
  display: none;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 30px;
  width: 100%;
  align-items: flex-end;
  margin-right: 10px;
  z-index: 1;
}
.left_shbox .selet_item {
  width: 50%;
  height: 30px;
  text-align: center;
  cursor: pointer;
  color: #fff;
  line-height: 30px;
  font-size: 12px;
  background: rgba(0, 0, 0, 0.3);
}
.left_add:hover .left_shbox {
  display: flex;
}
.sm_title {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 40px;
  color: #fff;
  padding: 0 0 0 15px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  background: rgba(0, 0, 0, 0.3);
  line-height: 40px;
}
.centet_show .contents img {
  width: 100%;
  height: 100%;
}
.cont_item .cont_Tit {
  line-height: 58px;
  color: #353535;
  width: 70%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.delete {
  color: var(--el-color-danger);
}
.url_span {
  color: #409eff;
}
</style>
