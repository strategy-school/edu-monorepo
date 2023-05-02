import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { Test } from '@/src/types';

export interface Props {
  test: Test;
}
const OneTest: React.FC<Props> = ({ test }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="h2">
          {test.title}
        </Typography>
        <Typography color="textSecondary" gutterBottom>
          {test.category.title}
        </Typography>
        <Typography variant="body2" component="p">
          {test.description}
        </Typography>
        {test.questions.map((question) => (
          <div key={question._id}>
            <Typography variant="h6" component="h3">
              {question.question}
            </Typography>
            <ul>
              {question.answers.map((answer) => (
                <li key={answer}>{answer}</li>
              ))}
            </ul>
            <Typography variant="subtitle2" color="textSecondary">
              Correct Answer: {question.correctAnswer}
            </Typography>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default OneTest;
