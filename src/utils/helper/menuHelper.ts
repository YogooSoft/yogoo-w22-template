/**
 *  用于菜单相关处理函数
 */

import { cloneDeep } from "lodash-es";
/**
 *  剔除不需要显示在侧边栏的菜单
 */
export function hideAsideMenu(AsideMenuList: any) {
  const modules = cloneDeep(AsideMenuList);
  for (let index = 0; index < modules.length; index++) {
    const menuModule = modules[index];

    // 删除子菜单
    // 获取 hideChildrenInMenu redirect
    let { hideChildrenInMenu } = menuModule.meta;
    if (hideChildrenInMenu) {
      // 子菜单置空
      menuModule.children = [];
      // 当前菜单路径设置为 redirect
      menuModule.path = menuModule.redirect;
    }

    DeleteAsideMenu(menuModule.children);
  }
  return modules;
}

//删除菜单
function DeleteAsideMenu(menuModule: any) {
  // menuModule = menuModule.sort();
  for (let index = menuModule.length - 1; index >= 0; index--) {
    // 删除子菜单 
    // 获取 hideChildrenInMenu
    let { hideChildrenInMenu } = menuModule[index].meta;
    if (hideChildrenInMenu) {
      // 子菜单置空
      menuModule[index].children = [];
      // 当前菜单路径设置为 redirect
      menuModule[index].path = menuModule[index].redirect;
    }

    // 删除单独菜单
    // 获取hideMenu
    let { hideMenu } = menuModule[index].meta;
    // hideMenu 为true 删除当前菜单
    if (hideMenu) {
      menuModule.splice(index, 1);
    }
    // hideMenu 不为true 对其 children进行相同操作
    else {
      const { children } = menuModule[index];
      children && DeleteAsideMenu(children);
    }
  }
}
