import React from 'react';
import { IVideoReview, ValidationError } from '@/src/types';
import { CircularProgress, Grid, TextField, Typography } from '@mui/material';
import FileInput from '@/src/components/UI/FileInput/FileInput';
import LoadingButton from '@mui/lab/LoadingButton';

interface Props {
  onSubmit: (reviewMutation: IVideoReview) => void;
  existingReview?: IVideoReview;
  isEdit?: boolean;
  loading: boolean;
  error: ValidationError | null;
  fetchReviewLoading?: boolean;
}

const initialState: IVideoReview = {
  title: '',
  previewImage: null,
  youtubeURL: '',
};

const VideoReviewForm: React.FC<Props> = ({
  onSubmit,
  existingReview,
  isEdit = false,
  loading,
  error,
  fetchReviewLoading = false,
}) => {
  const [state, setState] = React.useState<IVideoReview>(
    existingReview || initialState,
  );

  const getFieldError = (fieldName: string) => {
    try {
      return error?.errors[fieldName].message;
    } catch {
      return undefined;
    }
  };

  React.useEffect(() => {
    setState(existingReview || initialState);
  }, [existingReview]);

  const inputChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
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

  const submitFormHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(state);
    setState(initialState);
  };

  return (
    <form onSubmit={submitFormHandler}>
      <Grid container direction="column" spacing={2}>
        <Grid item xs>
          <Typography variant="h4">
            {isEdit ? 'Редактировать' : 'Новый'} видео отзыв{' '}
            {fetchReviewLoading && (
              <CircularProgress size={20} sx={{ ml: 1 }} />
            )}
          </Typography>
        </Grid>

        <Grid item xs>
          <TextField
            id="title"
            label="Заголовок"
            value={state.title}
            onChange={inputChangeHandler}
            name="title"
            required
            error={Boolean(getFieldError('title'))}
            helperText={getFieldError('title')}
          />
        </Grid>

        <Grid item xs>
          <TextField
            id="youtubeURL"
            label="Ютуб код (вам нужно ввести код, который в конце ссылки. Пример: 'oc6rUF61L64'"
            value={state.youtubeURL}
            onChange={inputChangeHandler}
            name="youtubeURL"
            required
            InputProps={{ inputProps: { minlength: 11, maxlength: 11 } }}
            error={Boolean(getFieldError('youtubeURL'))}
            helperText={getFieldError('youtubeURL')}
          />
        </Grid>

        <Grid item xs>
          <FileInput
            label="Выберите картинку для отзыва"
            onChange={fileInputChangeHandler}
            name="previewImage"
            type="image/*"
            errorCheck={getFieldError}
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

export default VideoReviewForm;
