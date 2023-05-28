import icon from '@/src/assets/images/user-icon.jpg';
import ProtectedRoute from '@/src/components/ProtectedRoute/ProtectedRoute';
import BlocksTitle from '@/src/components/UI/BlocksTitle/BlocksTitle';
import Layout from '@/src/components/UI/Layout/Layout';
import { apiURL } from '@/src/constants';
import { selectTransactions } from '@/src/dispatchers/transactions/transactionsSlice';
import { fetchTransactionsByUser } from '@/src/dispatchers/transactions/transactionsThunk';
import {
  selectLoginLoading,
  selectUser,
} from '@/src/dispatchers/users/usersSlice';
import ProfileCourseCard from '@/src/features/profile/components/ProfileCourseCard/ProfileCourseCard';
import { useAppDispatch, useAppSelector } from '@/src/store/hooks';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect } from 'react';
import {
  removeUserAvatar,
  uploadUserAvatar,
} from '@/src/dispatchers/users/usersThunks';
import MyModal from '@/src/components/UI/Modal/MyModal';

const styles = {
  userInfo: {
    mb: 2,
    fontSize: 20,
    textAlign: 'left',
  },
  userInfoText: {
    color: 'primary.main',
  },
  avatarBtn: {
    fontSize: '16px',
    fontWeight: 400,
    color: 'black',
    padding: 0,
    textTransform: 'none',
    '&:hover': {
      backgroundColor: 'unset',
    },
    '&:active': {
      backgroundColor: 'unset',
    },
  },
};

const Profile: React.FC = () => {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const transactions = useAppSelector(selectTransactions);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [open, setOpen] = React.useState(false);
  const isMenuOpen = Boolean(anchorEl);
  const loading = useAppSelector(selectLoginLoading);

  const handleUploadClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const fileInput = document.getElementById(
      'avatarInput',
    ) as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  };

  const handleFileSelect = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (!user) return;
    if (event.target.files && event.target.files.length > 0) {
      const file: File = event.target.files[0];
      if (file) {
        const formData = new FormData();
        formData.append('avatar', file, file.name);
        await dispatch(
          uploadUserAvatar({ id: user._id, avatar: formData }),
        ).unwrap();
      }
    }
  };

  const openMenu = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setAnchorEl(e.currentTarget);
  };

  const closeMenu = () => {
    setAnchorEl(null);
  };
  const closeModal = () => {
    setOpen(false);
  };

  const removeAvatar = async (id: string) => {
    await dispatch(removeUserAvatar(id));
    closeModal();
  };
  useEffect(() => {
    if (user) {
      dispatch(fetchTransactionsByUser(user._id));
    }
  }, [dispatch, user?._id]);

  return (
    <ProtectedRoute isAllowed={Boolean(user)}>
      <>
        {user && (
          <Layout title="Школа Маркетинга Strategia: Профиль">
            <BlocksTitle titleText="Мой профиль" />
            {loading && (
              <Grid container justifyContent="center" alignItems="center">
                <CircularProgress />
              </Grid>
            )}
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
                  {user.telegramUsername ? (
                    <Typography variant="body1" sx={styles.userInfo}>
                      Телеграм:{' '}
                      <Typography component="span" sx={styles.userInfoText}>
                        <Link
                          href={`https://t.me/${user.telegramUsername}`}
                          target="_blank"
                        >
                          @{user.telegramUsername}
                        </Link>
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
                    {user.avatar ? (
                      <Button
                        sx={styles.avatarBtn}
                        onClick={() => setOpen(true)}
                      >
                        Удалить аватар
                      </Button>
                    ) : (
                      <div>
                        <input
                          type="file"
                          accept="image/*"
                          id="avatarInput"
                          onChange={handleFileSelect}
                          style={{ display: 'none' }}
                        />
                        <label htmlFor="avatarInput">
                          <Button
                            onClick={handleUploadClick}
                            sx={styles.avatarBtn}
                          >
                            Загрузить аватар
                          </Button>
                        </label>
                      </div>
                    )}
                  </MenuItem>
                  <MenuItem>
                    <Link href="/profile/edit-user">Изменить профиль</Link>
                  </MenuItem>
                  {!user.googleId && !user.telegramId && (
                    <MenuItem>
                      <Link href="/profile/change-password">
                        Сменить пароль
                      </Link>
                    </MenuItem>
                  )}
                </Menu>
              </Box>
            </Grid>
          </Layout>
        )}
        {user && (
          <MyModal open={open} handleClose={closeModal}>
            <Typography variant="h5" component="div" textAlign="center">
              Подтвердите удаление аватарки
            </Typography>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                gap: 2,
                mt: 5,
              }}
            >
              <Button
                variant="outlined"
                color="error"
                onClick={() => removeAvatar(user._id)}
              >
                Удалить
              </Button>
              <Button variant="outlined" onClick={closeModal}>
                Отменить
              </Button>
            </Box>
          </MyModal>
        )}
      </>
    </ProtectedRoute>
  );
};

// export const getServerSideProps = wrapper.getServerSideProps(
//   (store) => async () => {
//     const { user } = store.getState().users;
//
//     if (user) {
//       await store.dispatch(fetchTransactionsByUser(user._id));
//     }
//
//     return { props: {} };
//   },
// );

export default Profile;
