import icon from '@/src/assets/images/user-icon.jpg';
import ProtectedRoute from '@/src/components/ProtectedRoute/ProtectedRoute';
import BlocksTitle from '@/src/components/UI/BlocksTitle/BlocksTitle';
import Layout from '@/src/components/UI/Layout/Layout';
import { apiURL } from '@/src/constants';
import { selectTransactions } from '@/src/dispatchers/transactions/transactionsSlice';
import { fetchTransactionsByUser } from '@/src/dispatchers/transactions/transactionsThunk';
import { selectUser } from '@/src/dispatchers/users/usersSlice';
import ProfileCourseCard from '@/src/features/profile/components/ProfileCourseCard/ProfileCourseCard';
import { useAppSelector } from '@/src/store/hooks';
import { wrapper } from '@/src/store/store';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {
  Box,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const styles = {
  userInfo: {
    mb: 2,
    fontSize: 20,
    textAlign: 'left',
  },
  userInfoText: {
    color: 'primary.main',
  },
};

const Profile: React.FC = () => {
  const user = useAppSelector(selectUser);
  const transactions = useAppSelector(selectTransactions);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);

  const openMenu = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setAnchorEl(e.currentTarget);
  };

  const closeMenu = () => {
    setAnchorEl(null);
  };

  return (
    <ProtectedRoute isAllowed={Boolean(user)}>
      {user && (
        <Layout title="Школа Маркетинга Strategia: Профиль">
          <BlocksTitle titleText="Мой профиль" />
          <Grid
            container
            spacing={2}
            textAlign="left"
            alignItems="center"
            color="rgb(217, 39, 45)"
            sx={{ position: 'relative' }}
          >
            <Grid item>
              {user.avatar ? (
                <Image
                  style={{ margin: '0 auto', borderRadius: '2px' }}
                  src={apiURL + '/' + user.avatar}
                  alt={user.firstName}
                  width={200}
                  height={230}
                />
              ) : (
                <Image
                  src={icon}
                  alt="User icon"
                  width={200}
                  style={{ margin: '0 auto', borderRadius: '2px' }}
                />
              )}
            </Grid>
            <Grid item>
              <Grid>
                <Typography variant="body1" sx={styles.userInfo}>
                  ФИО:
                  <Typography component="span" sx={styles.userInfoText}>
                    {' '}
                    {user.firstName} {user.lastName}
                  </Typography>
                </Typography>

                <Typography variant="body1" sx={styles.userInfo}>
                  Email:{' '}
                  <Typography component="span" sx={styles.userInfoText}>
                    {user.email}
                  </Typography>
                </Typography>

                {user.phoneNumber ? (
                  <Typography variant="body1" sx={styles.userInfo}>
                    Телефон:{' '}
                    <Typography component="span" sx={styles.userInfoText}>
                      {user.phoneNumber}
                    </Typography>
                  </Typography>
                ) : null}
              </Grid>
            </Grid>
            {transactions.length > 0 && (
              <Grid item xs={12}>
                <Typography variant="h5" mb={3}>
                  Мои курсы:
                </Typography>
                <Grid
                  item
                  container
                  alignItems="center"
                  justifyContent="space-between"
                  flexWrap="wrap"
                  spacing={2}
                >
                  {transactions.map((transaction) => (
                    <Grid item key={transaction._id} xs={12} md={6}>
                      <ProfileCourseCard transactionCourse={transaction} />
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            )}
            <Box style={{ position: 'absolute', right: 0, top: 0 }}>
              <IconButton
                aria-label="more"
                id="long-button"
                aria-controls={isMenuOpen ? 'long-menu' : undefined}
                aria-expanded={isMenuOpen ? 'true' : undefined}
                aria-haspopup="true"
                onClick={openMenu}
              >
                <MoreVertIcon />
              </IconButton>
              <Menu open={isMenuOpen} anchorEl={anchorEl} onClose={closeMenu}>
                <MenuItem>
                  <Link href="/profile/edit-user">Изменить профиль</Link>
                </MenuItem>
                <MenuItem>
                  <Link href="/profile/change-password">Сменить пароль</Link>
                </MenuItem>
              </Menu>
            </Box>
          </Grid>
        </Layout>
      )}
    </ProtectedRoute>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async () => {
    const { user } = store.getState().users;

    if (user) {
      await store.dispatch(fetchTransactionsByUser(user._id));
    }

    return { props: {} };
  },
);

export default Profile;
