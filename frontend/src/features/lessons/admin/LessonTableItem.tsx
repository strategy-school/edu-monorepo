import { ApiLesson } from '@/src/types';
import { TableCell, TableRow } from '@mui/material';
import React from 'react';

interface Props {
  lesson: ApiLesson;
}

const LessonTableItem: React.FC<Props> = ({ lesson }) => {
  return (
    <TableRow hover style={{ cursor: 'pointer' }}>
      <TableCell>{lesson.course.title}</TableCell>
      <TableCell>{lesson.theme}</TableCell>
      <TableCell>{lesson.video_link}</TableCell>
      <TableCell>{lesson.document}</TableCell>
    </TableRow>
  );
};

export default LessonTableItem;
