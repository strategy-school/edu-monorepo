import React from 'react';
import { useRouter } from 'next/router';

const CourseId = () => {
  const router = useRouter();
  const { courseId } = router.query;

  return <div>course {courseId}</div>;
};

export default CourseId;
