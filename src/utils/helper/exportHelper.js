import FileSaver from "file-saver";
import * as XLSX from "xlsx";
import { messageBox } from "@/hooks/web/useMessageBox";
import { cloneDeep } from "lodash-es";
/**
 * 将表数据导出到 Excel 文件。
 * @param {Object} tableRef - 对表组件的引用
 * @param {string} sheetName - Excel 工作表的名称
 * @param {string} fileName - Excel 文件的名称。
 * @param {Array} delHeader - Excel 文件的名称。
 */
export function exportExcel(
  headerDataParm,
  tableDataParm,
  sheetName,
  fileName,
  delHeaders = []
) {
  return new Promise(function (resolve, reject) {
    messageBox
      .confirm("导出 excel, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        closeOnClickModal: false,
      })
      .then(function () {
        // 组合导出结构
        let headerData = [];
        let tableData = [];
        headerData = cloneDeep(headerDataParm);
        tableData = cloneDeep(tableDataParm);
        let header_data = [];
        headerData = del_header(headerData, delHeaders);
        console.log("==headerData==", headerData);

        // headerData.forEach((item, index) => {
        //   if (delHeaders.indexOf(item.prop) === -1) {
        //     header_data.push(item.label);
        //   }
        // });
        console.log(header_data);

        // excel表头
        let excelHeader = buildHeader(headerData);
        console.log("==excelHeader==", excelHeader);

        // 头部行数，用来固定表头
        let headerRows = excelHeader.length;

        // 计算合并
        let merges = doMerges(excelHeader);

        // 提取数据
        // 找到所有的 prop
        let prop_list = get_prop_list(headerData);
        // let dataList = extractData(tableData, headerData);
        console.log("==prop_list==", prop_list);

        let aoa = excelHeader;

        let row_data = [];

        tableData.forEach((item, index) => {
          row_data = [];
          prop_list.forEach((item_h, index) => {
            if (delHeaders.indexOf(item_h) === -1) {
              row_data.push(item[item_h]);
            }
          });

          aoa.push(row_data);
        });
        // row_data = getdata(tableData);
        // console.log("==row_data==", row_data);

        console.log("==aoa==", aoa);

        const ws = XLSX.utils.aoa_to_sheet(aoa, headerRows);
        ws["!merges"] = merges;

        console.log("=ws=", ws);

        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, sheetName);

        // if (hiddenIndex) {
        //   for (let i = 0; i < hiddenIndex.length; i++) {
        //     // const cellAddress = `${columnLetter}${parseInt(hiddenIndex[i])}`;
        //     wb.Sheets[sheetName]["!cols"][hiddenIndex[i]] = { hidden: true };
        //   }
        // }

        console.log("=wb=", wb);

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

function buildHeader(revealList) {
  console.log("==revealList==", revealList);
  let excelHeader = [];
  // 构建生成excel表头需要的数据结构
  getHeader(revealList, excelHeader, 0, 0);
  // 多行表头长短不一，短的向长的看齐，不够的补上行合并占位符
  console.log("==2==");
  let max = Math.max(...excelHeader.map((a) => a.length));

  excelHeader
    .filter((e) => e.length < max)
    .forEach((e) => pushRowSpanPlaceHolder(e, max - e.length));

  return excelHeader;
}

function pushRowSpanPlaceHolder(arr, count) {
  for (let i = 0; i < count; i++) {
    arr.push("!$ROW_SPAN_PLACEHOLDER");
  }
}

function getHeader(headers, excelHeader, deep, perOffset) {
  let offset = 0;
  let cur = excelHeader[deep];
  if (!cur) {
    cur = excelHeader[deep] = [];
  }
  // 填充行合并占位符
  pushRowSpanPlaceHolder(cur, perOffset - cur.length);
  for (let i = 0; i < headers.length; i++) {
    let head = headers[i];
    cur.push(head.label);
    if (
      head.hasOwnProperty("children") &&
      Array.isArray(head.children) &&
      head.children.length > 0
    ) {
      let childOffset = getHeader(
        head.children,
        excelHeader,
        deep + 1,
        cur.length - 1
      );
      // 填充列合并占位符
      pushColSpanPlaceHolder(cur, childOffset - 1);
      offset += childOffset;
    } else {
      offset++;
    }
  }
  console.log("==offset=", offset);
  console.log("==1==");
  return offset;
}
// 填充列合并占位符
function pushColSpanPlaceHolder(arr, count) {
  for (let i = 0; i < count; i++) {
    arr.push("!$COL_SPAN_PLACEHOLDER");
  }
}

// 合并单元格
function doMerges(arr) {
  // 要么横向合并 要么纵向合并
  let deep = arr.length;
  let merges = [];
  for (let y = 0; y < deep; y++) {
    // 先处理横向合并
    let row = arr[y];
    let colSpan = 0;
    for (let x = 0; x < row.length; x++) {
      if (row[x] === "!$COL_SPAN_PLACEHOLDER") {
        row[x] = undefined;
        if (x + 1 === row.length) {
          merges.push({ s: { r: y, c: x - colSpan - 1 }, e: { r: y, c: x } });
        }
        colSpan++;
      } else if (colSpan > 0 && x > colSpan) {
        merges.push({ s: { r: y, c: x - colSpan - 1 }, e: { r: y, c: x - 1 } });
        colSpan = 0;
      } else {
        colSpan = 0;
      }
    }
  }
  // 再处理纵向合并
  let colLength = arr[0].length;
  for (let x = 0; x < colLength; x++) {
    let rowSpan = 0;
    for (let y = 0; y < deep; y++) {
      if (arr[y][x] === "!$ROW_SPAN_PLACEHOLDER") {
        arr[y][x] = undefined;
        rowSpan++;
        if (y + 1 === deep) {
          merges.push({ s: { r: y - rowSpan, c: x }, e: { r: y, c: x } });
        }
      } else if (rowSpan > 0 && y > rowSpan) {
        merges.push({ s: { r: y - rowSpan - 1, c: x }, e: { r: y - 1, c: x } });
        rowSpan = 0;
      } else {
        rowSpan = 0;
      }
    }
  }
  return merges;
}

// // 提取数据
// function extractData(selectionData, revealList) {
//   // 列
//   let headerList = flat(revealList);
//   // 导出的结果集
//   let excelRows = [];
//   // 如果有child集合的话会用到
//   let dataKeys = new Set(Object.keys(selectionData[0]));
//   selectionData.some((e) => {
//     if (e.child && e.child.length > 0) {
//       let childKeys = Object.keys(e.child[0]);
//       for (let i = 0; i < childKeys.length; i++) {
//         dataKeys.delete(childKeys[i]);
//       }
//       return true;
//     }
//   });
//   flatData(selectionData, (list) => {
//     excelRows.push(...this.buildExcelRow(dataKeys, headerList, list));
//   });
//   return excelRows;
// }

// // 扁平头部
// function flat(revealList) {
//   let result = [];
//   revealList.forEach((e) => {
//     if (e.hasOwnProperty("child")) {
//       result.push(...this.flat(e.child));
//     } else if (e.hasOwnProperty("exeFun")) {
//       result.push(e);
//     } else if (e.hasOwnProperty("prop")) {
//       result.push(e);
//     }
//   });
//   return result;
// }

// function flatData(list, eachDataCallBack) {
//   let resultList = [];
//   for (let i = 0; i < list.length; i++) {
//     let data = list[i];
//     let rawDataList = [];
//     // 每个子元素都父元素合并成一条数据
//     if (data.child && data.child.length > 0) {
//       for (let j = 0; j < data.child.length; j++) {
//         delete data.child[j].bsm;
//         let copy = Object.assign({}, data, data.child[j]);
//         rawDataList.push(copy);
//         copy["rowSpan"] = j > 0 ? 0 : data.child.length;
//       }
//     } else {
//       data["rowSpan"] = 1;
//       rawDataList.push(data);
//     }
//     resultList.push(...rawDataList);
//     if (typeof eachDataCallBack === "function") {
//       eachDataCallBack(rawDataList);
//     }
//   }
//   return resultList;
// }
// function getdata(tableData) {
//   tableData.forEach((item, index) => {
//     row_data = [];
//     headerData.forEach((item_h, index) => {
//       if (item.children && item.children.length > 0) {
//         return item[item_h.prop];
//       } else {
//         getdata(item.children);
//       }
//     });
//   });
//   return row_data;
// }

function get_prop_list(arr) {
  let keys = []; // 存放所有键的数组
  arr.forEach((item) => {
    if (item.children) {
      keys.push(...get_prop_list(item.children)); // 如果值为对象类型，则递归调用该函数并将结果合并到keys数组中
    } else {
      keys.push(item.prop); // 否则直接将当前键添加到keys数组中
    }
  });
  return keys;
}

// function del_header(arr, delHeaders) {
//   let keys = []; // 存放所有键的数组
//   arr.forEach((item) => {
//     if (item.children) {
//       keys.push(...del_header(item.children, delHeaders)); // 如果值为对象类型，则递归调用该函数并将结果合并到keys数组中
//     } else {
//       if (delHeaders.indexOf(item.prop) === -1) {
//         keys.push(item); // 否则直接将当前键添加到keys数组中
//       }
//     }
//   });
//   return keys;
// }

function del_header(arr, delHeaders) {
  let del_keys = []; // 存放所有键的数组

  arr.forEach((item, index) => {
    if (delHeaders.indexOf(item.prop) >= 0) {
      del_keys.push(index);
    }

    if (item.children) {
      del_header(item.children, delHeaders);
    }
    // else {
    //   if (delHeaders.indexOf(item.prop) >= 0) {
    //     // arr.splice(index, 1);
    //     del_keys.push(index);
    //   }
    // }
  });
  del_keys = del_keys.reverse();

  del_keys.forEach((item, index) => {
    arr.splice(item, 1);
  });

  return arr;
}
