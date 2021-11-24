import preprocess from 'svelte-preprocess';
import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: [
		preprocess({
			scss: {
				prependData: '@import "src/variables.scss";'
			},
      postcss: {
        plugins: [require('autoprefixer')({ grid: 'autoplace'})]
      },
      babel: {
        extensions: ['.js', '.mjs', '.html', '.ts', '.svelte'],
        babelHelpers: 'runtime',
        runtimeHelpers: true,
        exclude: ['node_modules/@babel/**'],
        plugins: [
          '@babel/plugin-syntax-dynamic-import',
          [
            '@babel/plugin-transform-runtime',
            {
              useESModules: true
            }
          ]
        ],

        presets: [
          [
            '@babel/preset-env',
            {
              loose: true,
              // No need for babel to resolve modules
              modules: false,
              targets: {
                // ! Very important. Target es6+
                esmodules: true
              }
            }
          ]
        ]
      }
		})
	],

	kit: {
		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte',
    adapter: adapter({
      // default options are shown
      pages: 'build',
      assets: 'build',
      fallback: null
    }),

		vite: {
			css: {
				preprocessorOptions: {
					scss: {
						additionalData: '@import "src/variables.scss";'
					}
				}
			}
		}
	}
};

export default config;
