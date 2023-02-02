import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('__dirname：', __dirname)
console.log('__filename：', __filename)
console.log('process.cwd()：', process.cwd())
console.log('./：', path.resolve('./'))

import { readdirSync } from 'fs';

readdirSync(new URL('../', import.meta.url)).forEach((dirContent) => {
  console.log(dirContent);
});