import { selectCourses } from '@/src/dispatchers/courses/coursesSlice';
import { fetchCourses } from '@/src/dispatchers/courses/coursesThunks';
import { selectLessonsSubmitting } from '@/src/dispatchers/lessons/lessonsSlice';
import { useAppDispatch, useAppSelector } from '@/src/store/hooks';
import { ILesson, ValidationError } from '@/src/types';
import { Button, Grid, MenuItem, TextField } from '@mui/material';
import React from 'react';
import FileInput from '@/src/components/UI/FileInput/FileInput';

interface Props {
  existingLesson?: ILesson;
  onSubmit: (lesson: ILesson) => void;
  error: ValidationError | null;
  isEditing?: boolean;
}

const initialState: ILesson = {
  theme: '',
  video_link: '',
  document: null,
  course: '',
  number: '',
};

const LessonForm: React.FC<Props> = ({
  existingLesson = initialState,
  onSubmit,
  error,
  isEditing,
}) => {
  const dispatch = useAppDispatch();
  const courses = useAppSelector(selectCourses);
  const submitting = useAppSelector(selectLessonsSubmitting);
  const [state, setState] = React.useState<ILesson>(existingLesson);

  React.useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState((prev) => ({ ...prev, [name]: value }));
  };

  const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: files && files[0] ? files[0] : null,
    }));
  };

  const getFieldError = (fieldName: string) => {
    try {
      return error?.errors[fieldName].message;
    } catch {
      return undefined;
    }
  };

  const onFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(state);
  };

  const coursesList = courses.map((course) => (
    <MenuItem key={course._id} value={course._id}>
      {course.title}
    </MenuItem>
  ));

  return (
    <form autoComplete="off" onSubmit={onFormSubmit}>
      <Grid container direction="column" spacing={2}>
        <Grid item xs>
          <TextField
            select
            label="Курсы"
            name="course"
            value={state.course}
            onChange={onChange}
            required
          >
            <MenuItem value="" disabled>
              Пожалуйста, выберите курс
            </MenuItem>
            {coursesList}
          </TextField>
        </Grid>
        <Grid item xs>
          <TextField
            label="Тема"
            name="theme"
            value={state.theme}
            onChange={onChange}
            required
          />
        </Grid>
        <Grid item xs>
          <TextField
            label="Видео"
            name="video_link"
            value={state.video_link}
            onChange={onChange}
            type="url"
          />
        </Grid>
        <Grid item xs>
          <TextField
            label="Номер урока"
            name="number"
            value={state.number}
            onChange={onChange}
            type="number"
            InputProps={{ inputProps: { min: 1, step: 1 } }}
          />
        </Grid>
        <Grid item xs>
          <FileInput
            label={
              isEditing
                ? 'Изменить имеющиеся документ для раздатки'
                : 'Выберите документ для раздатки'
            }
            onChange={fileInputChangeHandler}
            name="document"
            type="application/pdf"
            errorCheck={getFieldError}
          />
        </Grid>
        <Grid item xs>
          <Button
            type="submit"
            color="primary"
            variant="contained"
            disabled={submitting}
          >
            {isEditing ? 'Сохранить' : 'Отправить'}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default LessonForm;
