export const FormSchema = {
    fieldForm: {name:"ES meetup",region:1},
    fieldList: [
      {
        field: "name",
        name: "活动名称",
        mold: "Input",
        formType: "text",
        // 检验唯一性
        isNull: 1,
      },
      {
        field: "region",
        name: "活动区域",
        mold: "Select",
        formType: "select",
        setting: [
          {
            label: "区域一",
            value: 0,
          },
          {
            label: "区域二",
            value: 1,
          },
        ],
      },
      {
        field: "date",
        name: "活动区域",
        mold: "Date",
        formType: "datetime",
      },
      {
        field: "deliver",
        name: "即时配送",
        mold: "Select",
        formType: "switch",
      },
      {
        field: "type",
        name: "活动性质",
        mold: "Select",
        formType: "checkbox-group",
        setting: [
          {
            label: "美食/餐厅线上活动",
          },
          {
            label: "地推活动",
          },
          {
            label: "线下主题活动",
          },
          {
            label: "单纯品牌曝光",
          },
        ],
      },
      {
        field: "resource",
        name: "资源",
        mold: "Select",
        formType: "radio-group",
        setting: [
          {
            label: "线上品牌商赞助",
            value: 0,
          },
          {
            label: "线下场地免费",
            value: 1,
          },
        ],
      },
      {
        field: "desc",
        name: "活动形式",
        mold: "Input",
        formType: "textarea",
        rows: 3,
      },
    ],
  };
