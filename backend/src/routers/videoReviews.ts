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
    const videoReviews = await VideoReview.find();
    return res.send(videoReviews);
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

      await VideoReview.deleteOne({ _id: req.params._id });

      return res.send({ message: 'Отзыв был удален!' });
    } catch (e) {
      return next(e);
    }
  },
);

export default videoReviewsRouter;
