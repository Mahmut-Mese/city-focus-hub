import { access, copyFile } from 'node:fs/promises';
import { constants } from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawn } from 'node:child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');
const projectEnvPath = path.join(projectRoot, '.env');
const fallbackEnvPath = path.join(os.homedir(), 'city-focus-hub.env');
const npmCli = process.env.npm_execpath || 'npm';

async function exists(filePath) {
  try {
    await access(filePath, constants.F_OK);
    return true;
  } catch {
    return false;
  }
}

async function ensureProjectEnvFile() {
  if (await exists(projectEnvPath) || !(await exists(fallbackEnvPath))) {
    return;
  }

  await copyFile(fallbackEnvPath, projectEnvPath);
  console.log(`Copied fallback env into ${projectEnvPath}`);
}

function run(command, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      cwd: projectRoot,
      stdio: 'inherit',
      env: process.env,
    });

    child.on('exit', (code) => {
      if (code === 0) {
        resolve();
        return;
      }

      reject(new Error(`${command} ${args.join(' ')} exited with code ${code ?? 'unknown'}`));
    });

    child.on('error', reject);
  });
}

function runNpm(args) {
  if (npmCli.endsWith('.js')) {
    return run(process.execPath, [npmCli, ...args]);
  }

  return run(npmCli, args);
}

function shouldBuildFrontendOnHostinger() {
  return projectRoot.includes('/domains/') || process.env.HOSTINGER === 'true';
}

await ensureProjectEnvFile();

await runNpm(['install', '--prefix', 'adminjs']);
await run(process.execPath, ['scripts/fix-hostinger-binaries.mjs']);

if (shouldBuildFrontendOnHostinger()) {
  await runNpm(['run', 'build:frontend']);
}
