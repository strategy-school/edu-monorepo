import { model, Schema } from 'mongoose';
import { IVideoReview } from '../types';

const VideoReviewSchema = new Schema<IVideoReview>(
  {
    title: {
      type: String,
      required: true,
    },
    previewImage: {
      type: String,
      required: true,
    },
    youtubeURL: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const VideoReview = model<IVideoReview>('VideoReview', VideoReviewSchema);
export default VideoReview;
