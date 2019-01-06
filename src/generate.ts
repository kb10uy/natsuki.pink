import axios from 'axios';
import * as fs from 'fs';
import { getLogger } from 'log4js';
import * as path from 'path';
import * as Pug from 'pug';
import { promisify } from 'util';

const rootDir = process.cwd();
const logger = getLogger();
logger.level = 'debug';

async function fetchGalleryPictures() {
    logger.info('[Gallery] fetching started');

    const urlList = await promisify(fs.readFile)(path.join(rootDir, 'data/gallery.txt'));
    const urls = urlList
        .toString()
        .split('\n')
        .filter((url) => url);
    logger.info(`[Gallery] ${urls.length} urls found`);

    for (const url of urls) {
        await fetchPictureFromUrl(url);
    }

    logger.info('[Gallery] fetching finished');
}

async function fetchPictureFromUrl(url: string) {
    try {
        const response = await axios.get(url, {
            headers: {
                Accept: 'application/activity+json',
            },
        });

        if (response.headers['content-type'] !== 'application/json') {
            logger.warn(`[Gallery] failed to fetch json: ${url}`);
            return;
        }
        const { attachment } = response.data;
        if (!attachment) {
            logger.warn(`Gallery] ${url} does not have any attachment`);
            return;
        }
    } catch (e) {
        logger.warn(`[Gallery] failed to fetch: ${url} (${e})`);
    }
}
