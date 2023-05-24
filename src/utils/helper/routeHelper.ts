/**
 *  用于路由相关处理函数
 */

import type {AppRouteModule, AppRouteRecordRaw} from '@/router/types';
import type {Router, RouteRecordNormalized} from 'vue-router';


import {APIVIEWS, LAYOUT, LAYOUTEMPTY} from '@/router/constant';
import {cloneDeep, omit} from 'lodash-es';

import {createRouter, createWebHashHistory} from 'vue-router';

import {Notification} from "@/hooks/web/useNotification";

import {usePermissionStore} from '@/store/modules/permission';
import {any} from "vue-types";


const LayoutMap = new Map<string, () => Promise<typeof import('*.vue')>>();
// LayoutMap.set('DEFAULT', DEFAULT);
LayoutMap.set('LAYOUT', LAYOUT);
LayoutMap.set('LAYOUTEMPTY', LAYOUTEMPTY);


// 动态路由引入
function asyncImportRoute(routes: AppRouteRecordRaw[] | undefined,parentPath:any,parentInsideRouter:any) {
    if (!routes) return;
    routes.forEach((item) => {
        let {component, name, path} = item; // component=item.component  name=item.name
        try {
            const insideRouter = item.meta.insideRouter;
            if (insideRouter === true) {
                const permissionStore = usePermissionStore();
                // 内部路由路径添加
                permissionStore.addInsideRouterList(path);
                // 内部路由与父级路由对应关系添加
                // 两种情况，1：父级路由是普通路由 2：父级路由也是内部路由
                // 父级路由也是内部路由
                if(parentInsideRouter === true){
                    // 获取父级路由的父级路由
                    const parentDict = permissionStore.getInsideParentRouterDict;
                    permissionStore.addInsideParentRouterDict(path,parentDict[parentPath]);
                }
                // 父级路由是普通路由
                else{
                    permissionStore.addInsideParentRouterDict(path,parentPath);
                }

            }

        } catch (e) {

        }

        // 匹配组件
        const {children} = item;
        // 如果组件地址不为空，从LayoutMap池中匹配组件
        if (component) {
            const layoutFound = LayoutMap.get(component.toUpperCase());
            // 如果匹配到了，赋值
            if (layoutFound) {
                item.component = layoutFound;

            } else {
                // 没有匹配到，将component中的路径 与 视图组件列表进行匹配，赋值
                if( item.components){
                    const componentsDict = {};
                    componentsDict[item.name] =  () => import(`@/views${component}`);
                    item.components =componentsDict; // 定义公共函数，调用 有效
                }else{
                    // item.component = APIVIEWS(item.component); // 定义公共函数，调用 有效
                    item.component = () => import(`@/views${component}`);
                }
            }
        }
        else{
            // 如果路由为指定组件地址，则地址置空 
             item.path=""
        }
        children && asyncImportRoute(children,path,item.meta.insideRouter);
    });

}


// Turn background objects into routing objects
export function transformObjToRoute<T = AppRouteModule>(routeList: AppRouteModule[]): T[] {
    // 内部路由路径置空
    const permissionStore = usePermissionStore();
    permissionStore.setInsideRouterList([]);

    // 给第一层路由加载组件
    routeList.forEach((route) => {
        const component = route.component as string;
        // 判断是否有组件信息
        if (component) {
            // 可定义特定代码，匹配对应的组件视图
            if (component.toUpperCase() === 'LAYOUT') {
                route.component = LayoutMap.get(component.toUpperCase());
            } else {
                route.children = [cloneDeep(route)];
                route.component = LAYOUT;
                route.meta.breadcrumb = false;
            }
        } else {
            Notification.warning("", '请正确配置路由：' + route?.name + '的component属性');
        }
        route.children && asyncImportRoute(route.children,route.path,route.meta.insideRouter);
    });


    return routeList as unknown as T[];
}


/**
 *  将多级路由转换为两级结构
 */
export function flatMultiLevelRoutes(routeModules: AppRouteModule[]) {
    const modules: AppRouteModule[] = cloneDeep(routeModules);
    for (let index = 0; index < modules.length; index++) {
        const routeModule = modules[index];
        if (!isMultipleRoute(routeModule)) {
            continue;
        }
        promoteRouteLevel(routeModule);
    }
    return modules;
}

//提升路由级别
function promoteRouteLevel(routeModule: AppRouteModule) {
    let router: Router | null = createRouter({
        routes: [routeModule as unknown as RouteRecordNormalized],
        history: createWebHashHistory(),
    });

    const routes = router.getRoutes();
    addToChildren(routes, routeModule.children || [], routeModule);
    router = null;

    routeModule.children = routeModule.children?.map((item) => omit(item, 'children'));
}

// 将所有二级以上路由，提升至二级路由
function addToChildren(
    routes: RouteRecordNormalized[],
    children: AppRouteRecordRaw[],
    routeModule: AppRouteModule
) {
    for (let index = 0; index < children.length; index++) {
        const child = children[index];
        const route = routes.find((item) => item.name === child.name);
        if (!route) {
            continue;
        }
        routeModule.children = routeModule.children || [];
        if (!routeModule.children.find((item) => item.name === route.name)) {
            routeModule.children?.push(route as unknown as AppRouteModule);
        }
        if (child.children?.length) {
            addToChildren(routes, child.children, routeModule);
        }
    }
}

// 确定层级是否超过两级
function isMultipleRoute(routeModule: AppRouteModule) {
    if (!routeModule || !Reflect.has(routeModule, 'children') || !routeModule.children?.length) {
        return false;
    }

    const children = routeModule.children;

    let flag = false;
    for (let index = 0; index < children.length; index++) {
        const child = children[index];
        if (child.children?.length) {
            flag = true;
            break;
        }
    }
    return flag;
}
