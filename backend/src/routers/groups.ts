import express from 'express';
import Group from '../models/Group';
import auth from '../middleware/auth';
import permit from '../middleware/permit';
import mongoose from 'mongoose';

const groupsRouter = express.Router();

interface GroupSearchParam {
  course?: string;
  startsAt?: string;
}

groupsRouter.get('/', async (req, res, next) => {
  try {
    const course = req.query.course as string;
    const startsAt = req.query.startsAt as string;
    const limit: number = parseInt(req.query.limit as string) || 10;
    const page: number = parseInt(req.query.page as string) || 1;

    const searchParam: GroupSearchParam = {};

    if (course) {
      searchParam.course = course;
    }

    if (startsAt) {
      searchParam.startsAt = startsAt;
    }

    const totalCount = await Group.count(searchParam);
    const skip = (page - 1) * limit;

    const groups = await Group.find(searchParam)
      .populate('course', 'title duration')
      .skip(skip)
      .limit(limit)
      .exec();
    return res.send({
      message: 'Groups are found',
      result: { groups, currentPage: page, totalCount },
    });
  } catch (e) {
    return next(e);
  }
});

groupsRouter.get('/:id', async (req, res, next) => {
  try {
    const group = await Group.findById(req.params.id)
      .populate('course', 'title duration')
      .exec();

    if (!group) {
      return res.status(404).send({ message: 'Группа не найдена' });
    }

    return res.send(group);
  } catch (e) {
    return next(e);
  }
});

groupsRouter.post('/', auth, permit('admin'), async (req, res, next) => {
  try {
    const group = await Group.create({
      title: req.body.title,
      description: req.body.description,
      course: req.body.course,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      startsAt: req.body.startsAt,
      duration: req.body.duration,
      telegramLink: req.body.telegramLink,
    });

    return res.send(group);
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(e);
    } else {
      return next(e);
    }
  }
});

groupsRouter.delete('/:id', auth, permit('admin'), async (req, res, next) => {
  try {
    const removingGroup = await Group.findById(req.params.id);

    if (!removingGroup) {
      return res.status(404).send({ message: 'Группа не найдена' });
    }

    await Group.deleteOne({ _id: req.params.id });

    return res.send({ message: 'Deleted' });
  } catch (e) {
    return next(e);
  }
});

groupsRouter.put('/:id', auth, permit('admin'), async (req, res, next) => {
  try {
    const currentGroup = await Group.findById(req.params.id);

    if (!currentGroup) {
      return res.status(404).send({ message: 'Группа не найдена' });
    }

    currentGroup.title = req.body.title;
    currentGroup.description = req.body.description;
    currentGroup.course = req.body.course;
    currentGroup.startDate = req.body.startDate;
    currentGroup.endDate = req.body.endDate;
    currentGroup.startsAt = req.body.startsAt;
    currentGroup.duration = req.body.duration;
    currentGroup.telegramLink = req.body.telegramLink;

    await currentGroup.save();

    return res.send(currentGroup);
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(e);
    } else {
      return next(e);
    }
  }
});
export default groupsRouter;
