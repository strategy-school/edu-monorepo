import React, { useState } from 'react';
import {
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Typography,
  useMediaQuery,
} from '@mui/material';
import Image from 'next/image';
import YouTube, { YouTubeProps } from 'react-youtube';
import MyModal from '@/src/components/UI/Modal/MyModal';

interface Props {
  title: string;
  previewImage: string;
  youtubeURL: string;
}

const opts: YouTubeProps['opts'] = {
  height: '600',
  width: '337',
  playerVars: {
    autoplay: 1,
  },
};

const VideoReviewItem: React.FC<Props> = ({
  title,
  previewImage,
  youtubeURL,
}) => {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(!open);
  const isXs = useMediaQuery('(max-width:599px)');

  return (
    <Grid item xs={6} md={4} lg={3}>
      <Card
        style={{ borderRadius: '7%', width: '200px' }}
        onClick={handleClose}
      >
        <CardActionArea>
          <Image
            width={isXs ? '100' : '200'}
            height={isXs ? '177' : '355'}
            src={`http://localhost:8000/${previewImage}`}
            alt={title}
            style={{ width: '100%' }}
          />
          <CardContent>
            <Typography variant="h6">{title}</Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      <MyModal
        open={open}
        handleClose={handleClose}
        title="Видео отзыв"
        isReview
      >
        <YouTube videoId={youtubeURL} opts={opts} />
      </MyModal>
    </Grid>
  );
};

export default VideoReviewItem;
