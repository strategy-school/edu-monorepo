import React, { ChangeEvent, useEffect, useState } from 'react';
import {
  Button,
  FormControlLabel,
  Grid,
  IconButton,
  MenuItem,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { TestMutation } from '@/src/types';
import { ValidationError } from 'json-schema';
import { useAppDispatch, useAppSelector } from '@/src/app/hooks';
import { fetchCourses } from '@/src/features/courses/coursesThunks';
import { selectCourses } from '@/src/features/courses/coursesSlice';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import DeleteIcon from '@mui/icons-material/Delete';
interface Props {
  // onSubmit: (test: TestMutation) => void;
  existingTest?: TestMutation;
  isEdit?: boolean;
  loading: boolean;
  error: ValidationError | null;
}

const initialState: TestMutation = {
  course: '',
  title: '',
  description: '',
  questions: [{ question: '', answers: [''], correctAnswer: '' }],
};

const TestForm: React.FC<Props> = ({
  // onSubmit,
  existingTest,
  loading,
  error,
  isEdit,
}) => {
  const dispatch = useAppDispatch();
  const courses = useAppSelector(selectCourses);
  const [state, setState] = useState<TestMutation>(
    existingTest || initialState,
  );
  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  const submitFormHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(state);
    // await onSubmit(state);
    // setState(initialState);
  };

  const inputChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setState((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const questionsInputChangeHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number,
  ) => {
    const { value, name } = e.target;

    setState((prevState) => {
      const updatedQuestions = [...prevState.questions];
      updatedQuestions[index] = {
        ...updatedQuestions[index],
        [name]: value,
      };
      return { ...prevState, questions: updatedQuestions };
    });
  };

  const addQuestion = () => {
    setState((prevState) => {
      return {
        ...prevState,
        questions: [
          ...prevState.questions,
          { question: '', answers: ['', ''], correctAnswer: '' },
        ],
      };
    });
  };

  const removeQuestion = (index: number) => {
    setState((prevState) => {
      const questions = [...prevState.questions];
      questions.splice(index, 1);
      return { ...prevState, questions };
    });
  };
  const answerInputChangeHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    questionIndex: number,
    answerIndex: number,
  ) => {
    const { value } = e.target;
    setState((prevState) => {
      const updatedQuestions = [...prevState.questions];
      updatedQuestions[questionIndex].answers[answerIndex] = value;
      return { ...prevState, questions: updatedQuestions };
    });
  };
  const addAnswer = (questionIndex: number) => {
    setState((prevState) => {
      const updatedQuestions = [...prevState.questions];
      updatedQuestions[questionIndex].answers.push('');
      return { ...prevState, questions: updatedQuestions };
    });
  };

  const removeAnswer = (questionIndex: number, answerIndex: number) => {
    setState((prevState) => {
      const updatedQuestions = [...prevState.questions];
      updatedQuestions[questionIndex].answers.splice(answerIndex, 1);
      return { ...prevState, questions: updatedQuestions };
    });
  };

  const selectCorrectAnswer = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ): void => {
    const value = event.target.value;
    setState((prevState) => {
      const questions = [...prevState.questions];
      const currentQuestion = { ...questions[index] };
      currentQuestion.correctAnswer = value;
      questions[index] = currentQuestion;
      return { ...prevState, questions };
    });
  };

  return (
    <form onSubmit={submitFormHandler}>
      <Grid container direction="column" spacing={2}>
        <Grid item xs>
          <Typography variant="h4" fontSize={{ xs: '18px', md: '22px' }}>
            {isEdit ? 'Редактировать' : 'Добавить'} тест
          </Typography>
        </Grid>
        {!isEdit && (
          <Grid item xs={12}>
            <TextField
              label="Выберите курс"
              select
              name="course"
              value={state.course}
              onChange={inputChangeHandler}
              required
              // error={Boolean(getFieldError('user'))}
              // helperText={getFieldError('user')}
            >
              <MenuItem value="" disabled>
                Пожалуйста, выберите курс
              </MenuItem>
              {courses.map((course) => (
                <MenuItem key={course._id} value={course._id}>
                  {course.title}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        )}
        <Grid item xs={12}>
          <TextField
            id="title"
            label="Название теста"
            value={state.title}
            onChange={inputChangeHandler}
            name="title"
            required
            // error={Boolean(getFieldError('info'))}
            // helperText={getFieldError('info')}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            multiline
            rows={2}
            id="description"
            label="Описание и условия теста"
            value={state.description}
            onChange={inputChangeHandler}
            name="description"
            required
            // error={Boolean(getFieldError('info'))}
            // helperText={getFieldError('info')}
          />
        </Grid>

        {state.questions.map((question, index) => (
          <Grid
            item
            container
            key={index}
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid item xs={12} mb={1}>
              <Typography variant="body1">Вопрос №{index + 1}</Typography>
            </Grid>
            <Grid item xs>
              <TextField
                multiline
                rows={2}
                variant="outlined"
                label="Вопрос"
                name="question"
                value={question.question}
                onChange={(event) => questionsInputChangeHandler(event, index)}
                sx={{ mb: 1 }}
                // autoComplete="new-ingredients"
                // error={Boolean(getFieldError('ingredients'))}
                // helperText={getFieldError('ingredients')}
                required
              />
            </Grid>
            <Grid item container xs={12} mb={2}>
              <RadioGroup
                aria-labelledby={`question-${index}`}
                name={`question-${index}`}
                value={question.correctAnswer ?? ''}
                row={false}
                onChange={(event) => selectCorrectAnswer(event, index)}
                sx={{ width: '100%' }}
              >
                <Grid item container xs={12}>
                  {question.answers.map((answer, answerIndex) => (
                    <Grid
                      item
                      container
                      alignItems="center"
                      key={answerIndex}
                      xs={12}
                      mb={2}
                    >
                      <Grid item xs={10}>
                        <TextField
                          variant="outlined"
                          label="Вариант ответа"
                          name={`answers[${answerIndex}]`}
                          value={answer}
                          onChange={(event) =>
                            answerInputChangeHandler(event, index, answerIndex)
                          }
                          required
                        />
                      </Grid>
                      <Grid item container justifyContent="center" xs={1}>
                        <FormControlLabel
                          value={!answer ? null : answer}
                          control={
                            <Radio
                              id={`answer-${answerIndex}`}
                              color="success"
                              icon={<CancelIcon />}
                              checkedIcon={<CheckCircleIcon />}
                            />
                          }
                          label={''}
                        />
                      </Grid>
                      <Grid item xs={1}>
                        <IconButton
                          color="error"
                          onClick={() => removeAnswer(index, answerIndex)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Grid>
                    </Grid>
                  ))}
                </Grid>
              </RadioGroup>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  onClick={() => addAnswer(index)}
                  sx={{ width: '170px', bgcolor: 'info.dark' }}
                >
                  Добавить ответ
                </Button>
              </Grid>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="error"
                onClick={() => removeQuestion(index)}
                sx={{ width: '170px' }}
              >
                Удалить вопрос
              </Button>
            </Grid>
          </Grid>
        ))}
        <Grid item>
          <Button
            variant="contained"
            sx={{ bgcolor: 'info.dark' }}
            onClick={addQuestion}
          >
            Добавить вопрос
          </Button>
        </Grid>
        <Grid item xs={12}>
          <LoadingButton
            loadingIndicator="Loading…"
            loading={loading}
            type="submit"
            color="info"
            variant="contained"
            fullWidth
            sx={{ padding: '10px 0' }}
          >
            {isEdit ? 'Изменить' : 'Создать'}
          </LoadingButton>
        </Grid>
      </Grid>
    </form>
  );
};

export default TestForm;
