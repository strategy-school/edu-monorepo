import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  styled,
  Typography,
} from '@mui/material';
import { apiURL } from '@/src/constants';
import { ApiCategory } from '@/src/types';
import { boxShadow } from '@/src/styles';

const ImageCardMedia = styled(CardMedia)({
  height: 0,
  paddingTop: '56.25%',
});

interface Props {
  category: ApiCategory;
}

const CategoryItem: React.FC<Props> = ({ category }) => {
  const cardImage = apiURL + '/' + category.image;

  return (
    <Grid container item xs={12} sm={6} md={4} lg={3}>
      <Card style={{ boxShadow, height: '100%' }}>
        <CardHeader title={category.title} />
        <ImageCardMedia image={cardImage} title={category.title} />
        <CardContent>
          <Typography component="p" style={{ padding: '5px' }}>
            {category.description}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default CategoryItem;
