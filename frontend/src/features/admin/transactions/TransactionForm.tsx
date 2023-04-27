import { useAppDispatch, useAppSelector } from '@/src/app/hooks';
import { selectTransactionCreating } from '@/src/dispatchers/transactions/transactionsSlice';
import { ITransaction } from '@/src/types';
import { Button, Grid, MenuItem, TextField } from '@mui/material';
import React from 'react';
import { selectCourses } from '../../courses/coursesSlice';
import { fetchCourses } from '../../courses/coursesThunks';
import { selectBasicUsers } from '../../users/usersSlice';
import { fetchBasicUsers } from '../../users/usersThunks';

interface Props {
  onSubmit: (transaction: ITransaction) => void;
}

const TransactionForm: React.FC<Props> = ({ onSubmit }) => {
  const dispatch = useAppDispatch();
  const users = useAppSelector(selectBasicUsers);
  const courses = useAppSelector(selectCourses);
  const creatingTransaction = useAppSelector(selectTransactionCreating);
  const [state, setState] = React.useState<ITransaction>({
    user: '',
    course: '',
  });

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
    void dispatch(fetchBasicUsers());
    void dispatch(fetchCourses());
  }, [dispatch]);

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
            {users.map((user) => (
              <MenuItem key={user._id} value={user._id}>
                {user.firstName} {user.lastName}
              </MenuItem>
            ))}
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
            {courses.map((course) => (
              <MenuItem key={course._id} value={course._id}>
                {course.title}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs>
          <Button
            type="submit"
            color="primary"
            variant="contained"
            disabled={creatingTransaction}
          >
            Create
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default TransactionForm;
