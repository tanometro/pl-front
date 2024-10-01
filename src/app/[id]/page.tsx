'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';

const RedirectWithId: React.FC = () => {
  const { id } = useParams();
  const router = useRouter();

  useEffect(() => {
    if (id) {
      router.push(`/?sellerId=${id}`);
    }
  }, [id, router]);

  return null;
};

export default RedirectWithId;