import express from 'express';
import Category from '../models/Category';
import auth from '../middleware/auth';
import permit from '../middleware/permit';
import { imageUpload } from '../multer';
import mongoose, { HydratedDocument } from 'mongoose';
import { ICategory } from '../types';
import Course from '../models/Course';

const categoriesRouter = express.Router();

categoriesRouter.get('/', async (req, res, next) => {
  try {
    const limit: number = parseInt(req.query.limit as string) || 10;
    const page: number = parseInt(req.query.page as string) || 1;

    const totalCount = await Category.count();
    const skip = (page - 1) * limit;

    const categories = await Category.find().skip(skip).limit(limit);

    return res.send({
      message: 'Categories are found',
      result: { categories, currentPage: page, totalCount },
    });
  } catch (e) {
    return next(e);
  }
});

categoriesRouter.get('/:id', async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).send({ error: 'Category not found' });
    }

    return res.send(category);
  } catch (e) {
    return next(e);
  }
});

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

categoriesRouter.delete(
  '/:id',
  auth,
  permit('admin'),
  async (req, res, next) => {
    try {
      const removingCategory = await Category.findById(req.params.id);
      const relatedCourses = await Course.find({
        category: req.params.id,
      });

      if (!removingCategory) {
        return res.status(404).send({ error: 'Category does not exist' });
      } else if (relatedCourses.length) {
        return res.status(403).send({
          error: 'Categories having related courses cannot be removed',
        });
      } else {
        await Category.deleteOne({ _id: req.params.id });
        return res.send({ message: 'Category was successfully removed' });
      }
    } catch (e) {
      return next(e);
    }
  },
);

categoriesRouter.put(
  '/:id',
  auth,
  permit('admin'),
  imageUpload.single('image'),
  async (req, res, next) => {
    try {
      const category: HydratedDocument<ICategory> | null =
        await Category.findById(req.params.id);

      if (!category) {
        return res.status(404).send({ error: 'Category does not exist' });
      }

      category.title = req.body.title;
      category.description = req.body.description;
      if (req.file) {
        category.image = req.file.filename;
      }

      await category.save();

      return res.send({ message: 'Category was updated', category });
    } catch (e) {
      if (e instanceof mongoose.Error.ValidationError) {
        return res.status(400).send(e);
      } else {
        return next(e);
      }
    }
  },
);

categoriesRouter.patch(
  '/:id/toggleIsDeleted',
  auth,
  permit('admin'),
  async (req, res, next) => {
    try {
      const currentCategory = await Category.findById(req.params.id);
      if (!currentCategory) {
        return res.status(404).send({ error: 'Category not found' });
      }

      if (!currentCategory.isDeleted) {
        await Category.updateOne(
          { _id: req.params.id },
          { $set: { isDeleted: true } },
        );
      } else {
        await Category.updateOne(
          { _id: req.params.id },
          { $set: { isDeleted: false } },
        );
      }

      return res.send({
        message: `isDeleted status was updated for ${currentCategory.isDeleted}`,
        currentCategory,
      });
    } catch (e) {
      return next(e);
    }
  },
);

export default categoriesRouter;
