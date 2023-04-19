import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '@/src/axiosApi';
import { Teacher, TeacherShort } from '@/src/types';

export const fetchTeachers = createAsyncThunk<TeacherShort[]>(
  'teachers/fetchAll',
  async () => {
    const response = await axiosApi.get<TeacherShort[]>('/teachers');
    return response.data;
  },
);
export const fetchOneTeacher = createAsyncThunk<Teacher, string>(
  'teachers/fetchOne',
  async (id) => {
    const response = await axiosApi.get<Teacher>('/teachers/' + id);
    return response.data;
  },
);
