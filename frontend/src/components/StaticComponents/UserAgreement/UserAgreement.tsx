import React from 'react';
import { Grid, List, ListItem, Typography } from '@mui/material';

const UserAgreement = () => {
  return (
    <Grid container spacing={2} direction="column">
      <Grid item xs>
        <Typography
          variant="h3"
          fontSize={{ xs: '1.6rem', sm: '2rem', md: '3rem' }}
        >
          Пользовательское соглашение
        </Typography>
      </Grid>
      <Grid item xs>
        <Typography component="p">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam est
          justo, posuere at libero in, sollicitudin commodo mi. Duis non lorem
          malesuada, convallis ipsum et, semper tortor. Suspendisse vel metus
          augue. Ut sodales velit et ex auctor elementum. Aenean consectetur
          nunc elit, eu volutpat erat volutpat iaculis. Integer porttitor leo ac
          ante cursus, vel accumsan diam dignissim. Nulla tellus nisi, commodo
          sed egestas porttitor, fermentum nec nunc. Fusce molestie fringilla
          quam a congue. Morbi placerat magna in lorem vulputate, vitae viverra
          sem ultricies. Cras imperdiet volutpat sollicitudin. Sed a arcu
          ligula. Aliquam suscipit massa pretium interdum molestie. Nullam
          consectetur enim sed ante porta, pellentesque pellentesque dolor
          efficitur. Etiam a tortor egestas, ultricies diam sed, feugiat diam.
          Nullam porttitor nec nunc a vehicula.
        </Typography>
        <Typography component="p">Lorem ipsum dolor sit amet</Typography>
        <List>
          <ListItem>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit
          </ListItem>
          <ListItem>
            Maecenas ultrices lectus quis diam sagittis pellentesque.
          </ListItem>
          <ListItem>Sed aliquam lacus lacinia est placerat luctus.</ListItem>
          <ListItem>
            Morbi eu lorem sed turpis ultrices porttitor laoreet sed turpis.
          </ListItem>
          <ListItem>
            Sed laoreet justo quis ante sodales placerat eu sed risus.
          </ListItem>
        </List>
      </Grid>
    </Grid>
  );
};

export default UserAgreement;
