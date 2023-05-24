import Layout from '@/src/components/UI/Layout/Layout';
import {
  selectOneTeacher,
  selectOneTeacherFetching,
} from '@/src/dispatchers/teachers/teachersSlice';
import { fetchOneTeacher } from '@/src/dispatchers/teachers/teachersThunks';
import OneTeacher from '@/src/features/teachers/components/OneTeacher/OneTeacher';
import { useAppSelector } from '@/src/store/hooks';
import { wrapper } from '@/src/store/store';
import { useRouter } from 'next/router';
import React from 'react';

const TeacherId: React.FC = () => {
  const router = useRouter();
  const teacher = useAppSelector(selectOneTeacher);
  const loading = useAppSelector(selectOneTeacherFetching);

  const handleGoBack = () => {
    router.back();
  };

  return (
    <Layout title="Школа Маркетинга Strategia: Страница преподователя">
      <OneTeacher teacher={teacher} loading={loading} goBack={handleGoBack} />
    </Layout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ params }) => {
      const { teacherId } = params as { teacherId: string };
      await store.dispatch(fetchOneTeacher(teacherId));

      return { props: {} };
    },
);

export default TeacherId;
