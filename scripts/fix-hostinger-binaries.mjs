import { chmod } from 'node:fs/promises';
import path from 'node:path';

const candidates = [
  'node_modules/@esbuild/linux-x64/bin/esbuild',
  'node_modules/vite/bin/vite.js',
  'adminjs/node_modules/@esbuild/linux-x64/bin/esbuild',
  'adminjs/node_modules/vite/bin/vite.js',
];

async function ensureExecutable(target) {
  try {
    await chmod(path.resolve(target), 0o755);
    console.log(`chmod +x ${target}`);
  } catch (error) {
    if (error && error.code === 'ENOENT') {
      return;
    }

    throw error;
  }
}

await Promise.all(candidates.map(ensureExecutable));
