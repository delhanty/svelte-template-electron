import svelte from 'rollup-plugin-svelte';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import json from '@rollup/plugin-json';
import sveltePreprocess from 'svelte-preprocess';
import typescript from '@rollup/plugin-typescript';

const production = !process.env.ROLLUP_WATCH;

export default {
	input: ['src/main.ts', 'src/renderer.ts'],

	output: {
		dir: 'dist',
		format: 'cjs',
		sourcemap: true
	},

	plugins: [
		resolve(),
		svelte({
			css(css) {
				css.write('dist/svelte.css');
			},
			preprocess: sveltePreprocess(),
		}),
		commonjs(),
		json(),
		typescript({ sourceMap: !production }),
	],

	external: [
		'electron',
		'child_process',
		'fs',
		'path',
		'url',
		'module',
		'os'
	]
};
