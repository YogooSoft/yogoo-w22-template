<template>
  <page-wrapper title="基础用法" content="">
    <collapse-container class="cl-mb-10" title="基础用法" :can-expan="true">
      <el-alert
        title="通过 slot 你可以传入自定义的上传按钮类型和文字提示。 可通过设置 limit 和 on-exceed 来限制上传文件的个数和定义超出限制时的行为。 可通过设置 before-remove 来阻止文件移除操作。"
        type="info"
        show-icon
      />
      <br />
      <el-upload
        v-model:file-list="fileList"
        class="upload-demo"
        :action="uploadUrl"
        multiple
        name="file"
        :on-preview="handlePreview"
        :on-progress="handProgress"
        :on-remove="handleRemove"
        :before-remove="beforeRemove"
        :limit="3"
        :on-exceed="handleExceed"
      >
        <el-button type="primary">Click to upload</el-button>
      </el-upload>
    </collapse-container>
    <collapse-container
      class="cl-mb-10"
      title="覆盖前一个文件"
      :can-expan="true"
    >
      <el-alert
        title="设置 limit 和 on-exceed 可以在选中时自动替换上一个文件。"
        type="info"
        show-icon
      />
      <br />
      <el-upload
        ref="upload"
        class="upload-demo"
        :action="uploadUrl"
        :limit="1"
        :on-exceed="handleExceed2"
        :auto-upload="false"
        name="file"
      >
        <template #trigger>
          <el-button type="primary">select file</el-button>
        </template>
        <el-button class="ml-3" type="success" @click="submitUpload">
          upload to server
        </el-button>

        <template #tip>
          <div class="el-upload__tip text-red">
            只接收一个文件，新的文件会覆盖旧的文件
          </div>
        </template>
      </el-upload>
    </collapse-container>
    <collapse-container class="cl-mb-10" title="用户头像" :can-expan="true">
      <el-alert
        title="在 before-upload 钩子中限制用户上传文件的格式和大小。"
        type="info"
        show-icon
      />
      <br />
      <el-upload
        class="avatar-uploader"
        :action="uploadUrl"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
      >
        <template #tip>
          <div class="el-upload__tip">大小不超过2M的jpg格式文件</div>
        </template>
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <el-icon v-else class="avatar-uploader-icon">
          <Plus />
        </el-icon>
      </el-upload>
    </collapse-container>
    <collapse-container class="cl-mb-10" title="照片墙" :can-expan="true">
      <el-alert
        title="使用 list-type 属性来设定文件列表的样式。"
        type="info"
        show-icon
      />
      <br />
      <el-upload
        v-model:file-list="fileListZPQ"
        :action="uploadUrl"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemoveZPQ"
      >
        <el-icon> </el-icon>
      </el-upload>

      <el-dialog v-model="dialogVisible">
        <img
          w-full
          :src="dialogImageUrl"
          alt="Preview Image"
          style="max-width: 100%"
        />
      </el-dialog>
    </collapse-container>
    <collapse-container class="cl-mb-10" title="自定义缩略图" :can-expan="true">
      <el-alert
        title="使用 scoped-slot 属性来改变默认的缩略图模板样式。"
        type="info"
        show-icon
      />
      <br />
      <el-upload
        :action="uploadUrl"
        list-type="picture-card"
        ref="uploadZDYSLT"
        :auto-upload="false"
      >
        <el-icon>
          <Plus />
        </el-icon>

        <template #file="{ file }">
          <div>
            <img
              class="el-upload-list__item-thumbnail"
              :src="file.url"
              alt=""
            />
            <span class="el-upload-list__item-actions">
              <span
                class="el-upload-list__item-preview"
                @click="handlePictureCardPreviewZDYSLT(file)"
              >
                <el-icon><zoom-in /></el-icon>
              </span>
              <span
                v-if="!disabledZDYSLT"
                class="el-upload-list__item-delete"
                @click="handleDownloadZDYSLT(file)"
              >
                <el-icon><Download /></el-icon>
              </span>
              <span
                v-if="!disabledZDYSLT"
                class="el-upload-list__item-delete"
                @click="handleRemoveZDYSLT(file)"
              >
                <el-icon><Delete /></el-icon>
              </span>
            </span>
          </div>
        </template>
      </el-upload>

      <el-dialog v-model="ZDYSLTdialogVisible">
        <img
          w-full
          :src="ZDYSLTdialogImageUrl"
          alt="Preview Image"
          style="max-width: 100%"
        />
      </el-dialog>
    </collapse-container>
    <collapse-container
      class="cl-mb-10"
      title="图片列表缩略图"
      :can-expan="true"
    >
      <el-alert title="图片列表缩略图" type="info" show-icon />
      <br />
      <el-upload
        v-model:file-list="fileListTPLBSLT"
        class="upload-demo"
        :action="uploadUrl"
        list-type="picture"
      >
        <el-button type="primary">Click to upload</el-button>
      </el-upload>
    </collapse-container>
    <collapse-container
      class="cl-mb-10"
      title="上传文件列表控制"
      :can-expan="true"
    >
      <el-alert
        title="通过 on-change 钩子函数来对上传文件的列表进行控制。"
        type="info"
        show-icon
      />
      <br />
      <el-upload
        v-model:file-list="fileListSCWJLBKZ"
        class="upload-demo"
        :action="uploadUrl"
        :on-change="handleChangeSCWJLBKZ"
      >
        <el-button type="primary">Click to upload</el-button>
      </el-upload>
    </collapse-container>
    <collapse-container class="cl-mb-10" title="拖拽上传" :can-expan="true">
      <el-alert
        title="你可以将文件拖拽到特定区域以进行上传。"
        type="info"
        show-icon
      />
      <br />
      <el-upload class="upload-demo" drag :action="uploadUrl" multiple>
        <el-icon class="el-icon--upload">
          <upload-filled />
        </el-icon>
        <div class="el-upload__text">
          Drop file here or <em>click to upload</em>
        </div>
        <template #tip>
          <div class="el-upload__tip">
            jpg/png files with a size less than 500kb
          </div>
        </template>
      </el-upload>
    </collapse-container>
    <collapse-container class="cl-mb-10" title="手动上传" :can-expan="true">
      <el-alert title="手动上传。" type="info" show-icon />
      <br />
      <el-upload
        ref="uploadRef"
        class="upload-demo"
        :action="uploadUrl"
        :auto-upload="false"
      >
        <template #trigger>
          <el-button type="primary">select file</el-button>
        </template>

        <el-button class="ml-3" type="success" @click="submitUploadSDSC">
          upload to server
        </el-button>
        <template #tip>
          <div class="el-upload__tip">
            jpg/png files with a size less than 500kb
          </div>
        </template>
      </el-upload>
    </collapse-container>
  </page-wrapper>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";

import { genFileId } from "element-plus";
import type {
  UploadInstance,
  UploadProps,
  UploadRawFile,
  UploadUserFile,
  UploadFile,
} from "element-plus";

import { PageWrapper } from "@/components/Page";
import { CollapseContainer } from "@/components/Container/index";

import { Plus } from "@element-plus/icons-vue";
import { UploadFilled } from "@element-plus/icons-vue";

const { uploadUrl } = require("@/config");

/* 基础用法 */
const fileList = ref<UploadUserFile[]>([
  {
    name: "element-plus-logo.svg",
    url: "https://element-plus.org/images/element-plus-logo.svg",
  },
  {
    name: "element-plus-logo2.svg",
    url: "https://element-plus.org/images/element-plus-logo.svg",
  },
]);

const handleRemove: UploadProps["onRemove"] = (file, uploadFiles) => {
  console.log(file, uploadFiles);
};

const handlePreview: UploadProps["onPreview"] = (uploadFile) => {
  console.log(uploadFile);
};
const handProgress: UploadProps["onProgress"] = (uploadFile) => {
  console.log(uploadFile);
};

const handleExceed: UploadProps["onExceed"] = (files, uploadFiles) => {
  ElMessage.warning(
    `The limit is 3, you selected ${files.length} files this time, add up to ${
      files.length + uploadFiles.length
    } totally`
  );
};

const beforeRemove: UploadProps["beforeRemove"] = (uploadFile, uploadFiles) => {
  return ElMessageBox.confirm(
    `Cancel the transfert of ${uploadFile.name} ?`
  ).then(
    () => true,
    () => false
  );
};

/* 覆盖前一个文件上传 */
const upload = ref<UploadInstance>();

const handleExceed2: UploadProps["onExceed"] = (files) => {
  upload.value!.clearFiles();
  const file = files[0] as UploadRawFile;
  console.log("===file==", file);
  file.uid = genFileId();
  upload.value!.handleStart(file);
};

const submitUpload = () => {
  console.log("===upload==", upload.value);
  upload.value!.submit();
};

/* 用户头像 */
const imageUrl = ref("");

const handleAvatarSuccess: UploadProps["onSuccess"] = (
  response,
  uploadFile
) => {
  imageUrl.value = URL.createObjectURL(uploadFile.raw!);
};

const beforeAvatarUpload: UploadProps["beforeUpload"] = (rawFile) => {
  if (rawFile.type !== "image/jpeg") {
    ElMessage.error("Avatar picture must be JPG format!");
    return false;
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error("Avatar picture size can not exceed 2MB!");
    return false;
  }
  return true;
};

/* 照片墙 */
const fileListZPQ = ref<UploadUserFile[]>([
  {
    name: "food.jpeg",
    url: "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
  },
  {
    name: "food.jpeg",
    url: "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
  },
  {
    name: "food.jpeg",
    url: "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
  },
  {
    name: "food.jpeg",
    url: "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
  },
]);

const dialogImageUrl = ref("");
const dialogVisible = ref(false);

const handleRemoveZPQ: UploadProps["onRemove"] = (uploadFile, uploadFiles) => {
  console.log(uploadFile, uploadFiles);
};

const handlePictureCardPreview: UploadProps["onPreview"] = (uploadFile) => {
  dialogImageUrl.value = uploadFile.url!;
  dialogVisible.value = true;
};

/* 自定义缩略图 */
const ZDYSLTdialogImageUrl = ref("");
const ZDYSLTdialogVisible = ref(false);
const disabledZDYSLT = ref(false);

// const upload = ref<UploadInstance>();
//
// const handleExceed2: UploadProps['onExceed'] = (files) => {
//   upload.value!.clearFiles();
//   const file = files[0] as UploadRawFile;
//   console.log("===file==", file)
//   file.uid = genFileId();
//   upload.value!.handleStart(file)
//
// };

const uploadZDYSLT = ref<UploadInstance>();

const handleRemoveZDYSLT = (file: UploadFile) => {
  console.log(file);

  uploadZDYSLT.value!.handleRemove(file);

  // console.log("===uploadZDYSLT==",uploadZDYSLT)
  //
  //  const uploadFiles = uploadZDYSLT.value!.uploadFiles;
  //   console.log("===uploadFiles",uploadFiles)
  //   for (let i = 0; i < uploadFiles.length; i++) {
  //     if (uploadFiles[i]['url'] === file.url) {
  //       uploadFiles.splice(i, 1)
  //     }
  //   }
};

const handlePictureCardPreviewZDYSLT = (file: UploadFile) => {
  ZDYSLTdialogImageUrl.value = file.url!;
  ZDYSLTdialogVisible.value = true;
  console.log("==ZDYSLTdialogImageUrl===", ZDYSLTdialogImageUrl.value);
};

const handleDownloadZDYSLT = (file: UploadFile) => {
  console.log(file);
  let a = document.createElement("a");
  a.download = file.name;
  a.href = file.url!.toString();
  a.click();
};

/* 图片列表缩略图 */
const fileListTPLBSLT = ref<UploadUserFile[]>([
  {
    name: "food.jpeg",
    url: "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
  },
  {
    name: "food2.jpeg",
    url: "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
  },
]);

const handleRemoveTPLBSLT: UploadProps["onRemove"] = (
  uploadFile,
  uploadFiles
) => {
  console.log(uploadFile, uploadFiles);
};

const handlePreviewTPLBSLT: UploadProps["onPreview"] = (file) => {
  console.log(file);
};

/* 上传文件列表控制 */
const fileListSCWJLBKZ = ref<UploadUserFile[]>([
  {
    name: "food.jpeg",
    url: "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
  },
  {
    name: "food2.jpeg",
    url: "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
  },
]);

const handleChangeSCWJLBKZ: UploadProps["onChange"] = (
  uploadFile,
  uploadFiles
) => {
  fileList.value = fileList.value.slice(-3);
};

/* 手动上传 */
const uploadRef = ref<UploadInstance>();

const submitUploadSDSC = () => {
  uploadRef.value!.submit();
};
</script>

<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}

.ml-3 {
  margin-left: 0.75rem;
  margin-top: -3px;
}

.el-upload-list__item {
  overflow: hidden;
  z-index: 0;
  border-radius: 6px;
  box-sizing: border-box;
  margin-top: 10px;
  padding: 10px;
  display: flex;
  align-items: center;
}

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
</style>
