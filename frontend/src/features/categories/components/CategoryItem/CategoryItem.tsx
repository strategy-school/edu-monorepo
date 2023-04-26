import React from 'react';
import {
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

const ImageCardMedia = styled(CardMedia)({
  height: 0,
  paddingTop: '56.25%',
});

interface Props {
  category: Category;
}

const CategoryItem: React.FC<Props> = ({ category }) => {
  const cardImage = apiURL + '/' + category.image;

  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Card style={{ boxShadow }}>
        <CardHeader title={category.title} />
        <ImageCardMedia image={cardImage} title={category.title} />
        <Typography component="p" style={{ padding: '5px' }}>
          {category.description}
        </Typography>
      </Card>
    </Grid>
  );
};

export default CategoryItem;
