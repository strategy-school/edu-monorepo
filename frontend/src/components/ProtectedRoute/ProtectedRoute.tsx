import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

interface Props extends React.PropsWithChildren {
  isAllowed: boolean | null;
}

const ProtectedRoute: React.FC<Props> = ({ isAllowed, children }) => {
  const router = useRouter();

  useEffect(() => {
    if (!isAllowed) {
      void router.replace('/login');
    }
  }, [isAllowed, router]);

  return <>{isAllowed ? children : null}</>;
};

export default ProtectedRoute;
