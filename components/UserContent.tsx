import { User } from '@supabase/supabase-js';
import React, { useState, useEffect } from 'react';
import { getUser } from './actions';
import AddEmpresa from './addEmpresa/AddEmpresa';

interface UserData {
  user_metadata?: {
    fullName?: string;
  };
}

export default function UserContent() {
  const [userFullName, setUserFullName] = useState<string | undefined>('');

  useEffect(() => {
    async function fetchUserData() {
      try {
        const user: User | null = await getUser();
        if (user && user.user_metadata && user.user_metadata.fullName) {
          setUserFullName(user.user_metadata.fullName);
        }
      } catch (error) {
        console.error('Erro ao buscar dados do usuário:', error);
      }
    }

    fetchUserData();
  }, []);

  return <AddEmpresa />;
}
