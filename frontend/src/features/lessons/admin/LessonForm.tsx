import FileInput from '@/src/components/UI/FileInput/FileInput';
import { selectCourses } from '@/src/dispatchers/courses/coursesSlice';
import { fetchCourses } from '@/src/dispatchers/courses/coursesThunks';
import {
  selectLessonError,
  selectLessonsSubmitting,
} from '@/src/dispatchers/lessons/lessonsSlice';
import { useAppDispatch, useAppSelector } from '@/src/store/hooks';
import { ILesson } from '@/src/types';
import { Button, Grid, MenuItem, TextField } from '@mui/material';
import React from 'react';

interface Props {
  existingLesson?: ILesson;
  onSubmit: (lesson: ILesson) => void;
}

const initialState: ILesson = {
  theme: '',
  video_link: '',
  document: null,
  course: '',
};

const LessonFrom: React.FC<Props> = ({
  onSubmit,
  existingLesson = initialState,
}) => {
  const dispatch = useAppDispatch();
  const courses = useAppSelector(selectCourses);
  const submitting = useAppSelector(selectLessonsSubmitting);
  const error = useAppSelector(selectLessonError);
  const [state, setState] = React.useState<ILesson>(existingLesson);

  React.useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState((prev) => ({ ...prev, [name]: value }));
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    setState((prev) => ({
      ...prev,
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
            error={Boolean(getFieldError('course'))}
            helperText={getFieldError('course')}
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
            error={Boolean(getFieldError('theme'))}
            helperText={getFieldError('theme')}
            required
          />
        </Grid>
        <Grid item xs>
          <TextField
            label="Видео"
            name="video_link"
            value={state.video_link}
            onChange={onChange}
          />
        </Grid>
        <Grid item xs>
          <FileInput
            label="Выберите документ для раздатки"
            onChange={onFileChange}
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
            Отправить
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default LessonFrom;
