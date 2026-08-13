import { cp, mkdir, rm } from 'node:fs/promises';

const projectRoot = new URL('../', import.meta.url);
const buildDirectory = new URL('build/', projectRoot);
const outputDirectory = new URL('dist/', projectRoot);
const serverDirectory = new URL('server/', outputDirectory);
const clientDirectory = new URL('client/', outputDirectory);

await rm(outputDirectory, { recursive: true, force: true });
await mkdir(serverDirectory, { recursive: true });
await cp(buildDirectory, clientDirectory, { recursive: true });
await cp(new URL('worker/sites-static.js', projectRoot), new URL('index.js', serverDirectory));
