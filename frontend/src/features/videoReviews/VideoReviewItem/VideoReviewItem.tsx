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
import { borderRadius } from '@/src/styles';

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
  const isXs = useMediaQuery('(max-width:420px)');
  const isSm = useMediaQuery('(max-width:599px)');

  return (
    <Grid item xs={isXs ? 12 : 6} sm={6} md={4} lg={3}>
      <Card
        sx={{
          borderRadius,
          width: isSm ? '180px' : '230px',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
        className="card"
        onClick={handleClose}
      >
        <CardActionArea>
          <Image
            width={isSm ? '180' : '230'}
            height={isSm ? '277' : '355'}
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
