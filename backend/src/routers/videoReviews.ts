import express from 'express';
import VideoReview from '../models/VideoReview';
import auth from '../middleware/auth';
import permit from '../middleware/permit';
import { imageUpload } from '../multer';
import { promises as fs } from 'fs';
import mongoose, { HydratedDocument } from 'mongoose';
import { IVideoReview } from '../types';

const videoReviewsRouter = express.Router();

videoReviewsRouter.get('/', async (req, res, next) => {
  try {
    const limit: number = parseInt(req.query.limit as string) || 10;
    const page: number = parseInt(req.query.page as string) || 1;

    const skip = (page - 1) * limit;

    const totalCount = await VideoReview.count();
    const videoReviews = await VideoReview.find().skip(skip).limit(limit);
    return res.send({
      message: 'Video Reviews are found',
      result: { videoReviews, currentPage: page, totalCount },
    });
  } catch (e) {
    return next(e);
  }
});

videoReviewsRouter.get('/:id', async (req, res, next) => {
  try {
    const videoReview = await VideoReview.findById(req.params.id);

    if (!videoReview) {
      return res.sendStatus(404);
    }

    return res.send(videoReview);
  } catch (e) {
    return next(e);
  }
});

videoReviewsRouter.post(
  '/',
  auth,
  permit('admin'),
  imageUpload.single('previewImage'),
  async (req, res, next) => {
    try {
      const videoReview = await VideoReview.create({
        title: req.body.title,
        previewImage: req.file ? req.file.filename : null,
        youtubeURL: req.body.youtubeURL,
      });
      return res.send(videoReview);
    } catch (e) {
      if (req.file) {
        await fs.unlink(req.file.path);
      }

      if (e instanceof mongoose.Error.ValidationError) {
        return res.status(400).send(e);
      } else {
        return next(e);
      }
    }
  },
);

videoReviewsRouter.put(
  '/:id',
  auth,
  permit('admin'),
  imageUpload.single('previewImage'),
  async (req, res, next) => {
    try {
      const videoReview: HydratedDocument<IVideoReview> | null =
        await VideoReview.findById(req.params.id);

      if (!videoReview) {
        return res.status(404).send({ error: 'Такого отзыва не существует!' });
      }

      videoReview.title = req.body.title;
      videoReview.youtubeURL = req.body.youtubeURL;
      if (req.body.previewImage) {
        videoReview.previewImage = req.body.previewImage;
      }

      await videoReview.save();
      res.send(videoReview);
    } catch (e) {
      if (req.file) {
        await fs.unlink(req.file.path);
      }

      if (e instanceof mongoose.Error.ValidationError) {
        return res.status(400).send(e);
      } else {
        return next(e);
      }
    }
  },
);

videoReviewsRouter.delete(
  '/:id',
  auth,
  permit('admin'),
  async (req, res, next) => {
    try {
      const videoReview: HydratedDocument<IVideoReview> | null =
        await VideoReview.findById(req.params.id);

      if (!videoReview) {
        return res.status(404).send({ error: 'Такого отзыва не существует!' });
      }

      await VideoReview.deleteOne({ _id: req.params.id });

      return res.send({ message: 'Отзыв был удален!' });
    } catch (e) {
      return next(e);
    }
  },
);

export default videoReviewsRouter;
