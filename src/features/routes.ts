import path from 'path';
import type { IApi } from 'umi';
import type { IRoute } from '@umijs/core/dist/types';
import { getConventionRoutes } from '@umijs/core';

export default (api: IApi) => {
    api.describe({ key: 'my-dumi:routes' });

    api.modifyRoutes((oRoutes: Record<string, IRoute>) => {
        const routes: Record<string, IRoute> = {}

        const docDir = 'docs'
        // 获取某个目录下所有可以配置成umi约定路由的文件
        const dirRoutes: Record<string, IRoute> = getConventionRoutes({
            base: path.join(api.cwd, docDir),
        });
        console.log("qly ~ dirRoutes:", dirRoutes)

        // 默认提供的布局layout的Id
        let docLayoutId: undefined | string = '@@/global-layout';
        const { DocLayout } = api.service.themeData.layouts;
        // 从旧路由对象中获取放入返回值中
        if (DocLayout) {
            docLayoutId = DocLayout.specifier;
            routes[DocLayout.specifier] = {
                id: DocLayout.specifier,
                path: '/',
                file: DocLayout.source,
                parentId: undefined,
                absPath: '/',
                isLayout: true,
            };
        }

        Object.entries(dirRoutes).forEach(([key, route]) => {
            // 这里将文件的路径改为绝对路径，否则umi会默认找/src/pages下组件
            route.file = path.resolve(docDir, route.file);
            // 给页面对象赋值布局Id
            route.parentId = docLayoutId
            routes[route.id] = route;
        });

        return routes;
    });
};