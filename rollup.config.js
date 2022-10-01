import typescript from '@rollup/plugin-typescript';

import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import dts from 'rollup-plugin-dts';
import del from 'rollup-plugin-delete';

const plugins = [
    typescript({ tsconfig: './tsconfig.json' }),
    commonjs(),
    nodeResolve(),
    terser({
        output: {
            comments: false,
        },
    }),
];

export default [
    {
        input: 'src/index.ts',
        output: {
            file: 'dist/index.js',
            format: 'commonjs',
        },
        plugins,
        external: [], // external packages
    },
    {
        input: 'src/postinstall.ts',
        output: {
            file: 'dist/postinstall.js',
            format: 'commonjs',
        },
        plugins,
        external: [], // external packages
    },
    {
        input: './dist/.declaration/src/index.d.ts',
        output: [{ file: './dist/types.d.ts', format: 'es' }],
        plugins: [
            dts(),
            del({
                targets: 'dist/.declaration',
                hook: 'buildEnd',
            }),
        ],
    },
];
