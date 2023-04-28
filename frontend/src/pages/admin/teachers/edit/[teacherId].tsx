import { useAppDispatch, useAppSelector } from '@/src/app/hooks';
import ProtectedRoute from '@/src/components/ProtectedRoute/ProtectedRoute';
import Layout from '@/src/components/UI/Layout/Layout';
import {
  selectOneTeacher,
  selectTeacherUpdating,
  selectUpdateTeacherError,
} from '@/src/dispatchers/teachers/teachersSlice';
import {
  editTeacher,
  fetchOneTeacher,
} from '@/src/dispatchers/teachers/teachersThunks';
import { selectUser } from '@/src/dispatchers/users/usersSlice';
import TeacherForm from '@/src/features/teachers/components/TeacherForm/TeacherForm';
import { TeacherMutation } from '@/src/types';
import { Button, Grid } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';

const TeacherId = () => {
  const router = useRouter();
  const { teacherId } = router.query as { teacherId: string };
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const teacher = useAppSelector(selectOneTeacher);
  const error = useAppSelector(selectUpdateTeacherError);
  const updateLoading = useAppSelector(selectTeacherUpdating);

  React.useEffect(() => {
    if (teacherId) {
      void dispatch(fetchOneTeacher(teacherId));
    }
  }, [dispatch, teacherId]);

  const onSubmit = async (teacher: TeacherMutation) => {
    await dispatch(
      editTeacher({ id: teacherId, teacherData: teacher }),
    ).unwrap();
    void router.push(`/admin/teachers/`);
  };

  const existingTeacher = teacher && {
    user: teacher.user._id,
    info: teacher.info,
    photo: null,
    portfolio: teacher.portfolio,
  };

  const handleGoBack = () => {
    router.back();
  };

  return (
    <ProtectedRoute isAllowed={user && user.role === 'admin'}>
      <Layout title="Strategia: admin panel | edit teacher">
        <Grid>
          <Button onClick={handleGoBack} sx={{ mb: 3 }}>
            Назад
          </Button>
          {existingTeacher && (
            <TeacherForm
              onSubmit={onSubmit}
              loading={updateLoading}
              error={error}
              existingTeacher={existingTeacher}
              isEdit
            />
          )}
        </Grid>
      </Layout>
    </ProtectedRoute>
  );
};

export default TeacherId;
