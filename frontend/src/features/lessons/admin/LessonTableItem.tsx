import { ApiLesson } from '@/src/types';
import { Button, IconButton, TableCell, TableRow } from '@mui/material';
import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Link from 'next/link';
import { useAppDispatch } from '@/src/store/hooks';
import { deleteLesson } from '@/src/dispatchers/lessons/lessonsThunk';
import { apiURL } from '@/src/constants';
import FolderOffIcon from '@mui/icons-material/FolderOff';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
interface Props {
  lesson: ApiLesson;
  deleting: boolean;
}

const LessonTableItem: React.FC<Props> = ({ lesson, deleting }) => {
  const dispatch = useAppDispatch();

  const onDelete = () => {
    dispatch(deleteLesson(lesson._id));
  };

  return (
    <TableRow hover style={{ cursor: 'pointer' }}>
      <TableCell>{lesson.course.title}</TableCell>
      <TableCell>{lesson.theme}</TableCell>
      <TableCell>
        {lesson.video_link ? (
          <Button
            variant="text"
            component={Link}
            href={lesson.video_link}
            target="_blank"
            sx={{ textTransform: 'none' }}
          >
            Открыть
          </Button>
        ) : (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <VideocamOffIcon color="primary" />
          </div>
        )}
      </TableCell>
      <TableCell>
        {lesson.document ? (
          <Button
            variant="text"
            component={Link}
            href={`${apiURL}/${lesson.document}`}
            target="_blank"
            sx={{ textTransform: 'none' }}
          >
            Открыть
          </Button>
        ) : (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <FolderOffIcon color="primary" />
          </div>
        )}
      </TableCell>
      <TableCell>
        <IconButton component={Link} href={'lessons/edit/' + lesson._id}>
          <EditIcon color="primary" />
        </IconButton>
        <IconButton onClick={onDelete} disabled={deleting}>
          <DeleteIcon color="primary" />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export default LessonTableItem;
