import FileInput from '@/src/components/UI/FileInput/FileInput';
import {
  selectCategoryError,
  selectCategorySubmitting,
} from '@/src/dispatchers/categories/categoriesSlice';
import { useAppSelector } from '@/src/store/hooks';
import { ICategory } from '@/src/types';
import LoadingButton from '@mui/lab/LoadingButton';
import { Grid, TextField } from '@mui/material';
import React, { useState } from 'react';

interface Props {
  onSubmit: (categoryMutation: ICategory) => void;
  existingCategory?: ICategory;
}

const initialState: ICategory = {
  title: '',
  description: '',
  image: null,
};

const CategoryForm: React.FC<Props> = ({
  onSubmit,
  existingCategory = initialState,
}) => {
  const submitting = useAppSelector(selectCategorySubmitting);
  const error = useAppSelector(selectCategoryError);
  const [state, setState] = useState<ICategory>(existingCategory);

  const onFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(state);
    setState(initialState);
  };

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

  return (
    <form onSubmit={onFormSubmit}>
      <Grid container direction="column" spacing={2}>
        <Grid item xs>
          <TextField
            id="title"
            name="title"
            label="Название"
            value={state.title}
            onChange={onChange}
            required
            disabled={submitting}
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
            onChange={onChange}
            required
            disabled={submitting}
            error={Boolean(getFieldError('description'))}
            helperText={getFieldError('description')}
          />
        </Grid>
        <Grid item xs>
          <FileInput
            onChange={onFileChange}
            errorCheck={getFieldError}
            name="image"
            label="Загрузите картинку"
          />
        </Grid>
        <Grid item xs>
          <LoadingButton
            loadingIndicator="Loading…"
            loading={submitting}
            disabled={submitting}
            type="submit"
            color="primary"
            variant="contained"
          >
            Отправить
          </LoadingButton>
        </Grid>
      </Grid>
    </form>
  );
};

export default CategoryForm;
