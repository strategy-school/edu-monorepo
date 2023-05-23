import FileInput from '@/src/components/UI/FileInput/FileInput';
import {
  selectVideoReviewError,
  selectVideoReviewSubmitting,
} from '@/src/dispatchers/videoReviews/videoReviewsSlice';
import { useAppSelector } from '@/src/store/hooks';
import { IVideoReview } from '@/src/types';
import LoadingButton from '@mui/lab/LoadingButton';
import { Grid, TextField } from '@mui/material';
import React from 'react';

interface Props {
  onSubmit: (reviewMutation: IVideoReview) => void;
  existingReview?: IVideoReview;
}

const initialState: IVideoReview = {
  title: '',
  previewImage: null,
  youtubeURL: '',
};

const VideoReviewForm: React.FC<Props> = ({
  onSubmit,
  existingReview = initialState,
}) => {
  const submitting = useAppSelector(selectVideoReviewSubmitting);
  const error = useAppSelector(selectVideoReviewError);
  const [state, setState] = React.useState<IVideoReview>(existingReview);

  const getFieldError = (fieldName: string) => {
    try {
      return error?.errors[fieldName].message;
    } catch {
      return undefined;
    }
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

  const onFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(state);
    setState(initialState);
  };

  return (
    <form onSubmit={onFormSubmit}>
      <Grid container direction="column" spacing={2}>
        <Grid item xs>
          <TextField
            id="title"
            label="Заголовок"
            value={state.title}
            onChange={onChange}
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
            onChange={onChange}
            name="youtubeURL"
            required
            InputProps={{ inputProps: { minLength: 11, maxLength: 11 } }}
            error={Boolean(getFieldError('youtubeURL'))}
            helperText={getFieldError('youtubeURL')}
          />
        </Grid>

        <Grid item xs>
          <FileInput
            label="Выберите картинку для отзыва"
            onChange={onFileChange}
            name="previewImage"
            type="image/*"
            errorCheck={getFieldError}
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

export default VideoReviewForm;
