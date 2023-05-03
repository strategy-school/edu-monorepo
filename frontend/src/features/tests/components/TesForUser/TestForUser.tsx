import React, { useState } from 'react';
import { QuestionFull, Test } from '@/src/types';
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from '@mui/material';
import { useRouter } from 'next/router';

export interface Props {
  oneTest: Test;
}
const TestForUser: React.FC<Props> = ({ oneTest }) => {
  const router = useRouter();
  const [answers, setAnswers] = useState<string[]>([]);
  const [score, setScore] = useState<number>(0);
  const [open, setOpen] = useState(false);
  const handleAnswerChange = (index: number, answer: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = answer;
    setAnswers(newAnswers);
  };

  const handleSubmit = () => {
    let newScore = 0;
    if (!oneTest) return;
    oneTest.questions.forEach((question: QuestionFull, index: number) => {
      if (answers[index] === question.correctAnswer) {
        newScore += 1;
      }
    });
    setScore(newScore);
    setOpen(true);
  };

  const openCourses = () => {
    setOpen(false);
    setAnswers([]);
    setScore(0);
    void router.push('/courses/');
  };

  return (
    <>
      <Container>
        <Typography variant="h4" fontWeight={700} align="center">
          {oneTest.title}
        </Typography>
        <Typography variant="body1" align="center" my={5}>
          Описание: {oneTest.description}
        </Typography>
      </Container>
      <Container maxWidth="lg">
        {oneTest.questions.map((question, index) => (
          <Box key={question._id} mb={1}>
            <Typography variant="h6" gutterBottom>
              {index + 1}. {question.question}
            </Typography>
            <RadioGroup
              value={answers[index] || ''}
              onChange={(event) =>
                handleAnswerChange(index, event.target.value)
              }
            >
              {question.answers.map((answer: string, answerIndex: number) => (
                <FormControlLabel
                  key={answerIndex}
                  value={answer}
                  control={<Radio />}
                  label={answer}
                />
              ))}
            </RadioGroup>
          </Box>
        ))}
        <Button
          fullWidth
          variant="contained"
          color="success"
          onClick={handleSubmit}
          sx={{ mt: 2 }}
        >
          Завершить
        </Button>
      </Container>

      <Dialog open={open} fullWidth>
        <DialogContent>
          <Typography variant="h6" align="center" mb={2}>
            {score > oneTest.questions.length / 2
              ? 'Поздравляем!'
              : 'Есть что улучшить'}
          </Typography>
          <Typography variant="h6" align="center">
            Ваш результат: {score}{' '}
            {score === 1 ? 'балл' : score < 5 ? 'балла' : 'баллов'}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={openCourses} fullWidth>
            Выбрать подходящий курс
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default TestForUser;
