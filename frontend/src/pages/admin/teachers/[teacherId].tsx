import AdminLayout from '@/src/components/UI/AdminLayout/AdminLayout';
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
import OneTeacher from '@/src/features/teachers/components/OneTeacher/OneTeacher';
import { useAppDispatch, useAppSelector } from '@/src/store/hooks';
import { useRouter } from 'next/router';
import React from 'react';

const TeacherId = () => {
  const router = useRouter();
  const { teacherId } = router.query as { teacherId: string };
  const dispatch = useAppDispatch();
  const teacher = useAppSelector(selectOneTeacher);
  const loading = useAppSelector(selectOneTeacherFetching);
  const deleteLoading = useAppSelector(selectTeacherDeleting);

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
    <AdminLayout>
      <OneTeacher
        teacher={teacher}
        deleteLoading={deleteLoading}
        loading={loading}
        onEdit={handleEditClick}
        onDelete={handleDelete}
        goBack={handleGoBack}
      />
    </AdminLayout>
  );
};

export default TeacherId;
