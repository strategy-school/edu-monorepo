import React, { useState } from 'react';
import { CategoryMutation } from '@/src/types';
import { CircularProgress, Grid, TextField, Typography } from '@mui/material';
import FileInput from '@/src/components/UI/FileInput/FileInput';
import { ValidationError } from '@/src/types';
import LoadingButton from '@mui/lab/LoadingButton';

interface Props {
  onSubmit: (categoryMutation: CategoryMutation) => void;
  existingCategory?: CategoryMutation;
  isEdit?: boolean;
  loading?: boolean;
  fetchCategoryLoading?: boolean;
  error: ValidationError | null;
}

const initialState: CategoryMutation = {
  title: '',
  description: '',
  image: null,
};

const CategoryForm: React.FC<Props> = ({
  onSubmit,
  existingCategory,
  isEdit = false,
  loading = false,
  fetchCategoryLoading = false,
  error,
}) => {
  const [state, setState] = useState<CategoryMutation>(
    existingCategory || initialState,
  );

  const submitFormHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(state);
    setState(initialState);
  };

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState((prevState) => {
      return { ...prevState, [name]: value };
    });
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

  return (
    <form onSubmit={submitFormHandler}>
      <Grid container direction="column" spacing={2}>
        <Grid item xs>
          <Typography variant="h5">
            {isEdit ? 'Редактировать' : 'Создать'} категорию{' '}
            {fetchCategoryLoading && (
              <CircularProgress size={20} sx={{ ml: 1 }} />
            )}
          </Typography>
        </Grid>
        <Grid item xs>
          <TextField
            id="title"
            name="title"
            label="Название"
            value={state.title}
            onChange={inputChangeHandler}
            required
            disabled={loading}
            error={Boolean(getFieldError('title'))}
            helperText={getFieldError('title')}
          />
        </Grid>
        <Grid item xs>
          <TextField
            multiline
            rows={3}
            id="description"
            name="description"
            label="Описание"
            value={state.description}
            onChange={inputChangeHandler}
            required
            disabled={loading}
            error={Boolean(getFieldError('description'))}
            helperText={getFieldError('description')}
          />
        </Grid>
        <Grid item xs>
          <FileInput
            onChange={fileInputChangeHandler}
            errorCheck={getFieldError}
            name="image"
            label="Загрузите картинку"
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

export default CategoryForm;
