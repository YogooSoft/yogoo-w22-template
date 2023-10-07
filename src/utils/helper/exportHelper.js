import FileSaver from "file-saver";
import * as XLSX from "xlsx";
import { messageBox } from "@/hooks/web/useMessageBox";

/**
 * 将表数据导出到 Excel 文件。
 * @param {Object} tableRef - 对表组件的引用
 * @param {string} sheetName - Excel 工作表的名称
 * @param {string} fileName - Excel 文件的名称。
 */
export function exportExcel(tableRef, sheetName, fileName) {
  return new Promise(function (resolve, reject) {
    messageBox
      .confirm("导出 excel, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        closeOnClickModal: false,
      })
      .then(function () {
        const ws = XLSX.utils.table_to_sheet(tableRef.$el, {
          raw: true,
        });
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, sheetName);
        const wbout = XLSX.write(wb, {
          bookType: "xlsx",
          bookSST: true,
          type: "array",
        });
        try {
          FileSaver.saveAs(
            new Blob([wbout], { type: "application/octet-stream" }),
            fileName
          );
          resolve();
        } catch (e) {
          if (typeof console !== "undefined") {
            console.log(e, wbout);
          }
          messageBox.alert("导出失败", "错误", {
            type: "error",
          });
          reject(e);
        } finally {
          loadingInstance.close();
        }
      })
      .catch(function () {
        reject();
      });
  });
}
