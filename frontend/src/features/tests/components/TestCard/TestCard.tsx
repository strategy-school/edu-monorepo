import React from 'react';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from '@mui/material';
import { TestMini } from '@/src/types';
import Link from 'next/link';

export interface Props {
  test: TestMini;
}
const TestCard: React.FC<Props> = ({ test }) => {
  return (
    <Card sx={{ minWidth: '300px' }}>
      <CardContent>
        <Typography
          variant="body1"
          fontWeight={700}
          style={{
            maxWidth: '600px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {test.title}
        </Typography>
        <Typography variant="body2">
          Категория: {test.category.title}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="outlined"
          fullWidth
          component={Link}
          href={`/tests/one-test/${test._id}`}
          size="small"
        >
          Пройти тест
        </Button>
      </CardActions>
    </Card>
  );
};

export default TestCard;
