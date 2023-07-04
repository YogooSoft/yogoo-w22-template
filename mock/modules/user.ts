import Mock, { Random } from "mockjs";
import {
  resultSuccess,
  getRequestToken,
  requestParams,
  Meta,
  PageInfo,
} from "../_util";
import { toRaw } from "vue";
import { isUnDef } from "@/utils/is";
import { messageTypes } from "element-plus";
import { ResultEnum } from "../resultEnum";

export function createFakeUserList() {
  return [
    {
      userId: "1",
      username: "admin",
      realname: "超级管理员",
      avatar: "",
      desc: "manager",
      password: "123456",
      token: "fakeToken1",
      homePath: "/dashboard/analysis",
      roles: [
        {
          roleName: "Super Admin",
          value: "super",
        },
      ],
    },
    {
      userId: "2",
      username: "test",
      password: "123456",
      realname: "测试用户",
      avatar: "",
      desc: "tester",
      token: "fakeToken2",
      homePath: "/dashboard/workbench",
      roles: [
        {
          roleName: "Tester",
          value: "test",
        },
      ],
    },
  ];
}

const fakeCodeList: any = ['1000', '2000', '3000','4000'];
const fakeCodeList2: any =  ['1000','2000'];

const list: any = [];
for (let i = 0; i < 20; i++) {
  list.push({
    id: Random.id(),
    name: Random.cname(),
    backcode: Random.integer(10000000, 80000000),
    url: Random.url("http"),
    createTime: Random.datetime("yyyy-MM-dd HH:mm:ss"),
    updateTime: Random.datetime("yyyy-MM-dd HH:mm:ss"),
  });
}

export default [
  // mock user login
  {
    url: "/api/user/login",
    timeout: 200,
    type: "post",
    response: ({ body }) => {
      console.log("------------body--user--------",body);
      const meta: Meta = {
        code: ResultEnum.SUCCESS,
        message: "Login completed",
        success: true,
      };

      const pageInfo: PageInfo = {
        PageNum: "",
        PageSize: "",
        Pages: "",
        Total: "",
      };

      const { username, password } = body;
      const checkUser = createFakeUserList().find(
        (item) => item.username === username && password === item.password
      );
      if (!checkUser) {
        meta.code = ResultEnum.SUCCESS;
        meta.success = true;
        meta.message = "Incorrect account or password！";
        return resultSuccess(null, meta, pageInfo);
      }
      const {
        userId,
        username: _username,
        token,
        realname,
        desc,
        roles,
      } = checkUser;

      return resultSuccess(
        {
          roles,
          userId,
          username: _username,
          token,
          realname,
          desc,
        },
        meta,
        pageInfo
      );
    },
  },
  {
    url: "/api/user/logout",
    timeout: 200,
    type: "post",
    response: (request: requestParams) => {
      //console.log("------------body--user--------",request);
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
      const token = getRequestToken(request);
      if (!token) return resultSuccess(null, meta, pageInfo);
      const checkUser = createFakeUserList().find(
        (item) => item.token === token
      );
      if (!checkUser) {
        meta.code = ResultEnum.INVALID_TOKEN;
        meta.success = true;
        meta.message = "Invalid token!";
        return resultSuccess(null, meta, pageInfo);
      }
      meta.code = ResultEnum.SUCCESS;
      meta.success = true;
      meta.message = "Token has been destroyed";
      return resultSuccess(null, meta, pageInfo);
    },
  },
  // GetUserInfo
  {
    url: "/api/user/info",
    type: "get",
    response: () => {
      const meta: Meta = {
        code: "0",
        message: "ok",
        success: true,
      };
      const pageInfo: PageInfo = {
        PageNum: "",
        PageSize: "",
        Pages: "",
        Total: "",
      };
      return resultSuccess(list, meta, pageInfo);
    },
  },
  // getToken
  {
    url: "/api/auth/oauth/token",
    type: "post",
    response: (request: requestParams) => {
      const meta: Meta = {
        code: "0",
        message: "ok",
        success: true,
      };
      const pageInfo: PageInfo = {
        PageNum: "",
        PageSize: "",
        Pages: "",
        Total: "",
      };
      const token = getRequestToken(request);
      return resultSuccess(token, meta, pageInfo);
    },
  },
  // getSessionTimeout
  {
    url: "/api/user/sessionTimeout",
    type: "post",
    response: () => {
      const meta: Meta = {
        code: "100001",
        message: "Invalid user token",
        success: true,
      };
      const pageInfo: PageInfo = {
        PageNum: "",
        PageSize: "",
        Pages: "",
        Total: "",
      };
      return resultSuccess(null, meta, pageInfo);
    },
  },
  {
    url: "/api/user/verifyLogin",
    type: "post",
    response: (request: requestParams) => {
      console.log("------------body--user--------",request);
      //console.log("------------body--body--------",body);
      const { username, password } = request.body;

      console.log("------------body--user pwd--------",username,password);

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
      const token = getRequestToken(request);
      if (!token) return resultSuccess(null, meta, pageInfo);
      // const checkUser = createFakeUserList().find(
      //   (item) => item.token === token
      // );
      const checkUser = createFakeUserList().find(
        (item) => item.username === username && password === item.password
      );
      if (!checkUser) {
        meta.code = ResultEnum.ERROR ;
        meta.success = true;
        meta.message = "Invalid token!";
        return resultSuccess(null, meta, pageInfo);
      }
      meta.code = ResultEnum.SUCCESS;
      meta.success = true;
      meta.message = "Token has been destroyed";
      return resultSuccess(null, meta, pageInfo);
    },
  },

  // 模拟权限代码查询接口 
  {
      url: "/sys/permission/getPermCode",
      timeout: 200,
      type: "post",
      response: (request: requestParams) => {
        const { userid, menu_id } = request.body;
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

        meta.code = ResultEnum.SUCCESS;
        meta.success = true;
        meta.message = "ok";
        if(userid == 'role1'){
          return resultSuccess(fakeCodeList, meta, pageInfo);
        }
        if(userid == 'role2'){
          return resultSuccess(fakeCodeList2, meta, pageInfo);
        }


      },
    },
];

