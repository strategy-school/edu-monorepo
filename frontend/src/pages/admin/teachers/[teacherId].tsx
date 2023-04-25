import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from '@/src/app/hooks';
import {
  selectOneTeacher,
  selectOneTeacherFetching,
  selectTeacherDeleting,
} from '@/src/features/teachers/teachersSlice';
import { selectUser } from '@/src/features/users/usersSlice';
import {
  deleteTeacher,
  fetchOneTeacher,
  fetchTeachers,
} from '@/src/features/teachers/teachersThunks';
import Layout from '@/src/components/UI/Layout/Layout';
import { Property } from 'csstype';
import OneTeacher from '@/src/features/teachers/components/OneTeacher/OneTeacher';
import ProtectedRoute from '@/src/components/ProtectedRoute/ProtectedRoute';

const TeacherId = () => {
  const router = useRouter();
  const { teacherId } = router.query as { teacherId: string };
  const dispatch = useAppDispatch();
  const teacher = useAppSelector(selectOneTeacher);
  const loading = useAppSelector(selectOneTeacherFetching);
  const deleteLoading = useAppSelector(selectTeacherDeleting);
  const user = useAppSelector(selectUser);

  useEffect(() => {
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
  return (
    <ProtectedRoute isAllowed={user && user.role === 'admin'}>
      <Layout title="Strategia: admin panel | teacher page">
        <OneTeacher
          teacher={teacher}
          deleteLoading={deleteLoading}
          loading={loading}
          onEdit={handleEditClick}
          onDelete={handleDelete}
        />
      </Layout>
    </ProtectedRoute>
  );
};

export default TeacherId;
