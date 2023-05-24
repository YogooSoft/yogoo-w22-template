/**
 * Created by yxk at 2020/6/1
 * 单个自定义字段生成校验规则
 */

//类型判断
import { isEmpty, isObject, isArray } from "@/utils/is.ts";

export default function () {
  /**
   * 唯一性校验
   * @param data
   * @returns {Promise<unknown>}
   * @constructor
   */
  const UniquePromise = (data: any) => {
    return new Promise((resolve: any) => {
      resolve(data);
    });
  };
  /**
   * 生成单个字段的验证规则
   * @param item 字段信息
   * @returns {[]}
   */
  const getRules = (item: any) => {
    const tempList = [] as any[];
    // 验证必填
    if (item.isNull === 1) {
      if (item.formType === "detail_table") {
        tempList.push({
          validator: ({ item }: any, value: any, callback: any) => {
            if (getDetailTableIsEmpty(item.fieldExtendList, value)) {
              callback(new Error(item.name + "不能为空"));
            } else {
              callback();
            }
          },
          item: item,
          trigger: ["blur", "change"],
        });
      } else if (
        item.formType === "checkbox" ||
        item.formType === "dep-select"
      ) {
        tempList.push({
          validator: ({ item }: any, value: any, callback: any) => {
            if (!isArray(value) || value.length === 0) {
              callback(new Error(item.name + "不能为空"));
            } else {
              const emptyObj = value.find((valueItem: any) =>
                isEmpty(valueItem)
              );
              emptyObj === ""
                ? callback(new Error(item.name + "不能为空"))
                : callback();
            }
          },
          item: item,
          trigger: ["blur", "change"],
        });
      } else {
        tempList.push({
          required: true,
          message: item.name + "不能为空",
          trigger: ["blur", "change"],
        });
      }
    }

    // 验证唯一
    if (item.isUnique === 1 && UniquePromise) {
      const validateUnique = (rule: any, value: any, callback: any) => {
        if (isEmpty(value)) {
          callback();
        } else {
          // 验证唯一
          UniquePromise({
            field: item,
            rule: rule,
            value: value,
          })
            .then(() => {
              callback();
            })
            .catch((msg) => {
              callback(new Error(msg || "验证出错"));
            });
        }
      };
      tempList.push({
        validator: validateUnique,
        item: item,
        trigger:
          item.formType === "checkbox" || item.formType === "select"
            ? ["change", "blur"]
            : ["blur"],
      });
    }

    return tempList;
  };

  /**
   * 获取数值规则
   */
  const getNumberRule = (rule: any, value: any, callback: any) => {
    const field = rule.item;

    const arr = String(value).split(".");

    const len = String(value).replace(".", "").replace("-", "").length;
    const maxlength = field.formType === "percent" ? 10 : 15;

    const min = isEmpty(field.minNumRestrict)
      ? -Infinity
      : Number(field.minNumRestrict || -Infinity);
    const max = isEmpty(field.maxNumRestrict)
      ? Infinity
      : Number(field.maxNumRestrict || Infinity);

    if (len > maxlength) {
      callback(new Error(`最多支持${maxlength}位数字（包含小数位）`));
    } else if (isEmpty(field.precisions) && String(value).includes(".")) {
      // null 不支持小数  0 不限制小数位
      callback(new Error(`不支持小数`));
    } else if (arr.length > 1 && arr[1].length > Number(field.precisions)) {
      callback(new Error(`小数位不能大于${field.precisions}`));
    } else if (value < min) {
      callback(new Error(`不能小于${min}`));
    } else if (value > max) {
      callback(new Error(`不能大于${max}`));
    } else {
      callback();
    }
  };

  /**
   * 判断明细表格是否是空
   * @param {*} fieldList
   * @param {*} valueObj
   */
  const getDetailTableIsEmpty = (fieldList: any, valueObjs: any) => {
    for (let index = 0; index < valueObjs.length; index++) {
      const valueObj = valueObjs[index];
      if (judgeFormValueIsEmpty(fieldList, valueObj)) {
        return true;
      }
    }
    return false;
  };
  /**
   * 判断对象值是否是空
   */
  const judgeFormValueIsEmpty = (fieldList: any, valueObj: any) => {
    for (let index = 0; index < fieldList.length; index++) {
      const field = fieldList[index];
      const value = valueObj[field.fieldName];
      if (field.formType === "location") {
        if (
          isObject(value) &&
          (!isEmpty(value.lat) ||
            !isEmpty(value.lng) ||
            !isEmpty(value.address))
        ) {
          return false;
        }
      } else if (!isEmpty(value)) {
        return false;
      }
    }
    return true;
  };
  return {
    UniquePromise,
    getRules,
  };
}
