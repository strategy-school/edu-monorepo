import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from '@/src/app/hooks';
import {
  selectOneTeacher,
  selectOneTeacherFetching,
} from '@/src/features/teachers/teachersSlice';
import { fetchOneTeacher } from '@/src/features/teachers/teachersThunks';
import Layout from '@/src/components/UI/Layout/Layout';
import OneTeacher from '@/src/features/teachers/components/OneTeacher/OneTeacher';

const TeacherId = () => {
  const router = useRouter();
  const { teacherId } = router.query as { teacherId: string };
  const dispatch = useAppDispatch();
  const teacher = useAppSelector(selectOneTeacher);
  const loading = useAppSelector(selectOneTeacherFetching);

  useEffect(() => {
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
