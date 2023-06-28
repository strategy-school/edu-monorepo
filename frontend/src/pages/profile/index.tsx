import icon from '@/src/assets/images/user-icon.jpg';
import ProtectedRoute from '@/src/components/ProtectedRoute/ProtectedRoute';
import BlocksTitle from '@/src/components/UI/BlocksTitle/BlocksTitle';
import Layout from '@/src/components/UI/Layout/Layout';
import { apiURL } from '@/src/constants';
import {
  selectTransactions,
  selectTransactionsLoading,
} from '@/src/dispatchers/transactions/transactionsSlice';
import { fetchTransactionsByUser } from '@/src/dispatchers/transactions/transactionsThunk';
import { selectUser } from '@/src/dispatchers/users/usersSlice';
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
import { motion } from 'framer-motion';
import { BLOCK_ANIMATION } from '@/src/styles';

const styles = {
  userInfo: {
    mb: 2,
    fontSize: 20,
    textAlign: 'left',
  },
  userInfoText: {
    color: 'primary.main',
  },
  image: {
    margin: '0 auto',
    borderRadius: '15px',
    height: 'auto',
  },
};

const Profile: React.FC = () => {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const transactions = useAppSelector(selectTransactions);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [open, setOpen] = React.useState(false);
  const isMenuOpen = Boolean(anchorEl);
  const loading = useAppSelector(selectTransactionsLoading);

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
        await dispatch(uploadUserAvatar({ avatar: formData })).unwrap();
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

  const removeAvatar = async () => {
    await dispatch(removeUserAvatar());
    closeModal();
  };
  useEffect(() => {
    if (user) {
      dispatch(fetchTransactionsByUser(user._id));
    }
  }, [dispatch, user?._id, user]);

  interface ImageLoaderProps {
    src: string;
    width: number;
    quality?: number;
  }

  const imageLoader = ({ src, width, quality }: ImageLoaderProps): string => {
    return `${apiURL}/${src}?w=${width}&q=${quality || 75}`;
  };

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
            <motion.div
              initial="hidden"
              animate="visible"
              variants={BLOCK_ANIMATION}
              style={{
                width: '100%',
              }}
            >
              <Grid
                container
                gap={3}
                textAlign="left"
                color="rgb(217, 39, 45)"
                sx={{ position: 'relative' }}
              >
                <Grid
                  item
                  container
                  alignItems="center"
                  direction="column"
                  gap={2}
                  xs={12}
                  sm={4}
                  md={3}
                >
                  {user.avatar ? (
                    <>
                      <Image
                        loader={imageLoader}
                        style={styles.image}
                        src={user.avatar}
                        alt={user.firstName}
                        width={200}
                        height={0}
                        priority={true}
                      />
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() => setOpen(true)}
                        size="small"
                      >
                        Удалить аватар
                      </Button>
                    </>
                  ) : (
                    <>
                      <Image
                        style={styles.image}
                        src={icon}
                        alt="User icon"
                        width={200}
                      />
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
                            variant="outlined"
                            size="small"
                          >
                            Загрузить аватар
                          </Button>
                        </label>
                      </div>
                    </>
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
                      alignItems="stretch"
                      justifyContent="space-between"
                      flexWrap="wrap"
                      spacing={2}
                    >
                      {transactions.map((transaction) => (
                        <Grid
                          item
                          container
                          key={transaction._id}
                          xs={12}
                          md={6}
                          sx={{
                            flexGrow: 1,
                          }}
                        >
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
                  <Menu
                    open={isMenuOpen}
                    anchorEl={anchorEl}
                    onClose={closeMenu}
                  >
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
            </motion.div>
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
              <Button variant="outlined" color="error" onClick={removeAvatar}>
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
