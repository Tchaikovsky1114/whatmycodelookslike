import * as esbuild from 'esbuild-wasm';
import { unpkgPathPlugin } from './plugins/unpkg-path-plugin';
import { fetchPlugin } from './plugins/fetch-plugin';

let initialized: boolean = false;

export const codeProcessor = async (rawCode: string) => {
  if (!initialized) {
    await esbuild.initialize({
      worker: true,
      wasmURL: 'https://unpkg.com/esbuild-wasm@0.14.49/esbuild.wasm',
    });
  }
  let result;

  
  
  try {

    result = await esbuild.build({

      entryPoints: ['index.js'],
      // target:'es2015',
      bundle: true,
      write: false,

      plugins: [unpkgPathPlugin(), fetchPlugin(rawCode)],
      define: {
        global: 'window',
      },
      jsxFactory: '_React.createElement',
      jsxFragment: '_React.Fragment'
    });
    initialized = true;
    return {
      code: result.outputFiles[0].text,
      err: ''
    };
  } catch (err) {
    const typedError = err as Error
      return {
        code: '',
        err: typedError.message
      };
  }
};

export default codeProcessor;
