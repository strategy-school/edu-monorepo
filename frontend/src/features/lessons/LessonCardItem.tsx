import React from 'react';
import { ApiLesson } from '@/src/types';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Tooltip,
  Typography,
} from '@mui/material';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import FolderOffIcon from '@mui/icons-material/FolderOff';
import { apiURL } from '@/src/constants';

interface Props {
  lesson: ApiLesson;
}

const LessonCardItem: React.FC<Props> = ({ lesson }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
          {`${lesson.number}. ${lesson.theme}`}
        </Typography>
      </CardContent>
      <CardActions>
        {lesson.video_link ? (
          <Button
            href={lesson.video_link}
            target="_blank"
            rel="noopener noreferrer"
            color="secondary"
          >
            Видео урок
          </Button>
        ) : (
          <Tooltip title="По этому уроку пока не загружено видео">
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                margin: '0 16px',
              }}
            >
              <VideocamOffIcon color="primary" />
            </div>
          </Tooltip>
        )}
        {lesson.document ? (
          <Button
            href={`${apiURL}/${lesson.document}`}
            target="_blank"
            rel="noopener noreferrer"
            color="primary"
          >
            Текстовый материал
          </Button>
        ) : (
          <Tooltip title="По этому уроку пока не загружен материал">
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                margin: '0 16px',
              }}
            >
              <FolderOffIcon color="primary" />
            </div>
          </Tooltip>
        )}
      </CardActions>
    </Card>
  );
};

export default LessonCardItem;
