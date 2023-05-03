import React from 'react';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from '@mui/material';
import { Test } from '@/src/types';
import { useRouter } from 'next/router';

export interface Props {
  test: Test;
}
const OneTest: React.FC<Props> = ({ test }) => {
  const router = useRouter();
  const handleGoBack = () => {
    router.back();
  };

  return (
    <Card>
      <CardActions>
        <Button onClick={handleGoBack} sx={{ mb: 3 }}>
          Назад
        </Button>
      </CardActions>
      <CardContent>
        <Typography variant="h6">{test.title}</Typography>
        <Typography color="textSecondary" gutterBottom>
          Название: {test.category.title}
        </Typography>
        <Typography variant="body1" component="p" mb={4}>
          Описание: {test.description}
        </Typography>
        {test.questions.map((question, index) => (
          <Box key={question._id} mb={2}>
            <Typography variant="body1" component="p">
              №{index + 1} {question.question}
            </Typography>
            <ul>
              {question.answers.map((answer, index) => (
                <Typography variant="subtitle2" key={answer}>
                  {index + 1}. {answer}
                </Typography>
              ))}
            </ul>
            <Typography variant="subtitle2" color="textSecondary">
              Правильный ответ: {question.correctAnswer}
            </Typography>
          </Box>
        ))}
      </CardContent>
    </Card>
  );
};

export default OneTest;
