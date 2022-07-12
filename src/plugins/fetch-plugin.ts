import * as esbuild from 'esbuild-wasm'

import axios from 'axios';
import localForage from 'localforage';

// instance

const fileCache = localForage.createInstance({
  name: 'filecache',
});

export const fetchPlugin = (userInputCode:string) => {
  return {
    name: 'fetch-plugin',
    setup(build: esbuild.PluginBuild) {
            // --- onLoad ---
      
          build.onLoad({ filter: /.*/ }, async (args: any) => {

            // onLoad - index.js에서 파일 탐색 요청을 hijacking
            if (args.path === 'index.js') {
              return {
                loader: 'jsx',
                contents: userInputCode
              };
            }
    
    
            const cachedResult = await fileCache.getItem<esbuild.OnLoadResult>(args.path);
            if (cachedResult) {
              return cachedResult;
            }
            const { data, request } = await axios.get(args.path);
    
            const result:esbuild.OnLoadResult = {
              loader: 'jsx',
              contents: data,
              resolveDir: new URL('./', request.responseURL).pathname,
            };
    
            await fileCache.setItem(args.path, result)
    
            return result;
          });
    }
  }
}