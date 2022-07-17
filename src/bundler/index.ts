import * as esbuild from 'esbuild-wasm';
import { unpkgPathPlugin } from './plugins/unpkg-path-plugin';
import { fetchPlugin } from './plugins/fetch-plugin';


let initialized: boolean = false

export const codeProcessor = async (rawCode: string ) => {
    if(!initialized){
      await esbuild.initialize({
        worker: true,
        wasmURL: 'https://unpkg.com/esbuild-wasm@0.14.49/esbuild.wasm',
      });
    }
    const result = await esbuild.build({
      // 번들링 진입점
      entryPoints: ['index.js'],
      bundle: true,
      write: false,
      // plugins - onLoad - contents에 들어가야 할 inputValue
      plugins: [unpkgPathPlugin(), fetchPlugin(rawCode)],
      define: {
        global: 'window',
      },
    });
    initialized = true;
    return result.outputFiles[0].text
}

export default codeProcessor