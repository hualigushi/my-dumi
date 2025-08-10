import path from 'path';
import type { IApi } from 'umi';
import { glob, winPath } from 'umi/plugin-utils';

const DEFAULT_THEME_PATH = path.join(__dirname, '../../src/client/theme-default');
  
export default async(api: IApi) => {
    api.describe({ key: 'my-dumi:theme' });

    api.modifyAppData({
      before: 'appData',
      async fn(memo: any) {
        const defaultThemeData = loadTheme(DEFAULT_THEME_PATH);
        // @ts-ignore
        api.service.themeData = defaultThemeData
        return memo;
      },
    });
}

/**
 * 加载主题信息 
 */
function loadTheme(dir: string) {
    return {
      name: path.basename(dir),
      path: dir,
      layouts: getComponentMapFromDir(
        'layouts/{GlobalLayout,DocLayout,DemoLayout}{.,/index.}{js,jsx,ts,tsx}',
        dir,
      ),
    };
};
  
/**
 * 提取dir目录下符合条件的组件信息
 */
function getComponentMapFromDir(globExp: string, dir: string) {
    return glob
      .sync(globExp, { cwd: dir })
      .reduce<any>((ret, file) => {
        const specifier = path.basename(
          winPath(file).replace(/(\/index)?\.[a-z]+$/, ''),
        );
  
        // ignore non-component files
        if (/^[A-Z\d]/.test(specifier)) {
          ret[specifier] = {
            specifier,
            source: winPath(path.join(dir, file)),
          };
        }
  
        return ret;
    }, {});
}

