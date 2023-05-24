import {
  Meta,
  PageInfo,
  resultSuccess,
  getRequestToken,
  requestParams,
} from "../_util";
import {ResultEnum} from "../resultEnum";
import {createFakeUserList} from "./user";

var Mock = require("mockjs");
var Random = Mock.Random;

// rowDataFake、rowDataFake02、生成yui-table行数据
const rowDataFake: any[] = [];

for (var i = 0; i < 95; i++) {
  var age_num = Random.integer(20, 120);
  let fakeObj = {
    id: Random.id(), // id
    date: Random.datetime("yyyy-MM-dd"),  // 值是指定格式的日期字符串
    name: Random.cname(), // 中文名字

    age: age_num + '岁',
    age_num: age_num,
    num: Random.integer(0, 10000),
    address: `${Random.province()}-${Random.city()}-${Random.county()}`, // 地址
  };
  // console.log(fakeObj);
  rowDataFake.push(fakeObj)
}


const rowDataFake02: any[] = [];

for (var i = 0; i < 66; i++) {
  var age_num = Random.integer(20, 120);
  var province = Random.province();
  var city = Random.city()
  let fakeObj = {
    id: Random.id(), // id
    date: Random.datetime("yyyy-MM-dd"),  // 值是指定格式的日期字符串
    name: Random.cname(), // 中文名字

    age: age_num + '岁',
    age_num: age_num,
    num: Random.integer(0, 10000),
    address: `${province}-${city}-${Random.county()}`, // 地址
    province: province,
    city: city,
    zip: '11011',
  };
  // console.log(fakeObj);
  rowDataFake02.push(fakeObj)
}

// tableData、tableData2、tableData3、模拟yui-table数据
const tableData: any =
  {
    rowData: rowDataFake,
    // 合计数据
    getAllTotalData: {
      levelOneTotal: '100元',
      levelTwoTotal: 200,
      levelThreeTotal: 300,
    },
    headerData: [
      // {
      //   id: 100,
      //   width: "55",
      //   type: "selection",
      // },

      {slot: "expand"},

      // {
      //   id: 100,
      //   width: "55",
      //   type: "expand",
      //   fixed: true, // 固定列 true left right
      // },


      {
        id: 100,
        label: "日期",
        prop: "date",
        width: "150",
        sortable: true,
        fixed: true, // 固定列 true left right

      },
      {
        id: 210,
        label: "姓名",
        prop: "name",
        width: "120",
        sortable: true,

      },
      {
        id: 220,
        label: "地址",
        prop: "address",
        width: "300",
        sortable: true,
      },
      {slot: "age"},
      {
        id: 220,
        label: "数值",
        prop: "num",
        width: "100",
      },

    ],
    controlAtrr: {
      pageObj: { //分页对象
        position: "right", //分页组件位置 right left
        background: false, // 带有背景色的分页 false / true
        small: true, // 小型分页 false / true
        hide_on_single_page: true, // 当只有一页时隐藏分页
        pager_count: 5, // 设置最大页码按钮数
        page_sizes: [10, 15, 20, 30, 50, 200],  // 接受一个整型数组，数组元素为展示的选择每页显示个数的选项
        layout: "total,sizes,prev, pager, next,jumper", // 表示需要显示的内容，用逗号分隔，布局元素会依次显示。
        total: rowDataFake.length, // 总条数
        pageData: {
          page: 1,  // 页数
          size: 10  // 每页条数
        }
      },
    },
  };

const tableData2: any =
  {
    rowData: [
      {
        id: 1,
        date: '2016-05-02',
        name: '王小虎',
        age: '10岁',
        age_num: '10',
        num: '9',
        address: '上海市普陀区金沙江路 1518 弄',
        province: '上海',
        city: '上海',
        zip: '11011',
        hasChildren: true,
      },
      {
        id: 2,
        date: '2016-05-04',
        name: '王大虎',
        age: '120岁',
        age_num: 20,
        num: 120,
        address: '上海市普陀区金沙江路 1517 弄',
        province: '上海',
        city: '上海',
        zip: '11011',

      },
      {
        id: 3,
        date: '2016-05-01',
        name: '王小虎',
        age: '256岁',
        age_num: 256,
        num: 26,
        address: '上海市普陀区金沙江路 1519 弄',
        province: '上海',
        city: '上海',
        zip: '11011',
        children: [{
          id: 31,
          date: '2016-05-01',
          name: '王小虎',
          age: '20岁',
          age_num: 20,
          num: 203,
          address: '上海市普陀区金沙江路 1519 弄',
          province: '上海',
          city: '上海',
          zip: '11011',

        }, {
          id: 32,
          date: '2016-05-01',
          name: '王小虎',
          age: '12岁',
          age_num: 12,
          num: 132,
          address: '上海市普陀区金沙江路 1519 弄',
          province: '上海',
          city: '上海',
          zip: '11011',
        }]
      },
      {
        id: 4,
        date: '2016-05-03',
        name: '王小虎',
        age: '66岁',
        age_num: 66,
        num: 345,
        address: '上海市普陀区金沙江路 1516 弄',
        hasChildren: true,
        province: '上海',
        city: '上海',
        zip: '11011',
      }].concat(rowDataFake02),
    headerData: [
      {
        id: 100,
        width: "55",
        type: "selection",
      },
      {
        id: 100,
        label: "日期",
        prop: "date",
        width: "150",
        fixed: true,
      },
      {
        id: 200,
        label: "配送信息",
        prop: "",
        children: [
          {
            id: 210,
            label: "姓名",
            prop: "name",
            width: "120",
            fixed: true,
          },
          {
            id: 200,
            label: "地址",
            prop: "",
            children: [
              {
                id: 210,
                label: "省份",
                prop: "province",
                width: "120",

              },
              {
                id: 220,
                label: "城市",
                prop: "city",
                width: "120",
              },
              {
                id: 230,
                label: "详细地址",
                prop: "address",
                width: "300",
              },
              {
                id: 240,
                label: "邮编",
                prop: "zip",
                width: "120",
              },
            ],
          },
        ],
      },

    ],
    controlAtrr: {
      pageObj: { //分页对象
        position: "left", //分页组件位置 right left
        background: false, // 带有背景色的分页 false / true
        small: false, // 小型分页 false / true
        hide_on_single_page: false, // 当只有一页时隐藏分页
        pager_count: 8, // 设置最大页码按钮数
        page_sizes: [10, 15, 20, 30, 50, 200],  // 接受一个整型数组，数组元素为展示的选择每页显示个数的选项
        layout: "total,sizes,prev, pager, next,jumper", // 表示需要显示的内容，用逗号分隔，布局元素会依次显示。
        total: rowDataFake02.length, // 总条数
        pageData: {
          page: 1,  // 页数
          size: 10  // 每页条数
        }
      },
    },
  };


const tableData3: any =
  {
    rowData: [
      {
        date: '2016-05-02',
        userId: "admin",
        userName: "管理员",
        tel: "10",
        cardType: 1,
      },
      {
        date: '2016-05-03',
        userId: "Mary",
        userName: "玛丽",
        tel: "20",
        cardType: 2,
      },
    ],
    headerData: [

      {slot: "date"},
      {label: "名称", prop: "userId"},
      {label: "链接", prop: "userName"},
      {slot: "cardType"},
      {slot: "operate"},


    ],
  };

export default [
  // GetUserMenuInfo
  {
    url: "/api/data/tableData",
    timeout: 200,
    type: "post",
    //response: ({config}) => {
    response: function (option: any) {
      const meta: Meta = {
        code: ResultEnum.INVALID_TOKEN,
        message: "Invalid token!",
        success: true,
      };
      const pageInfo: PageInfo = {
        PageNum: "",
        PageSize: "",
        Pages: "",
        Total: "",
      };
      const token = getRequestToken(option);
      //console.log("--------------/api/menu/usermenu----------------",token);
      if (!token) {
        meta.code = ResultEnum.SUCCESS;
        meta.success = true;
        meta.message = "Incorrect account or password！";
        return resultSuccess(null, meta, pageInfo);
      }
      const checkUser = createFakeUserList().find(
        (item) => item.token === token
      );
      if (!checkUser) {
        meta.code = ResultEnum.SUCCESS;
        meta.success = true;
        meta.message = "Invalid user token!";
        return resultSuccess(null, meta, pageInfo);
      }
      meta.code = ResultEnum.SUCCESS;
      meta.success = true;
      meta.message = "ok";
      return resultSuccess(tableData, meta, pageInfo);
    },
  },


  {
    url: "/api/data/2tableData",
    timeout: 200,
    type: "post",
    //response: ({config}) => {
    response: function (option: any) {
       // console.log("===request.body==",option.body)
       const { page, size } = option.body;
      const meta: Meta = {
        code: ResultEnum.INVALID_TOKEN,
        message: "Invalid token!",
        success: true,
      };
      const pageInfo: PageInfo = {
        PageNum: "",
        PageSize: "",
        Pages: "",
        Total: "",
      };
      const token = getRequestToken(option);
      //console.log("--------------/api/menu/usermenu----------------",token);
      if (!token) {
        meta.code = ResultEnum.SUCCESS;
        meta.success = true;
        meta.message = "Incorrect account or password！";
        return resultSuccess(null, meta, pageInfo);
      }
      const checkUser = createFakeUserList().find(
        (item) => item.token === token
      );
      if (!checkUser) {
        meta.code = ResultEnum.SUCCESS;
        meta.success = true;
        meta.message = "Invalid user token!";
        return resultSuccess(null, meta, pageInfo);
      }
      meta.code = ResultEnum.SUCCESS;
      meta.success = true;
      meta.message = "ok";
      tableData2['controlAtrr']['pageObj']['pageData']['page'] = page;
      tableData2['controlAtrr']['pageObj']['pageData']['size'] = size;
       // console.log(tableData2['rowData'])
      var reTableData2 = JSON.parse(JSON.stringify(tableData2));
      reTableData2['rowData'] = reTableData2.rowData.slice((page - 1) * size, page * size);// 10,20
      // console.log(reTableData2['rowData'])
      return resultSuccess(reTableData2, meta, pageInfo);
    },
  },

  {
    url: "/api/data/3tableData",
    timeout: 200,
    type: "post",
    //response: ({config}) => {
    response: function (option: any) {
      const meta: Meta = {
        code: ResultEnum.INVALID_TOKEN,
        message: "Invalid token!",
        success: true,
      };
      const pageInfo: PageInfo = {
        PageNum: "",
        PageSize: "",
        Pages: "",
        Total: "",
      };
      const token = getRequestToken(option);
      //console.log("--------------/api/menu/usermenu----------------",token);
      if (!token) {
        meta.code = ResultEnum.SUCCESS;
        meta.success = true;
        meta.message = "Incorrect account or password！";
        return resultSuccess(null, meta, pageInfo);
      }
      const checkUser = createFakeUserList().find(
        (item) => item.token === token
      );
      if (!checkUser) {
        meta.code = ResultEnum.SUCCESS;
        meta.success = true;
        meta.message = "Invalid user token!";
        return resultSuccess(null, meta, pageInfo);
      }
      meta.code = ResultEnum.SUCCESS;
      meta.success = true;
      meta.message = "ok";
      return resultSuccess(tableData3, meta, pageInfo);
    },
  },

];
