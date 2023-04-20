import React, { useState } from 'react';
import { CategoryMutation } from '@/src/types';
import { Button, Grid, TextField } from '@mui/material';
import { useAppSelector } from '@/src/app/hooks';
import {
  selectCategoryCreating,
  selectCreateCategoryError,
} from '@/src/features/categories/categoriesSlice';
import FileInput from '@/src/components/UI/FileInput/FileInput';

interface Props {
  onSubmit: (categoryMutation: CategoryMutation) => void;
}

const CategoryForm: React.FC<Props> = ({ onSubmit }) => {
  const categoryCreating = useAppSelector(selectCategoryCreating);
  const createError = useAppSelector(selectCreateCategoryError);
  const [state, setState] = useState<CategoryMutation>({
    title: '',
    description: '',
    image: null,
  });

  const submitFormHandler = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(state);
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
      return createError?.errors[fieldName].message;
    } catch {
      return undefined;
    }
  };

  return (
    <form onSubmit={submitFormHandler}>
      <Grid container direction="column" spacing={2}>
        <Grid item xs>
          <TextField
            id="title"
            name="title"
            label="Название"
            value={state.title}
            onChange={inputChangeHandler}
            required
            disabled={categoryCreating}
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
            disabled={categoryCreating}
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
          <Button type="submit" color="primary" variant="contained">
            Создать
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default CategoryForm;
