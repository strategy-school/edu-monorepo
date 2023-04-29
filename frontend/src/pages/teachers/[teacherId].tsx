import { useAppDispatch, useAppSelector } from '@/src/app/hooks';
import Layout from '@/src/components/UI/Layout/Layout';
import {
  selectOneTeacher,
  selectOneTeacherFetching,
} from '@/src/dispatchers/teachers/teachersSlice';
import { fetchOneTeacher } from '@/src/dispatchers/teachers/teachersThunks';
import OneTeacher from '@/src/features/teachers/components/OneTeacher/OneTeacher';
import { useRouter } from 'next/router';
import React from 'react';

const TeacherId = () => {
  const router = useRouter();
  const { teacherId } = router.query as { teacherId: string };
  const dispatch = useAppDispatch();
  const teacher = useAppSelector(selectOneTeacher);
  const loading = useAppSelector(selectOneTeacherFetching);

  React.useEffect(() => {
    void dispatch(fetchOneTeacher(teacherId));
  }, [dispatch, teacherId]);

  const handleGoBack = () => {
    router.back();
  };

  return (
    <Layout title="Strategia school: страница учителя">
      <OneTeacher teacher={teacher} loading={loading} goBack={handleGoBack} />
    </Layout>
  );
};

export default TeacherId;
