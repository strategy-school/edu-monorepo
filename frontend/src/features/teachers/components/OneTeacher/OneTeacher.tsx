import React from 'react';
import {
  Button,
  CardMedia,
  CircularProgress,
  Divider,
  Grid,
  Typography,
} from '@mui/material';
import { apiURL } from '@/src/constants';
import { Teacher } from '@/src/types';
import { borderRadius, boxShadow } from '@/src/styles';
import { Property } from 'csstype';
import TextAlign = Property.TextAlign;
import LoadingButton from '@mui/lab/LoadingButton';
import theme from '@/src/theme';

interface Props {
  teacher: Teacher | null;
  loading: boolean;
  goBack: () => void;
  deleteLoading?: string | false;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

const styles = {
  teacherWrapper: {
    width: '100%',
    boxShadow,
    borderRadius,
  },
  media: {
    maxWidth: '500px',
    borderRadius,
  },
  text: {
    textAlign: 'justify' as TextAlign,
    marginBottom: '30px',
  },
};

const OneTeacher: React.FC<Props> = ({
  teacher,
  loading,
  goBack,
  onEdit,
  onDelete,
  deleteLoading,
}) => {
  if (!teacher) {
    return (
      <Typography variant="h5" textAlign="center" mt={5}>
        Преподаватель не найден!
      </Typography>
    );
  }
  return (
    <Grid container justifyContent="center">
      {loading ? (
        <CircularProgress />
      ) : (
        teacher && (
          <Grid
            style={styles.teacherWrapper}
            padding={{ xs: '10px 20px', md: '15px 50px' }}
          >
            <Button onClick={goBack}>Назад</Button>
            <Grid
              container
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              mb={4}
            >
              <Grid item mb={3}>
                <CardMedia
                  component="img"
                  sx={{ maxWidth: 500, borderRadius: 7 }}
                  image={apiURL + '/' + teacher.photo}
                  alt={teacher.user.firstName}
                />
              </Grid>
              <Grid item width="100%">
                <Typography variant="h5" textTransform="uppercase" mb={2}>
                  {teacher.user.firstName} {teacher.user.lastName}
                </Typography>
                <Divider sx={{ my: 3 }} />
                <Typography
                  variant="body1"
                  style={styles.text}
                  fontSize={{ xs: '14px', md: '18px' }}
                >
                  {teacher?.info}
                </Typography>
                <Divider sx={{ my: 3 }} />
                <Typography variant="h6" mb={3}>
                  Портфолио:
                </Typography>
                {teacher.portfolio.map((port, index) => (
                  <Typography
                    key={index}
                    style={styles.text}
                    variant="body1"
                    fontSize={{ xs: '14px', md: '18px' }}
                  >
                    {index + 1}. {port}
                  </Typography>
                ))}
              </Grid>
            </Grid>
            {onDelete && onEdit && (
              <Grid
                item
                container
                justifyContent="center"
                alignItems="center"
                spacing={2}
              >
                <Grid item container justifyContent="center" xs={12} md={6}>
                  <LoadingButton
                    color="error"
                    variant="contained"
                    loading={
                      deleteLoading ? deleteLoading === teacher._id : false
                    }
                    onClick={() => onDelete(teacher?._id)}
                    sx={{
                      width: '150px',
                      fontSize: '14px',
                      [theme.breakpoints.up('md')]: {
                        fontSize: '18px',
                      },
                    }}
                  >
                    Удалить
                  </LoadingButton>
                </Grid>
                <Grid item container justifyContent="center" xs={12} md={6}>
                  <Button
                    onClick={() => onEdit(teacher?._id)}
                    variant="contained"
                    color="primary"
                    sx={{
                      fontSize: '14px',
                      [theme.breakpoints.up('md')]: {
                        fontSize: '18px',
                      },
                    }}
                  >
                    Редактировать
                  </Button>
                </Grid>
              </Grid>
            )}
          </Grid>
        )
      )}
    </Grid>
  );
};

export default OneTeacher;
