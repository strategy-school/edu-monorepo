import React, { useState } from 'react';
import { QuestionFull, Test } from '@/src/types';
import {
  Box,
  Button,
  Container,
  DialogActions,
  DialogContent,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Typography,
} from '@mui/material';
import { useRouter } from 'next/router';
import {
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  OKIcon,
  OKShareButton,
  TelegramIcon,
  TelegramShareButton,
  TwitterIcon,
  TwitterShareButton,
  VKIcon,
  VKShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from 'react-share';
import MyModal from '@/src/components/UI/Modal/MyModal';

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
    onModalClose();
    void router.push('/courses/');
  };

  const onModalClose = () => {
    setOpen(false);
    setAnswers([]);
    setScore(0);
  };

  const resultMessage = `${score} ${
    score === 1 ? 'балл' : score > 1 && score < 5 ? 'балла' : 'баллов'
  } из ${oneTest.questions.length}`;

  const url = 'https://youtu.be/GoNNW0iXc5s';
  const title = `Я прошел тест на сайте Strategia School и набрал ${resultMessage}. Попробуйте и вы!`;

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
          disabled={oneTest.questions.length !== answers.length}
        >
          Завершить
        </Button>
      </Container>

      <MyModal open={open} handleClose={onModalClose}>
        <DialogContent>
          <Grid container justifyContent="center" spacing={2}>
            <Typography
              variant="h6"
              align="center"
              mb={2}
              fontSize={{ xs: '0.95rem', sm: '1.125rem' }}
              marginRight="3px"
            >
              {score > oneTest.questions.length / 2
                ? 'Поздравляем!'
                : 'Есть, что улучшить!'}
            </Typography>
            <Typography
              variant="h6"
              align="center"
              fontSize={{ xs: '0.95rem', sm: '1.125rem' }}
            >
              Ваш результат:{' '}
              <span style={{ color: 'red' }}>{resultMessage}</span>
            </Typography>
          </Grid>
        </DialogContent>
        <DialogActions
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography textAlign={{ xs: 'center', sm: 'left' }}>
            Поделитесь результатом теста с друзьями
          </Typography>
          <Grid
            container
            justifyContent="center"
            sx={{
              alignItems: 'center',
              gap: '10px',
              marginY: '15px',
            }}
          >
            <FacebookShareButton url={url} quote={title}>
              <FacebookIcon size={32} round={true} />
            </FacebookShareButton>
            <TwitterShareButton url={url} title={title}>
              <TwitterIcon size={32} round={true} />
            </TwitterShareButton>
            <TelegramShareButton url={url} title={title}>
              <TelegramIcon size={32} round={true} />
            </TelegramShareButton>
            <VKShareButton url={url}>
              <VKIcon size={32} round={true} />
            </VKShareButton>
            <WhatsappShareButton url={url} title={title}>
              <WhatsappIcon size={32} round={true} />
            </WhatsappShareButton>
            <OKShareButton url={url}>
              <OKIcon size={32} round={true} />
            </OKShareButton>
            <LinkedinShareButton url={url} title={title}>
              <LinkedinIcon size={32} round={true} />
            </LinkedinShareButton>
          </Grid>
          <Button variant="outlined" onClick={openCourses} fullWidth>
            <Typography
              fontWeight={700}
              fontSize={{ xs: '0.55rem', sm: '0.875rem' }}
            >
              Выбрать подходящий курс
            </Typography>
          </Button>
        </DialogActions>
      </MyModal>
    </>
  );
};

export default TestForUser;
