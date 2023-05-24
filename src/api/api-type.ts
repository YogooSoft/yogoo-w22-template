export interface IAccountMenuParam {
  roleId: string;
}

export interface IAccountMenuItem {
  title: string;
  /** 菜单组id */
  id: string;
  list: Array<IAccountMenuItemListItem>;
}

export interface IAccountMenuItemListItem {
  id: string;
  menuKey: string;
  name: string;
  /** 菜单组id */
  parentId: string;
  type: number;
  url: string;
}

export interface ITest {
  code: string;
  message: string;
  data: string;
}

export interface ILogin {
  user: string;
  pwd: string;
}
