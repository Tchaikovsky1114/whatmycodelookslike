import * as esbuild from 'esbuild-wasm';

import axios from 'axios';
import localForage from 'localforage';

// instance

const fileCache = localForage.createInstance({
  name: 'filecache',
});

export const fetchPlugin = (userInputCode: string) => {
  return {
    name: 'fetch-plugin',
    setup(build: esbuild.PluginBuild) {

      // first onLoad
      // onLoad - index.js에서 파일 탐색 요청을 hijacking
      // onLoad method는 null을 반환해도 멈추지 않는다. 다른 build가 완료될때까지 계속 onLoad를 진행한다.
      build.onLoad({ filter: /^index\.js$/ }, () => {
        return {
          loader: 'jsx',
          contents: userInputCode,
        };
      });

      build.onLoad({ filter: /.*/ }, async (args: any) => {
        const cachedResult = await fileCache.getItem<esbuild.OnLoadResult>(
          args.path
        );

        if (cachedResult) {
          return cachedResult;
        }
      });

      build.onLoad({ filter: /.css$/ }, async (args: any) => {

        const { data, request } = await axios.get(args.path);
        
        const escaped = data
          .replace(/\n/g, '')
          .replace(/"/g, '\\"')
          .replace(/'/g, "\\'");

        const contents = `
              const style = document.createElement('style');
              style.innerText = '${escaped}';
              document.head.appendChild(style);;
            `;

        const result: esbuild.OnLoadResult = {
          loader: 'jsx',
          contents,
          resolveDir: new URL('./', request.responseURL).pathname,
        };

        await fileCache.setItem(args.path, result);

        return result;
      });

    
      build.onLoad({ filter: /.*/ }, async (args: any) => {

        const { data, request } = await axios.get(args.path);

        const result: esbuild.OnLoadResult = {
          loader: 'jsx',
          contents: data,
          resolveDir: new URL('./', request.responseURL).pathname,
        };

        await fileCache.setItem(args.path, result);

        return result;
      });
    },
  };
};
