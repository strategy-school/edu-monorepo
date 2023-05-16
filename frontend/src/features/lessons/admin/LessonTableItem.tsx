import { ApiLesson } from '@/src/types';
import { IconButton, TableCell, TableRow } from '@mui/material';
import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Link from 'next/link';
import { useAppDispatch } from '@/src/store/hooks';
import { deleteLesson } from '@/src/dispatchers/lessons/lessonsThunk';
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
      <TableCell>{lesson.video_link}</TableCell>
      <TableCell>{lesson.document}</TableCell>
      <TableCell>
        <IconButton component={Link} href={'lessons/edit/' + lesson._id}>
          <EditIcon />
        </IconButton>
        <IconButton onClick={onDelete} disabled={deleting}>
          <DeleteIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export default LessonTableItem;
