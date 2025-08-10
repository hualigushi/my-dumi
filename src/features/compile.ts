import type { IApi } from 'umi';
import MdLoader from '../loaders/markdown/index'
export default (api: IApi) => {
  api.describe({ key: 'my-dumi:compile' });

    api.chainWebpack(async (memo) => {
    const babelInUmi = memo.module.rule('src').use('babel-loader').entries();
    const loaderPath = require.resolve('../loaders/markdown/loader.js');
    memo.module
        .rule('my-dumi-md')
            .test(/\.md$/)
            .type('javascript/auto')
            // 用默认带的babel-loader来处理react组件
            .use('babel-loader')
            .loader(babelInUmi.loader)
            .options(babelInUmi.options)
            .end()
            .use('md-loader')
            .loader(loaderPath)
            .options({
        handler: MdLoader
    })
    return memo;
  });

};