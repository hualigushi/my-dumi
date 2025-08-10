import { useAppData } from "umi";

/**
 * hook for get nav data
 */
export const useNavData = () => {
  // 获取全局路由信息
  const { routes } = useAppData();
  // 获取/docs下的路由信息
  const localeDocRoutes: any[] = 
      Object.values(routes).filter(route => route.parentId === 'DocLayout')
  // 获取导航信息
  const nav: any = []
  Object.values(localeDocRoutes).forEach(route => {
    const _r = { ...route }
    if(_r.path == '/') {
      nav.push({
        title: '首页',
        link: '/',
      })
    } else {
      nav.push({
        title: route.path,
        link: '/' + route.path,
      })
    }
  })
  
  return nav;
};
