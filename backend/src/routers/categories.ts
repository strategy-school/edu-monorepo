import express from 'express';
import Category from '../models/Category';
import auth from '../middleware/auth';
import permit from '../middleware/permit';
import { imageUpload } from '../multer';
import mongoose, { HydratedDocument } from 'mongoose';
import { ICategory, PageLimit, SearchParam } from '../types';

type QueryParams = Omit<ICategory, 'image'> & PageLimit;

const categoriesRouter = express.Router();

categoriesRouter.get('/', async (req, res, next) => {
  try {
    const { page, limit, ...params }: Partial<QueryParams> = req.query;
    const l: number = parseInt(limit as string) || 10;
    const p: number = parseInt(page as string) || 1;

    const searchParam = Object.entries(params)
      .filter(([_, value]) => value !== undefined)
      .reduce<SearchParam>((acc, [key, value]) => {
        acc[key] = { $regex: value, $options: 'i' };
        return acc;
      }, {});

    const totalCount = await Category.count(searchParam);
    const skip = (p - 1) * l;

    const categories = await Category.find(searchParam).skip(skip).limit(l);

    return res.send({
      message: 'Categories are found',
      result: { categories, currentPage: p, totalCount },
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

      if (!removingCategory) {
        return res.status(404).send({ error: 'Category does not exist' });
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

export default categoriesRouter;
