import { randomUUID } from 'crypto';
import { promises as fs } from 'fs';
import multer from 'multer';
import path from 'path';
import config from './config';

const imageStorage = multer.diskStorage({
  destination: async (_req, _file, cb) => {
    const destDir = path.join(config.publicPath, 'images');
    await fs.mkdir(destDir, { recursive: true });
    cb(null, config.publicPath);
  },
  filename: (_req, file, cb) => {
    const extension = path.extname(file.originalname);
    cb(null, 'images/' + randomUUID() + extension);
  },
});

const pdfStorage = multer.diskStorage({
  destination: async (_req, _file, cb) => {
    const destDir = path.join(config.publicPath, 'pdfs');
    await fs.mkdir(destDir, { recursive: true });
    cb(null, config.publicPath);
  },
  filename: (_req, file, cb) => {
    const extension = path.extname(file.originalname);
    cb(null, 'pdfs/' + randomUUID() + extension);
  },
});

export const imageUpload = multer({ storage: imageStorage });
export const pdfUpload = multer({ storage: pdfStorage });
