import React from 'react';
import {
  Box,
  Button,
  Card,
  CardHeader,
  CardMedia,
  Grid,
  styled,
  Typography,
} from '@mui/material';
import { apiURL } from '@/src/constants';
import { Category } from '@/src/types';
import { boxShadow } from '@/src/styles';
import { useAppSelector } from '@/src/app/hooks';
import { selectUser } from '@/src/features/users/usersSlice';
import { useRouter } from 'next/router';

const ImageCardMedia = styled(CardMedia)({
  height: 0,
  paddingTop: '56.25%',
});

interface Props {
  category: Category;
  onDelete: (id: string) => void;
}

const CategoryItem: React.FC<Props> = ({ category, onDelete }) => {
  const user = useAppSelector(selectUser);
  const router = useRouter();
  const cardImage = apiURL + '/' + category.image;

  const openEditPage = () => {
    void router.push('/edit-category/' + category._id);
  };

  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Card style={{ boxShadow }}>
        <CardHeader title={category.title} />
        <ImageCardMedia image={cardImage} title={category.title} />
        <Typography component="p" style={{ padding: '5px' }}>
          {category.description}
        </Typography>
        {user && user.role === 'admin' && (
          <Box>
            <Button
              type="button"
              onClick={() => onDelete(category._id)}
              color="secondary"
            >
              Удалить
            </Button>
            <Button type="button" onClick={openEditPage} color="primary">
              Редактировать
            </Button>
          </Box>
        )}
      </Card>
    </Grid>
  );
};

export default CategoryItem;
