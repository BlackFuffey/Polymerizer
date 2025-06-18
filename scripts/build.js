import * as ESBuild from 'esbuild';

await ESBuild.build({
    entryPoints: ['src/app.ts'],
    bundle: true,
    outdir: "build",
    platform: 'node',
    packages: 'external'
})
