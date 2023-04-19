import React from 'react';
import { useRouter } from 'next/router';

interface Props extends React.PropsWithChildren {
  isAllowed: boolean | null;
}

const ProtectedRoute: React.FC<Props> = ({ isAllowed, children }) => {
  const router = useRouter();

  if (!isAllowed) {
    void router.replace('/login');
  }

  return <>{isAllowed ? children : null}</>;
};

export default ProtectedRoute;
