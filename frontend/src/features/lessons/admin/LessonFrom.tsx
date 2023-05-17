import { selectCourses } from '@/src/dispatchers/courses/coursesSlice';
import { fetchCourses } from '@/src/dispatchers/courses/coursesThunks';
import { selectLessonsSubmitting } from '@/src/dispatchers/lessons/lessonsSlice';
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
  document: '',
  course: '',
};

const LessonFrom: React.FC<Props> = ({
  existingLesson = initialState,
  onSubmit,
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
          />
        </Grid>
        <Grid item xs>
          <TextField
            label="Материал"
            name="document"
            value={state.document}
            onChange={onChange}
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
