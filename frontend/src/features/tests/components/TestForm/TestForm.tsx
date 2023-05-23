import { selectCategories } from '@/src/dispatchers/categories/categoriesSlice';
import { fetchCategories } from '@/src/dispatchers/categories/categoriesThunks';
import {
  selectTestSubmitting,
  selectTestError,
} from '@/src/dispatchers/tests/testsSlice';
import { useAppDispatch, useAppSelector } from '@/src/store/hooks';
import { TestMutation } from '@/src/types';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import LoadingButton from '@mui/lab/LoadingButton';
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
import React, { ChangeEvent } from 'react';

interface Props {
  onSubmit: (test: TestMutation) => void;
  existingTest?: TestMutation;
}

const initialState: TestMutation = {
  category: '',
  title: '',
  description: '',
  questions: [{ question: '', answers: [''], correctAnswer: '' }],
};

const TestForm: React.FC<Props> = ({
  onSubmit,
  existingTest = initialState,
}) => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectCategories);
  const loading = useAppSelector(selectTestSubmitting);
  const error = useAppSelector(selectTestError);
  const [state, setState] = React.useState<TestMutation>(existingTest);

  React.useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const onFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(state);
    await onSubmit(state);
    setState(initialState);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState((prev) => ({ ...prev, [name]: value }));
  };

  const onQuestionChange = (
    e: React.ChangeEvent<HTMLInputElement>,
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
          { question: '', answers: [''], correctAnswer: '' },
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

  const onAnswerChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    questionIndex: number,
    answerIndex: number,
  ) => {
    const { value } = e.target;
    console.log(answerIndex);

    setState((prevState) => {
      const updatedQuestions = [...prevState.questions];
      const updatedAnswers = [...updatedQuestions[questionIndex].answers];
      updatedAnswers[answerIndex] = value;
      updatedQuestions[questionIndex] = {
        ...updatedQuestions[questionIndex],
        answers: updatedAnswers,
      };
      return { ...prevState, questions: updatedQuestions };
    });
  };

  const addAnswer = (questionIndex: number) => {
    setState((prevState) => {
      const updatedQuestions = [...prevState.questions];
      updatedQuestions[questionIndex].answers = [
        ...updatedQuestions[questionIndex].answers,
        '',
      ];
      return { ...prevState, questions: updatedQuestions };
    });
  };

  const removeAnswer = (questionIndex: number, answerIndex: number) => {
    setState((prevState) => {
      const updatedQuestions = [...prevState.questions];
      const updatedAnswers = [...updatedQuestions[questionIndex].answers];
      updatedAnswers.splice(answerIndex, 1);
      updatedQuestions[questionIndex].answers = updatedAnswers;
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

  const getFieldError = (fieldName: string) => {
    try {
      return error?.errors[fieldName].message;
    } catch {
      return undefined;
    }
  };

  return (
    <form onSubmit={onFormSubmit}>
      <Grid container direction="column" spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Выберите категорию"
            select
            name="category"
            value={state.category}
            onChange={onChange}
            required
            error={Boolean(getFieldError('category'))}
            helperText={getFieldError('category')}
          >
            <MenuItem value="" disabled>
              Пожалуйста, выберите курс
            </MenuItem>
            {categories.map((category) => (
              <MenuItem key={category._id} value={category._id}>
                {category.title}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item xs={12}>
          <TextField
            id="title"
            label="Название теста"
            value={state.title}
            onChange={onChange}
            name="title"
            required
            error={Boolean(getFieldError('title'))}
            helperText={getFieldError('title')}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            multiline
            rows={2}
            id="description"
            label="Описание и условия теста"
            value={state.description}
            onChange={onChange}
            name="description"
            required
            error={Boolean(getFieldError('description'))}
            helperText={getFieldError('description')}
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
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  onQuestionChange(e, index)
                }
                sx={{ mb: 1 }}
                error={Boolean(getFieldError(`questions.${index}.question`))}
                helperText={getFieldError(`questions.${index}.question`)}
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
                            onAnswerChange(event, index, answerIndex)
                          }
                          error={Boolean(
                            getFieldError(
                              `questions.${index}.answers.${answerIndex}`,
                            ),
                          )}
                          helperText={getFieldError(
                            `questions.${index}.answers.${answerIndex}`,
                          )}
                          required
                        />
                      </Grid>
                      <Grid item container justifyContent="center" xs={1}>
                        <FormControlLabel
                          value={!answer ? false : answer}
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
            color="success"
            variant="contained"
            fullWidth
            sx={{ padding: '10px 0' }}
          >
            Отправить
          </LoadingButton>
        </Grid>
      </Grid>
    </form>
  );
};

export default TestForm;
