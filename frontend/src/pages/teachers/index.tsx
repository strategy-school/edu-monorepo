import BlocksTitle from '@/src/components/UI/BlocksTitle/BlocksTitle';
import Layout from '@/src/components/UI/Layout/Layout';
import { selectTeachers } from '@/src/dispatchers/teachers/teachersSlice';
import { fetchTeachers } from '@/src/dispatchers/teachers/teachersThunks';
import TeacherCard from '@/src/features/teachers/components/TeacherCard/TeacherCard';
import { useAppSelector } from '@/src/store/hooks';
import { wrapper } from '@/src/store/store';
import { Grid } from '@mui/material';
import React from 'react';

import { motion, AnimatePresence } from 'framer-motion';
import { ONE_BY_ONE_ANIMATION } from '@/src/styles';

const TeachersPage: React.FC = () => {
  const teachers = useAppSelector(selectTeachers);

  return (
    <Layout title="Школа Маркетинга Strategia: Список бизнес-тренеров">
      <BlocksTitle titleText="Список всех бизнес-тренеров" />
      <Grid container justifyContent="center" spacing={2}>
        {teachers.length > 0 && (
          <AnimatePresence>
            {teachers.map((teacher, i) => (
              <Grid
                item
                container
                justifyContent="center"
                flexWrap="wrap"
                xs={12}
                md={6}
                lg={4}
                key={teacher._id}
              >
                <motion.div
                  initial="hidden"
                  animate="visible"
                  custom={i}
                  variants={ONE_BY_ONE_ANIMATION}
                >
                  <TeacherCard
                    _id={teacher._id}
                    firstName={teacher.user.firstName}
                    lastName={teacher.user.lastName}
                    photo={teacher.photo}
                  />
                </motion.div>
              </Grid>
            ))}
          </AnimatePresence>
        )}
      </Grid>
    </Layout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async () => {
    await store.dispatch(fetchTeachers());

    return { props: {} };
  },
);

export default TeachersPage;
