import { useAppDispatch, useAppSelector } from '@/src/app/hooks';
import ProtectedRoute from '@/src/components/ProtectedRoute/ProtectedRoute';
import Layout from '@/src/components/UI/Layout/Layout';
import {
  selectOneTeacher,
  selectOneTeacherFetching,
  selectTeacherDeleting,
} from '@/src/dispatchers/teachers/teachersSlice';
import {
  deleteTeacher,
  fetchOneTeacher,
  fetchTeachers,
} from '@/src/dispatchers/teachers/teachersThunks';
import { selectUser } from '@/src/dispatchers/users/usersSlice';
import OneTeacher from '@/src/features/teachers/components/OneTeacher/OneTeacher';
import { useRouter } from 'next/router';
import React from 'react';

const TeacherId = () => {
  const router = useRouter();
  const { teacherId } = router.query as { teacherId: string };
  const dispatch = useAppDispatch();
  const teacher = useAppSelector(selectOneTeacher);
  const loading = useAppSelector(selectOneTeacherFetching);
  const deleteLoading = useAppSelector(selectTeacherDeleting);
  const user = useAppSelector(selectUser);

  React.useEffect(() => {
    void dispatch(fetchOneTeacher(teacherId));
  }, [dispatch, teacherId]);

  const handleEditClick = (id: string) => {
    void router.push(`/admin/teachers/edit/${id}`);
  };

  const handleDelete = async (id: string) => {
    if (!teacher) return;
    if (window.confirm('Подтвердите удаление преподавателя')) {
      await dispatch(deleteTeacher(id));
      await router.push('/admin/teachers/');
      dispatch(fetchTeachers());
    }
  };
  const handleGoBack = () => {
    router.back();
  };

  return (
    <ProtectedRoute isAllowed={user && user.role === 'admin'}>
      <Layout title="Strategia: admin panel | teacher page">
        <OneTeacher
          teacher={teacher}
          deleteLoading={deleteLoading}
          loading={loading}
          onEdit={handleEditClick}
          onDelete={handleDelete}
          goBack={handleGoBack}
        />
      </Layout>
    </ProtectedRoute>
  );
};

export default TeacherId;
