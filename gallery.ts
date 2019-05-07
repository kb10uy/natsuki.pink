import * as fs from 'fs';
import * as path from 'path';
import * as crypto from 'crypto';
import axios from 'axios';
import * as pug from 'pug';

const list = fs
    .readFileSync('./assets/gallery.txt')
    .toString()
    .split('\n')
    .map((e) => e);

for (const entry of list) {
    const hash = crypto.createHash('md5').update(entry).digest('hex');
}

const template = pug.compileFile(path.resolve(__dirname, './assets/templates/gallery.pug'));
console.log(template());
