import React from 'react';
import { useRouter } from 'next/router';

const TeacherId = () => {
  const router = useRouter();
  const { teacherId } = router.query as { teacherId: string };
  return <div>{teacherId}</div>;
};

export default TeacherId;
