import React from 'react';
import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
import { cardStyle } from '@/src/styles';
import theme from '@/src/theme';
import { TestMini } from '@/src/types';
import { useRouter } from 'next/router';

interface Props {
  test: TestMini;
}

const TestCardForSlide: React.FC<Props> = ({ test }) => {
  const router = useRouter();

  const openCard = () => {
    void router.push(`/tests/one-test/${test._id}`);
  };
  return (
    <Box style={cardStyle.card}>
      <Card style={cardStyle.cardBody} className="card">
        <CardContent onClick={openCard}>
          <Grid
            container
            alignItems="center"
            justifyContent="space-between"
            width={cardStyle.width}
            height={cardStyle.height}
            style={cardStyle.innerStyle}
            sx={{ pl: 2 }}
          >
            <Grid item xs>
              <Typography
                component="div"
                color={theme.palette.info.dark}
                fontSize={cardStyle.fontSize}
                fontWeight={700}
                textAlign="center"
              >
                {test.title}
              </Typography>
              <Typography
                variant="body2"
                color={theme.palette.info.dark}
                fontWeight={600}
                mt={1}
                textAlign="center"
              >
                Категория: {test.category.title}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default TestCardForSlide;
