import { useAppDispatch, useAppSelector } from '@/src/app/hooks';
import { selectTransactionSubmitting } from '@/src/dispatchers/transactions/transactionsSlice';
import { ITransaction, UserRole } from '@/src/types.d';
import { Button, Grid, MenuItem, TextField } from '@mui/material';
import React from 'react';
import { selectCourses } from '../../../dispatchers/courses/coursesSlice';
import { fetchCourses } from '../../../dispatchers/courses/coursesThunks';
import { selectUsers } from '../../../dispatchers/users/usersSlice';
import { fetchUsers } from '../../../dispatchers/users/usersThunks';

interface Props {
  onSubmit: (transaction: ITransaction) => void;
  existingTransaction?: ITransaction;
}

const initialState = {
  user: '',
  course: '',
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

  const onChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setState((prev) => ({ ...prev, [name]: value }));
    },
    [setState],
  );

  const onFormSubmit = React.useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      onSubmit(state);
    },
    [state, onSubmit],
  );

  React.useEffect(() => {
    void dispatch(fetchUsers({ role: UserRole.User }));
    void dispatch(fetchCourses());
  }, [dispatch]);

  const usersList = users.length
    ? users.map((user) => (
        <MenuItem key={user._id} value={user._id}>
          {user.firstName} {user.lastName}
        </MenuItem>
      ))
    : null;

  const coursesList = users.length
    ? courses.map((course) => (
        <MenuItem key={course._id} value={course._id}>
          {course.title}
        </MenuItem>
      ))
    : null;

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
