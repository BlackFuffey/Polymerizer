import * as ESBuild from 'esbuild';

await ESBuild.build({
    entryPoints: ['app.ts'],
    bundle: true,
    outdir: "build",
    platform: 'node',
    packages: 'external'
})
