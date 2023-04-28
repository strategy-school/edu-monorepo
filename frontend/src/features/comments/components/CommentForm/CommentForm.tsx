import React, { useEffect, useState } from 'react';
import { ShortCommentMutation, ValidationError } from '@/src/types';
import { Grid, Rating, TextField, Typography } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

interface Props {
  onSubmit: (commentMutation: ShortCommentMutation) => void;
  existingComment?: ShortCommentMutation;
  isEdit?: boolean;
  loading: boolean;
  error: ValidationError | null;
}

const initialState: ShortCommentMutation = {
  rating: 0,
  text: '',
};

const CommentForm: React.FC<Props> = ({
  onSubmit,
  existingComment,
  isEdit = false,
  loading = false,
  error,
}) => {
  const [state, setState] = useState<ShortCommentMutation>(
    existingComment || initialState,
  );

  useEffect(() => {
    setState(existingComment || initialState);
  }, [existingComment]);

  const inputChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setState((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const ratingChangeHandler = (
    event: React.ChangeEvent<unknown>,
    value: number | null,
  ) => {
    setState((prev) => ({ ...prev, rating: value || 0 }));
  };

  const getFieldError = (fieldName: string) => {
    try {
      return error?.errors[fieldName].message;
    } catch {
      return undefined;
    }
  };

  const submitFormHandler = (e: React.FormEvent) => {
    e.preventDefault();
    if (state.rating === 0) {
      alert('Пожалуйста, выберите рейтинг.');
      return;
    }
    onSubmit(state);
  };

  return (
    <form onSubmit={submitFormHandler}>
      <Grid container direction="column" spacing={2}>
        <Grid item xs>
          <Typography variant="h5">
            {isEdit ? 'Редактировать' : 'Оставить'} отзыв{' '}
          </Typography>
        </Grid>

        <Grid item xs>
          <Rating
            name="rating"
            value={state.rating}
            onChange={ratingChangeHandler}
          />
        </Grid>

        <Grid item xs>
          <TextField
            multiline
            id="text"
            rows={3}
            label="Комментарий"
            value={state.text}
            onChange={inputChangeHandler}
            name="text"
            required
            error={Boolean(getFieldError('text'))}
            helperText={getFieldError('text')}
          />
        </Grid>

        <Grid item xs>
          <LoadingButton
            loadingIndicator="Loading…"
            loading={loading}
            type="submit"
            color="primary"
            variant="contained"
          >
            {isEdit ? 'Сохранить' : 'Создать'}
          </LoadingButton>
        </Grid>
      </Grid>
    </form>
  );
};

export default CommentForm;
