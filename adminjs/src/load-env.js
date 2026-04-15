import dotenv from 'dotenv';
import { existsSync } from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..', '..');
const projectEnvPath = path.join(projectRoot, '.env');
const fallbackEnvPath = process.env.APP_ENV_FILE || path.join(os.homedir(), 'city-focus-hub.env');

dotenv.config({
  path: existsSync(projectEnvPath) ? projectEnvPath : fallbackEnvPath,
});
