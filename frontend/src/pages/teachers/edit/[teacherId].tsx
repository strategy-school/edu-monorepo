import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from '@/src/app/hooks';
import {
  editTeacher,
  fetchOneTeacher,
} from '@/src/features/teachers/teachersThunks';
import { TeacherMutation } from '@/src/types';
import {
  selectOneTeacher,
  selectTeacherUpdating,
  selectUpdateTeacherError,
} from '@/src/features/teachers/teachersSlice';
import ProtectedRoute from '@/src/components/ProtectedRoute/ProtectedRoute';
import Layout from '@/src/components/UI/Layout/Layout';
import TeacherForm from '@/src/features/teachers/components/TeacherForm/TeacherForm';
import { selectUser } from '@/src/features/users/usersSlice';

const TeacherId = () => {
  const router = useRouter();
  const { teacherId } = router.query as { teacherId: string };
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const teacher = useAppSelector(selectOneTeacher);
  const error = useAppSelector(selectUpdateTeacherError);
  const updateLoading = useAppSelector(selectTeacherUpdating);

  useEffect(() => {
    if (teacherId) {
      void dispatch(fetchOneTeacher(teacherId));
    }
  }, [dispatch, teacherId]);

  const onSubmit = async (teacher: TeacherMutation) => {
    await dispatch(
      editTeacher({ id: teacherId, teacherData: teacher }),
    ).unwrap();
    void router.push(`/teachers/${teacherId}`);
  };

  const existingTeacher = teacher && {
    user: teacher.user._id,
    info: teacher.info,
    photo: null,
    portfolio: teacher.portfolio,
  };

  return (
    <ProtectedRoute isAllowed={user && user.role === 'admin'}>
      <Layout title="Strategia edit teacher">
        {existingTeacher && (
          <TeacherForm
            onSubmit={onSubmit}
            loading={updateLoading}
            error={error}
            existingTeacher={existingTeacher}
            isEdit
          />
        )}
      </Layout>
    </ProtectedRoute>
  );
};

export default TeacherId;
