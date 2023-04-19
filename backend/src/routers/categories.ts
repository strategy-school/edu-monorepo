import express from 'express';
import Category from '../models/Category';
import auth from '../middleware/auth';
import permit from '../middleware/permit';
import { imageUpload } from '../multer';
import mongoose from 'mongoose';

const categoriesRouter = express.Router();

categoriesRouter.post(
  '/',
  auth,
  permit('admin'),
  imageUpload.single('image'),
  async (req, res, next) => {
    try {
      const category = await Category.create({
        title: req.body.title,
        description: req.body.description,
        image: req.file ? req.file.filename : null,
      });
      return res.send(category);
    } catch (e) {
      if (e instanceof mongoose.Error.ValidationError) {
        return res.status(400).send(e);
      } else {
        return next(e);
      }
    }
  },
);

export default categoriesRouter;
