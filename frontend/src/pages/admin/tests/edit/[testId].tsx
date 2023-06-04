import AdminLayout from '@/src/components/UI/AdminLayout/AdminLayout';
import { cleanError, selectOneTest } from '@/src/dispatchers/tests/testsSlice';
import { editTest, fetchOneTest } from '@/src/dispatchers/tests/testsThunks';
import TestForm from '@/src/features/tests/components/TestForm/TestForm';
import { useAppDispatch, useAppSelector } from '@/src/store/hooks';
import { TestMutation } from '@/src/types';
import { useRouter } from 'next/router';
import React from 'react';

const EditTest = () => {
  const router = useRouter();
  const { testId } = router.query as { testId: string };
  const dispatch = useAppDispatch();
  const test = useAppSelector(selectOneTest);

  React.useEffect(() => {
    dispatch(fetchOneTest(testId));
  }, [dispatch, testId]);

  const existingTest = test && {
    category: test.category._id,
    title: test.title,
    description: test.description,
    questions: test.questions.map((q) => {
      return {
        question: q.question,
        answers: q.answers,
        correctAnswer: q.correctAnswer,
      };
    }),
  };

  const onSubmit = async (test: TestMutation) => {
    await dispatch(editTest({ id: testId, test })).unwrap();
    dispatch(cleanError());
    void router.push(`/admin/tests/`);
  };

  return (
    <AdminLayout pageTitle="Редактировать тест">
      {existingTest && (
        <TestForm isEdit onSubmit={onSubmit} existingTest={existingTest} />
      )}
    </AdminLayout>
  );
};

export default EditTest;
