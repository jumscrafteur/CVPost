import { sha256 } from 'js-sha256';
import fs from 'fs';
import { argv } from 'node:process';
import { CVSchema } from './src/routes/validation.js';
import 'dotenv/config';

if (argv.length < 3) throw new Error('Invalid arguments');
const path = argv[2];

let data = String(fs.readFileSync(path));
// eslint-disable-next-line no-control-regex
data = data.replace(/[^\x00-\xFF]/g, '');

let cv = JSON.parse(data);

cv = CVSchema.parse(cv);
CVSchema.parse(cv);

cv.signature = '';

console.log(cv);

cv.signature = sha256(JSON.stringify(cv) + process.env.KEY);

console.log(cv.signature);

fs.writeFileSync(path, JSON.stringify(cv));
