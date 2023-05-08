import { model, Schema } from 'mongoose';

const VideoReviewSchema = new Schema({
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
});

const VideoReview = model('VideoReview', VideoReviewSchema);
export default VideoReview;
