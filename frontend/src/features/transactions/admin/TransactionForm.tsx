import { selectTransactionSubmitting } from '@/src/dispatchers/transactions/transactionsSlice';
import { useAppDispatch, useAppSelector } from '@/src/store/hooks';
import { ITransaction, UserRole } from '@/src/types.d';
import { Button, Grid, MenuItem, TextField } from '@mui/material';
import React from 'react';
import { selectCourses } from '@/src/dispatchers/courses/coursesSlice';
import { fetchCourses } from '@/src/dispatchers/courses/coursesThunks';
import { selectUsers } from '@/src/dispatchers/users/usersSlice';
import { fetchUsers } from '@/src/dispatchers/users/usersThunks';

interface Props {
  onSubmit: (transaction: ITransaction) => void;
  existingTransaction?: ITransaction;
}

const initialState = {
  user: '',
  course: '',
  course_type: '',
};

const TransactionForm: React.FC<Props> = ({
  existingTransaction = initialState,
  onSubmit,
}) => {
  const dispatch = useAppDispatch();
  const users = useAppSelector(selectUsers);
  const courses = useAppSelector(selectCourses);
  const submittingTransaction = useAppSelector(selectTransactionSubmitting);
  const [state, setState] = React.useState<ITransaction>(existingTransaction);

  React.useEffect(() => {
    void dispatch(fetchUsers({ role: UserRole.User }));
    void dispatch(fetchCourses());
  }, [dispatch]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState((prev) => ({ ...prev, [name]: value }));
  };

  const onFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(state);
  };

  const usersList = users.map((user) => (
    <MenuItem key={user._id} value={user._id}>
      {user.firstName} {user.lastName}
    </MenuItem>
  ));

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
            label="Пользователи"
            name="user"
            value={state.user}
            onChange={onChange}
            required
          >
            <MenuItem value="" disabled>
              Пожалуйста, выберите пользователя
            </MenuItem>
            {usersList}
          </TextField>
        </Grid>
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
            select
            label="Тип курса"
            name="course_type"
            value={state.course_type}
            onChange={onChange}
            required
          >
            <MenuItem value="" disabled>
              Пожалуйста, выберите тип
            </MenuItem>
            <MenuItem value="zoom">По Zoom</MenuItem>
            <MenuItem value="youtube">По предзаписанным урокам</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs>
          <Button
            type="submit"
            color="primary"
            variant="contained"
            disabled={submittingTransaction}
          >
            submit
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default TransactionForm;
